import { useState, useEffect } from 'react';
import {
  FormControl,
  Grid,
  InputLabel,
  TextField,
  FormControlLabel,
  Checkbox,
  FormHelperText,
  // Alert,
  Typography,
  Button,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Stepper,
  Step,
  StepLabel,
  StepContent,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { CustomSelect } from '../../../../components/CustomSelect';
import { DialogGeneradorDeDirecciones } from '../../../../components/DialogGeneradorDeDirecciones';
import dayjs, { type Dayjs } from 'dayjs';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import type { PropsRegister } from '../../../../interfaces/globalModels';
import { use_register_persona_j } from '../../hooks/registerPersonaJuridicaHook';
import type { PropsElement } from '../../interfaces';

// eslint-disable-next-line @typescript-eslint/naming-convention
const DatosEmpresariales: (props: PropsElement) => JSX.Element = ({
  register,
  errors,
  getValues,
  setValue: set_value,
  watch,
}: PropsElement) => {
  const {
    is_saving,
    paises_options,
    naturaleza_empresa_opt,
    nacionalidad_empresa,
    naturaleza_empresa,
    on_change,
  } = use_register_persona_j({ watch, setValue: set_value, getValues });
  return (
    <>
      <Grid container spacing={2} mt={0.1}>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            fullWidth
            size="small"
            label="Dígito de verificación *"
            type="number"
            error={errors.digito_verificacion?.type === 'required'}
            helperText={
              errors.digito_verificacion?.type === 'required'
                ? 'Este campo es obligatorio'
                : ''
            }
            {...register('digito_verificacion', { required: true })}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            fullWidth
            size="small"
            label="Razón social *"
            error={errors.razon_social?.type === 'required'}
            helperText={
              errors.razon_social?.type === 'required'
                ? 'Este campo es obligatorio'
                : ''
            }
            {...register('razon_social', { required: true })}
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
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <CustomSelect
            onChange={on_change}
            label="Naturaleza empresa *"
            name="cod_naturaleza_empresa"
            value={naturaleza_empresa}
            options={naturaleza_empresa_opt}
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
            value={nacionalidad_empresa}
            options={paises_options}
            disabled={false}
            required={true}
            errors={errors}
            register={register}
          />
        </Grid>
        {/* BOTONES */}
        <Grid item spacing={2} justifyContent="end" container>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              sx={{
                textAlign: 'center',
                color: '#ffff',
              }}
              href="#/auth/login"
            >
              <Typography sx={{ color: 'white' }}>Inicio</Typography>
            </Button>
          </Grid>
          <Grid item>
            <LoadingButton
              type="submit"
              variant="contained"
              fullWidth
              color="primary"
              loading={is_saving}
              disabled={is_saving}
            >
              Continuar
            </LoadingButton>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

// eslint-disable-next-line @typescript-eslint/naming-convention
const DatosNotificacionNacional: (props: PropsElement) => JSX.Element = ({
  register,
  errors,
  getValues,
  setValue: set_value,
  watch,
  handleBack,
  typeDirection,
}: PropsElement) => {
  const {
    paises_options,
    dpto_notifiacion_opt,
    ciudad_notificacion_opt,
    error_email,
    error_phone,
    dpto_notifiacion,
    ciudad_notificacion,
    on_change,
  } = use_register_persona_j({ watch, setValue: set_value, getValues });

  const direccion_notificaciones = watch('direccion_notificaciones') ?? '';

  const generate_direction = (): void => {
    if (typeDirection !== undefined) {
      typeDirection('notificacion');
    }
  };

  return (
    <>
      <Grid container spacing={2} mt={0.1}>
        <Grid item xs={12} sm={6} md={4}>
          <CustomSelect
            onChange={on_change}
            label="País *"
            name="pais_notificacion"
            value={'CO'}
            options={paises_options}
            disabled={true}
            required={false}
            errors={errors}
            register={register}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <CustomSelect
            onChange={on_change}
            label="Departamento *"
            name="dpto_notifiacion"
            value={dpto_notifiacion}
            options={dpto_notifiacion_opt}
            required={true}
            errors={errors}
            register={register}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <CustomSelect
            onChange={on_change}
            label="Ciudad *"
            name="cod_municipio_notificacion_nal"
            value={ciudad_notificacion}
            options={ciudad_notificacion_opt}
            disabled={dpto_notifiacion === '' ?? true}
            required={true}
            errors={errors}
            register={register}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            size="small"
            label="Direccion *"
            disabled
            fullWidth
            value={direccion_notificaciones}
            error={errors.direccion_notificaciones?.type === 'required'}
            helperText={
              errors.direccion_notificaciones?.type === 'required'
                ? 'Este campo es obligatorio'
                : ''
            }
            {...register('direccion_notificaciones', {
              required: true,
            })}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Button variant="contained" onClick={generate_direction}>
            Generar dirección
          </Button>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            size="small"
            type="textarea"
            rows="3"
            label="Complemento dirección"
            {...register('complemento_direccion')}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            fullWidth
            size="small"
            label="E-mail *"
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
            label="Confirme su e-mail *"
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
            helperText={
              error_phone ? 'Los número de celular no son iguales' : ''
            }
            {...register('telefono_celular')}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            fullWidth
            size="small"
            label="Confirme su celular"
            onCopy={(e: any) => e.preventDefault()}
            error={error_phone}
            helperText={
              error_phone ? 'Los número de celular no son iguales' : ''
            }
            {...register('confirmar_celular')}
          />
        </Grid>
        {/* BOTONES */}
        <Grid item spacing={2} justifyContent="end" container>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              sx={{
                textAlign: 'center',
                color: '#ffff',
              }}
              href="#/auth/login"
            >
              <Typography sx={{ color: 'white' }}>Inicio</Typography>
            </Button>
          </Grid>
          <Grid item>
            <Button variant="outlined" color="error" onClick={handleBack}>
              Volver
            </Button>
          </Grid>
          <Grid item>
            <LoadingButton
              type="submit"
              variant="contained"
              fullWidth
              color="primary"
            >
              Continuar
            </LoadingButton>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

// eslint-disable-next-line @typescript-eslint/naming-convention
const DatosRepresentante: (props: PropsElement) => JSX.Element = ({
  register,
  errors,
  getValues,
  setValue: set_value,
  watch,
  handleBack,
}: PropsElement) => {
  const {
    tipo_documento_opt,
    tipo_documento_representante,
    documento_representante,
    is_search,
    nombre_presentante,
    validate_exits_representante,
    on_change,
  } = use_register_persona_j({ watch, setValue: set_value, getValues });

  const [fecha_inicio_cargo_rep_legal, set_fecha_nacimiento] =
    useState<Dayjs | null>(null);

  // establece la fecha de nacimiento
  const on_change_birt_day = (value: Dayjs | null): void => {
    const date = dayjs(value).format('YYYY-MM-DD');
    set_value('fecha_inicio_cargo_rep_legal', date);
    set_fecha_nacimiento(value);
  };

  const search_representante = (): void => {
    void validate_exits_representante(getValues());
  };

  return (
    <>
      <Grid container spacing={2} mt={0.1}>
        <Grid item xs={12} sm={6} md={4}>
          <CustomSelect
            onChange={on_change}
            label="Tipo documento *"
            name="tipo_documento_representante"
            value={tipo_documento_representante}
            options={tipo_documento_opt}
            disabled={false}
            required={true}
            errors={errors}
            register={register}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            size="small"
            label="Número de documento"
            disabled={tipo_documento_representante === ''}
            fullWidth
            error={errors.documento_representante?.type === 'required'}
            helperText={
              errors.documento_representante?.type === 'required'
                ? 'Este campo es obligatorio'
                : ''
            }
            {...register('documento_representante')}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <LoadingButton
            variant="contained"
            fullWidth
            color="primary"
            type="submit"
            loading={is_search}
            disabled={is_search || documento_representante === ''}
            onClick={() => {
              //  console.log('')('click');
              search_representante();
            }}
          >
            Buscar
          </LoadingButton>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            size="small"
            label="Nombre del representante legal"
            disabled
            fullWidth
            value={nombre_presentante}
            {...register('nombre_representante_legal')}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Fecha de inicio como representante legal *"
              value={fecha_inicio_cargo_rep_legal}
              onChange={on_change_birt_day}
              renderInput={(params) => (
                <TextField
                  fullWidth
                  size="small"
                  {...params}
                  {...register('fecha_inicio_cargo_rep_legal', {
                    required: true,
                  })}
                  error={
                    errors.fecha_inicio_cargo_rep_legal?.type === 'required'
                  }
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
        {/* BOTONES */}
        <Grid item spacing={2} justifyContent="end" container>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              sx={{
                textAlign: 'center',
                color: '#ffff',
              }}
              href="#/auth/login"
            >
              <Typography sx={{ color: 'white' }}>Inicio</Typography>
            </Button>
          </Grid>
          <Grid item>
            <Button variant="outlined" color="error" onClick={handleBack}>
              Volver
            </Button>
          </Grid>
          <Grid item>
            <LoadingButton
              type="submit"
              variant="contained"
              fullWidth
              color="primary"
            >
              Continuar
            </LoadingButton>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
// eslint-disable-next-line @typescript-eslint/naming-convention
const AutorizaNotificacion: (props: PropsElement) => JSX.Element = ({
  register,
  handleBack,
  watch,
}: PropsElement) => {
  // watchers
  const acepta_notificacion_email = watch('acepta_notificacion_email') ?? false;
  const acepta_notificacion_sms = watch('acepta_notificacion_sms') ?? false;

  return (
    <>
      <Grid container spacing={2} mt={0.1}>
        <Grid item xs={12}>
          <FormControlLabel
            label="¿Autoriza notificaciones judiciales por correo electrónico?"
            control={
              <Checkbox
                size="small"
                checked={acepta_notificacion_email}
                {...register('acepta_notificacion_email')}
              />
            }
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            label="¿Autoriza notificaciones informativas a través de mensajes de texto?"
            control={
              <Checkbox
                size="small"
                checked={acepta_notificacion_sms}
                {...register('acepta_notificacion_sms')}
              />
            }
          />
        </Grid>

        {/* BOTONES */}
        <Grid item spacing={2} justifyContent="end" container>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              sx={{
                textAlign: 'center',
                color: '#ffff',
              }}
              href="#/auth/login"
            >
              <Typography sx={{ color: 'white' }}>Volver</Typography>
            </Button>
          </Grid>
          
          <Grid item>
            <LoadingButton
              type="submit"
              variant="contained"
              fullWidth
              color="primary"
            >
              Continuar
            </LoadingButton>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

// eslint-disable-next-line @typescript-eslint/naming-convention
const DatosOpcionales: (props: PropsElement) => JSX.Element = ({
  register,
  handleBack,
}: PropsElement) => {
  return (
    <>
      <Grid container spacing={2} mt={0.1}>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            fullWidth
            size="small"
            label="Teléfono fijo de la empresa"
            {...register('telefono_empresa')}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            fullWidth
            size="small"
            label="Teléfono móvil complementario"
            {...register('telefono_empresa_2')}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            fullWidth
            size="small"
            label="Correo electrónico complementario"
            {...register('email_empresarial')}
          />
        </Grid>

        {/* BOTONES */}
        <Grid item spacing={2} justifyContent="end" container>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              sx={{
                textAlign: 'center',
                color: '#ffff',
              }}
              href="#/auth/login"
            >
              <Typography sx={{ color: 'white' }}>Inicio</Typography>
            </Button>
          </Grid>
          <Grid item>
            <Button variant="outlined" color="error" onClick={handleBack}>
              Volver
            </Button>
          </Grid>
          <Grid item>
            <LoadingButton
              type="submit"
              variant="contained"
              fullWidth
              color="primary"
            >
              Continuar
            </LoadingButton>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

// eslint-disable-next-line @typescript-eslint/naming-convention
const DatosAcceso: (props: PropsElement) => JSX.Element = ({
  register,
  handleBack,
  watch,
  getValues,
  setValue: set_value,
  errors,
  isSaving: is_saving,
}: PropsElement) => {
  const {
    show_password,
    error_password,
    message_error_password,
    handle_click_show_password,
  } = use_register_persona_j({ watch, setValue: set_value, getValues });
  useEffect(() => {
    //  console.log('')(is_saving);
  }, [is_saving]);
  return (
    <>
      <Grid container spacing={2} mt={0.1}>
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
              <FormHelperText>{}</FormHelperText>
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

        {/* BOTONES */}
        <Grid item spacing={2} justifyContent="end" container>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              sx={{
                textAlign: 'center',
                color: '#ffff',
              }}
              href="#/auth/login"
            >
              <Typography sx={{ color: 'white' }}>Inicio</Typography>
            </Button>
          </Grid>
          <Grid item>
            <Button variant="outlined" color="error" onClick={handleBack}>
              Volver
            </Button>
          </Grid>
          <Grid item>
            <LoadingButton
              type="submit"
              variant="contained"
              fullWidth
              color="success"
              loading={is_saving}
              disabled={is_saving}
            >
              Guardar
            </LoadingButton>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export const RegisterPersonaJuridica: React.FC<PropsRegister> = ({
  register,
  handleSubmit: handle_submit,
  setValue: set_value,
  errors,
  isValid: is_valid,
  watch,
  getValues,
}: PropsRegister) => {
  const {
    is_saving,
    is_modal_active,
    on_submit,
    set_value_direction,
    open_modal,
  } = use_register_persona_j({ watch, setValue: set_value, getValues });

  const [type_direction, set_type_direction] = useState('');
  const [active_step, set_active_step] = useState(0);

  const send_data = handle_submit((e) => {
    if (active_step === 5 && is_valid) {
      void on_submit(e);
    } else {
      handle_next();
    }
  });

  // Paso siguiente del stepper
  const handle_next = (): void => {
    if (active_step !== 5) {
      set_active_step((prevActiveStep) => prevActiveStep + 1);
    }
  };

  // Paso anterior del stepper
  const handle_back = (): void => {
    set_active_step((prevActiveStep) => prevActiveStep - 1);
  };

  const on_direction = (type: string): void => {
    set_type_direction(type);
    open_modal(true);
  };

  return (
    <>
      <form
        onSubmit={(e) => {
          void send_data(e);
        }}
      >
        <Stepper activeStep={active_step} orientation="vertical">
          {/* Datos empresariales */}
          <Step>
            <StepLabel>Datos empresariales</StepLabel>
            <StepContent>
              <DatosEmpresariales
                errors={errors}
                getValues={getValues}
                register={register}
                setValue={set_value}
                watch={watch}
              />
            </StepContent>
          </Step>
          {/* Datos de notificación */}
          <Step>
            <StepLabel>Datos de notificación nacional</StepLabel>
            <StepContent>
              <DatosNotificacionNacional
                errors={errors}
                getValues={getValues}
                register={register}
                setValue={set_value}
                watch={watch}
                handleBack={handle_back}
                typeDirection={on_direction}
              />
            </StepContent>
          </Step>
          {/* Datos del representante legal */}
          <Step>
            <StepLabel>Datos del representante legal</StepLabel>
            <StepContent>
              <DatosRepresentante
                errors={errors}
                getValues={getValues}
                register={register}
                setValue={set_value}
                watch={watch}
                handleBack={handle_back}
              />
            </StepContent>
          </Step>
          {/* Datos adicionales (opcionales) */}
          <Step>
            <StepLabel>Datos adicionales (opcionales)</StepLabel>
            <StepContent>
              <DatosOpcionales
                errors={errors}
                getValues={getValues}
                register={register}
                setValue={set_value}
                watch={watch}
                handleBack={handle_back}
              />
            </StepContent>
          </Step>
          {/* Autorización de notificación y tratamiento de datos */}
          <Step>
            <StepLabel>
              Autorización de notificación y tratamiento de datos
            </StepLabel>
            <StepContent>
              <AutorizaNotificacion
                errors={errors}
                getValues={getValues}
                register={register}
                setValue={set_value}
                watch={watch}
                handleBack={handle_back}
              />
            </StepContent>
          </Step>
          {/* Datos de acceso */}
          <Step>
            <StepLabel>
              Autorización de notificación y tratamiento de datos
            </StepLabel>
            <StepContent>
              <DatosAcceso
                errors={errors}
                getValues={getValues}
                register={register}
                setValue={set_value}
                watch={watch}
                handleBack={handle_back}
                isSaving={is_saving}
              />
            </StepContent>
          </Step>
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
