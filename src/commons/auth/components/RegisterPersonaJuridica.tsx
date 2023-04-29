import { useEffect, useState } from 'react';
import {
  FormControl,
  Grid,
  InputLabel,
  TextField,
  FormGroup,
  FormControlLabel,
  Checkbox,
  FormHelperText,
  Alert,
  Typography,
  Button,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  type SelectChangeEvent,
  LinearProgress,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { use_register } from '../hooks/registerHooks';
import { useForm } from 'react-hook-form';
import { DialogGeneradorDeDirecciones } from '../../../components/DialogGeneradorDeDirecciones';
import { control_error } from '../../../helpers/controlError';
import { control_success } from '../../recursoHidrico/requets/Request';
import dayjs, { type Dayjs } from 'dayjs';
import type { keys_object, DataRegistePortal, UserCreate } from '../interfaces';
import type { AxiosError } from 'axios';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import { validate_password } from '../../../helpers/ValidateFormatPassword';
import { crear_persona_juridica_and_user } from '../request/authRequest';
import { CustomSelect } from '../../../components/CustomSelect';

interface PropsStep {
  label: string;
  component: JSX.Element;
}

interface Props {
  numero_documento: string;
  tipo_documento: string;
  tipo_persona: string;
  has_user: boolean;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const RegisterPersonaJuridica: React.FC<Props> = ({
  numero_documento,
  tipo_documento,
  tipo_persona,
  has_user,
}: Props) => {
  const {
    register,
    handleSubmit: handle_submit,
    setValue: set_value,
    formState: { errors },
    watch,
  } = useForm<DataRegistePortal>();
  const {
    error_email,
    error_password,
    error_phone,
    is_exists,
    is_saving,
    paises_options,
    is_search,
    loading,
    message_error_password,
    show_password,
    nacionalidad_emp,
    tipo_documento_opt,
    tipo_documento_rep,
    naturaleza_emp,
    naturaleza_emp_opt,
    dpto_notifiacion_opt,
    dpto_notifiacion,
    ciudad_notificacion_opt,
    message_no_person,
    nombre_representante,
    fecha_rep_legal,
    documento_rep,
    set_documento_rep,
    set_nacionalidad_emp,
    set_naturaleza_emp,
    set_fecha_rep_legal,
    validate_exits_representante,
    set_dpto_notifiacion,
    handle_click_show_password,
    set_ciudad_expedicion,
    set_ciudad_residencia,
    set_departamento,
    set_dpto_residencia,
    set_error_email,
    set_error_error_phone,
    set_error_password,
    set_estado_civil,
    set_genero,
    set_is_saving,
    set_message_error_password,
    set_pais_nacimiento,
    set_pais_residencia,
    set_tipo_persona,
    set_tipo_documento_rep,
    set_message_no_person,
  } = use_register();
  const [is_modal_active, open_modal] = useState(false);
  const [direccion_notificacion, set_direccion_notificacion] = useState('');
  const [type_direction, set_type_direction] = useState('');
  const [active_step, set_active_step] = useState(0);
  const [error_doc, set_error_doc] = useState('');

  // watchers
  const email = watch('email');
  const confirmar_email = watch('confirmar_email');
  const numero_documento_rep = watch('numero_documento_rep');
  const password = watch('password');
  const confirmar_password = watch('confirmar_password');
  const telefono_celular = watch('telefono_celular');
  const confirmar_celular = watch('confirmar_celular');
  const ciudad_notificacion = watch('cod_municipio_notificacion_nal');

  // Consultamos si el usuario existe

  useEffect(() => {
    set_error_doc('');
    set_message_no_person('');
    if (
      numero_documento_rep !== undefined &&
      numero_documento_rep !== '' &&
      numero_documento_rep !== numero_documento &&
      numero_documento_rep !== '1'
    ) {
      void validate_exits_representante(numero_documento_rep);
    } else if (numero_documento_rep === numero_documento) {
      set_error_doc(
        ' El documento del representante legal no puede ser igual al de la empresa a registrar'
      );
    } else if (numero_documento_rep === '1') {
      set_error_doc('El documento no puede ser 1');
    }
  }, [numero_documento_rep]);

  useEffect(() => {
    if (watch('departamento_expedicion') !== undefined) {
      set_departamento(watch('departamento_expedicion'));
    }
  }, [watch('departamento_expedicion')]);

  useEffect(() => {
    if (watch('cod_municipio_expedicion_id') !== undefined) {
      set_ciudad_expedicion(watch('cod_municipio_expedicion_id'));
    }
  }, [watch('cod_municipio_expedicion_id')]);

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

  // Representante legal
  useEffect(() => {
    if (watch('tipo_documento_rep') !== undefined) {
      set_tipo_documento_rep(watch('tipo_documento_rep'));
    }
  }, [watch('tipo_documento_rep')]);

  // Datos de notificación
  useEffect(() => {
    if (watch('dpto_notifiacion') !== undefined) {
      set_dpto_notifiacion(watch('dpto_notifiacion'));
    }
  }, [watch('dpto_notifiacion')]);

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
    if (watch('cod_naturaleza_empresa') !== undefined) {
      set_naturaleza_emp(watch('cod_naturaleza_empresa'));
    }
  }, [watch('cod_naturaleza_empresa')]);

  useEffect(() => {
    if (watch('cod_pais_nacionalidad_empresa') !== undefined) {
      set_nacionalidad_emp(watch('cod_pais_nacionalidad_empresa'));
    }
  }, [watch('cod_pais_nacionalidad_empresa')]);

  useEffect(() => {
    if (watch('numero_documento_rep') !== undefined) {
      set_documento_rep(watch('numero_documento_rep'));
    }
  }, [watch('numero_documento_rep')]);

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

  useEffect(() => {
    set_value_form('tipo_documento', tipo_documento);
  }, [tipo_documento]);

  useEffect(() => {
    set_value_form('tipo_persona', tipo_persona);
  }, [tipo_persona]);

  const set_value_direction = (value: string, type: string): void => {
    // direccion_laboral
    // direccion_notificaciones
    // direccion_residencia_ref
    // direccion_residencia
    switch (type_direction) {
      case 'residencia':
        // set_direccion(value);
        set_value_form('direccion_residencia', value);

        break;
      case 'notificacion':
        set_direccion_notificacion(value);
        set_value_form('direccion_notificaciones', value);

        break;
    }
    open_modal(false);
  };

  // Establece los valores del formulario
  const set_value_form = (name: string, value: string): void => {
    set_value(name as keys_object, value);
  };

  // establece la fecha de nacimiento
  const on_change_fecha_rep = (value: Dayjs | null): void => {
    if (value !== null) {
      const date = dayjs(value).format('YYYY-MM-DD');
      set_value('fecha_inicio_cargo_rep_legal', date);
      set_value_form('fecha_inicio_cargo_rep_legal', date);
      set_fecha_rep_legal(value);
    }
  };

  // Se usa para escuchar los cambios de valor del componente CustomSelect
  const on_change = (e: SelectChangeEvent<string>): void => {
    set_value_form(e.target.name, e.target.value);
  };

  const on_change_checkbox = (e: React.ChangeEvent<HTMLInputElement>): void => {
    set_value(e.target.name as keys_object, e.target.checked);
  };

  // Cambio inputs
  const handle_change = (e: React.ChangeEvent<HTMLInputElement>): void => {
    set_value_form(e.target.name, e.target.value);
  };

  const on_submit = handle_submit(async (data) => {
    if (active_step === 4) {
      set_is_saving(true);
      try {
        // Hacemos el registro de la persona JURIDICA
        await crear_persona_juridica_and_user(data);

        control_success('Registro exitoso');
        window.location.href = '#/app/auth/login';
      } catch (error) {
        const temp_error = error as AxiosError;
        const resp = temp_error.response?.data as UserCreate;
        control_error(resp.detail);
      } finally {
        set_is_saving(false);
      }
    }
  });

  const handle_next = (): void => {
    console.log(errors);
    if (active_step !== 4) {
      set_active_step((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handle_back = (): void => {
    set_active_step((prevActiveStep) => prevActiveStep - 1);
  };

  // eslint-disable-next-line @typescript-eslint/naming-convention
  const DatosNotificacion = (
    <>
      <Grid item xs={12} sm={6} md={4}>
        <CustomSelect
          onChange={on_change}
          label="País de notificación"
          name="pais_notificacion"
          value={'CO'}
          options={paises_options}
          loading={loading}
          disabled={false}
          required={true}
          errors={errors}
          register={register}
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
          required={true}
          errors={errors}
          register={register}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <CustomSelect
          label="Ciudad"
          name="cod_municipio_notificacion_nal"
          value={ciudad_notificacion}
          options={ciudad_notificacion_opt}
          loading={loading}
          disabled={dpto_notifiacion === '' ?? true}
          required={true}
          errors={errors}
          register={register}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <TextField
          fullWidth
          size="small"
          label="Dirección"
          disabled
          error={errors.direccion_notificaciones?.type === 'required'}
          helperText={
            errors.direccion_notificaciones?.type === 'required'
              ? 'Este campo es obligatorio'
              : ''
          }
          {...register('direccion_notificaciones', {
            required: true,
          })}
          value={direccion_notificacion}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Button
          variant="contained"
          onClick={() => {
            open_modal(true);
            set_type_direction('notificacion');
          }}
        >
          Generar dirección
        </Button>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <TextField
          fullWidth
          size="small"
          label="Complemento dirección"
          {...register('complemeto_direccion')}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <TextField
          fullWidth
          size="small"
          label="E-mail"
          error={errors.email?.type === 'required' || error_email}
          type="email"
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
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <TextField
          fullWidth
          size="small"
          label="Confirme su e-mail"
          error={errors.confirmar_email?.type === 'required' || error_email}
          type="email"
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
          fullWidth
          size="small"
          label="Celular"
          onCopy={(e: any) => e.preventDefault()}
          error={error_phone}
          helperText={error_phone ? 'Los número de celular no son iguales' : ''}
          {...register('telefono_celular')}
          onChange={handle_change}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <TextField
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
                onChange={on_change_checkbox}
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
              <Checkbox
                size="small"
                {...register('acepta_notificacion_sms')}
                onChange={on_change_checkbox}
              />
            }
          />
        </FormGroup>
      </Grid>
    </>
  );

  // eslint-disable-next-line @typescript-eslint/naming-convention
  const DatosRepresentanteLegal = (
    <>
      <Grid item xs={12} sm={6} md={4}>
        <CustomSelect
          onChange={on_change}
          label="Tipo de documento"
          name="tipo_documento_rep"
          value={tipo_documento_rep}
          options={tipo_documento_opt}
          loading={loading}
          disabled={false}
          required={true}
          errors={errors}
          register={register}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <TextField
          fullWidth
          size="small"
          label="Número de documento"
          error={
            errors.numero_documento_rep?.type === 'required' || error_doc !== ''
          }
          disabled={tipo_documento_rep === ''}
          helperText={
            errors.numero_documento_rep?.type === 'required'
              ? 'Este campo es obligatorio'
              : error_doc !== ''
              ? error_doc
              : ''
          }
          {...register('numero_documento_rep', {
            required: true,
          })}
          value={documento_rep}
          onChange={handle_change}
        />
      </Grid>
      {/* Muestra loading cuando esta buscando datos de la persona */}
      {is_search && (
        <Grid item xs={12}>
          <Grid container justifyContent="center" textAlign="center">
            <Alert icon={false} severity="info">
              <LinearProgress />
              <Typography>Buscando representante legal...</Typography>
            </Alert>
          </Grid>
        </Grid>
      )}
      {message_no_person !== '' && (
        <Grid item xs={12}>
          <Grid container justifyContent="center" textAlign="center">
            <Alert icon={false} severity="error">
              <Typography>{message_no_person}</Typography>
            </Alert>
          </Grid>
        </Grid>
      )}
      <Grid item xs={12} sm={6} md={4}>
        <TextField
          fullWidth
          disabled
          size="small"
          label="Nombre representante legal"
          value={nombre_representante}
        />
      </Grid>
      {/* <Grid item xs={12} sm={6} md={4}>
        <TextField
          fullWidth
          disabled
          size="small"
          label="Teléfono móvil"
          error={errors.celular_rep?.type === 'required'}
          helperText={
            errors.celular_rep?.type === 'required'
              ? 'Este campo es obligatorio'
              : ''
          }
          {...register('celular_rep', {
            required: true,
          })}
          onChange={handle_change}
        />
      </Grid> */}
      {/* <Grid item xs={12} sm={6} md={4}>
        <TextField
          fullWidth
          disabled
          size="small"
          label="Dirección"
          error={errors.direccion_rep?.type === 'required'}
          helperText={
            errors.direccion_rep?.type === 'required'
              ? 'Este campo es obligatorio'
              : ''
          }
          {...register('direccion_rep', {
            required: true,
          })}
          onChange={handle_change}
        />
      </Grid> */}
      {/* <Grid item xs={12} sm={6} md={4}>
        <TextField
          fullWidth
          disabled
          size="small"
          label="Ciudad"
          error={errors.ciudad_rep?.type === 'required'}
          helperText={
            errors.ciudad_rep?.type === 'required'
              ? 'Este campo es obligatorio'
              : ''
          }
          {...register('ciudad_rep', {
            required: true,
          })}
          onChange={handle_change}
        />
      </Grid> */}
      {/* <Grid item xs={12} sm={6} md={4}>
        <TextField
          fullWidth
          disabled
          size="small"
          label="Correo electrónico"
          error={errors.email_rep?.type === 'required'}
          helperText={
            errors.email_rep?.type === 'required'
              ? 'Este campo es obligatorio'
              : ''
          }
          {...register('email_rep', {
            required: true,
          })}
          onChange={handle_change}
        />
      </Grid> */}
      <Grid item xs={12} sm={6} md={5}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Fecha de inicio como representante legal"
            value={fecha_rep_legal}
            onChange={on_change_fecha_rep}
            renderInput={(params) => (
              <TextField
                fullWidth
                size="small"
                {...params}
                {...register('fecha_inicio_cargo_rep_legal', {
                  required: true,
                })}
                onChange={handle_change}
                error={errors.fecha_inicio_cargo_rep_legal?.type === 'required'}
                helperText={
                  errors.fecha_inicio_cargo_rep_legal?.type === 'required'
                    ? 'Este campo es obligatorio'
                    : ''
                }
              />
            )}
          />
        </LocalizationProvider>
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
          <li>Debe contener mínimo 8 caracteres</li>
          <li>Debe contener 1 caracter en mayúscula</li>
          <li>Debe contener 1 caracter numérico</li>
          <li>Debe contener 1 caracter simbólico (*,-,_,%...)</li>
        </ul>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <TextField
          fullWidth
          size="small"
          label="Nombre de usuario *"
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
        <TextField
          fullWidth
          size="small"
          label="Dígito de verificación *"
          error={errors.digito_verificacion?.type === 'required'}
          helperText={
            errors.digito_verificacion?.type === 'required'
              ? 'Este campo es obligatorio'
              : ''
          }
          {...register('digito_verificacion', {
            required: true,
          })}
          onChange={handle_change}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <TextField
          fullWidth
          size="small"
          label="Nombre comercial *"
          error={errors.nombre_comercial?.type === 'required'}
          helperText={
            errors.nombre_comercial?.type === 'required'
              ? 'Este campo es obligatorio'
              : ''
          }
          {...register('nombre_comercial', {
            required: true,
          })}
          onChange={handle_change}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <TextField
          fullWidth
          size="small"
          label="Razón social"
          error={errors.razon_social?.type === 'required'}
          helperText={
            errors.razon_social?.type === 'required'
              ? 'Este campo es obligatorio'
              : ''
          }
          {...register('razon_social', { required: true })}
          onChange={handle_change}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <CustomSelect
          onChange={on_change}
          label="Naturaleza de la empresa *"
          name="cod_naturaleza_empresa"
          value={naturaleza_emp}
          options={naturaleza_emp_opt}
          loading={loading}
          disabled={false}
          required={true}
          errors={errors}
          register={register}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <CustomSelect
          onChange={on_change}
          label="Nacionalidad empresa *"
          name="cod_pais_nacionalidad_empresa"
          value={nacionalidad_emp}
          options={paises_options}
          loading={loading}
          disabled={false}
          required={true}
          errors={errors}
          register={register}
        />
      </Grid>
    </>
  );

  const steps: PropsStep[] = [
    {
      label: 'Datos básicos',
      component: DatosPersonales,
    },
    {
      label: 'Datos de notificación',
      component: DatosNotificacion,
    },
    {
      label: 'Datos del representante legal',
      component: DatosRepresentanteLegal,
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
        <Stepper activeStep={active_step} orientation="vertical">
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel>{step.label}</StepLabel>
              <StepContent>
                <Grid container spacing={2} mt={0.1}>
                  {step.component}
                  {/* Alertas */}
                  {is_exists && email === '' && (
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
                        <Typography sx={{ color: 'black' }}>Salir</Typography>
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
      </form>
      <DialogGeneradorDeDirecciones
        open={is_modal_active}
        openDialog={open_modal}
        onChange={set_value_direction}
        type={type_direction}
      />
    </>
  );
};
