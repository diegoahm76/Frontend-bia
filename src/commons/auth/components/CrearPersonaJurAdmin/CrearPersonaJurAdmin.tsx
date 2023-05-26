import { useEffect, useState } from 'react';
import {
  Grid,
  TextField,
  FormControlLabel,
  Checkbox,
  Typography,
  Button,
  Autocomplete,
  type AutocompleteChangeReason,
  type AutocompleteChangeDetails,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { CustomSelect } from '../../../../components/CustomSelect';
import { DialogGeneradorDeDirecciones } from '../../../../components/DialogGeneradorDeDirecciones';
import dayjs, { type Dayjs } from 'dayjs';
import type {
  ClaseTercero,
  CrearPersonJuridicaAdmin,
  PropsRegister,
} from '../../../../interfaces/globalModels';
import { use_register_persona_j } from '../../hooks/registerPersonaJuridicaHook';
import { Title } from '../../../../components/Title';
import {
  consultar_clase_tercero,
  crear_persona_juridica,
} from '../../../seguridad/request/Request';
import { control_error, control_success } from '../../../../helpers';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const CrearPersonaJurAdmin: React.FC<PropsRegister> = ({
  numero_documento,
  tipo_documento,
  tipo_persona,
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
    loading,
    paises_options,
    dpto_notifiacion_opt,
    ciudad_notificacion_opt,
    naturaleza_empresa_opt,
    error_email,
    error_phone,
    nacionalidad_empresa,
    naturaleza_empresa,
    dpto_notifiacion,
    ciudad_notificacion,
    direccion_notificaciones,
    is_modal_active,
    tipo_documento_opt,
    tipo_documento_representante,
    documento_representante,
    is_search,
    nombre_presentante,
    validate_exits_representante,
    set_value_direction,
    on_change,
    open_modal,
  } = use_register_persona_j({ watch, setValue: set_value, getValues });

  const [type_direction, set_type_direction] = useState('');
  const [fecha_inicio_cargo_rep_legal, set_fecha_nacimiento] =
    useState<Dayjs | null>(null);
  const [clase_tercero, set_clase_tercero] = useState<ClaseTercero[]>([]);
  // watchers
  const acepta_notificacion_email = watch('acepta_notificacion_email') ?? false;
  const acepta_notificacion_sms = watch('acepta_notificacion_sms') ?? false;

  const handle_change_autocomplete = (
    event: React.SyntheticEvent<Element, Event>,
    value: ClaseTercero[],
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<ClaseTercero>
  ): void => {
    set_value(
      'datos_clasificacion_persona',
      value.map((e) => e.value)
    );
  };

  // establece la fecha de nacimiento
  const on_change_birt_day = (value: Dayjs | null): void => {
    const date = dayjs(value).format('YYYY-MM-DD');
    set_value('fecha_inicio_cargo_rep_legal', date);
    set_fecha_nacimiento(value);
  };

  const search_representante = (): void => {
    void validate_exits_representante(getValues());
  };
  // trae todas las clase tercero
  const get_datos_clase_tercero = async (): Promise<void> => {
    try {
      const response = await consultar_clase_tercero();
      set_clase_tercero(response);
    } catch (err) {
      control_error(err);
    }
  };

  useEffect(() => {
    void get_datos_clase_tercero();
  }, []);

  const on_submit_create_natural = handle_submit(async (data) => {
    try {
      data.ubicacion_georeferenciada = '';
      data.numero_documento = numero_documento;
      data.tipo_documento = tipo_documento;
      data.tipo_persona = tipo_persona;
      await crear_persona_juridica(data as CrearPersonJuridicaAdmin);
      control_success('la persona se creó correctamente');
    } catch (error) {
      control_error(error);
    }
  });
  return (
    <>
      <form
        onSubmit={(e) => {
          void on_submit_create_natural(e);
        }}
      >
        <>
          {/* Datos empresariales */}
          <>
            <Grid container spacing={2} mt={0.1}>
              <Grid item xs={12}>
                <Title title="DATOS EMPRESARIALES" />
              </Grid>
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
            </Grid>
          </>
          {/* Datos de notificación */}
          <>
            <Grid container spacing={2} mt={0.1}>
              <Grid item xs={12}>
                <Title title="DATOS DE NOTIFICACIÓN NACIONAL" />
              </Grid>
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
                  NOTA: Se recomienda el registro de un número celular, este se
                  usará como medio de recuperación de la cuenta, en caso de que
                  olvide sus datos de acceso.
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
            </Grid>
          </>
          {/* Datos del representante legal */}
          <>
            <Grid container spacing={2} mt={0.1}>
              <Grid item xs={12}>
                <Title title="DATOS DEL REPRESENTANTE LEGAL" />
              </Grid>
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
                  label="Nombre de documento"
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
                          errors.fecha_inicio_cargo_rep_legal?.type ===
                          'required'
                        }
                        helperText={
                          errors.fecha_inicio_cargo_rep_legal?.type ===
                          'required'
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
                    color="warning"
                    sx={{
                      textAlign: 'center',
                      color: '#ffff',
                    }}
                    href="#/auth/login"
                  >
                    <Typography sx={{ color: 'black' }}>Buscar</Typography>
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </>
          {/* Datos adicionales (opcionales) */}
          <>
            <Grid container spacing={2} mt={0.1}>
              <Grid item xs={12}>
                <Title title="DATOS ADICIONALES (OPCIONALES)" />
              </Grid>
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
            </Grid>
          </>
          {/* Autorización de notificación y tratamiento de datos */}
          <>
            <Grid container spacing={2} mt={0.1}>
              <Grid item xs={12}>
                <Title title="AUTORIZACIÓN DE NOTIFICACIÓN Y TRATAMIENTO DE DATOS" />
              </Grid>
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
            </Grid>
          </>
        </>
        {/* Datos de clasificación Cormacarena */}
        <>
          <Grid container spacing={2} mt={0.1}>
            <Grid item xs={12}>
              <Title title="DATOS DE CLASIFICACIÓN" />
            </Grid>
            <Grid item xs={12}>
              {clase_tercero.length > 0 && (
                <>
                  <Grid item xs={12}>
                    <Autocomplete
                      multiple
                      fullWidth
                      size="medium"
                      options={clase_tercero}
                      getOptionLabel={(option) => option.label}
                      isOptionEqualToValue={(option, value) =>
                        option.value === value?.value
                      }
                      renderInput={(params) => (
                        <TextField
                          key={params.id}
                          {...params}
                          label="Datos clasificación Cormacarena"
                          placeholder="Clasificacion Cormacarena"
                        />
                      )}
                      {...register('datos_clasificacion_persona')}
                      onChange={handle_change_autocomplete}
                    />
                  </Grid>
                </>
              )}
            </Grid>

            {/* BOTONES */}
            <Grid item spacing={2} justifyContent="end" container>
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
