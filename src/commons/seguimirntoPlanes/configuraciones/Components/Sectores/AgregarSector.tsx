/* eslint-disable @typescript-eslint/no-misused-promises */
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  TextField,
} from '@mui/material';
import type React from 'react';
import { useState, type Dispatch, type SetStateAction } from 'react';
import { type FieldValues, type SubmitHandler, useForm } from 'react-hook-form';
import { crear_sector } from '../../Request/request';
import type { ISector } from '../../interfaces/interfaces';
import { control_error, control_success } from '../../../../../helpers';
import SaveIcon from '@mui/icons-material/Save';
import { Title } from '../../../../../components';
import CloseIcon from '@mui/icons-material/Close';
import CleanIcon from '@mui/icons-material/CleaningServices';
interface IProps {
  is_modal_active: boolean;
  set_is_modal_active: Dispatch<SetStateAction<boolean>>;
  get_datos: () => Promise<void>;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const AgregarSector: React.FC<IProps> = ({
  is_modal_active,
  set_is_modal_active,
  get_datos,
}) => {
  const {
    register,
    reset,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [is_loading, set_is_loading] = useState(false);

  const handle_close = (): void => {
    set_is_modal_active(false);
  };

  const on_submit: SubmitHandler<FieldValues> = async (data) => {
    try {
      set_is_loading(true);
      await crear_sector(data as ISector);
      set_is_modal_active(false);
      control_success('Sector creado correctamente');
      await get_datos();
      reset();
      set_is_loading(false);
    } catch (error: any) {
      set_is_loading(false);
      control_error(
        error.response.data.detail ||
          'Algo salio mal, intenta de nuevo más tarde'
      );
    }
  };
  const limpiar_formulario = (): void => {
    reset();
  };

  return (
    <Dialog
      open={is_modal_active}
      onClose={handle_close}
      fullWidth
      maxWidth="md"
    >
      {' '}
      <Box component="form" onSubmit={handleSubmit(on_submit)}>
        <Grid item xs={12} marginLeft={2} marginRight={2} marginTop={3}>
          <Title title="Crear Sector" />
        </Grid>
        <DialogTitle></DialogTitle>
        <Divider />
        <DialogContent>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <TextField
                label="Nombre Sector"
                fullWidth
                size="small"
                margin="dense"
                required
                autoFocus
                {...register('nombre_sector', {
                  required: true,
                })}
                error={Boolean(errors.nombre_sector)}
                helperText={
                  errors.nombre_sector?.type === 'required'
                    ? 'Este campo es obligatorio'
                    : ''
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Aplicación"
                fullWidth
                size="small"
                margin="dense"
                required
                autoFocus
                {...register('aplicacion', {
                  required: true,
                })}
                error={Boolean(errors.aplicacion)}
                helperText={
                  errors.aplicacion?.type === 'required'
                    ? 'Este campo es obligatorio'
                    : ''
                }
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            color="error"
            variant="outlined"
            startIcon={<CloseIcon />}
            onClick={() => {
              handle_close();
              reset();
            }}
          >
            Cerrar
          </Button>{' '}
          <Button
            variant="outlined"
            color="warning"
            startIcon={<CleanIcon />}
            onClick={limpiar_formulario}
          >
            Limpiar
          </Button>
          <Button
            variant="contained"
            disabled={is_loading}
            color="success"
            type="submit"
            startIcon={<SaveIcon />}
          >
            Guardar
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};
