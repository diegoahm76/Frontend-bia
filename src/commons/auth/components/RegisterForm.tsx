import { useEffect } from 'react';
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
  OutlinedInput,
  InputAdornment,
  IconButton,
} from '@mui/material';

import { LoadingButton } from '@mui/lab';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { use_register } from '../hooks/registerHooks';
import { useForm } from 'react-hook-form';
import { type IPerson } from '../interfaces';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
// import { crear_persona_natural } from '../request/authRequest';

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
    handleSubmit,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    setValue,
    formState: { errors },
    watch,
  } = useForm<IPerson>({
    defaultValues: {
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
      confirmar_email: '',
      telefono_celular: '',
      confirmar_celular: '',
      ubicacion_georeferenciada: '',
      razon_social: '',
      telefono_celular_empresa: '',
      direccion_notificaciones: '',
      representante_legal: '',
      cod_municipio_notificacion_nal: '',
      nombre_de_usuario: '',
      password: '',
      confirmar_password: '',
      require_nombre_comercial: false,
      telefono_empresa_2: '',
      sexo: '',
      estado_civil: '',
      pais_nacimiento: '',
      email_empresarial: '',
      telefono_fijo_residencial: '',
      pais_residencia: '',
      municipio_residencia: '',
      direccion_residencia: '',
      direccion_laboral: '',
      direccion_residencia_ref: '',
      cod_municipio_laboral_nal: '',
      acepta_notificacion_sms: false,
      acepta_notificacion_email: false,
      acepta_tratamiento_datos: false,
    },
  });
  const {
    error_email,
    tipo_documento_opt,
    tipo_persona_opt,
    loading,
    tipo_documento,
    tipo_persona,
    pais_nacimiento,
    show_password,
    data_register,
    is_search,
    fecha_nacimiento,
    error_password,
    message_error_password,
    is_saving,
    is_exists,
    error_phone,
    has_user,
    paises_options,
    genero,
    genero_opt,
    departamentos_opt,
    departamento_expedicion,
    ciudades_opt,
    ciudad_expedicion,
    estado_civil,
    estado_civil_opt,
    set_estado_civil,
    set_genero,
    set_ciudad_expedicion,
    set_departamento,
    set_pais_nacimiento,
    set_error_error_phone,
    set_fecha_nacimiento,
    set_data_register,
    set_error_email,
    handle_click_show_password,
    set_tipo_persona,
    set_tipo_documento,
    validate_password,
    set_message_error_password,
    set_error_password,
    validate_exits,
    set_is_saving,
  } = use_register();
  // watchers
  const requiere_nombre_comercial: boolean = watch('require_nombre_comercial');
  const email = watch('email');
  const confirmar_email = watch('confirmar_email');
  const numero_documento = watch('numero_documento');
  const password = watch('password');
  const confirmar_password = watch('confirmar_password');
  const telefono_celular = watch('telefono_celular');
  const confirmar_celular = watch('confirmar_celular');
  // Consultamos si el usuario existe
  useEffect(() => {
    if (numero_documento !== undefined && numero_documento !== '') {
      void validate_exits(numero_documento);
    }
  }, [numero_documento]);

  useEffect(() => {
    if (watch('departamento_expedicion') !== undefined) {
      set_departamento(watch('departamento_expedicion'));
    }
  }, [watch('departamento_expedicion')]);

  useEffect(() => {
    if (watch('ciudad_expedicion') !== undefined) {
      set_ciudad_expedicion(watch('ciudad_expedicion'));
    }
  }, [watch('ciudad_expedicion')]);

  useEffect(() => {
    if (watch('tipo_persona') !== undefined) {
      set_tipo_persona(watch('tipo_persona'));
    }
  }, [watch('tipo_persona')]);

  useEffect(() => {
    if (watch('pais_nacimiento') !== undefined) {
      set_pais_nacimiento(watch('pais_nacimiento'));
    }
  }, [watch('pais_nacimiento')]);

  useEffect(() => {
    if (watch('sexo') !== undefined) {
      set_genero(watch('sexo'));
    }
  }, [watch('sexo')]);

  useEffect(() => {
    if (watch('estado_civil') !== undefined) {
      set_estado_civil(watch('estado_civil'));
    }
  }, [watch('estado_civil')]);

  useEffect(() => {
    if (tipo_persona === 'J') {
      setValue('tipo_documento', 'NT');
      set_tipo_documento('NT');
    }
  }, [tipo_persona]);

  useEffect(() => {
    if (watch('tipo_documento') !== undefined) {
      set_tipo_documento(watch('tipo_documento'));
    }
  }, [watch('tipo_documento')]);

  useEffect(() => {
    if (email !== confirmar_email) {
      set_error_email(true);
      return;
    }
    set_error_email(false);
  }, [email, confirmar_email]);

  useEffect(() => {
    if (telefono_celular !== confirmar_celular) {
      set_error_error_phone(true);
      return;
    }
    set_error_error_phone(false);
  }, [telefono_celular, confirmar_celular]);

  useEffect(() => {
    if (password !== confirmar_password) {
      set_message_error_password('Las contraseñas no son iguales');
      set_error_password(true);
      return;
    }
    if (password !== undefined && password !== '') {
      if (!validate_password(password)) {
        set_error_password(true);
        set_message_error_password(
          'La contraseña no cumple con el formato requerido'
        );
        return;
      }
    }
    set_error_password(false);
  }, [password, confirmar_password]);

  // Cambio inputs
  const handle_change = (e: React.ChangeEvent<HTMLInputElement>): void => {
    set_data_register({
      ...data_register,
      [e.target.name]: e.target.value,
    });
    const name = e.target.name as keys_object;
    setValue(name, e.target.value);
  };

  const on_submit = handleSubmit(async (data) => {
    set_is_saving(true);
    try {
      console.log(data);
      // if (data.tipo_persona === 'N') {
      //   const response = await crear_persona_natural(data_register);
      //   console.log(response);
      // } else {
      //   // await clienteAxios.get(
      //   //   `personas/get-personas-naturales-by-document/${createPersonaModel.tipo_documento}/${createPersonaModel.numero_documento}/`
      //   // );
      //   // try {
      //   // } catch (error) {
      //   //   // ERROR AL CREAR PERSONAS NATURAlES
      //   //   console.error(error);
      //   //   // Swal.fire({
      //   //   //   title:
      //   //   //     'No existe un representante legal registrado con el documento ingresado',
      //   //   //   text: '¿Quiere crear una persona natural?',
      //   //   //   icon: 'info',
      //   //   //   showCancelButton: true,
      //   //   //   confirmButtonColor: '#3BA9E0',
      //   //   //   cancelButtonColor: '#6c757d',
      //   //   //   confirmButtonText: 'Si',
      //   //   //   cancelButtonText: 'No',
      //   //   // }).then((result) => {
      //   //   //   if (result.isConfirmed) {
      //   //   //     handleChangeTypePerson({ label: 'Natural', value: 'N' });
      //   //   //     setFormValues({
      //   //   //       ...formValues,
      //   //   //       tipo_persona: { label: 'Natural', value: 'N' },
      //   //   //     });
      //   //   //   }
      //   //   // });
      //   //   set_is_saving(false);
      //   //   return error as AxiosError;
      //   // }
      //   // try {
      //   //   await clienteAxios.post('personas/persona-juridica/create/', persona);
      //   //   // Swal.fire({
      //   //   //   title: 'Registrado como persona juridica',
      //   //   //   text: '¿Desea registrarse como usuario?',
      //   //   //   icon: 'success',
      //   //   //   showCancelButton: true,
      //   //   //   confirmButtonColor: '#3BA9E0',
      //   //   //   cancelButtonColor: '#6c757d',
      //   //   //   confirmButtonText: 'Si',
      //   //   //   cancelButtonText: 'No',
      //   //   // }).then((result) => {
      //   //   //   if (result.isConfirmed) {
      //   //   //     navigate('/registeruser');
      //   //   //   } else {
      //   //   //     resetValues();
      //   //   //   }
      //   //   // });
      //   // } catch (err: any) {
      //   //   if (
      //   //     err.response?.data?.email &&
      //   //     err.response?.data?.numero_documento
      //   //   ) {
      //   //     // Swal.fire({
      //   //     //   title: 'Este documento y correo ya estan relacionados',
      //   //     //   text: '¿Desea registrarse como usuario?',
      //   //     //   icon: 'warning',
      //   //     //   showCancelButton: true,
      //   //     //   confirmButtonColor: '#3BA9E0',
      //   //     //   cancelButtonColor: '#6c757d',
      //   //     //   confirmButtonText: 'Si',
      //   //     //   cancelButtonText: 'No',
      //   //     // }).then((result) => {
      //   //     //   if (result.isConfirmed) {
      //   //     //     navigate('/registeruser');
      //   //     //   }
      //   //     // });
      //   //   } else if (err.response?.data?.non_field_errors) {
      //   //     // Swal.fire({
      //   //     //   title: 'Este documento ya esta relacionado',
      //   //     //   text: '¿Desea registrarse como usuario?',
      //   //     //   icon: 'warning',
      //   //     //   showCancelButton: true,
      //   //     //   confirmButtonColor: '#3BA9E0',
      //   //     //   cancelButtonColor: '#6c757d',
      //   //     //   confirmButtonText: 'Si',
      //   //     //   cancelButtonText: 'No',
      //   //     // }).then((result) => {
      //   //     //   if (result.isConfirmed) {
      //   //     //     navigate('/registeruser');
      //   //     //   }
      //   //     // });
      //   //   } else if (err.response?.data?.numero_documento) {
      //   //     // Swal.fire({
      //   //     //   title: 'Este documento ya existe',
      //   //     //   text: '¿Desea registrarse como usuario?',
      //   //     //   icon: 'warning',
      //   //     //   showCancelButton: true,
      //   //     //   confirmButtonColor: '#3BA9E0',
      //   //     //   cancelButtonColor: '#6c757d',
      //   //     //   confirmButtonText: 'Si',
      //   //     //   cancelButtonText: 'No',
      //   //     // }).then((result) => {
      //   //     //   if (result.isConfirmed) {
      //   //     //     navigate('/registeruser');
      //   //     //   }
      //   //     // });
      //   //   } else if (err.response?.data?.email) {
      //   //     // Swal.fire({
      //   //     //   title: 'Este correo electronico ya existe',
      //   //     //   text: 'Verifica tus datos',
      //   //     //   icon: 'info',
      //   //     //   confirmButtonColor: '#3BA9E0',
      //   //     //   cancelButtonColor: '#6c757d',
      //   //     //   confirmButtonText: 'Aceptar',
      //   //     // });
      //   //   } else {
      //   //     console.log(err);
      //   //   }
      //   // }
      // }

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
          <Grid item xs={12} sm={6} md={4}>
            <FormControl
              fullWidth
              size="small"
              error={errors.tipo_persona?.type === 'required'}
            >
              {loading ? (
                <Skeleton variant="rectangular" width="100%" height={45} />
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
                  {errors.tipo_persona?.type === 'required' && (
                    <FormHelperText>Campo Requerido</FormHelperText>
                  )}
                </>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FormControl
              fullWidth
              size="small"
              error={errors.tipo_documento?.type === 'required'}
              disabled={(tipo_persona === 'J' || tipo_persona === '') ?? true}
            >
              {loading ? (
                <Skeleton variant="rectangular" width="100%" height={45} />
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
                    {tipo_documento_opt
                      .filter(({ cod_tipo_documento }) =>
                        tipo_persona === 'N'
                          ? cod_tipo_documento !== 'NT'
                          : cod_tipo_documento === 'NT'
                      )
                      .map((e, k: number) => {
                        return (
                          <MenuItem value={e.cod_tipo_documento} key={k}>
                            {e.nombre}
                          </MenuItem>
                        );
                      })}
                  </Select>
                  {errors.tipo_documento?.type === 'required' && (
                    <FormHelperText color={''}>Campo Requerido</FormHelperText>
                  )}
                </>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            {loading ? (
              <Skeleton variant="rectangular" width="100%" height={45} />
            ) : (
              <TextField
                fullWidth
                label="Número de documento"
                type="number"
                size="small"
                disabled={tipo_persona === '' ?? true}
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
            )}
          </Grid>
          {/* Muestra loading cuando esta buscando datos de la persona */}
          {is_search && (
            <Grid item xs={12}>
              <Grid container justifyContent="center" textAlign="center">
                <Alert icon={false} severity="info">
                  <CircularProgress />
                  <Typography>Buscando persona...</Typography>
                </Alert>
              </Grid>
            </Grid>
          )}
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
          {tipo_persona !== '' && !has_user && (
            <>
              {requiere_nombre_comercial && (
                <>
                  <Grid item xs={12} sm={6} md={4}>
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
                  <Grid item xs={12} sm={6} md={4}>
                    <TextField
                      fullWidth
                      size="small"
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
              )}
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  disabled={is_exists}
                  fullWidth
                  size="small"
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
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  disabled={is_exists}
                  fullWidth
                  size="small"
                  label="Segundo nombre"
                  value={data_register.segundo_nombre}
                  {...register('segundo_nombre')}
                  onChange={handle_change}
                />
                {}
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  disabled={is_exists}
                  fullWidth
                  size="small"
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
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  disabled={is_exists}
                  fullWidth
                  size="small"
                  value={data_register.segundo_apellido}
                  label="Segundo apellido"
                  {...register('segundo_apellido')}
                  onChange={handle_change}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    disabled={is_exists}
                    label="Fecha de nacimiento"
                    value={fecha_nacimiento}
                    onChange={(newValue) => {
                      set_fecha_nacimiento(newValue);
                    }}
                    renderInput={(params) => (
                      <TextField
                        fullWidth
                        size="small"
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
              <Grid item xs={12} sm={6} md={4}>
                <FormControl
                  fullWidth
                  size="small"
                  error={errors.pais_nacimiento?.type === 'required'}
                >
                  {loading ? (
                    <Skeleton variant="rectangular" width="100%" height={45} />
                  ) : (
                    <>
                      <InputLabel id="label_pais_nacimiento">
                        País de nacimiento
                      </InputLabel>
                      <Select
                        labelId="label_pais_nacimiento"
                        label="País de nacimiento"
                        fullWidth
                        value={pais_nacimiento}
                        {...register('pais_nacimiento', {
                          required: true,
                        })}
                      >
                        <MenuItem value="">
                          <em>Seleccionar opción</em>
                        </MenuItem>
                        {paises_options.map((e, k: number) => {
                          return (
                            <MenuItem value={e.cod_pais} key={k}>
                              {e.nombre}
                            </MenuItem>
                          );
                        })}
                      </Select>
                      {errors.pais_nacimiento?.type === 'required' && (
                        <FormHelperText>Campo Requerido</FormHelperText>
                      )}
                    </>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <FormControl
                  fullWidth
                  size="small"
                  error={errors.sexo?.type === 'required'}
                >
                  {loading ? (
                    <Skeleton variant="rectangular" width="100%" height={45} />
                  ) : (
                    <>
                      <InputLabel id="label_genero">Género</InputLabel>
                      <Select
                        labelId="label_genero"
                        label="Género"
                        fullWidth
                        value={genero}
                        {...register('sexo', {
                          required: true,
                        })}
                      >
                        <MenuItem value="">
                          <em>Seleccionar opción</em>
                        </MenuItem>
                        {genero_opt.map((e, k: number) => {
                          return (
                            <MenuItem value={e.value} key={k}>
                              {e.label}
                            </MenuItem>
                          );
                        })}
                      </Select>
                      {errors.sexo?.type === 'required' && (
                        <FormHelperText>Campo Requerido</FormHelperText>
                      )}
                    </>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <FormControl
                  fullWidth
                  size="small"
                  error={errors.estado_civil?.type === 'required'}
                >
                  {loading ? (
                    <Skeleton variant="rectangular" width="100%" height={45} />
                  ) : (
                    <>
                      <InputLabel id="label_civil">Estado civil</InputLabel>
                      <Select
                        labelId="label_civil"
                        label="Estado civil"
                        fullWidth
                        value={estado_civil}
                        {...register('estado_civil', {
                          required: true,
                        })}
                      >
                        <MenuItem value="">
                          <em>Seleccionar opción</em>
                        </MenuItem>
                        {estado_civil_opt.map((e, k: number) => {
                          return (
                            <MenuItem value={e.value} key={k}>
                              {e.label}
                            </MenuItem>
                          );
                        })}
                      </Select>
                      {errors.estado_civil?.type === 'required' && (
                        <FormHelperText>Campo Requerido</FormHelperText>
                      )}
                    </>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Lugar de expedición del documento
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <FormControl
                  fullWidth
                  size="small"
                  error={errors.departamento_expedicion?.type === 'required'}
                  disabled={pais_nacimiento === '' ?? true}
                >
                  {loading ? (
                    <Skeleton variant="rectangular" width="100%" height={45} />
                  ) : (
                    <>
                      <InputLabel id="label_departamento">
                        Departamento
                      </InputLabel>
                      <Select
                        labelId="label_departamento"
                        label="Departamento"
                        fullWidth
                        value={departamento_expedicion}
                        {...register('departamento_expedicion', {
                          required: true,
                        })}
                      >
                        <MenuItem value="">
                          <em>Seleccionar opción</em>
                        </MenuItem>
                        {departamentos_opt.map((e, k: number) => {
                          return (
                            <MenuItem value={e.cod_departamento} key={k}>
                              {e.nombre}
                            </MenuItem>
                          );
                        })}
                      </Select>
                      {errors.departamento_expedicion?.type === 'required' && (
                        <FormHelperText>Campo Requerido</FormHelperText>
                      )}
                    </>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <FormControl
                  fullWidth
                  size="small"
                  error={errors.ciudad_expedicion?.type === 'required'}
                  disabled={departamento_expedicion === '' ?? true}
                >
                  {loading ? (
                    <Skeleton variant="rectangular" width="100%" height={45} />
                  ) : (
                    <>
                      <InputLabel id="label_ciudad">Ciudad</InputLabel>
                      <Select
                        labelId="label_ciudad"
                        label="Ciudad"
                        fullWidth
                        value={ciudad_expedicion}
                        {...register('ciudad_expedicion', {
                          required: true,
                        })}
                      >
                        <MenuItem value="">
                          <em>Seleccionar opción</em>
                        </MenuItem>
                        {ciudades_opt.map((e, k: number) => {
                          return (
                            <MenuItem value={e.cod_municipio} key={k}>
                              {e.nombre}
                            </MenuItem>
                          );
                        })}
                      </Select>
                      {errors.ciudad_expedicion?.type === 'required' && (
                        <FormHelperText>Campo Requerido</FormHelperText>
                      )}
                    </>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Datos de notificación
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  disabled={is_exists}
                  fullWidth
                  size="small"
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
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  disabled={is_exists}
                  fullWidth
                  size="small"
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
              <Grid item xs={12}>
                <Typography variant="caption" fontWeight="bold">
                  NOTA: Se recomienda el registro de un número celular, este se
                  usará como medio de recuperación de la cuenta, en caso de que
                  olvide sus datos de acceso.
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  disabled={is_exists}
                  fullWidth
                  size="small"
                  label="Celular"
                  onCopy={(e: any) => e.preventDefault()}
                  value={data_register.telefono_celular}
                  error={error_phone}
                  helperText={
                    error_phone ? 'Los número de celular no son iguales' : ''
                  }
                  {...register('telefono_celular')}
                  onChange={handle_change}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  disabled={is_exists}
                  fullWidth
                  size="small"
                  label="Confirme su celular"
                  onCopy={(e: any) => e.preventDefault()}
                  error={error_phone}
                  helperText={
                    error_phone ? 'Los número de celular no son iguales' : ''
                  }
                  {...register('confirmar_celular')}
                  onChange={handle_change}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Datos de la cuenta
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12}>
                <Typography>
                  La contraseña debe cumplir con las siguientes reglas
                </Typography>
                <ul>
                  <li>Debe contener mínimo 6 caracteres</li>
                  <li>Debe contener 1 Caracter en Mayúscula</li>
                  <li>Debe contener 1 Caracter numérico</li>
                  <li>Debe contener 1 Caracter simbólico (*,-,_,%...)</li>
                </ul>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth
                  size="small"
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
              <Grid item xs={12} sm={6} md={4}>
                <FormControl
                  size="small"
                  fullWidth
                  onCopy={(e: any) => e.preventDefault()}
                  error={errors.password?.type === 'required' || error_password}
                >
                  <InputLabel htmlFor="password">Contraseña *</InputLabel>
                  <OutlinedInput
                    required
                    id="password"
                    type={show_password ? 'text' : 'password'}
                    error={errors.password?.type === 'required'}
                    {...register('password', {
                      required: true,
                    })}
                    onChange={handle_change}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handle_click_show_password}
                          edge="end"
                        >
                          {show_password ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Contraseña"
                  />
                  {errors.password?.type === 'required' ? (
                    <FormHelperText>Este campo es obligatorio</FormHelperText>
                  ) : error_password ? (
                    <FormHelperText>{message_error_password}</FormHelperText>
                  ) : (
                    ''
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <FormControl
                  size="small"
                  fullWidth
                  onCopy={(e: any) => e.preventDefault()}
                  error={
                    errors.confirmar_password?.type === 'required' ||
                    error_password
                  }
                >
                  <InputLabel htmlFor="repita-password">
                    Repita la contraseña *
                  </InputLabel>
                  <OutlinedInput
                    required
                    id="repita-password"
                    type={show_password ? 'text' : 'password'}
                    error={errors.confirmar_password?.type === 'required'}
                    {...register('confirmar_password', {
                      required: true,
                    })}
                    onChange={handle_change}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handle_click_show_password}
                          edge="end"
                        >
                          {show_password ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Repita la contraseña"
                  />
                  {errors.confirmar_password?.type === 'required' ? (
                    <FormHelperText>Este campo es obligatorio</FormHelperText>
                  ) : error_password ? (
                    <FormHelperText>{message_error_password}</FormHelperText>
                  ) : (
                    ''
                  )}
                </FormControl>
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
            </>
          )}
          {is_exists && data_register.email === '' && (
            <>
              <Grid item sx={{ pt: '10px !important' }}>
                <Alert severity="error">
                  Lo sentimos, debe acercarse a <b>Cormacarena</b> para
                  actualizar sus datos debido a que no tiene un correo
                  electrónico asociado
                </Alert>
              </Grid>
            </>
          )}
          {has_user && (
            <>
              <Grid item sx={{ pt: '10px !important' }}>
                <Alert severity="error">
                  Lo sentimos, usted ya tiene usuario, por ende no puede
                  registrarse, si desea actualizar sus datos, debe iniciar
                  sesión, si ha olvidado los datos de acceso puede elegir la
                  opción, recuperar contraseña
                </Alert>
              </Grid>
            </>
          )}
          <Grid item justifyContent="center" container>
            <Grid item xs={12} sm={6} md={4}>
              <Button
                fullWidth
                sx={{ textTransform: 'none', textAlign: 'center' }}
                href="#/auth/login"
              >
                <Typography sx={{ color: 'black' }}>Iniciar sesión</Typography>
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </>
  );
};
