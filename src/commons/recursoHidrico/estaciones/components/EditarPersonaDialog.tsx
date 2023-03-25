/* eslint-disable @typescript-eslint/no-misused-promises */

import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, TextField } from '@mui/material';
import type React from 'react';
import { useEffect, type Dispatch, type SetStateAction } from 'react';
import { type FieldValues, type SubmitHandler, useForm } from 'react-hook-form';
import { type EditarPersona } from '../interfaces/interfaces';
import { control_success, editar_persona } from '../../requets/Request';
import { control_error } from '../../../../helpers/controlError';

interface IProps {
  is_modal_active: boolean;
  set_is_modal_active: Dispatch<SetStateAction<boolean>>;
  usuario_editado: any;
  set_usuario_editado: Dispatch<SetStateAction<any>>;
  persona: SubmitHandler<FieldValues>;
  estaciones_options:any
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const EditarPersonaDialog: React.FC<IProps> = ({ is_modal_active, set_is_modal_active, usuario_editado, set_usuario_editado, persona,estaciones_options,}) => {

  const {
    register,
    reset,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    handleSubmit,
    formState: { errors },
  } = useForm<EditarPersona>();

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (is_modal_active && usuario_editado) {
      reset(usuario_editado);
    }
  }, [is_modal_active, usuario_editado, reset]);

  const handle_close = (): void => {
    set_is_modal_active(false);
  }

  const on_submit = async (data: EditarPersona): Promise<any> => {
    try {
      const datos_estacion = {

        primer_nombre: data.primer_nombre,
        segundo_nombre: data.segundo_nombre,
        primer_apellido: data.primer_apellido,
        segundo_apellido: data.segundo_apellido,
        entidad: data.entidad,
        cargo: data.cargo,
        email_notificacion: data.email_notificacion,
        nro_celular_notificacion: data.nro_celular_notificacion,
        observacion: data.observacion,
      };
      await editar_persona(usuario_editado.id_persona, datos_estacion);
      set_usuario_editado(null);
      set_is_modal_active(false);
      control_success('La persona se actualizó correctamente')
      persona(estaciones_options.map((estacion: { value: number; }) => estacion.value))
      console.log("Id estacion", estaciones_options.map((estacion: { value: number; }) => estacion.value))
    } catch (error) {
      control_error(error);
    }
  };

  return (
    <Dialog
      open={is_modal_active}
      onClose={handle_close}
    >
      <DialogTitle>Editar Parte Interesada</DialogTitle>
      <Divider />
      <DialogContent>
        <form onSubmit={handleSubmit(on_submit)} noValidate autoComplete="off">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Primer Nombre"
                fullWidth
                size="small"
                margin="dense"
                required
                autoFocus
                defaultValue={usuario_editado?.primer_nombre}
                {...register("primer_nombre", { required: true })}
                error={Boolean(errors.primer_nombre)}
                helperText={(errors.primer_nombre != null) ? "Este campo es obligatorio" : ""}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Segundo Nombre"
                fullWidth
                size="small"
                margin="dense"
                required
                autoFocus
                defaultValue={usuario_editado?.segundo_nombre}
                {...register("segundo_nombre", { required: true })}
                error={Boolean(errors.segundo_nombre)}
                helperText={(errors.segundo_nombre != null) ? "Este campo es obligatorio" : ""}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Primer Apellido"
                fullWidth
                size="small"
                margin="dense"
                required
                autoFocus
                defaultValue={usuario_editado?.primer_apellido}
                {...register("primer_apellido", { required: true })}
                error={Boolean(errors.primer_apellido)}
                helperText={(errors.primer_apellido != null) ? "Este campo es obligatorio" : ""}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Segundo Apellido"
                fullWidth
                size="small"
                margin="dense"
                required
                autoFocus
                defaultValue={usuario_editado?.segundo_apellido}
                {...register("segundo_apellido", { required: true })}
                error={Boolean(errors.segundo_apellido)}
                helperText={(errors.segundo_apellido != null) ? "Este campo es obligatorio" : ""}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Entidad a la cual pertenece"
                fullWidth
                size="small"
                margin="dense"
                required
                autoFocus
                placeholder="Entidad a la cual pertenece"
                defaultValue={usuario_editado?.entidad}
                {...register("entidad", { required: true })}
                error={Boolean(errors.entidad)}
                helperText={(errors.entidad != null) ? "Este campo es obligatorio" : ""}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Cargo"
                fullWidth
                size="small"
                margin="dense"
                required
                autoFocus
                defaultValue={usuario_editado?.cargo}
                {...register("cargo", { required: true })}
                error={Boolean(errors.cargo)}
                helperText={(errors.cargo != null) ? "Este campo es obligatorio" : ""}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Correo Electronico"
                type="email"
                fullWidth
                size="small"
                margin="dense"
                required
                autoFocus
                defaultValue={usuario_editado?.email_notificacion}
                {...register("email_notificacion", { required: true })}
                error={Boolean(errors.email_notificacion)}
                helperText={(errors.email_notificacion != null) ? "Este campo es obligatorio" : ""}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Número Celular"
                type="number"
                fullWidth
                size="small"
                margin="dense"
                required
                autoFocus
                defaultValue={usuario_editado?.nro_celular_notificacion}
                {...register("nro_celular_notificacion", { required: true })}
                error={Boolean(errors.nro_celular_notificacion)}
                helperText={
                  (errors.nro_celular_notificacion != null) ? "Este campo es obligatorio" : ""
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Observación"
                fullWidth
                size="small"
                margin="dense"
                required
                autoFocus
                defaultValue={usuario_editado?.observacion}
                {...register("observacion", { required: true })}
                error={Boolean(errors.observacion)}
                helperText={(errors.observacion != null) ? "Este campo es obligatorio" : ""}
              />
            </Grid>
          </Grid>
          <DialogActions>
            <Button
              variant="text"
              color="primary"
              onClick={handle_close}
            >
              Cancelar
            </Button>
            <Button variant="contained" color="primary" type="submit">
              Actializar
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>

  );
};
