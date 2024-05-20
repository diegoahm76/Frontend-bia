/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */

import { Button, Dialog, DialogActions, DialogContent,   Divider, Grid, TextField } from '@mui/material';
import type React from 'react';
import { useEffect, type Dispatch, type SetStateAction } from 'react';
import { type FieldValues, type SubmitHandler, useForm } from 'react-hook-form';
import { type EditarPersona } from '../interfaces/interfaces';
import { control_success, editar_persona } from '../../requets/Request';
import { control_error } from '../../../../helpers/controlError';
import { Title } from '../../../../components';
import SaveIcon from '@mui/icons-material/Save';
interface IProps {
  is_modal_active: boolean;
  set_is_modal_active: Dispatch<SetStateAction<boolean>>;
  usuario_editado: any;
  set_usuario_editado: Dispatch<SetStateAction<any>>;
  persona: SubmitHandler<FieldValues>;
  estaciones_options: any
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const EditarPersonaDialog: React.FC<IProps> = ({ is_modal_active, set_is_modal_active, usuario_editado, set_usuario_editado, persona, estaciones_options, }) => {

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
      // Verifique si el nro_celular_notificacion comienza con 
      if (!data.nro_celular_notificacion.startsWith("57")) {
        // Si no es así, agréguelo
        datos_estacion.nro_celular_notificacion = `57${data.nro_celular_notificacion}`;
      } else {
        // Si ya tiene 57, use el valor original.
        datos_estacion.nro_celular_notificacion = data.nro_celular_notificacion;
      }
      await editar_persona(usuario_editado.id_persona, datos_estacion);
      set_usuario_editado(null);
      set_is_modal_active(false);
      control_success('La persona se actualizó correctamente')
      persona(estaciones_options.map((estacion: { value: number; }) => estacion.value))
      reset();
      // //  console.log('')("Id estacion", estaciones_options.map((estacion: { value: number; }) => estacion.value))
    } catch (error: any) {
      control_error(error.response.data.detail || 'Algo paso, intente de nuevo');
    }
  };
  
  return (
    <Dialog
      open={is_modal_active}
      onClose={handle_close}
    >
       <Grid
                container
                spacing={2}
                sx={{
                    position: 'relative',
                    background: '#FAFAFA',
                    borderRadius: '15px',
                    p: '20px', mb: '20px',
                    boxShadow: '0px 3px 6px #042F4A26',
                    marginTop: '20px',
                    marginLeft: '-5px',
                }}
            >
              <Title title=" Editar Parte Interesada" />
            </Grid>
       
      <Divider />
      <DialogContent>
        <form onSubmit={handleSubmit(on_submit)} noValidate autoComplete="off">
          <Grid container spacing={2} sx={{
                    position: 'relative',
                    background: '#FAFAFA',
                    borderRadius: '15px',
                    p: '20px', mb: '20px',
                    boxShadow: '0px 3px 6px #042F4A26',
                    // marginTop: '6px',
                    marginLeft: '-5px',
                }}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Primer Nombre"
                type="text"
                fullWidth
                size="small"
                margin="dense"
                required
                autoFocus
                defaultValue={usuario_editado?.primer_nombre}
                {...register("primer_nombre", {
                  required: true,
                  pattern: /^[a-zA-Z]+$/,
                  minLength: {
                    value: 3,
                    message: "El primer nombre debe tener al menos 5 caracteres"
                  },
                  maxLength: 30
                })}
                error={Boolean(errors.primer_nombre)}
                helperText={(errors.primer_nombre?.type === "required") ? "Este campo es obligatorio" :
                  (errors.primer_nombre?.type === "pattern") ? "Solo se permiten letras mayúsculas y minúsculas" :
                    (errors.primer_nombre?.type === "maxLength") ? "El primer nombre no debe exceder los 30 caracteres" :
                      (errors.primer_nombre?.type === "minLength") ? "El primer nombre debe tener al menos 3 caracteres" : ""}
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
                {...register("segundo_nombre", {
                  pattern: /^[a-zA-Z]+$/,
                  minLength: {
                    value: 3,
                    message: "El segundo nombre debe tener al menos 6 caracteres"
                  },
                  maxLength: 30,
                })}
                error={Boolean(errors.segundo_nombre)}
                helperText={(errors.segundo_nombre?.type === "required") ? "Este campo es obligatorio" :
                  (errors.segundo_nombre?.type === "pattern") ? "Solo se permiten letras mayúsculas y minúsculas" :
                    (errors.segundo_nombre?.type === "maxLength") ? "El segundo nombre no debe exceder los 30 caracteres" :
                      (errors.segundo_nombre?.type === "minLength") ? "El segundo nombre debe tener al menos 3 caracteres" : ""}
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
                {...register("primer_apellido", {
                  pattern: /^[a-zA-Z]+$/,
                  minLength: {
                    value: 3,
                    message: "El primer apellido debe tener al menos 3 caracteres"
                  },
                  maxLength: 30,
                  required: true
                })}
                error={Boolean(errors.primer_apellido)}
                helperText={(errors.primer_apellido?.type === "required") ? "Este campo es obligatorio" :
                  (errors.primer_apellido?.type === "pattern") ? "Solo se permiten letras mayúsculas y minúsculas" :
                    (errors.primer_apellido?.type === "maxLength") ? "El primer apellido no debe exceder los 30 caracteres" :
                      (errors.primer_apellido?.type === "minLength") ? "El primer apellido debe tener al menos 3 caracteres" : ""}
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
                {...register("segundo_apellido", {
                  pattern: /^[a-zA-Z]+$/,
                  minLength: {
                    value: 3,
                    message: "El segundo apellido debe tener al menos 3 caracteres"
                  },
                  maxLength: 30,
                  required: true
                })}
                error={Boolean(errors.segundo_apellido)}
                helperText={
                  (errors.segundo_apellido?.type === "required") ? "Este campo es obligatorio" :
                    (errors.segundo_apellido?.type === "pattern") ? "Solo se permiten letras mayúsculas y minúsculas" :
                      (errors.segundo_apellido?.type === "maxLength") ? "El segundo apellido no debe exceder los 30 caracteres" :
                        (errors.segundo_apellido?.type === "minLength") ? "El segundo apellido debe tener al menos 3 caracteres" : ""}
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
                {...register("entidad", {
                  pattern: /^[a-zA-Z]+$/,
                  minLength: {
                    value: 3,
                    message: "La entidad debe tener al menos 3 caracteres"
                  },
                  maxLength: 30,
                  required: true
                })}
                error={Boolean(errors.entidad)}
                helperText={(errors.entidad?.type === "required") ? "Este campo es obligatorio" :
                  (errors.entidad?.type === "pattern") ? "Solo se permiten letras mayúsculas y minúsculas" :
                    (errors.entidad?.type === "maxLength") ? "La entidad no debe exceder los 30 caracteres" :
                      (errors.entidad?.type === "minLength") ? "La entidad debe tener al menos 3 caracteres" : ""}
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
                {...register("cargo", {
                  pattern: /^[a-zA-Z\s]+$/, // permite letras y espacios
                  minLength: {
                    value: 3,
                    message: "El cargo debe tener al menos 3 caracteres"
                  },
                  maxLength: 30,
                  required: true
                })}
                error={Boolean(errors.cargo)}
                helperText={(errors.cargo?.type === "required") ? "Este campo es obligatorio" :
                  (errors.cargo?.type === "pattern") ? "Solo se permiten letras mayúsculas y minúsculas" :
                    (errors.cargo?.type === "maxLength") ? "El cargo no debe exceder los 30 caracteres" :
                      (errors.cargo?.type === "minLength") ? "El cargo debe tener al menos 3 caracteres" : ""}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email"
                type="email"
                fullWidth
                size="small"
                margin="dense"
                required
                autoFocus
                defaultValue={usuario_editado?.email_notificacion}
                {...register("email_notificacion", {
                  required: "Este campo es obligatorio",
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: "Ingresa un correo electrónico válido"
                  },
                })}
                error={Boolean(errors.email_notificacion)}
                helperText={errors.email_notificacion?.message}
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
                {...register("nro_celular_notificacion", {
                  required: "Este campo es obligatorio",
                  pattern: {
                    value: /^\d{10,12}$/,
                    message: "El número celular debe tener de 10 a 12 dígitos"
                  }
                })}
                error={Boolean(errors.nro_celular_notificacion)}
                helperText={(errors.nro_celular_notificacion?.type === "required") ? "Este campo es obligatorio" :
                  (errors.nro_celular_notificacion?.type === "pattern") ? "El número celular debe tener de 10 a 12 dígitos" : ""}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Observación"
                fullWidth
                size="small"
                margin="dense"
                multiline
                required
                autoFocus
                defaultValue={usuario_editado?.observacion}
                {...register("observacion", {
                  required: "Este campo es obligatorio",
                  maxLength: {
                    value: 250,
                    message: "El campo no puede tener más de 250 caracteres"
                  }
                })}
                error={Boolean(errors.observacion)}
                helperText={errors.observacion?.message}
                inputProps={{
                  maxLength: 250
                }}
              />
            </Grid>
            <Grid item container sx={{justifyContent:"flex-end"}}>
              <DialogActions>
                <Button
                  variant="text"
                  color="primary"
                  onClick={() => {
                    handle_close();
                    reset();
                  }}
                >
                  Cancelar
                </Button>
                <Button startIcon={<SaveIcon />} variant="contained" color="success" type="submit">
                  ACTUALIZAR
                </Button>
              </DialogActions>
            </Grid>
         
          </Grid>
        </form>
      </DialogContent>
    </Dialog>

  );
};
