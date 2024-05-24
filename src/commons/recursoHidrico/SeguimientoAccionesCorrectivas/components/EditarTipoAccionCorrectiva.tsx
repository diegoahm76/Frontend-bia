/* eslint-disable @typescript-eslint/no-misused-promises */
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  TextField,
} from '@mui/material';
import type React from 'react';
import { useEffect, type Dispatch, type SetStateAction, useState } from 'react';
import { useForm } from 'react-hook-form';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import { put_tipo_accion } from '../services/services';
import { control_error, control_success } from '../../../../helpers';
import { Title } from '../../../../components';

interface IProps {
  is_modal_active: boolean;
  set_is_modal_active: Dispatch<SetStateAction<boolean>>;
  data_acciones: any;
  get_data: () => Promise<void>;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ActualizarAccion: React.FC<IProps> = ({
  is_modal_active,
  set_is_modal_active,
  data_acciones,
  get_data,
}) => {
  const {
    register,
    reset,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    handleSubmit,
    watch,
    setValue: set_value,
    formState: { errors },
  } = useForm<any>();

  const [is_loading, set_is_loading] = useState(false);

  const activo = watch('activo') ?? false;

  const handle_change_checkbox = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { checked } = event.target;
    set_value('activo', checked);
  };

  useEffect(() => {
    setTimeout(() => {
      set_value('nombre_tipo_accion', data_acciones?.nombre_tipo_accion);
      set_value('descripcion', data_acciones?.descripcion);
    }, 100);
  }, [data_acciones, reset]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (is_modal_active && data_acciones) {
      reset(data_acciones);
    }
  }, [is_modal_active, data_acciones, reset]);

  const handle_close = (): void => {
    set_is_modal_active(false);
  };

  const on_submit = async (data: any): Promise<any> => {
    try {
      set_is_loading(true);
      const datos_accion = {
        nombre_tipo_accion: data.nombre_tipo_accion,
        descripcion: data.descripcion,
      };
      await put_tipo_accion(data_acciones.id_tipo_accion, datos_accion);
      set_is_modal_active(false);
      control_success('Acción actualizada correctamente');
      void get_data();
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

  return (
    <Dialog
      open={is_modal_active}
      onClose={handle_close}
      fullWidth
      maxWidth="md"
    >
      {' '}
      <form onSubmit={handleSubmit(on_submit)} noValidate autoComplete="off">
        <Grid item xs={12} marginLeft={2} marginRight={2} my={2}>
          <Title title="Editar Acción Correctiva" />
        </Grid>

        <DialogTitle></DialogTitle>
        <Divider />
        <DialogContent sx={{ mb: '0px' }}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <TextField
                label="Nombre Tipo Acción"
                fullWidth
                size="small"
                margin="dense"
                required
                autoFocus
                defaultValue={data_acciones?.nombre_tipo_accion}
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
            variant="contained"
            disabled={is_loading}
            color="success"
            type="submit"
            startIcon={<SaveIcon />}
          >
            ACTUALIZAR
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
