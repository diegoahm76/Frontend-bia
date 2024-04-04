/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  TextField,
} from '@mui/material';
import type React from 'react';
import { useEffect, useState, type Dispatch, type SetStateAction } from 'react';
import {
  Controller,
  type FieldValues,
  type SubmitHandler,
  useForm,
} from 'react-hook-form';
import { crear_persona } from '../../requets/Request';
import Select from 'react-select';
import { api } from '../../../../api/axios';
import { Title } from '../../../../components';
import SaveIcon from '@mui/icons-material/Save';
import { control_error } from '../../../../helpers';
interface IProps {
  is_modal_active: boolean;
  set_is_modal_active: Dispatch<SetStateAction<boolean>>;
  persona: SubmitHandler<FieldValues>;
}
// eslint-disable-next-line @typescript-eslint/naming-convention
export const NuevoUsuarioModal: React.FC<IProps> = ({
  is_modal_active,
  set_is_modal_active,
  persona,
}) => {
  const [estaciones_options, set_estaciones_options] = useState([]);

  const handle_close = (): void => {
    set_is_modal_active(false);
  };
  const {
    register,
    control,
    reset,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    handleSubmit,
    formState: { errors },
  } = useForm();

  const get_data_initial = async (): Promise<void> => {
    try {
      const { data } = await api.get('/estaciones/consultar-estaciones/');
      const estaciones_maped = data.data.map(
        (estacion: {
          nombre_estacion: string;
          id_estacion: number | string;
        }) => ({
          label: estacion.nombre_estacion,
          value: estacion.id_estacion,
        })
      );
      set_estaciones_options(estaciones_maped);
    } catch (err: any) {
      control_error(err.response.data.detail || 'Algo paso, intente de nuevo');
    }
  };

  useEffect(() => {
    void get_data_initial();
    // const datos = get_data_initial();
    // //  console.log('')('data inical', datos);
  }, []);

  const on_sumbit_persona: SubmitHandler<FieldValues> = (data): void => {
    try {
      const nueva_persona = {
        cod_tipo_documento_id: data.cod_tipo_documento_id,
        numero_documento_id: data.numero_documento_id,
        primer_nombre: data.primer_nombre,
        segundo_nombre: data.segundo_nombre,
        primer_apellido: data.primer_apellido,
        segundo_apellido: data.segundo_apellido,
        entidad: data.entidad,
        cargo: data.cargo,
        email_notificacion: data.email_notificacion,
        nro_celular_notificacion: data.nro_celular_notificacion,
        observacion: data.observacion,
        id_estacion: data.estacion.value,
      };
      // Verifique si el nro_celular_notificacion comienza con
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      if (!data.nro_celular_notificacion.startsWith('57')) {
        // Si no es así, agréguelo
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        nueva_persona.nro_celular_notificacion = `57${data.nro_celular_notificacion}`;
      } else {
        // Si ya tiene 57, use el valor original.
        nueva_persona.nro_celular_notificacion = data.nro_celular_notificacion;
      }

      void crear_persona(nueva_persona);
      set_is_modal_active(!is_modal_active);
      persona(nueva_persona.id_estacion);
      reset();
    } catch (err: any) {
      control_error(err.response.data.detail || 'Algo paso, intente de nuevo');
    }
  };

  const tiposdoc = [
    {
      value: 'CC',
      label: 'Cédula de ciudadanía',
    },
    {
      value: 'CE',
      label: 'Cédula extranjería',
    },
    {
      value: 'TI',
      label: 'Tarjeta de identidad',
    },
    {
      value: 'RC',
      label: 'Registro civil',
    },
    {
      value: 'NU',
      label: 'NUIP',
    },
    {
      value: 'PA',
      label: 'Pasaporte',
    },
    {
      value: 'PE',
      label: 'Permiso especial de permanencia',
    },
    {
      value: 'NT',
      label: 'NIT',
    },
  ];

  return (
    <Dialog open={is_modal_active} onClose={handle_close}>
      <Grid
        container
        spacing={2}
        sx={{
          position: 'relative',
          background: '#FAFAFA',
          borderRadius: '15px',
          p: '20px',
          mb: '20px',
          boxShadow: '0px 3px 6px #042F4A26',
          marginTop: '20px',
          marginLeft: '-5px',
        }}
      >
        <Title title="Nuevo Parte Interesada" />
      </Grid>

      <Divider />
      <DialogContent sx={{ mb: '0px' }}>
        <form onSubmit={handleSubmit(on_sumbit_persona)}>
          <Grid
            container
            spacing={2}
            sx={{
              position: 'relative',
              background: '#FAFAFA',
              borderRadius: '15px',
              p: '20px',
              mb: '20px',
              boxShadow: '0px 3px 6px #042F4A26',
              // marginTop: '6px',
              marginLeft: '-5px',
            }}
          >
            <Grid item xs={12}>
              <TextField
                label="Tipo de Identificación"
                select
                fullWidth
                size="small"
                margin="dense"
                required
                autoFocus
                {...register('cod_tipo_documento_id', { required: true })}
                error={Boolean(errors.cod_tipo_documento_id)}
                helperText={
                  errors.cod_tipo_documento_id != null
                    ? 'Este campo es obligatorio'
                    : ''
                }
              >
                {tiposdoc.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Número Identificación"
                type="number"
                fullWidth
                size="small"
                margin="dense"
                required
                autoFocus
                {...register('numero_documento_id', {
                  required: true,
                  pattern: /^.{4,15}$/,
                })}
                error={Boolean(errors.numero_documento_id)}
                helperText={
                  errors.numero_documento_id != null
                    ? 'Este campo es obligatorio y debe tener de 4 a 15 caracteres'
                    : ''
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Primer Nombre"
                fullWidth
                size="small"
                margin="dense"
                required
                autoFocus
                {...register('primer_nombre', {
                  required: true,
                  pattern: /^[A-Za-z]{3,30}$/,
                })}
                error={Boolean(errors.primer_nombre)}
                helperText={
                  errors.primer_nombre != null
                    ? 'Este campo es obligatorio y debe tener de 3 a 30 letras mayúsculas o minúsculas'
                    : ''
                }
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
                {...register('segundo_nombre', {
                  required: true,
                  maxLength: 30,
                  pattern: /^[A-Za-z]{3,30}$/,
                })}
                error={Boolean(errors.segundo_nombre)}
                helperText={
                  errors.segundo_nombre != null
                    ? 'Este campo es obligatorio y debe tener de 3 a 30 letras mayúsculas o minúsculas'
                    : ''
                }
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
                {...register('primer_apellido', {
                  required: true,
                  maxLength: 30,
                  pattern: /^[A-Za-z]{3,30}$/,
                })}
                error={Boolean(errors.primer_apellido)}
                helperText={
                  errors.primer_apellido != null
                    ? 'Este campo es obligatorio y debe tener de 3 a 30 letras mayúsculas o minúsculas'
                    : ''
                }
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
                {...register('segundo_apellido', {
                  required: true,
                  maxLength: 30,
                  pattern: /^[A-Za-z]{3,30}$/,
                })}
                error={Boolean(errors.segundo_apellido)}
                helperText={
                  errors.segundo_apellido != null
                    ? 'Este campo es obligatorio y debe tener de 3 a 30 letras mayúsculas o minúsculas'
                    : ''
                }
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
                {...register('entidad', {
                  required: true,
                  maxLength: 30,
                  pattern: /^[A-Za-z]{3,30}$/,
                })}
                error={Boolean(errors.entidad)}
                helperText={
                  errors.entidad != null
                    ? 'Este campo es obligatorio y debe tener de 3 a 30 letras mayúsculas o minúsculas'
                    : ''
                }
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
                {...register('cargo', {
                  required: true,
                  minLength: 3,
                  maxLength: 30,
                  pattern: /^[a-zA-Z\s]+$/, // permite letras y espacios
                })}
                error={Boolean(errors.cargo)}
                helperText={
                  errors.cargo != null
                    ? 'Este campo es obligatorio y debe tener entre 3 y 30 caracteres, solo letras mayúsculas o minúsculas'
                    : ''
                }
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
                {...register('email_notificacion', {
                  required: true,
                  pattern: /^\S+@\S+\.\S+$/,
                })}
                error={Boolean(errors.email_notificacion)}
                helperText={
                  errors.email_notificacion != null
                    ? 'Este campo es obligatorio y debe ser un correo electrónico válido'
                    : ''
                }
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
                {...register('nro_celular_notificacion', {
                  required: 'Este campo es obligatorio',
                  pattern: {
                    value: /^\d{10,12}$/,
                    message: 'El número celular debe tener de 10 a 12 dígitos',
                  },
                })}
                error={Boolean(errors.nro_celular_notificacion)}
                helperText={
                  errors.nro_celular_notificacion?.type === 'required'
                    ? 'Este campo es obligatorio'
                    : errors.nro_celular_notificacion?.type === 'pattern'
                    ? 'El número celular debe tener de 10 a 12 dígitos'
                    : ''
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Observación"
                multiline
                fullWidth
                size="small"
                margin="dense"
                required
                autoFocus
                inputProps={{ maxLength: 250 }}
                {...register('observacion', { required: true })}
                error={Boolean(errors.observacion)}
                helperText={
                  errors.observacion != null ? 'Este campo es obligatorio' : ''
                }
              />
            </Grid>
            <Grid item xs={12}>
              <InputLabel>Estación</InputLabel>
              <Controller
                name="estacion"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={estaciones_options}
                    placeholder="Seleccionar"
                  />
                )}
              />
              {errors.estacion != null && (
                <FormHelperText error>Este campo es obligatorio</FormHelperText>
              )}
            </Grid>
            <Grid item container sx={{ justifyContent: 'flex-end' }}>
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
                <Button
                  startIcon={<SaveIcon />}
                  variant="contained"
                  color="success"
                  type="submit"
                >
                  Guardar
                </Button>
              </DialogActions>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
    </Dialog>
  );
};
