/* eslint-disable @typescript-eslint/no-misused-promises */
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  Grid,
  TextField,
} from '@mui/material';
import type React from 'react';
import { useState, type Dispatch, type SetStateAction } from 'react';
import { Controller, type FieldValues, type SubmitHandler, useForm } from 'react-hook-form';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import CleanIcon from '@mui/icons-material/CleaningServices';
import { post_tipo_accion } from '../services/services';
import { control_error, control_success } from '../../../../helpers';
import { Title } from '../../../../components';
import dayjs from 'dayjs';

interface IProps {
  is_modal_active: boolean;
  set_is_modal_active: Dispatch<SetStateAction<boolean>>;
  get_datos: () => Promise<void>;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const AgregarTipoAccion: React.FC<IProps> = ({
  is_modal_active,
  set_is_modal_active,
  get_datos,
}) => {
  const {
    register,
    reset,
    control,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [is_loading, set_is_loading] = useState(false);

  const handle_close = (): void => {
    set_is_modal_active(false);
  };

  const on_submit_tipo_accion: SubmitHandler<FieldValues> = async (data) => {
    try {
      set_is_loading(true);
      await post_tipo_accion(data);
      set_is_modal_active(false);
      control_success('Acción creada correctamente');
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
      <Box component="form" onSubmit={handleSubmit(on_submit_tipo_accion)}>
        <Grid item xs={12} marginLeft={2} marginRight={2} my={2}>
          <Title title="Crear Acción Correctiva" />
        </Grid>
        <Divider />
        <DialogContent>
        <Controller
          name="fecha_creacion"
          control={control}
          defaultValue={dayjs().format('YYYY-MM-DD')}
          render={({ field }) => <input type="hidden" {...field} />}
        />
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Nombre Acción Correctiva"
                fullWidth
                size="small"
                margin="dense"
                required
                autoFocus
                {...register('nombre_tipo_accion', {
                  required: true,
                })}
                error={Boolean(errors.nombre_tipo_accion)}
                helperText={
                  errors.nombre_tipo_accion?.type === 'required'
                    ? 'Este campo es obligatorio'
                    : ''
                }
              />
            </Grid>
            <Grid item xs={12} mt={1}>
              <TextField
                label="Descripción"
                fullWidth
                size="small"
                margin="dense"
                required
                autoFocus
                {...register('descripcion', {
                  required: true,
                })}
                error={Boolean(errors.descripcion)}
                helperText={
                  errors.descripcion?.type === 'required'
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
