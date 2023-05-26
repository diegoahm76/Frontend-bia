import { useState } from 'react';
import {
  FormControl,
  Grid,
  InputLabel,
  TextField,
  FormControlLabel,
  Checkbox,
  FormHelperText,
  Typography,
  Button,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Divider,
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
import { use_register_persona_n } from '../../hooks/registerPersonaNaturalHook';
import type { PropsElement } from '../../interfaces';

// eslint-disable-next-line @typescript-eslint/naming-convention
const DatosBasicos: (props: PropsElement) => JSX.Element = ({
  errors,
  watch,
  setValue: set_value,
  getValues,
  register,
}: PropsElement) => {
  const {
    loading,
    paises_options,
    departamentos_opt,
    ciudades_opt,
    genero_opt,
    estado_civil_opt,
    pais_nacimiento,
    genero,
    estado_civil,
    departamento_expedicion,
    ciudad_expedicion,
    on_change,
  } = use_register_persona_n({ watch, setValue: set_value, getValues });

  const [fecha_nacimiento, set_fecha_nacimiento] = useState<Dayjs | null>(null);

  // establece la fecha de nacimiento
  const on_change_birt_day = (value: Dayjs | null): void => {
    const date = dayjs(value).format('YYYY-MM-DD');
    set_value('fecha_nacimiento', date);
    set_fecha_nacimiento(value);
  };

  return (
    <>
      <Grid container spacing={2} mt={0.1}>
        {/* Datos personales */}
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            fullWidth
            size="small"
            label="Primer nombre *"
            error={errors.primer_nombre?.type === 'required'}
            helperText={
              errors.primer_nombre?.type === 'required'
                ? 'Este campo es obligatorio'
                : ''
            }
            {...register('primer_nombre', { required: true })}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            fullWidth
            size="small"
            label="Segundo nombre"
            {...register('segundo_nombre')}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            fullWidth
            size="small"
            label="Primer apellido *"
            error={errors.primer_apellido?.type === 'required'}
            helperText={
              errors.primer_apellido?.type === 'required'
                ? 'Este campo es obligatorio'
                : ''
            }
            {...register('primer_apellido', {
              required: true,
            })}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            fullWidth
            size="small"
            label="Segundo apellido"
            {...register('segundo_apellido')}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Fecha de nacimiento *"
              value={fecha_nacimiento}
              onChange={on_change_birt_day}
              renderInput={(params) => (
                <TextField
                  fullWidth
                  size="small"
                  {...params}
                  {...register('fecha_nacimiento', {
                    required: true,
                  })}
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
            label="País de nacimiento *"
            name="pais_nacimiento"
            value={pais_nacimiento}
            options={paises_options}
            disabled={false}
            required={true}
            errors={errors}
            register={register}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <CustomSelect
            onChange={on_change}
            label="Género *"
            name="sexo"
            value={genero}
            options={genero_opt}
            disabled={false}
            required={true}
            errors={errors}
            register={register}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <CustomSelect
            onChange={on_change}
            label="Estado civil *"
            name="estado_civil"
            value={estado_civil}
            options={estado_civil_opt}
            disabled={false}
            required={true}
            errors={errors}
            register={register}
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
            label="Departamento *"
            name="departamento_expedicion"
            value={departamento_expedicion}
            options={departamentos_opt}
            disabled={false}
            required={true}
            errors={errors}
            register={register}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <CustomSelect
            onChange={on_change}
            label="Ciudad *"
            name="cod_municipio_expedicion_id"
            value={ciudad_expedicion}
            options={ciudades_opt}
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
const DatosResidencia: (props: PropsElement) => JSX.Element = ({
  errors,
  watch,
  setValue: set_value,
  getValues,
  register,
  handleBack,
  typeDirection,
}: PropsElement) => {
  const {
    loading,
    paises_options,
    dpts_residencia_opt,
    ciudades_residencia_opt,
    municipio_residencia,
    pais_residencia,
    departamento_residencia,
    on_change,
  } = use_register_persona_n({ watch, setValue: set_value, getValues });
  const direccion = watch('direccion_residencia') ?? '';
  const generate_direction = (): void => {
    if (typeDirection !== undefined) {
      typeDirection('residencia');
    }
  };
  return (
    <>
      <Grid container spacing={2} mt={0.1}>
        <Grid item xs={12} sm={6} md={4}>
          <CustomSelect
            onChange={on_change}
            label="País de residencia *"
            name="pais_residencia"
            value={pais_residencia}
            options={paises_options}
            required={true}
            errors={errors}
            register={register}
          />
        </Grid>
        {pais_residencia === 'CO' && (
          <>
            <Grid item xs={12} sm={6} md={4}>
              <CustomSelect
                onChange={on_change}
                label="Departamento *"
                name="departamento_residencia"
                value={departamento_residencia}
                options={dpts_residencia_opt}
                required={true}
                errors={errors}
                register={register}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <CustomSelect
                onChange={on_change}
                label="Ciudad *"
                name="municipio_residencia"
                value={municipio_residencia}
                options={ciudades_residencia_opt}
                disabled={departamento_residencia === '' ?? true}
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
                error={errors.direccion_residencia?.type === 'required'}
                helperText={
                  errors.direccion_residencia?.type === 'required'
                    ? 'Este campo es obligatorio'
                    : ''
                }
                {...register('direccion_residencia', {
                  required: true,
                })}
                value={direccion}
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
                {...register('direccion_residencia_ref')}
              />
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
const DatosNotifiacion: (props: PropsElement) => JSX.Element = ({
  errors,
  watch,
  setValue: set_value,
  getValues,
  register,
  handleBack,
  typeDirection,
}: PropsElement) => {
  const {
    loading,
    paises_options,
    dpto_notifiacion_opt,
    ciudad_notificacion_opt,
    error_email,
    error_phone,
    dpto_notifiacion,
    ciudad_notificacion,
    on_change,
  } = use_register_persona_n({ watch, setValue: set_value, getValues });

  const misma_direccion = watch('misma_direccion') ?? false;
  const direccion_notificaciones = watch('direccion_notificaciones') ?? '';

  const generate_direction = (): void => {
    if (typeDirection !== undefined) {
      typeDirection('notificacion');
    }
  };
  return (
    <>
      <Grid container spacing={2} mt={0.1}>
        <Grid item xs={12}>
          <FormControlLabel
            label="¿Desea usar la dirección de residencia como dirección de notificación?"
            control={
              <Checkbox
                size="small"
                checked={misma_direccion}
                {...register('misma_direccion')}
              />
            }
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <CustomSelect
            onChange={on_change}
            label="País de notificación *"
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
const DatosOpcionales: (props: PropsElement) => JSX.Element = ({
  errors,
  watch,
  setValue: set_value,
  getValues,
  register,
  handleBack,
  typeDirection,
}: PropsElement) => {
  const {
    loading,
    paises_options,
    departamento_laboral,
    municipio_laboral,
    dpto_laboral_opt,
    departamento_laboral_opt,
    on_change,
  } = use_register_persona_n({ watch, setValue: set_value, getValues });

  const direccion_laboral = watch('direccion_laboral');

  const generate_direction = (): void => {
    if (typeDirection !== undefined) {
      typeDirection('laboral');
    }
  };
  return (
    <>
      <Grid container spacing={2} mt={0.1}>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            fullWidth
            size="small"
            label="Nombre comercial"
            {...register('nombre_comercial')}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            fullWidth
            size="small"
            label="Teléfono fijo personal"
            {...register('telefono_fijo_residencial')}
          />
        </Grid>
        {/* Dirección laboral */}
        <Grid item xs={12}>
          <Typography variant="subtitle1" fontWeight="bold">
            Dirección laboral nacional
          </Typography>
          <Divider />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <CustomSelect
            onChange={on_change}
            label="País"
            name="pais_laboral"
            value={'CO'}
            options={paises_options}
            required={false}
            disabled={true}
            errors={errors}
            register={register}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <CustomSelect
            onChange={on_change}
            label="Departamento"
            name="departamento_laboral"
            value={departamento_laboral}
            options={dpto_laboral_opt}
            required={false}
            errors={errors}
            register={register}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <CustomSelect
            onChange={on_change}
            label="Ciudad"
            name="cod_municipio_laboral_nal"
            value={municipio_laboral}
            options={departamento_laboral_opt}
            disabled={departamento_laboral === '' ?? true}
            required={false}
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
            {...register('direccion_laboral')}
            value={direccion_laboral}
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
            {...register('direccion_laboral_ref')}
          />
        </Grid>

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
const AutorizaNotifiacion: (props: PropsElement) => JSX.Element = ({
  errors,
  watch,
  register,
  handleBack,
}: PropsElement) => {
  // watchers
  const acepta_notificacion_email = watch('acepta_notificacion_email') ?? false;
  const acepta_notificacion_sms = watch('acepta_notificacion_sms') ?? false;
  const acepta_tratamiento_datos = watch('acepta_tratamiento_datos') ?? false;

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
        <Grid item xs={12}>
          <FormControl
            required
            error={errors.acepta_tratamiento_datos?.type === 'required'}
            component="fieldset"
            variant="standard"
          >
            <FormControlLabel
              control={
                <Checkbox
                  {...register('acepta_tratamiento_datos', {
                    required: true,
                  })}
                  checked={acepta_tratamiento_datos}
                />
              }
              label="¿Autoriza tratamiento de datos? *"
            />
            {errors.acepta_tratamiento_datos?.type === 'required' && (
              <FormHelperText>
                Debe autorizar el tratamiento de datos
              </FormHelperText>
            )}
          </FormControl>
        </Grid>

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
  errors,
  watch,
  setValue: set_value,
  getValues,
  register,
  handleBack,
  isSaving: is_saving,
}: PropsElement) => {
  const {
    show_password,
    error_password,
    message_error_password,
    handle_click_show_password,
  } = use_register_persona_n({ watch, setValue: set_value, getValues });

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
export const RegisterPersonaNatural: React.FC<PropsRegister> = ({
  register,
  handleSubmit: handle_submit,
  setValue: set_value,
  errors,
  isValid: is_valid,
  watch,
  getValues,
}: PropsRegister) => {
  const { is_modal_active, on_submit, set_value_direction, open_modal } =
    use_register_persona_n({ watch, setValue: set_value, getValues });

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
          <Step>
            <StepLabel>Datos básicos</StepLabel>
            <StepContent>
              <DatosBasicos
                errors={errors}
                getValues={getValues}
                register={register}
                setValue={set_value}
                watch={watch}
              />
            </StepContent>
          </Step>
          {/* Datos de residencia */}
          <Step>
            <StepLabel>Datos de residencia</StepLabel>
            <StepContent>
              <DatosResidencia
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
          {/* Datos de notificación */}
          <Step>
            <StepLabel>Datos de notificación</StepLabel>
            <StepContent>
              <DatosNotifiacion
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
                typeDirection={on_direction}
              />
            </StepContent>
          </Step>
          {/* Autorización de notificación y tratamiento de datos */}
          <Step>
            <StepLabel>
              Autorización de notificación y tratamiento de datos
            </StepLabel>
            <StepContent>
              <AutorizaNotifiacion
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
            <StepLabel>Datos de acceso</StepLabel>
            <StepContent>
              <DatosAcceso
                errors={errors}
                getValues={getValues}
                register={register}
                setValue={set_value}
                watch={watch}
                handleBack={handle_back}
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
