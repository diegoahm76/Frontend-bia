import { useState, useEffect } from 'react';
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
  MenuItem,
  Grid,
} from '@mui/material';
import { Title } from '../../../../components/Title';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';

// import { add_germination_bed_service } from '../store/thunks/configuracionThunks';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { type IList, type IObjGerminationBed as FormValues } from '../interfaces/configuracion';
import { api } from '../../../../api/axios';

interface IProps {
  action: string,
  is_modal_active: boolean;
  set_is_modal_active: Dispatch<SetStateAction<boolean>>;
}



// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const CrearCamaGerminacionDialogForm = ({
  action,
  is_modal_active,
  set_is_modal_active,
}: IProps) => {
  const initial_options: IList[] = [
    {
      label: '',
      value: '',
    },
  ];
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  const {current_germination_bed} = useAppSelector((state) => state.configuracion);


  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { control: control_bed, handleSubmit: handle_submit, reset: reset_germination_bed, getValues, formState: { errors } } =
    useForm<FormValues>();
    console.log("Errors:", errors);

  const handle_close_add_bed = (): void => {
    set_is_modal_active(false);
  };
  useEffect(() => {
    reset_germination_bed(current_germination_bed);
    console.log(current_germination_bed)
  }, [current_germination_bed]);


  const on_submit = (data: FormValues): void => {
    // void dispatch(add_germination_bed_service(form_data, navigate));
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
        <DialogTitle>{action==="create"? "Crear vivero": action==="detail"? "Detalle vivero": "Editar vivero" }</DialogTitle>
        <Divider />
        <DialogContent sx={{ mb: '0px' }}>
          <Grid container>
            <Grid item xs={11} md={5} margin={1}>
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
                    disabled = {action !== "create"}
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
            
            <Grid item xs={11} md={5} margin={1}>
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
                    disabled = {action !== "create"}
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
              GUARDAR
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
