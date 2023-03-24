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
  Grid
} from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import { add_porcentaje_service} from '../../store/thunks/MarcaMedidaPorcentajeThunks';
 import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../../../hooks/';
// import { type IList } from "../interfaces/marca";

interface IProps {
  is_modal_active: boolean;
  set_is_modal_active: Dispatch<SetStateAction<boolean>>;
}

interface FormValues {
        id_porcentaje_iva: number | null;
        porcentaje: number;
        observacion: string;
        acciones: string;
      }


// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const CrearPorcentajeModal = ({
  is_modal_active,
  set_is_modal_active,
}: IProps) => {
 
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

 // eslint-disable-next-line @typescript-eslint/naming-convention
  const { control: control_porcentaje, handleSubmit: handle_submit } =
    useForm<FormValues>();

  const handle_close_add_porcentaje = (): void => {
    set_is_modal_active(false);
  };
  
  const on_submit = (data: FormValues): void => {
  
    void dispatch(add_porcentaje_service(data, navigate));
    handle_close_add_porcentaje();
  };
 

  return (
    <Dialog
      maxWidth="xl"
      open={is_modal_active}
      onClose={handle_close_add_porcentaje}
    >
      <Box
        component="form"
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
       onSubmit={handle_submit(on_submit)}
      >
        <DialogTitle>Crear Porcentaje</DialogTitle>
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
                    ? 'Es obligatorio ingresar un nombre'
                    : 'Ingrese nombre'
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
              variant="outlined"
              onClick={handle_close_add_porcentaje}
              startIcon={<CloseIcon />}
            >
              CERRAR
            </Button>
            <Button type="submit" variant="contained" startIcon={<SaveIcon />}>
              GUARDAR
            </Button>
          </Stack>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

// eslint-disable-next-line no-restricted-syntax
export default CrearPorcentajeModal;
