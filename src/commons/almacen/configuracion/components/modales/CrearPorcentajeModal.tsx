import { useEffect, type Dispatch, type SetStateAction } from 'react';
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
  Grid
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import { add_porcentaje_service, edit_porcentaje_service} from '../../store/thunks/MarcaMedidaPorcentajeThunks';
 import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../../hooks/';
import { Title } from '../../../../../components';
// import { type IList } from "../interfaces/marca";

interface IProps {
  action: string;
  is_modal_active: boolean;
  set_is_modal_active: Dispatch<SetStateAction<boolean>>;
}

interface FormValues {
        id_porcentaje_iva: number | null;
        porcentaje: number;
        observacion: string;
         activo: boolean,
        item_ya_usado: boolean,
        acciones: string;
      }


// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const CrearPorcentajeModal = ({
  action,
  is_modal_active,
  set_is_modal_active,
}: IProps) => {
 
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

 const {porcentaje_seleccionado} = useAppSelector((state) => state.porcentaje);
 const { control: control_porcentaje, handleSubmit: handle_submit, reset: reset_porcentaje } =  useForm<FormValues>();

 const handle_close_add_porcentaje = (): void => {
   set_is_modal_active(false);
 };
  
 useEffect(() => {
  reset_porcentaje(porcentaje_seleccionado);
  //  //  console.log('')(porcentaje_seleccionado);
}, [porcentaje_seleccionado] );

  const on_submit = (data: FormValues): void => {
  const form_data: any = new FormData();
  form_data.append('id_porcentaje_iva', data.id_porcentaje_iva);
  form_data.append('porcentaje', data.porcentaje);
  form_data.append('item_ya_usado', data.item_ya_usado);
  form_data.append('activo', data.activo);
  form_data.append('observacion', data.activo);
 
    void dispatch(add_porcentaje_service(data, navigate));
    handle_close_add_porcentaje();
  };
  const on_submit_edit = (data: FormValues): void => {
    const form_data:any = new FormData();

    form_data.append('porcentaje', data.porcentaje);
    form_data.append('observacion', data.observacion);
  
    void dispatch(edit_porcentaje_service(form_data, porcentaje_seleccionado.id_porcentaje_iva, navigate));
    handle_close_add_porcentaje();

  }

  return (
    <Dialog
      maxWidth="xl"
      open={is_modal_active}
      onClose={handle_close_add_porcentaje}
    >
      <Box
        component="form"
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
       onSubmit={action=== "create"? handle_submit(on_submit):handle_submit(on_submit_edit)}
      >
        
   <Grid item xs={12} marginLeft={2} marginRight={2} marginTop={3}>
                    <Title title={`${action==="create"? "Crear marca": action==="detail"? "Detalle Marca": "Editar Marca" } `} />
                </Grid>
        <DialogTitle> </DialogTitle>
        <Divider />
        <DialogContent sx={{ mb: '0px' }}>
         <Grid container >
         <Grid xs={ 11 } md={ 11 } margin={ 1 }>
          <Controller
            name="porcentaje"
            control={control_porcentaje}
            defaultValue = {0}
            rules={{ required: true }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                margin="dense"
                fullWidth
                size="small"
                label="Porcentaje"
                variant="outlined"
                value={value}
                onChange={onChange}
                error={!(error == null)}
                helperText={
                  error != null
                    ? 'Es obligatorio ingresar un porcentaje'
                    : 'Ingrese porcentaje'
                }
              />
            )}
          />
          </Grid>

          <Grid xs={ 11 } md={ 11 } margin={ 1 }>
          <Controller
            name="observacion"
            control={control_porcentaje}
            defaultValue = ""
            rules={{ required: true }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                margin="dense"
                fullWidth
                size="small"
                label="Observación"
                variant="outlined"
                value={value}
                onChange={onChange}
                error={!(error == null)}
              
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
              variant="contained" color='error'
              onClick={handle_close_add_porcentaje}
              startIcon={<CloseIcon />}
            >
              CERRAR
            </Button>
            {action === "create"?
            <Button type="submit" variant="contained" color='success' startIcon={<SaveIcon />}>
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
export default CrearPorcentajeModal;
