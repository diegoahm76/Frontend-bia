/* eslint-disable @typescript-eslint/strict-boolean-expressions */
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
import type { EditarPozo } from '../interfaces/interfaces';
import { editar_pozo } from '../Request/request';
import { control_error, control_success } from '../../../../helpers';

interface IProps {
  is_modal_active: boolean;
  set_is_modal_active: Dispatch<SetStateAction<boolean>>;
  data: any;
  get_data: () => Promise<void>;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ActualizarPozo: React.FC<IProps> = ({
  is_modal_active,
  set_is_modal_active,
  data,
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
  } = useForm<EditarPozo>();

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
      set_value('nombre', data?.nombre);
      set_value('activo', data?.activo);
      set_value('cod_pozo', data?.cod_pozo);
      set_value('descripcion', data?.descripcion);
    }, 100);
  }, [data, reset]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (is_modal_active && data) {
      reset(data);
    }
  }, [is_modal_active, data, reset]);

  const handle_close = (): void => {
    set_is_modal_active(false);
  };

  const on_submit = async (data: EditarPozo): Promise<any> => {
    try {
      set_is_loading(true);
      await editar_pozo(data.id_pozo, data);
      set_is_modal_active(false);
      control_success('Pozo actualizado correctamente');
      void get_data();
      reset();
      set_is_loading(false);
    } catch (error: any) {
      set_is_loading(false);
      control_error(error.response.data.detail);
    }
  };

  return (
    <Dialog open={is_modal_active} onClose={handle_close} maxWidth="xl">
      <form onSubmit={handleSubmit(on_submit)} noValidate autoComplete="off">
        <DialogTitle>Editar Pozo</DialogTitle>
        <Divider />
        <DialogContent sx={{ mb: '0px' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Nombre del pozo"
                fullWidth
                size="small"
                margin="dense"
                required
                autoFocus
                {...register('nombre', {
                  required: true,
                })}
                error={!!errors.nombre}
                helperText={
                  errors.nombre?.type === 'required'
                    ? 'Este campo es obligatorio'
                    : ''
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Codigo"
                fullWidth
                size="small"
                margin="dense"
                required
                autoFocus
                {...register('cod_pozo', {
                  required: true,
                })}
                error={!!errors.cod_pozo}
                helperText={
                  errors.cod_pozo?.type === 'required'
                    ? 'Este campo es obligatorio'
                    : ''
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Descripcion"
                fullWidth
                size="small"
                margin="dense"
                multiline
                rows={3}
                required
                autoFocus
                {...register('descripcion', {
                  required: true,
                })}
                error={!!errors.descripcion}
                helperText={
                  errors.descripcion?.type === 'required'
                    ? 'Este campo es obligatorio'
                    : ''
                }
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl component="fieldset" variant="standard">
                <FormControlLabel
                  control={
                    <Checkbox
                      {...register('activo', {})}
                      checked={activo}
                      onChange={handle_change_checkbox}
                    />
                  }
                  label="Activo *"
                />
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handle_close();
              reset();
            }}
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            disabled={is_loading}
            color="success"
            type="submit"
          >
            ACTUALIZAR
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
