/* eslint-disable @typescript-eslint/strict-boolean-expressions */
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
import { crear_pozo } from '../Request/request';
import type { Pozo } from '../interfaces/interfaces';
import { control_error, control_success } from '../../../../helpers';

interface IProps {
  is_modal_active: boolean;
  set_is_modal_active: Dispatch<SetStateAction<boolean>>;
  get_datos: () => Promise<void>;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const AgregarPozo: React.FC<IProps> = ({
  is_modal_active,
  set_is_modal_active,
  get_datos,
}) => {
  const [is_loading, set_is_loading] = useState(false);

  const handle_close = (): void => {
    set_is_modal_active(false);
  };
  const {
    register,
    reset,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    handleSubmit,
    formState: { errors },
  } = useForm();

  const on_submit_pozos: SubmitHandler<FieldValues> = async (data) => {
    try {
      set_is_loading(true);
      await crear_pozo(data as Pozo);
      set_is_modal_active(false);
      control_success('Pozo creado correctamente');
      await get_datos();
      reset();
      limpiar_formulario();
      set_is_loading(false);
    } catch (error: any) {
      set_is_loading(false);
      control_error(error.response.data.detail);
    }
  };

  const limpiar_formulario = (): void => {
    reset();
  };
  return (
    <Dialog open={is_modal_active} onClose={handle_close} maxWidth="sm">
      <Box component="form" onSubmit={handleSubmit(on_submit_pozos)}>
        <DialogTitle>Registro de pozos</DialogTitle>
        <Divider />
        <DialogContent>
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
            variant="outlined"
            color="warning"
            onClick={limpiar_formulario}
          >
            Limpiar
          </Button>
          <Button
            variant="contained"
            disabled={is_loading}
            color="success"
            type="submit"
          >
            Guardar
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};
