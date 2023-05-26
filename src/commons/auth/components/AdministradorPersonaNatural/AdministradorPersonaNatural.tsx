import { useEffect, useState } from 'react';
import type {
  ClaseTercero,
  ClaseTerceroPersona,
  DataNaturaUpdate,
  PropsUpdateJ,
  UpdateAutorizaNotificacion,
} from '../../../../interfaces/globalModels';
import {
  Button,
  Divider,
  Grid,
  TextField,
  FormControlLabel,
  Checkbox,
  Autocomplete,
  type AutocompleteChangeReason,
  type AutocompleteChangeDetails,
  Stack,
} from '@mui/material';

import { Title } from '../../../../components/Title';

import { control_error, control_success } from '../../../../helpers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import 'react-datepicker/dist/react-datepicker.css';
import { CustomSelect } from '../../../../components/CustomSelect';
import { DialogGeneradorDeDirecciones } from '../../../../components/DialogGeneradorDeDirecciones';
import {
  consultar_clase_tercero,
  consultar_clase_tercero_persona,
  editar_persona_natural,
} from '../../../seguridad/request/Request';
import { use_register_persona_n } from '../../hooks/registerPersonaNaturalHook';
import type { Dayjs } from 'dayjs';
import { DatosVinculacion } from '../DataVinculación';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { LoadingButton } from '@mui/lab';
import UpdateIcon from '@mui/icons-material/Update';
import dayjs from 'dayjs';
import { DialogHistorialDatosRestringidos } from '../../../seguridad/components/DialogHistorialDatosRestringidos';
import { DialogHistorialEmail } from '../HistoricoEmail/HistoricoEmail';
import { DialogHistorialDirecciones } from '../HistoricoDirecciones/HistoricoDirecciones';
import { DialogHistoricoAutorizaNotificaciones } from '../HistoricoAutorizaNotificaciones/HistoricoAutorizaNotificaciones';
import { DialogAutorizaDatos } from '../../../../components/DialogAutorizaDatos';
import { use_register } from '../../hooks/registerHook';
import { Typography } from '@mui/material';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const AdministracionPersonasScreenNatural: React.FC<PropsUpdateJ> = ({
  data,
  register,
  handleSubmit: handle_submit,
  setValue: set_value,
  errors,
  watch,
  getValues,
}: PropsUpdateJ) => {
  const {
    is_saving,
    paises_options,
    departamentos_opt,
    dpto_notifiacion_opt,
    dpts_residencia_opt,
    ciudad_notificacion_opt,
    ciudades_opt,
    ciudades_residencia_opt,
    genero_opt,
    estado_civil_opt,
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
    is_modal_active,
    direccion,
    direccion_laboral,
    set_value_direction,
    on_change,
    open_modal,
  } = use_register_persona_n({ watch, setValue: set_value, getValues });
  const { tipo_persona_opt } = use_register();

  const [type_direction, set_type_direction] = useState('');
  const [fecha_nacimiento, set_fecha_nacimiento] = useState<Dayjs | null>(null);
  const [clase_tercero, set_clase_tercero] = useState<ClaseTercero[]>([]);
  const [clase_tercero_persona, set_clase_tercero_persona] = useState<
    ClaseTercero[]
  >([]);
  const [
    is_modal_active_historico_direcciones,
    set_is_modal_active_historico_direcciones,
  ] = useState(false);
  const [is_modal_active_historico_email, set_is_modal_active_historico_email] =
    useState(false);
  const [is_modal_historico_autorizacion, set_is_modal_historico_autorizacion] =
    useState<boolean>(false);
  const [is_modal_historico_datos_r, set_is_modal_historico_datos_r] =
    useState<boolean>(false);
  const [dialog_notificaciones, set_dialog_notificaciones] =
    useState<boolean>(false);

  const tipo_persona = watch('tipo_persona') ?? '';
  // watchers
  const misma_direccion = watch('misma_direccion') ?? false;
  const acepta_notificacion_email =
    watch('acepta_notificacion_email') ?? data?.acepta_notificacion_email;
  const acepta_notificacion_sms =
    watch('acepta_notificacion_sms') ?? data?.acepta_notificacion_sms;

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
    set_clase_tercero_persona(value);
  };

  // abre modal historial de autorizacion
  const handle_open_dialog_autorizacion = (): void => {
    set_is_modal_historico_autorizacion(true);
  };
  // abre modal de historico de direcciones
  const handle_open_historico_direcciones = (): void => {
    set_is_modal_active_historico_direcciones(true);
  };
  // abre modal de historico de email
  const handle_open_historico_email = (): void => {
    set_is_modal_active_historico_email(true);
  };
  // abrir modal actualizar Notificaciones
  const handle_open_dialog_notificaciones = (): void => {
    set_dialog_notificaciones(true);
  };
  // abrir modal datos restringidos
  const handle_open_historico_datos_r = (): void => {
    set_is_modal_historico_datos_r(true);
  };
  const respuesta_autorizacion = (data: UpdateAutorizaNotificacion): void => {
    set_value('acepta_notificacion_email', data.acepta_autorizacion_email);
    set_value('acepta_notificacion_sms', data.acepta_autorizacion_sms);
  };
  // establece la fecha de nacimiento
  const on_change_birt_day = (value: Dayjs | null): void => {
    const date = dayjs(value).format('YYYY-MM-DD');
    set_value('fecha_nacimiento', date);
    set_fecha_nacimiento(value);
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
  // trae clase tercero por persona
  const get_datos_clase_tercero_persona = async (
    id: number | undefined
  ): Promise<void> => {
    try {
      const response = await consultar_clase_tercero_persona(id);
      const data_persona_clase_tercero = response.map(
        (item: ClaseTerceroPersona) => ({
          value: item.id_clase_tercero,
          label: item.nombre,
        })
      );
      set_value(
        'datos_clasificacion_persona',
        data_persona_clase_tercero.map((e) => e.value)
      );
      set_clase_tercero_persona(data_persona_clase_tercero);
    } catch (err) {
      control_error(err);
    }
  };

  useEffect(() => {
    if (data?.id_persona !== undefined) {
      void get_datos_clase_tercero();
      void get_datos_clase_tercero_persona(data?.id_persona);
    }
  }, [data]);

  useEffect(() => {
    if (departamento_expedicion !== '') {
      console.log('entro aqui', departamento_expedicion);
      console.log(
        'cod_municipio_expedicion_id',
        data?.cod_municipio_expedicion_id
      );
      set_value('ciudad_expedicion', data?.cod_municipio_expedicion_id);
    }
  }, [departamento_expedicion]);

  useEffect(() => {
    if (departamento_residencia !== '') {
      set_value('municipio_residencia', data?.municipio_residencia);
    }
  }, [departamento_residencia]);

  useEffect(() => {
    if (departamento_laboral !== '') {
      set_value('municipio_laboral', data?.cod_municipio_laboral_nal);
    }
  }, [departamento_laboral]);

  useEffect(() => {
    if (dpto_notifiacion !== '') {
      set_value('ciudad_notificacion', data?.cod_municipio_notificacion_nal);
    }
  }, [dpto_notifiacion]);

  const on_submit_update_natural = handle_submit(async (datos) => {
    try {
      datos.ubicacion_georeferenciada = '';
      await editar_persona_natural(data?.id_persona, datos as DataNaturaUpdate);
      control_success('la persona se actualizó correctamente');
    } catch (error) {
      control_error(
        'Ha ocurrido un error al actualizar la persona, por favor intente nuevamente'
      );
    }
  });

  return (
    <>
      <form
        onSubmit={(e) => {
          void on_submit_update_natural(e);
        }}
      >
        {/* Datos personales */}
        <Grid container spacing={2} mt={0.1}>
          <Grid item xs={12}>
            <Title title="DATOS PERSONALES" />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomSelect
              onChange={on_change}
              label="Tipo persona"
              name="tipo_persona"
              value={tipo_persona}
              options={tipo_persona_opt}
              disabled={true}
              required={false}
              errors={errors}
              register={register}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              size="small"
              label="Primer nombre *"
              value={data?.primer_nombre}
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              size="small"
              label="Segundo nombre"
              value={data?.segundo_nombre}
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              size="small"
              label="Primer apellido *"
              value={data?.primer_apellido}
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              size="small"
              label="Segundo apellido"
              value={data?.segundo_apellido}
              disabled
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
          <Grid item xs={12}>
            <Stack
              justifyContent="flex-end"
              sx={{ m: '10px 0 20px 0' }}
              direction="row"
              spacing={2}
            >
              <Button
                variant="outlined"
                startIcon={<RemoveRedEyeIcon />}
                onClick={() => {
                  handle_open_historico_datos_r();
                }}
              >
                Historico Datos Restringidos
              </Button>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Divider />
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
            {ciudad_expedicion !== null && (
              <>
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
              </>
            )}
          </Grid>
        </Grid>
        {/* Datos de residencia */}
        <Grid container spacing={2} mt={0.1}>
          <Grid item xs={12}>
            <Title title="DATOS DE RESIDENCIA" />
          </Grid>
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
                  disabled={data?.cod_departamento_residencia === '' ?? true}
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
                  defaultValue={data.direccion_residencia_ref}
                  {...register('direccion_residencia_ref')}
                />
              </Grid>
              <Grid item xs={12}>
                <Stack
                  justifyContent="flex-end"
                  sx={{ m: '10px 0 20px 0' }}
                  direction="row"
                  spacing={2}
                >
                  <Button
                    variant="outlined"
                    startIcon={<RemoveRedEyeIcon />}
                    onClick={() => {
                      handle_open_historico_direcciones();
                    }}
                  >
                    Historico Direcciones
                  </Button>
                </Stack>
              </Grid>
            </>
          )}
        </Grid>
        {/* Datos de notificación */}
        <Grid container spacing={2} mt={0.1}>
          <Grid item xs={12}>
            <Title title="DATOS DE NOTIFICACIÓN" />
          </Grid>
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
              defaultValue={data.direccion_notificacion_referencia}
              {...register('complemento_direccion')}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              size="small"
              label="E-mail *"
              defaultValue={data.email}
              error={errors.email?.type === 'required'}
              type="email"
              helperText={
                errors.email?.type === 'required'
                  ? 'Este campo es obligatorio'
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
              label="Celular"
              defaultValue={data.telefono_celular}
              error={errors.telefono_celular?.type === 'required'}
              type="text"
              helperText={
                errors.telefono_celular?.type === 'required'
                  ? 'Este campo es obligatorio'
                  : ''
              }
              {...register('telefono_celular')}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Stack
              justifyContent="flex-end"
              sx={{ m: '10px 0 20px 0' }}
              direction="row"
              spacing={2}
            >
              <Button
                variant="outlined"
                startIcon={<RemoveRedEyeIcon />}
                onClick={() => {
                  handle_open_historico_email();
                }}
              >
                Historico E-mail
              </Button>
            </Stack>
          </Grid>
        </Grid>
        {/* Datos adicionales (opcionales) */}
        <Grid container spacing={2} mt={0.1}>
          <Grid item xs={12}>
            <Title title="DATOS ADICIONALES (opcionales)" />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              size="small"
              label="Nombre comercial"
              value={data.nombre_comercial}
              {...register('nombre_comercial')}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              size="small"
              label="Teléfono fijo personal"
              value={data.telefono_fijo_residencial}
              {...register('telefono_fijo_residencial')}
            />
          </Grid>
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
              label="Departamento *"
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
              label="Ciudad *"
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
              {...register('direccion_laboral', {
                required: true,
              })}
              value={direccion_laboral}
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
              defaultValue={data.direccion_laboral}
              {...register('direccion_laboral_ref')}
            />
          </Grid>
        </Grid>
        {/* Autorización de notificación y tratamiento de datos */}
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
                  disabled={true}
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
                  disabled={true}
                  checked={acepta_notificacion_sms}
                  {...register('acepta_notificacion_sms')}
                />
              }
            />
          </Grid>
          <Grid item xs={12}>
            <Stack
              justifyContent="flex-end"
              sx={{ m: '10px 0 20px 0' }}
              direction="row"
              spacing={2}
            >
              <Button
                variant="outlined"
                startIcon={<RemoveRedEyeIcon />}
                onClick={() => {
                  handle_open_dialog_autorizacion();
                }}
              >
                Historico Autorizaciones
              </Button>
              <Button
                variant="contained"
                startIcon={<UpdateIcon />}
                onClick={() => {
                  handle_open_dialog_notificaciones();
                }}
              >
                Actualizar Notificaciones
              </Button>
            </Stack>
          </Grid>
        </Grid>
        {/* Datos de clasificación Cormacarena */}
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
                    value={clase_tercero_persona}
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
        </Grid>
        {/* Datos de vinculación */}
        <Grid container spacing={2} mt={0.1}>
          {data?.id_persona !== undefined && (
            <DatosVinculacion id_persona={data?.id_persona} />
          )}
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
                Actualizar
              </LoadingButton>
            </Grid>
          </Grid>
        </Grid>
      </form>
      <DialogGeneradorDeDirecciones
        open={is_modal_active}
        openDialog={open_modal}
        onChange={set_value_direction}
        type={type_direction}
      />
      <DialogHistorialDatosRestringidos
        is_modal_active={is_modal_historico_datos_r}
        set_is_modal_active={set_is_modal_historico_datos_r}
        id_persona={data?.id_persona ?? 0}
      />
      <DialogHistorialEmail
        is_modal_active={is_modal_active_historico_email}
        set_is_modal_active={set_is_modal_active_historico_email}
        id_persona={data?.id_persona ?? 0}
        tipo_persona={data?.tipo_persona ?? ''}
      />

      <DialogHistorialDirecciones
        is_modal_active={is_modal_active_historico_direcciones}
        set_is_modal_active={set_is_modal_active_historico_direcciones}
        id_persona={data?.id_persona ?? 0}
        tipo_persona={data?.tipo_persona ?? ''}
      />
      <DialogHistoricoAutorizaNotificaciones
        is_modal_active={is_modal_historico_autorizacion}
        set_is_modal_active={set_is_modal_historico_autorizacion}
        id_persona={data?.id_persona ?? 0}
        tipo_persona={data?.tipo_persona ?? ''}
      />
      <DialogAutorizaDatos
        is_modal_active={dialog_notificaciones}
        set_is_modal_active={set_dialog_notificaciones}
        id_persona={data?.id_persona ?? 0}
        data_autorizacion={{
          acepta_autorizacion_email: data?.acepta_notificacion_email,
          acepta_autorizacion_sms: data?.acepta_notificacion_sms,
        }}
        on_result={respuesta_autorizacion}
      />
    </>
  );
};
