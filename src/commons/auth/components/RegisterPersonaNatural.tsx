import { useState } from 'react';
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
  Divider,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  type SelectChangeEvent,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { CustomSelect } from '../../../components/CustomSelect';
import { DialogGeneradorDeDirecciones } from '../../../components/DialogGeneradorDeDirecciones';
import dayjs, { type Dayjs } from 'dayjs';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import type { PropsRegister } from '../../../interfaces/globalModels';
import { use_register_persona_n } from '../hooks/registerPersonaNatural';
import type { keys_object } from '../interfaces';
import { validate_error } from '../../../helpers';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const RegisterPersonaNatural: React.FC<PropsRegister> = ({
  register,
  handleSubmit: handle_submit,
  setValue: set_value,
  errors,
  isValid: is_valid,
  watch,
}: PropsRegister) => {
  const {
    is_saving,
    // is_exists,
    loading,
    paises_options,
    show_password,
    departamentos_opt,
    dpto_notifiacion_opt,
    dpts_residencia_opt,
    ciudad_notificacion_opt,
    ciudades_opt,
    ciudades_residencia_opt,
    genero_opt,
    estado_civil_opt,
    error_email,
    error_phone,
    error_password,
    message_error_password,
    municipio_residencia,
    pais_nacimiento,
    genero,
    estado_civil,
    departamento_expedicion,
    ciudad_expedicion,
    pais_residencia,
    departamento_residencia,
    dpto_notifiacion,
    ciudad_notificacion,
    direccion_notificaciones,
    departamento_laboral,
    municipio_laboral,
    dpto_laboral_opt,
    departamento_laboral_opt,
    handle_click_show_password,
    on_submit,
  } = use_register_persona_n({ watch, set_value });

  const [is_modal_active, open_modal] = useState(false);
  const [direccion, set_direccion] = useState('');
  const [type_direction, set_type_direction] = useState('');
  const [active_step, set_active_step] = useState(0);
  const [fecha_nacimiento, set_fecha_nacimiento] = useState<Dayjs | null>(null);
  // watchers
  const misma_direccion = watch('misma_direccion');
  const acepta_notificacion_email = watch('acepta_notificacion_email');
  const acepta_notificacion_sms = watch('acepta_notificacion_sms');
  const acepta_tratamiento_datos = watch('acepta_tratamiento_datos');

  const set_value_direction = (value: string, type: string): void => {
    // direccion_laboral
    // direccion_notificaciones
    // direccion_residencia_ref
    // direccion_residencia
    switch (type_direction) {
      case 'residencia':
        set_direccion(value);
        set_value_form('direccion_residencia', value);

        break;
      case 'notificacion':
        set_value_form('direccion_notificaciones', value);
        break;
      case 'laboral':
        set_value_form('direccion_laboral', value);
        break;
    }
    open_modal(false);
  };

  // establece la fecha de nacimiento
  const on_change_birt_day = (value: Dayjs | null): void => {
    const date = dayjs(value).format('YYYY-MM-DD');
    set_value('fecha_nacimiento', date);
    set_fecha_nacimiento(value);
  };

  const send_data = handle_submit((e) => {
    if (active_step === 5 && is_valid) {
      void on_submit(e);
    }
  });

  const validate_step = async (): Promise<void> => {
    let key_validate: string[] = [];
    switch (active_step) {
      case 0:
        key_validate = [
          'primer_nombre',
          'primer_apellido',
          'fecha_nacimiento',
          'pais_nacimiento',
          'sexo',
          'estado_civil',
          'departamento_expedicion',
          'cod_municipio_expedicion_id',
        ];
        break;
      case 1:
        key_validate = [
          'pais_residencia',
          'departamento_residencia',
          'municipio_residencia',
          'direccion_residencia',
        ];
        break;
      case 2:
        key_validate = [
          'pais_notificacion',
          'dpto_notifiacion',
          'cod_municipio_notificacion_nal',
          'direccion_notificaciones',
          'complemento_direccion',
          'email',
          'confirmar_email',
        ];
        break;
      case 4:
        key_validate = ['acepta_tratamiento_datos'];
        break;
      case 5:
        key_validate = ['nombre_de_usuario', 'password', 'confirmar_password'];
        break;
    }
    await validate_error(errors, key_validate);
    handle_next();
  };

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

  // Establece los valores del formulario
  const set_value_form = (name: string, value: string): void => {
    set_value(name as keys_object, value);
  };

  // Se usa para escuchar los cambios de valor del componente CustomSelect
  const on_change = (e: SelectChangeEvent<string>): void => {
    set_value_form(e.target.name, e.target.value);
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
                    label="Género *"
                    name="sexo"
                    value={genero}
                    options={genero_opt}
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
                    label="Estado civil *"
                    name="estado_civil"
                    value={estado_civil}
                    options={estado_civil_opt}
                    loading={loading}
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
                    label="Ciudad *"
                    name="cod_municipio_expedicion_id"
                    value={ciudad_expedicion}
                    options={ciudades_opt}
                    loading={loading}
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
                      loading={is_saving}
                      disabled={is_saving}
                      onClick={() => {
                        void validate_step();
                      }}
                    >
                      Continuar
                    </LoadingButton>
                  </Grid>
                </Grid>
              </Grid>
            </StepContent>
          </Step>
          {/* Datos de residencia */}
          <Step>
            <StepLabel>Datos de residencia</StepLabel>
            <StepContent>
              <Grid container spacing={2} mt={0.1}>
                <Grid item xs={12} sm={6} md={4}>
                  <CustomSelect
                    onChange={on_change}
                    label="País de residencia *"
                    name="pais_residencia"
                    value={pais_residencia}
                    options={paises_options}
                    loading={loading}
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
                        loading={loading}
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
                        loading={loading}
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
                      <Button
                        variant="contained"
                        onClick={() => {
                          open_modal(true);
                          set_type_direction('residencia');
                        }}
                      >
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
                    <Button
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
                      color="primary"
                      loading={is_saving}
                      disabled={is_saving}
                      onClick={() => {
                        void validate_step();
                      }}
                    >
                      Continuar
                    </LoadingButton>
                  </Grid>
                </Grid>
              </Grid>
            </StepContent>
          </Step>
          {/* Datos de notificación */}
          <Step>
            <StepLabel>Datos de notificación</StepLabel>
            <StepContent>
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
                    loading={loading}
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
                    loading={loading}
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
                    loading={loading}
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
                    error={
                      errors.confirmar_email?.type === 'required' || error_email
                    }
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
                    NOTA: Se recomienda el registro de un número celular, este
                    se usará como medio de recuperación de la cuenta, en caso de
                    que olvide sus datos de acceso.
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
                    <Button
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
                      color="primary"
                      loading={is_saving}
                      disabled={is_saving}
                      onClick={() => {
                        void validate_step();
                      }}
                    >
                      Continuar
                    </LoadingButton>
                  </Grid>
                </Grid>
              </Grid>
            </StepContent>
          </Step>
          {/* Datos adicionales (opcionales) */}
          <Step>
            <StepLabel>Datos adicionales (opcionales)</StepLabel>
            <StepContent>
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
                {/* Lugar de expedición del documento */}
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
                    loading={loading}
                    required={false}
                    disabled={true}
                    errors={errors}
                    register={register}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <CustomSelect
                    onChange={on_change}
                    label="Departamento *"
                    name="departamento_laboral"
                    value={departamento_laboral}
                    options={dpto_laboral_opt}
                    loading={loading}
                    required={false}
                    errors={errors}
                    register={register}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <CustomSelect
                    onChange={on_change}
                    label="Ciudad *"
                    name="cod_municipio_laboral_nal"
                    value={municipio_laboral}
                    options={departamento_laboral_opt}
                    loading={loading}
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
                    {...register('direccion_laboral', {
                      required: true,
                    })}
                    value={direccion}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Button
                    variant="contained"
                    onClick={() => {
                      open_modal(true);
                      set_type_direction('laboral');
                    }}
                  >
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
                    {...register('direccion_laboral')}
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
                    <Button
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
                      color="primary"
                      loading={is_saving}
                      disabled={is_saving}
                      onClick={() => {
                        void validate_step();
                      }}
                    >
                      Continuar
                    </LoadingButton>
                  </Grid>
                </Grid>
              </Grid>
            </StepContent>
          </Step>
          {/* Autorización de notificación y tratamiento de datos */}
          <Step>
            <StepLabel>
              Autorización de notificación y tratamiento de datos
            </StepLabel>
            <StepContent>
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
                    <Button
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
                      color="primary"
                      loading={is_saving}
                      disabled={is_saving}
                      onClick={() => {
                        void validate_step();
                      }}
                    >
                      Continuar
                    </LoadingButton>
                  </Grid>
                </Grid>
              </Grid>
            </StepContent>
          </Step>
          {/* Datos de acceso */}
          <Step>
            <StepLabel>
              Autorización de notificación y tratamiento de datos
            </StepLabel>
            <StepContent>
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
                    error={
                      errors.password?.type === 'required' || error_password
                    }
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
                    <Button
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
                      color="success"
                      loading={is_saving}
                      disabled={is_saving}
                      onClick={() => {
                        void validate_step();
                      }}
                    >
                      Guardar
                    </LoadingButton>
                  </Grid>
                </Grid>
              </Grid>
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
