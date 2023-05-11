import { useEffect } from 'react';
import { type Dispatch, type SetStateAction } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Button,
  Box,
  Divider,
  Grid,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';

// import { add_germination_bed_service } from '../store/thunks/configuracionThunks';

import { useAppSelector } from '../../../../hooks';
import { type IObjGerminationBed as FormValues, type IObjGerminationBed } from '../interfaces/configuracion';

import {initial_state_current_germination_bed } from '../store/slice/configuracionSlice';

interface IProps {
  action: string,
  is_modal_active: boolean;
  set_is_modal_active: Dispatch<SetStateAction<boolean>>;
  beds: IObjGerminationBed[];
  set_aux_germination_beds: Dispatch<SetStateAction<IObjGerminationBed[]>>
}



// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const CrearCamaGerminacionDialogForm = ({
  action,
  is_modal_active,
  set_is_modal_active,
  beds,
  set_aux_germination_beds
}: IProps) => {
  
  
  const {current_germination_bed, current_nursery} = useAppSelector((state) => state.configuracion);


  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { control: control_bed, handleSubmit: handle_submit, reset: reset_germination_bed} =
    useForm<FormValues>();

  const handle_close_add_bed = (): void => {
    set_is_modal_active(false);
  };
  useEffect(() => {
    reset_germination_bed({...current_germination_bed, id_vivero: current_nursery.id_vivero});
  }, [current_germination_bed]);

  useEffect(() => {
    let number_orden = 0;
    beds.forEach((option) => {
      if(number_orden < (option.nro_de_orden ?? 0) ) number_orden= option.nro_de_orden??0
    })
    reset_germination_bed({...current_germination_bed, id_vivero: current_nursery.id_vivero, nro_de_orden: number_orden + 1});
  }, [beds]);

  const on_submit = (data: FormValues): void => {
    
    if(action === "create"){    
      set_aux_germination_beds([...beds, data])
    } else{
      const aux_beds: IObjGerminationBed[] = []
      beds.forEach((option) => {
       if(option.id_cama_germinacion_vivero === current_germination_bed.id_cama_germinacion_vivero){
        aux_beds.push(data)
       } else{
        aux_beds.push(option)
       }
      })
      set_aux_germination_beds(aux_beds)
    }
    reset_germination_bed(initial_state_current_germination_bed)
    handle_close_add_bed();
  };
  
  return (
    <Dialog
      maxWidth="xl"
      open={is_modal_active}
      onClose={handle_close_add_bed}
    >
      <Box
        component="form"
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={action==="create"? handle_submit(on_submit):handle_submit(on_submit)}
      >
        <DialogTitle>{action==="create"? "Crear cama de germinación": action==="detail"? "Detalle Cama de germinación": "Editar cama de germinación" }</DialogTitle>
        <Divider />
        <DialogContent sx={{ mb: '0px' }}>
          <Grid container>
            <Grid item xs={11} md={11} margin={1}>
              <Controller
                name="nombre"
                control={control_bed}
                defaultValue=""
                rules={{ required: true }}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    margin="dense"
                    fullWidth
                    size="small"
                    label="Nombre"
                    variant="outlined"
                    disabled = {action === "detail" || current_germination_bed.item_ya_usado === true}
                    value={value}
                    onChange={onChange}
                    error={!(error == null)}
                    helperText={
                      error != null
                        ? 'Es obligatorio ingresar un nombre'
                        : 'Ingrese nombre'
                    }
                  />
                )}
              />
            </Grid>
            
            <Grid item xs={11} md={11} margin={1}>
              <Controller
                name="observacion"
                control={control_bed}
                defaultValue=""
                rules={{ required: true }}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <TextField
                    margin="dense"
                    fullWidth
                    size="small"
                    label="Observación"
                    variant="outlined"
                    disabled = {action === "detail"}
                    value={value}
                    onChange={onChange}
                    error={!(error == null)}
                    helperText={
                      
                      error != null
                        ? 'Es obligatorio ingresar una observación'
                        : 'Ingrese observación'
                    }
                  />
                )}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <Divider />
        <DialogActions>
          <Stack
            direction="row"
            spacing={2}
            sx={{ mr: '15px', mb: '10px', mt: '10px' }}
          >
            <Button
              variant="outlined"
              onClick={handle_close_add_bed}
              startIcon={<CloseIcon />}
            >
              CERRAR
            </Button>
            {action === "create"?
            <Button type="submit" variant="contained" startIcon={<SaveIcon />}>
              AGREGAR
            </Button>:
            action === "edit"?
            <Button type="submit" variant="contained" startIcon={<EditIcon />}>
              EDITAR
            </Button>:
            null
            }
          </Stack>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

// eslint-disable-next-line no-restricted-syntax
export default CrearCamaGerminacionDialogForm;
