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
import { control_error, control_success } from '../../../../../helpers';
import type { ITipos } from '../../interfaces/interfaces';
import { editar_tipos } from '../../Request/request';
import { Title } from '../../../../../components';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';

interface IProps {
  is_modal_active: boolean;
  set_is_modal_active: Dispatch<SetStateAction<boolean>>;
  data: any;
  get_data: () => Promise<void>;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ActualizarTipos: React.FC<IProps> = ({
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
  } = useForm<ITipos>();

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
      set_value('nombre_tipo', data?.nombre_tipo);
      set_value('activo', data?.activo);
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

  const on_submit = async (data: ITipos): Promise<any> => {
    try {
      set_is_loading(true);
      const datos_tipos = {
        nombre_tipo: data.nombre_tipo,
        activo: data.activo,
      };
      await editar_tipos((data.id_tipo as number) ?? 0, datos_tipos as ITipos);
      set_is_modal_active(false);
      control_success('Tipo actualizado correctamente');
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
        <Grid item xs={12} marginLeft={2} marginRight={2} marginTop={3}>
          <Title title="Editar Tipos" />
        </Grid>

        <DialogTitle></DialogTitle>
        <Divider />
        <DialogContent sx={{ mb: '0px' }}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <TextField
                label="Nombre Tipo"
                fullWidth
                size="small"
                margin="dense"
                required
                autoFocus
                defaultValue={data?.nombre}
                {...register('nombre_tipo', {
                  required: true,
                })}
                error={Boolean(errors.nombre_tipo)}
                helperText={
                  errors.nombre_tipo?.type === 'required'
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
