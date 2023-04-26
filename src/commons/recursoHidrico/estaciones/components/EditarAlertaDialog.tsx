/* eslint-disable @typescript-eslint/no-misused-promises */
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, TextField } from '@mui/material';
import type React from 'react';
import { useEffect, type Dispatch, type SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import { control_error } from '../../../../helpers/controlError';
import { control_success, editar_conf_alarma } from '../../requets/Request';
import { type CrearAlerta } from '../interfaces/interfaces';

interface IProps {
  is_modal_active: boolean;
  set_is_modal_active: Dispatch<SetStateAction<boolean>>;
  alerta_editado: any;
  set_alerta_editado: Dispatch<SetStateAction<any>>;
  confi_alerta_persona: () => Promise<void>
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const EditarAlertaDialog: React.FC<IProps> = ({ is_modal_active, set_is_modal_active, alerta_editado, set_alerta_editado, confi_alerta_persona, }) => {

  const {
    register,
    reset,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    handleSubmit,
    formState: { errors },
  } = useForm<CrearAlerta>();

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (is_modal_active && alerta_editado) {
      reset(alerta_editado);
    }
  }, [is_modal_active, alerta_editado, reset]);

  const handle_close = (): void => {
    set_is_modal_active(false);
  }

  const on_submit = async (data: CrearAlerta): Promise<any> => {
    try {
      const datos_confi = {

        mensaje_alarma_maximo: data.mensaje_alarma_maximo,
        mensaje_alarma_minimo: data.mensaje_alarma_minimo,
        mensaje_no_alarma: data.mensaje_no_alarma,
        frecuencia_alarma: data.frecuencia_alarma,

      };
      await editar_conf_alarma(alerta_editado.id_confi_alerta_persona, datos_confi);
      set_alerta_editado(null);
      set_is_modal_active(false);
      control_success('La configuración se actualizó correctamente')
      void confi_alerta_persona()
      reset();
    } catch (error) {
      control_error(error);
    }
  };
  return (
    <Dialog open={is_modal_active}
      onClose={handle_close}
      maxWidth="xs">
      <form onSubmit={handleSubmit(on_submit)} noValidate autoComplete="off">
        <DialogTitle>Editar Configuracion Alerta Estación</DialogTitle>
        <Divider />
        <DialogContent sx={{ mb: '0px' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Mensaje Máximo"
                fullWidth
                defaultValue={alerta_editado?.mensaje_alarma_maximo}
                {...register("mensaje_alarma_maximo", { required: true })}
                error={Boolean(errors.mensaje_alarma_maximo)}
                helperText={(errors.mensaje_alarma_maximo != null) ? "Este campo es obligatorio" : ""}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Mensaje Mínimo"
                fullWidth
                defaultValue={alerta_editado?.mensaje_alarma_minimo}
                {...register("mensaje_alarma_minimo", { required: true })}
                error={Boolean(errors.mensaje_alarma_minimo)}
                helperText={(errors.mensaje_alarma_minimo != null) ? "Este campo es obligatorio" : ""}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Mensaje estable"
                fullWidth
                defaultValue={alerta_editado?.mensaje_no_alarma}
                {...register("mensaje_no_alarma", { required: true })}
                error={Boolean(errors.mensaje_no_alarma)}
                helperText={(errors.mensaje_no_alarma != null) ? "Este campo es obligatorio" : ""}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Frecuencia de alerta"
                type="number"
                fullWidth
                defaultValue={alerta_editado?.frecuencia_alarma}
                {...register("frecuencia_alarma", { required: true })}
                error={Boolean(errors.frecuencia_alarma)}
                helperText={(errors.frecuencia_alarma != null) ? "Este campo es obligatorio" : ""}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            handle_close();
            reset();
          }}>Cancelar</Button>
          <Button variant="contained" color="primary" type='submit'>Actualizar</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
