import { useEffect, useState } from 'react';
import {
  FormControl,
  Grid,
  InputLabel,
  TextField,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Skeleton,
  FormHelperText,
  Alert,
  Typography,
  Button,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Divider,
  LinearProgress,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Paper,
  type SelectChangeEvent,
} from '@mui/material';

import { LoadingButton } from '@mui/lab';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { use_register } from '../hooks/registerHooks';
import { useForm } from 'react-hook-form';
import type { keys_object, IPerson } from '../interfaces';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import { crear_persona_natural_and_user } from '../request/authRequest';
import { CustomSelect } from './CustomSelect';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const RegisterForm: React.FC = () => {
  const {
    register,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    handleSubmit,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    setValue,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    formState: { errors, isValid },
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
    ciudad_expedicion,
    ciudad_residencia,
    ciudades_opt,
    data_register,
    departamento_expedicion,
    departamento_residencia,
    departamentos_opt,
    error_email,
    error_password,
    error_phone,
    estado_civil_opt,
    estado_civil,
    fecha_nacimiento,
    genero_opt,
    genero,
    has_user,
    is_exists,
    is_saving,
    is_search,
    loading,
    message_error_password,
    pais_nacimiento,
    pais_notificacion,
    pais_residencia,
    paises_options,
    show_password,
    tipo_documento_opt,
    tipo_documento,
    tipo_persona_opt,
    tipo_persona,
    dpto_notifiacion_opt,
    dpto_notifiacion,
    ciudad_notificacion_opt,
    ciudad_notificacion,
    dpts_residencia_opt,
    ciudades_residencia_opt,
    set_ciudad_notificacion,
    set_dpto_notifiacion,
    handle_click_show_password,
    set_ciudad_expedicion,
    set_ciudad_residencia,
    set_data_register,
    set_departamento,
    set_dpto_residencia,
    set_error_email,
    set_error_error_phone,
    set_error_password,
    set_estado_civil,
    set_fecha_nacimiento,
    set_genero,
    set_is_saving,
    set_message_error_password,
    set_pais_nacimiento,
    set_pais_residencia,
    set_tipo_documento,
    set_tipo_persona,
    validate_exits,
    validate_password,
    set_pais_notificacion,
  } = use_register();
  // watchers
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

  // Datos de residencia
  useEffect(() => {
    if (watch('pais_residencia') !== undefined) {
      set_pais_residencia(watch('pais_residencia'));
    }
  }, [watch('pais_residencia')]);

  useEffect(() => {
    if (watch('departamento_residencia') !== undefined) {
      set_dpto_residencia(watch('departamento_residencia'));
    }
  }, [watch('departamento_residencia')]);

  useEffect(() => {
    if (watch('municipio_residencia') !== undefined) {
      set_ciudad_residencia(watch('municipio_residencia'));
    }
  }, [watch('municipio_residencia')]);

  // Datos de notificación
  useEffect(() => {
    if (watch('pais_notificacion') !== undefined) {
      set_pais_notificacion(watch('pais_notificacion'));
    }
  }, [watch('pais_notificacion')]);

  useEffect(() => {
    if (watch('dpto_notifiacion') !== undefined) {
      set_dpto_notifiacion(watch('dpto_notifiacion'));
    }
  }, [watch('dpto_notifiacion')]);

  useEffect(() => {
    if (watch('cod_municipio_notificacion_nal') !== undefined) {
      set_ciudad_notificacion(watch('cod_municipio_notificacion_nal'));
    }
  }, [watch('cod_municipio_notificacion_nal')]);

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
      set_estado_civil(watch('estado_civil') as string);
    }
  }, [watch('estado_civil')]);

  useEffect(() => {
    if (tipo_persona === 'J') {
      setValue('tipo_documento', 'NT');
      set_tipo_documento('NT');
    } else {
      set_tipo_documento('');
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

  const set_value_form = (name: string, value: string): void => {
    set_data_register({
      ...data_register,
      [name]: value,
    });
    setValue(name as keys_object, value);
  };

  // Se usa para escuchar los cambios de valor del componente CustomSelect
  const on_change = (e: SelectChangeEvent<string>): void => {
    set_value_form(e.target.name, e.target.value);
  };

  // Cambio inputs
  const handle_change = (e: React.ChangeEvent<HTMLInputElement>): void => {
    set_value_form(e.target.name, e.target.value);
  };

  const on_submit = handleSubmit(async (data) => {
    set_is_saving(true);
    try {
      console.log(data);
      if (data.tipo_persona === 'N') {
        const response = await crear_persona_natural_and_user(data_register);
        console.log(response);
      } else {
        console.log('Creando persona juridica');
      }
    } catch (error) {
      //* Manejo de errores por datos repetidos en la DB (email y numero documento)
      console.log(error);
      set_is_saving(false);
    } finally {
      set_is_saving(false);
    }
  });

  const [active_step, set_active_step] = useState(0);

  const handle_next = (): void => {
    set_active_step((prevActiveStep) => prevActiveStep + 1);
    if (isValid) {
      console.log(isValid);
    }
  };

  const handle_back = (): void => {
    set_active_step((prevActiveStep) => prevActiveStep - 1);
  };

  const handle_reset = (): void => {
    set_active_step(0);
  };

  // eslint-disable-next-line @typescript-eslint/naming-convention
  const DatosResidencia = (
    <>
      <Grid item xs={12} sm={6} md={4}>
        <CustomSelect
          onChange={on_change}
          label="País de residencia"
          name="pais_residencia"
          value={pais_residencia}
          options={paises_options}
          loading={loading}
          required={true}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <CustomSelect
          onChange={on_change}
          label="Departamento"
          name="departamento_residencia"
          value={departamento_residencia}
          options={dpts_residencia_opt}
          loading={loading}
          disabled={pais_residencia === '' ?? true}
          required={true}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <CustomSelect
          onChange={on_change}
          label="Ciudad"
          name="municipio_residencia"
          value={ciudad_residencia}
          options={ciudades_residencia_opt}
          loading={loading}
          disabled={departamento_residencia === '' ?? true}
          required={true}
        />
      </Grid>
    </>
  );

  // eslint-disable-next-line @typescript-eslint/naming-convention
  const DatosNotificacion = (
    <>
      <Grid item xs={12} sm={6} md={4}>
        <CustomSelect
          onChange={on_change}
          label="País de notificación"
          name="pais_notificacion"
          value={pais_notificacion}
          options={paises_options}
          loading={loading}
          disabled={false}
          required={true}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <CustomSelect
          onChange={on_change}
          label="Departamento"
          name="dpto_notifiacion"
          value={dpto_notifiacion}
          options={dpto_notifiacion_opt}
          loading={loading}
          disabled={pais_notificacion === '' ?? true}
          required={true}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <CustomSelect
          onChange={on_change}
          label="Ciudad"
          name="cod_municipio_notificacion_nal"
          value={ciudad_notificacion}
          options={ciudad_notificacion_opt}
          loading={loading}
          disabled={dpto_notifiacion === '' ?? true}
          required={true}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <TextField
          disabled={is_exists}
          fullWidth
          size="small"
          label="Dirección"
          error={errors.direccion_notificaciones?.type === 'required'}
          value={data_register.direccion_notificaciones}
          helperText={
            errors.direccion_notificaciones?.type === 'required'
              ? 'Este campo es obligatorio'
              : ''
          }
          {...register('direccion_notificaciones', {
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
          label="Complemento dirección"
          error={errors.complemeto_direccion?.type === 'required'}
          value={data_register.complemeto_direccion}
          helperText={
            errors.complemeto_direccion?.type === 'required'
              ? 'Este campo es obligatorio'
              : ''
          }
          {...register('complemeto_direccion', {
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
          error={errors.confirmar_email?.type === 'required' || error_email}
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
          NOTA: Se recomienda el registro de un número celular, este se usará
          como medio de recuperación de la cuenta, en caso de que olvide sus
          datos de acceso.
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
          helperText={error_phone ? 'Los número de celular no son iguales' : ''}
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
          helperText={error_phone ? 'Los número de celular no son iguales' : ''}
          {...register('confirmar_celular')}
          onChange={handle_change}
        />
      </Grid>
    </>
  );

  // eslint-disable-next-line @typescript-eslint/naming-convention
  const AutorizacionDatos = (
    <>
      <Grid item xs={12}>
        <FormGroup>
          <FormControlLabel
            label="¿Autoriza notificaciones judiciales por correo electrónico?"
            control={
              <Checkbox
                size="small"
                {...register('acepta_notificacion_email')}
              />
            }
          />
        </FormGroup>
      </Grid>
      <Grid item xs={12}>
        <FormGroup>
          <FormControlLabel
            label="¿Autoriza notifiaciones informativas a través de mensajes de texto?"
            control={
              <Checkbox size="small" {...register('acepta_notificacion_sms')} />
            }
          />
        </FormGroup>
      </Grid>
      <Grid item xs={12}>
        <FormGroup>
          <FormControlLabel
            label="¿Atoriza tratamiento de datos?"
            control={
              <Checkbox
                size="small"
                {...register('acepta_tratamiento_datos')}
              />
            }
          />
        </FormGroup>
      </Grid>
    </>
  );

  // eslint-disable-next-line @typescript-eslint/naming-convention
  const DatosCuenta = (
    <>
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
            errors.confirmar_password?.type === 'required' || error_password
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
    </>
  );

  // eslint-disable-next-line @typescript-eslint/naming-convention
  const DatosPersonales = (
    <>
      <Grid item xs={12} sm={6} md={4}>
        <CustomSelect
          onChange={on_change}
          label="Tipo de persona *"
          name="tipo_persona"
          value={tipo_persona}
          options={tipo_persona_opt}
          loading={loading}
          disabled={false}
          required={true}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <CustomSelect
          onChange={on_change}
          label="Tipo de documento *"
          name="tipo_documento"
          value={tipo_documento}
          options={tipo_documento_opt}
          loading={loading}
          disabled={(tipo_persona === '' || tipo_persona === 'J') ?? true}
          required={true}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        {loading ? (
          <Skeleton variant="rectangular" width="100%" height={45} />
        ) : (
          <TextField
            fullWidth
            label="Número de documento *"
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
              <LinearProgress />
              <Typography>Buscando persona...</Typography>
            </Alert>
          </Grid>
        </Grid>
      )}
      {has_user ? (
        <>
          <Grid item sx={{ pt: '10px !important' }}>
            <Alert severity="error">
              Lo sentimos, usted ya tiene usuario, por ende no puede
              registrarse, si desea actualizar sus datos, debe iniciar sesión,
              si ha olvidado los datos de acceso puede elegir la opción,
              recuperar contraseña
            </Alert>
          </Grid>
        </>
      ) : (
        <>
          {/* TODO => Validar si es obligatorio o no, acorde al tipo de persona */}
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              size="small"
              label={`Dígito de verificación ${
                tipo_persona === 'J' ? '*' : ''
              }`}
              error={errors.digito_verificacion?.type === 'required'}
              helperText={
                errors.digito_verificacion?.type === 'required'
                  ? 'Este campo es obligatorio'
                  : ''
              }
              {...register('digito_verificacion', {
                required: tipo_persona === 'J',
              })}
              onChange={handle_change}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              size="small"
              label={`Nombre comercial ${tipo_persona === 'J' ? '*' : ''}`}
              error={errors.nombre_comercial?.type === 'required'}
              helperText={
                errors.nombre_comercial?.type === 'required'
                  ? 'Este campo es obligatorio'
                  : ''
              }
              {...register('nombre_comercial', {
                required: tipo_persona === 'J',
              })}
              onChange={handle_change}
            />
          </Grid>
          {/* Datos personales */}
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
            <CustomSelect
              onChange={on_change}
              label="País de nacimiento"
              name="pais_nacimiento"
              value={pais_nacimiento}
              options={paises_options}
              loading={loading}
              disabled={false}
              required={true}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <CustomSelect
              onChange={on_change}
              label="Género"
              name="sexo"
              value={genero}
              options={genero_opt}
              loading={loading}
              disabled={false}
              required={true}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <CustomSelect
              onChange={on_change}
              label="Estado civil"
              name="estado_civil"
              value={estado_civil}
              options={estado_civil_opt}
              loading={loading}
              disabled={false}
              required={true}
            />
          </Grid>
          {/* Lugar de expedición del documento */}
          <Grid item xs={12}>
            <Typography variant="subtitle1" fontWeight="bold">
              Lugar de expedición del documento
            </Typography>
            <Divider />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <CustomSelect
              onChange={on_change}
              label="Departamento"
              name="departamento_expedicion"
              value={departamento_expedicion}
              options={departamentos_opt}
              loading={loading}
              disabled={false}
              required={true}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <CustomSelect
              onChange={on_change}
              label="Ciudad"
              name="ciudad_expedicion"
              value={ciudad_expedicion}
              options={ciudades_opt}
              loading={loading}
              disabled={false}
              required={true}
            />
          </Grid>
        </>
      )}
    </>
  );

  interface PropsStep {
    label: string;
    component: JSX.Element;
  }

  const steps: PropsStep[] = [
    {
      label: 'Datos personales',
      component: DatosPersonales,
    },
    {
      label: 'Datos de residencia',
      component: DatosResidencia,
    },
    {
      label: 'Datos de notificación',
      component: DatosNotificacion,
    },
    {
      label: 'Autorización de notificación y tratamiento de datos',
      component: AutorizacionDatos,
    },
    {
      label: 'Datos de la cuenta',
      component: DatosCuenta,
    },
  ];

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
        <Stepper activeStep={active_step} orientation="vertical">
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel>{step.label}</StepLabel>
              <StepContent>
                <Grid container spacing={2} mt={0.1}>
                  {step.component}
                  {/* Alertas */}
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

                  {/* BOTONES */}
                  <Grid item spacing={2} justifyContent="end" container>
                    <Grid item>
                      <Button
                        variant="contained"
                        color="warning"
                        sx={{
                          textAlign: 'center',
                          color: '#ffff',
                        }}
                        href="#/auth/login"
                      >
                        <Typography sx={{ color: 'black' }}>
                          Iniciar sesión
                        </Typography>
                      </Button>
                    </Grid>
                    <Grid item>
                      <Button
                        disabled={index === 0}
                        variant="outlined"
                        color="error"
                        onClick={handle_back}
                      >
                        Volver
                      </Button>
                    </Grid>
                    <Grid item>
                      <LoadingButton
                        type="submit"
                        variant="contained"
                        fullWidth
                        color={
                          index === steps.length - 1 ? 'success' : 'primary'
                        }
                        loading={is_saving}
                        disabled={is_saving || has_user}
                        onClick={handle_next}
                      >
                        {index === steps.length - 1
                          ? 'Registrarse'
                          : 'Continuar'}
                      </LoadingButton>
                    </Grid>
                  </Grid>
                </Grid>
              </StepContent>
            </Step>
          ))}
        </Stepper>

        {active_step === steps.length && (
          <Paper square elevation={0} sx={{ p: 3 }}>
            <Typography>All steps completed - you&apos;re finished</Typography>
            <Button onClick={handle_reset} sx={{ mt: 1, mr: 1 }}>
              Reset
            </Button>
          </Paper>
        )}
      </form>
    </>
  );
};
