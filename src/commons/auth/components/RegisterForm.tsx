import { useEffect, useState } from 'react';
import { type Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Skeleton,
  FormHelperText,
  Alert,
  CircularProgress,
  Typography,
  Button,
} from '@mui/material';

import { LoadingButton } from '@mui/lab';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { use_register } from '../hooks/registerHooks';
import { useForm } from 'react-hook-form';
import { get_person_by_document } from '../request/authRequest';
import { control_error } from '../../../helpers/controlError';
import { type IPerson } from '../interfaces';

type keys_object =
  | 'tipo_persona'
  | 'tipo_documento'
  | 'numero_documento'
  | 'digito_verificacion'
  | 'nombre_comercial'
  | 'primer_nombre'
  | 'segundo_nombre'
  | 'primer_apellido'
  | 'segundo_apellido'
  | 'fecha_nacimiento'
  | 'email'
  | 'telefono_celular'
  | 'ubicacion_georeferenciada'
  | 'razon_social'
  | 'telefono_celular_empresa'
  | 'direccion_notificaciones'
  | 'representante_legal'
  | 'confirmar_celular'
  | 'confirmar_email'
  | 'cod_municipio_notificacion_nal'
  | 'require_nombre_comercial';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const RegisterForm: React.FC = () => {
  const {
    register,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    // getValues,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    handleSubmit,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    setValue,
    formState: { errors },
    watch,
  } = useForm<IPerson>();
  const {
    tipo_documento_opt,
    tipo_persona_opt,
    loading,
    tipo_documento,
    tipo_persona,
    set_tipo_persona,
    set_tipo_documento,
  } = use_register();
  const [fecha_nacimiento, set_fecha_nacimiento] = useState<Dayjs | null>(null);
  const [error_email, set_error_email] = useState(false);
  const [error_password, set_error_password] = useState(false);
  const [is_saving, set_is_saving] = useState(false);
  const [is_search, set_is_search] = useState(false);
  const [data_register, set_data_register] = useState<IPerson>({
    tipo_persona: '',
    tipo_documento: '',
    numero_documento: '',
    digito_verificacion: '',
    nombre_comercial: '',
    primer_nombre: '',
    segundo_nombre: '',
    primer_apellido: '',
    segundo_apellido: '',
    fecha_nacimiento: '',
    email: '',
    telefono_celular: '',
    ubicacion_georeferenciada: '',
    razon_social: '',
    telefono_celular_empresa: '',
    direccion_notificaciones: '',
    representante_legal: '',
    confirmar_celular: '',
    confirmar_email: '',
    cod_municipio_notificacion_nal: '',
    require_nombre_comercial: false,
  });
  // watchers
  const requiere_nombre_comercial: boolean = watch('require_nombre_comercial');
  const email = watch('email');
  const confirmar_email = watch('confirmar_email');
  const numero_documento = watch('numero_documento');
  const password = watch('password');
  const confirmar_password = watch('confirmar_password');

  const validate_exits = async (): Promise<void> => {
    // console.log(getValues());
    set_is_search(true);
    try {
      const {
        data: { data },
      } = await get_person_by_document(tipo_documento, numero_documento);

      if (data.numero_documento !== '') {
        set_data_register({
          tipo_persona: data.tipo_persona,
          tipo_documento,
          numero_documento: data.numero_documento,
          digito_verificacion: data.digito_verificacion,
          nombre_comercial: data.nombre_comercial,
          primer_nombre: data.primer_nombre,
          segundo_nombre: data.segundo_nombre,
          primer_apellido: data.primer_apellido,
          segundo_apellido: data.segundo_apellido,
          fecha_nacimiento: data.fecha_nacimiento,
          email: data.email,
          telefono_celular: data.telefono_celular,
          ubicacion_georeferenciada: data.ubicacion_georeferenciada,
          razon_social: data.razon_social,
          telefono_celular_empresa: data.telefono_celular_empresa,
          direccion_notificaciones: data.direccion_notificaciones,
          representante_legal: data.representante_legal,
          confirmar_celular: '',
          confirmar_email: '',
          cod_municipio_notificacion_nal: data.cod_municipio_notificacion_nal,
          require_nombre_comercial: false,
        });

        setValue('numero_documento', data.numero_documento);
        setValue('digito_verificacion', data.digito_verificacion);
        setValue('nombre_comercial', data.nombre_comercial);
        setValue('primer_nombre', data.primer_nombre);
        setValue('segundo_nombre', data.segundo_nombre);
        setValue('primer_apellido', data.primer_apellido);
        setValue('segundo_apellido', data.segundo_apellido);
        setValue('fecha_nacimiento', data.fecha_nacimiento);
        setValue('email', data.email);
        setValue('confirmar_email', data.email);
        setValue('telefono_celular', data.telefono_celular);
        setValue('razon_social', data.razon_social);
        setValue('telefono_celular_empresa', data.telefono_celular_empresa);
        setValue('direccion_notificaciones', data.direccion_notificaciones);
        setValue('representante_legal', data.representante_legal);
        setValue(
          'cod_municipio_notificacion_nal',
          data.cod_municipio_notificacion_nal
        );

        set_fecha_nacimiento(dayjs(data.fecha_nacimiento));
      }
    } catch (error) {
      control_error(error);
    } finally {
      set_is_search(false);
    }
  };

  // Consultamos si el usuario existe
  useEffect(() => {
    if (numero_documento !== undefined && numero_documento !== '') {
      void validate_exits();
    }
  }, [numero_documento]);

  useEffect(() => {
    set_tipo_persona(watch('tipo_persona'));
  }, [watch('tipo_persona')]);

  useEffect(() => {
    set_tipo_documento(watch('tipo_documento'));
  }, [watch('tipo_documento')]);

  useEffect(() => {
    if (email !== confirmar_email) {
      set_error_email(true);
      return;
    }
    set_error_email(false);
  }, [email, confirmar_email]);

  useEffect(() => {
    if (password !== confirmar_password) {
      set_error_password(true);
      return;
    }
    set_error_password(false);
  }, [password, confirmar_password]);

  // / Cambio inputs
  const handle_change = (e: React.ChangeEvent<HTMLInputElement>): void => {
    set_data_register({
      ...data_register,
      [e.target.name]: e.target.value,
    });
    const name = e.target.name as keys_object;
    setValue(name, e.target.value);
  };

  const on_submit = handleSubmit((data) => {
    set_is_saving(true);
    try {
      if (data.tipo_persona === 'N') {
        // await clienteAxios.post('personas/persona-natural/create/', data);
      } else {
        // await clienteAxios.get(
        //   `personas/get-personas-naturales-by-document/${createPersonaModel.tipo_documento}/${createPersonaModel.numero_documento}/`
        // );
        // try {
        // } catch (error) {
        //   // ERROR AL CREAR PERSONAS NATURAlES
        //   console.error(error);
        //   // Swal.fire({
        //   //   title:
        //   //     'No existe un representante legal registrado con el documento ingresado',
        //   //   text: '¿Quiere crear una persona natural?',
        //   //   icon: 'info',
        //   //   showCancelButton: true,
        //   //   confirmButtonColor: '#3BA9E0',
        //   //   cancelButtonColor: '#6c757d',
        //   //   confirmButtonText: 'Si',
        //   //   cancelButtonText: 'No',
        //   // }).then((result) => {
        //   //   if (result.isConfirmed) {
        //   //     handleChangeTypePerson({ label: 'Natural', value: 'N' });
        //   //     setFormValues({
        //   //       ...formValues,
        //   //       tipo_persona: { label: 'Natural', value: 'N' },
        //   //     });
        //   //   }
        //   // });
        //   set_is_saving(false);
        //   return error as AxiosError;
        // }
        // try {
        //   await clienteAxios.post('personas/persona-juridica/create/', persona);
        //   // Swal.fire({
        //   //   title: 'Registrado como persona juridica',
        //   //   text: '¿Desea registrarse como usuario?',
        //   //   icon: 'success',
        //   //   showCancelButton: true,
        //   //   confirmButtonColor: '#3BA9E0',
        //   //   cancelButtonColor: '#6c757d',
        //   //   confirmButtonText: 'Si',
        //   //   cancelButtonText: 'No',
        //   // }).then((result) => {
        //   //   if (result.isConfirmed) {
        //   //     navigate('/registeruser');
        //   //   } else {
        //   //     resetValues();
        //   //   }
        //   // });
        // } catch (err: any) {
        //   if (
        //     err.response?.data?.email &&
        //     err.response?.data?.numero_documento
        //   ) {
        //     // Swal.fire({
        //     //   title: 'Este documento y correo ya estan relacionados',
        //     //   text: '¿Desea registrarse como usuario?',
        //     //   icon: 'warning',
        //     //   showCancelButton: true,
        //     //   confirmButtonColor: '#3BA9E0',
        //     //   cancelButtonColor: '#6c757d',
        //     //   confirmButtonText: 'Si',
        //     //   cancelButtonText: 'No',
        //     // }).then((result) => {
        //     //   if (result.isConfirmed) {
        //     //     navigate('/registeruser');
        //     //   }
        //     // });
        //   } else if (err.response?.data?.non_field_errors) {
        //     // Swal.fire({
        //     //   title: 'Este documento ya esta relacionado',
        //     //   text: '¿Desea registrarse como usuario?',
        //     //   icon: 'warning',
        //     //   showCancelButton: true,
        //     //   confirmButtonColor: '#3BA9E0',
        //     //   cancelButtonColor: '#6c757d',
        //     //   confirmButtonText: 'Si',
        //     //   cancelButtonText: 'No',
        //     // }).then((result) => {
        //     //   if (result.isConfirmed) {
        //     //     navigate('/registeruser');
        //     //   }
        //     // });
        //   } else if (err.response?.data?.numero_documento) {
        //     // Swal.fire({
        //     //   title: 'Este documento ya existe',
        //     //   text: '¿Desea registrarse como usuario?',
        //     //   icon: 'warning',
        //     //   showCancelButton: true,
        //     //   confirmButtonColor: '#3BA9E0',
        //     //   cancelButtonColor: '#6c757d',
        //     //   confirmButtonText: 'Si',
        //     //   cancelButtonText: 'No',
        //     // }).then((result) => {
        //     //   if (result.isConfirmed) {
        //     //     navigate('/registeruser');
        //     //   }
        //     // });
        //   } else if (err.response?.data?.email) {
        //     // Swal.fire({
        //     //   title: 'Este correo electronico ya existe',
        //     //   text: 'Verifica tus datos',
        //     //   icon: 'info',
        //     //   confirmButtonColor: '#3BA9E0',
        //     //   cancelButtonColor: '#6c757d',
        //     //   confirmButtonText: 'Aceptar',
        //     // });
        //   } else {
        //     console.log(err);
        //   }
        // }
      }

      // Creamos el usuario

      // const user = {
      //   email: createPersonaModel.email,
      //   nombre_de_usuario: createPersonaModel.nombreDeUsuario,
      //   persona: data.data.id_persona,
      //   password: createPersonaModel.password,
      //   id_usuario_creador: null,
      //   tipo_usuario: 'E',
      //   redirect_url: process.env.NODE_ENV === 'production' ? 'https://macareniafrontdevelop.netlify.app/#/login' : 'http://localhost:3000/#/login',
      // };
      // const config2 = {
      //   headers: {
      //     'Content-type': 'application/json',
      //   },
      // };
      // await clienteAxios.post('users/register-externo/', user, config2);

      // Swal.fire({
      //   title: 'Usuario registrado correctamente',
      //   text: 'Revise su bandeja de correo electronico para confirmar el registro',
      //   icon: 'success',
      //   confirmButtonColor: '#3BA9E0',
      //   cancelButtonColor: '#6c757d',
      //   confirmButtonText: 'Continuar',
      // }).then((result) => {
      //   if (result.isConfirmed) {
      //     navigate('/login');
      //   }
      // });
      // Swal.fire({
      //   title: 'Error de registro',
      //   text: 'Error al registrar usuario',
      //   icon: 'error',
      //   showCancelButton: true,
      //   confirmButtonColor: '#3BA9E0',
      //   cancelButtonColor: '#6c757d',
      //   confirmButtonText: 'Si',
      //   cancelButtonText: 'No',
      // });
    } catch (error) {
      //* Manejo de errores por datos repetidos en la DB (email y numero documento)
      console.log(error);
      set_is_saving(false);
      // Swal.fire({
      //   title: 'Este documento y correo ya estan relacionados',
      //   text: err.response?.data.detail,
      //   icon: 'warning',
      //   showCancelButton: true,
      //   confirmButtonColor: '#3BA9E0',
      //   cancelButtonColor: '#6c757d',
      //   confirmButtonText: 'Si',
      //   cancelButtonText: 'No',
      // })
    } finally {
      set_is_saving(false);
    }
  });

  return (
    <>
      <form
        onSubmit={(e) => {
          void on_submit(e);
        }}
      >
        <Typography variant="h6" textAlign="center" pb={2}>
          Formulario registro
        </Typography>
        <Grid container spacing={3} mt={0.1}>
          <Grid item xs={12}>
            <Typography variant="subtitle1" fontWeight="bold">
              Datos personales
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl
              fullWidth
              error={errors.tipo_persona?.type === 'required'}
            >
              {loading ? (
                <Skeleton variant="rectangular" width="100%" height={55} />
              ) : (
                <>
                  <InputLabel id="label_tipo_persona">
                    Tipo de persona
                  </InputLabel>
                  <Select
                    labelId="label_tipo_persona"
                    label="Tipo de persona"
                    fullWidth
                    value={tipo_persona}
                    {...register('tipo_persona', {
                      required: true,
                    })}
                  >
                    <MenuItem value="">
                      <em>Seleccionar opción</em>
                    </MenuItem>
                    {tipo_persona_opt.map((e, k: number) => {
                      return (
                        <MenuItem value={e.cod_tipo_persona} key={k}>
                          {e.tipo_persona}
                        </MenuItem>
                      );
                    })}
                  </Select>
                  {errors.tipo_persona?.type === 'required' ? (
                    <FormHelperText>Campo Requerido</FormHelperText>
                  ) : (
                    ''
                  )}
                </>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl
              fullWidth
              error={errors.tipo_documento?.type === 'required'}
            >
              {loading ? (
                <Skeleton variant="rectangular" width="100%" height={55} />
              ) : (
                <>
                  <InputLabel id="label_tipo_documento">
                    Tipo de documento
                  </InputLabel>
                  <Select
                    labelId="label_tipo_documento"
                    label="Tipo de documento"
                    fullWidth
                    value={tipo_documento}
                    {...register('tipo_documento', {
                      required: true,
                    })}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {tipo_documento_opt.map((e, k: number) => {
                      return (
                        <MenuItem value={e.cod_tipo_documento} key={k}>
                          {e.nombre}
                        </MenuItem>
                      );
                    })}
                  </Select>
                  {errors.tipo_documento?.type === 'required' ? (
                    <FormHelperText color={''}>Campo Requerido</FormHelperText>
                  ) : (
                    ''
                  )}
                </>
              )}
            </FormControl>
          </Grid>
          {tipo_persona === 'J' && (
            <>
              <Grid item xs={12} container justifyContent="center">
                <Grid item>
                  <FormGroup>
                    <FormControlLabel
                      label="¿Requiere nombre comercial?"
                      control={
                        <Checkbox {...register('require_nombre_comercial')} />
                      }
                    />
                  </FormGroup>
                </Grid>
              </Grid>
            </>
          )}
          {tipo_persona !== '' ? (
            <>
              {is_search ? (
                <Grid item xs={12}>
                  <Grid container justifyContent="center" textAlign="center">
                    <Alert icon={false} severity="info">
                      <CircularProgress />
                      <Typography>Buscando persona...</Typography>
                    </Alert>
                  </Grid>
                </Grid>
              ) : (
                ''
              )}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Número de documento"
                  type="number"
                  inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                  error={errors.numero_documento?.type === 'required'}
                  helperText={
                    errors.numero_documento?.type === 'required'
                      ? 'Este campo es obligatorio'
                      : ''
                  }
                  {...register('numero_documento', {
                    required: true,
                  })}
                />
              </Grid>
              {requiere_nombre_comercial ? (
                <>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Dígito de verificación"
                      error={errors.digito_verificacion?.type === 'required'}
                      helperText={
                        errors.digito_verificacion?.type === 'required'
                          ? 'Este campo es obligatorio'
                          : ''
                      }
                      {...register('digito_verificacion', { required: true })}
                      onChange={handle_change}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      error={errors.nombre_comercial?.type === 'required'}
                      helperText={
                        errors.nombre_comercial?.type === 'required'
                          ? 'Este campo es obligatorio'
                          : ''
                      }
                      label="Nombre comercial"
                      {...register('nombre_comercial', {
                        required: true,
                      })}
                      onChange={handle_change}
                    />
                  </Grid>
                </>
              ) : (
                ''
              )}

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Primer nombre"
                  error={errors.primer_nombre?.type === 'required'}
                  value={data_register.primer_nombre}
                  helperText={
                    errors.primer_nombre?.type === 'required'
                      ? 'Este campo es obligatorio'
                      : ''
                  }
                  {...register('primer_nombre', { required: true })}
                  onChange={handle_change}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Segundo nombre"
                  value={data_register.segundo_nombre}
                  {...register('segundo_nombre')}
                  onChange={handle_change}
                />
                {}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Primer apellido"
                  value={data_register.primer_apellido}
                  error={errors.primer_apellido?.type === 'required'}
                  helperText={
                    errors.primer_apellido?.type === 'required'
                      ? 'Este campo es obligatorio'
                      : ''
                  }
                  {...register('primer_apellido', {
                    required: true,
                  })}
                  onChange={handle_change}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  value={data_register.segundo_apellido}
                  label="Segundo apellido"
                  {...register('segundo_apellido')}
                  onChange={handle_change}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Fecha de nacimiento"
                    value={fecha_nacimiento}
                    onChange={(newValue) => {
                      set_fecha_nacimiento(newValue);
                    }}
                    renderInput={(params) => (
                      <TextField
                        fullWidth
                        {...params}
                        {...register('fecha_nacimiento', {
                          required: true,
                        })}
                        onChange={handle_change}
                        error={errors.fecha_nacimiento?.type === 'required'}
                        helperText={
                          errors.fecha_nacimiento?.type === 'required'
                            ? 'Este campo es obligatorio'
                            : ''
                        }
                      />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Datos de notificación
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="E-mail"
                  error={errors.email?.type === 'required' || error_email}
                  type="email"
                  value={data_register.email}
                  helperText={
                    errors.email?.type === 'required'
                      ? 'Este campo es obligatorio'
                      : error_email
                      ? 'Los emails no coinciden'
                      : ''
                  }
                  {...register('email', {
                    required: true,
                  })}
                  onChange={handle_change}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Confirme su e-mail"
                  error={
                    errors.confirmar_email?.type === 'required' || error_email
                  }
                  type="email"
                  value={data_register.confirmar_email}
                  helperText={
                    errors.confirmar_email?.type === 'required'
                      ? 'Este campo es obligatorio'
                      : error_email
                      ? 'Los emails no coinciden'
                      : ''
                  }
                  {...register('confirmar_email', {
                    required: true,
                  })}
                  onChange={handle_change}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Celular"
                  value={data_register.telefono_celular}
                  error={errors.telefono_celular?.type === 'required'}
                  helperText={
                    errors.telefono_celular?.type === 'required'
                      ? 'Este campo es obligatorio'
                      : ''
                  }
                  {...register('telefono_celular', {
                    required: true,
                  })}
                  onChange={handle_change}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Confirme su celular"
                  error={errors.confirmar_celular?.type === 'required'}
                  helperText={
                    errors.confirmar_celular?.type === 'required'
                      ? 'Este campo es obligatorio'
                      : ''
                  }
                  {...register('confirmar_celular', {
                    required: true,
                  })}
                  onChange={handle_change}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Datos de la cuenta
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Nombre de usuario"
                  error={errors.nombre_de_usuario?.type === 'required'}
                  helperText={
                    errors.nombre_de_usuario?.type === 'required'
                      ? 'Este campo es obligatorio'
                      : ''
                  }
                  {...register('nombre_de_usuario', {
                    required: true,
                  })}
                  onChange={handle_change}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Contraseña"
                  {...register('password', {
                    required: true,
                  })}
                  onChange={handle_change}
                  error={errors.password?.type === 'required' || error_password}
                  helperText={
                    errors.password?.type === 'required'
                      ? 'Este campo es obligatorio'
                      : error_password
                      ? 'Las contraseñas no coinciden'
                      : ''
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Repita la contraseña"
                  error={
                    errors.confirmar_password?.type === 'required' ||
                    error_password
                  }
                  helperText={
                    errors.confirmar_password?.type === 'required'
                      ? 'Este campo es obligatorio'
                      : error_password
                      ? 'Las contraseñas no coinciden'
                      : ''
                  }
                  {...register('confirmar_password', {
                    required: true,
                  })}
                  onChange={handle_change}
                />
              </Grid>
              <Grid item justifyContent="center" container>
                <Grid item xs={12} sm={8} md={4}>
                  <LoadingButton
                    type="submit"
                    variant="contained"
                    fullWidth
                    color="success"
                    style={{ fontSize: '.9rem' }}
                    loading={is_saving}
                    disabled={is_saving}
                  >
                    Registrarse
                  </LoadingButton>
                </Grid>
              </Grid>
              <Grid item justifyContent="center" container>
                <Button
                  fullWidth
                  sx={{ textTransform: 'none', textAlign: 'center' }}
                  href="/auth/login"
                >
                  <Typography sx={{ color: 'black' }}>
                    Iniciar sesión
                  </Typography>
                </Button>
              </Grid>
            </>
          ) : (
            <></>
          )}
        </Grid>
      </form>
    </>
  );
};
