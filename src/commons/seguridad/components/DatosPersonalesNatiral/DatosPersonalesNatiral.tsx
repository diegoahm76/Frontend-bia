import { useEffect, useState } from 'react';
import type {
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
  Typography,
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
  editar_persona_natural_cuenta_propia,
} from '../../request/Request';
import type { Dayjs } from 'dayjs';
import { LoadingButton } from '@mui/lab';
import UpdateIcon from '@mui/icons-material/Update';
import dayjs from 'dayjs';
import { DialogAutorizaDatos } from '../../../../components/DialogAutorizaDatos';

import { use_register } from '../../../auth/hooks/registerHook';
import { use_register_persona_n } from '../../../auth/hooks/registerPersonaNaturalHook';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const DatosPersonalesNatural: React.FC<PropsUpdateJ> = ({
  data,
  register,
  handleSubmit: handle_submit,
  setValue: set_value,
  errors,
  watch,
  getValues,
}: PropsUpdateJ) => {
  const {
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
    estado_civil,
    departamento_expedicion,
    pais_residencia,
    departamento_residencia,
    departamento_laboral,
    dpto_laboral_opt,
    departamento_laboral_opt,
    genero,
    ciudad_expedicion,
    direccion,
    dpto_notifiacion,
    ciudad_notificacion,
    municipio_laboral,
    direccion_laboral,
    direccion_notificaciones,
    is_modal_active,
    set_value_direction,
    on_change,
    open_modal,
  } = use_register_persona_n({ watch, setValue: set_value, getValues });

  const { tipo_persona_opt } = use_register();

  const [type_direction, set_type_direction] = useState('');
  const [fecha_nacimiento, set_fecha_nacimiento] = useState<Dayjs | null>(null);
  const [loading, set_loading] = useState<boolean>(false);

  const [dialog_notificaciones, set_dialog_notificaciones] =
    useState<boolean>(false);

  const tipo_persona = watch('tipo_persona') ?? '';
  // watchers
  const misma_direccion = watch('misma_direccion') ?? false;
  const acepta_notificacion_email =
    watch('acepta_notificacion_email') ?? data?.acepta_notificacion_email ?? false;
  const acepta_notificacion_sms =
    watch('acepta_notificacion_sms') ?? data?.acepta_notificacion_sms ?? false;

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
  // abrir modal actualizar Notificaciones
  const handle_open_dialog_notificaciones = (): void => {
    set_dialog_notificaciones(true);
  };

  useEffect(() => {
    if (data !== null) {
      const timeout = setTimeout(() => {

        set_value('tipo_persona', data.tipo_persona);
        set_fecha_nacimiento(dayjs(data.fecha_nacimiento));
        set_value('fecha_nacimiento', data.fecha_nacimiento);
        set_value('pais_nacimiento', data.pais_nacimiento);
        set_value('sexo', data.sexo);
        set_value('estado_civil', data.estado_civil);
        set_value('departamento_expedicion', data.cod_departamento_expedicion);
        set_value('cod_municipio_expedicion_id', data.cod_municipio_expedicion_id);
        // residencia
        set_value('pais_residencia', data.pais_residencia);
        set_value('departamento_residencia', data.cod_departamento_residencia);
        set_value('municipio_residencia', data.municipio_residencia);
        set_value('direccion_residencia', data.direccion_residencia);
        set_value('direccion_residencia_ref', data.direccion_residencia_ref);
        // notificaciones
        set_value('dpto_notifiacion', data.cod_departamento_notificacion);
        set_value('cod_departamento_notificacion', data.cod_departamento_notificacion);
        set_value('cod_municipio_notificacion_nal', data.cod_municipio_notificacion_nal);
        set_value('ciudad_notificacion', data.cod_municipio_notificacion_nal);
        set_value('direccion_notificaciones', data.direccion_notificaciones);
        set_value('complemento_direccion', data.direccion_notificacion_referencia);

        // laboral
        set_value('departamento_laboral', data.cod_departamento_laboral);
        set_value('cod_municipio_laboral_nal', data.cod_municipio_laboral_nal);
        set_value('direccion_laboral', data.direccion_laboral);
        set_value('dpto_notifiacion', getValues('cod_departamento_notificacion'));
        set_value('cod_departamento_notificacion', getValues('cod_departamento_notificacion'));
        set_value('cod_municipio_notificacion_nal', getValues('cod_municipio_notificacion_nal'));
        set_value('ciudad_notificacion', getValues('cod_municipio_notificacion_nal'));
        set_value('direccion_notificaciones', getValues('direccion_notificaciones'));
        set_value('complemento_direccion', getValues('complemento_direccion'));
      }, 1000);
      return () => { clearTimeout(timeout); };
    }
  }, [data]);

  const on_submit_update_natural = handle_submit(async (datos) => {
    try {
      set_loading(true);
      datos.ubicacion_georeferenciada = '';
      await editar_persona_natural_cuenta_propia(datos as DataNaturaUpdate);
      control_success('la persona se actualizó correctamente');
      set_loading(false);
    } catch (error) {
      control_error(
        'Ha ocurrido un error al actualizar la persona, por favor intente nuevamente'
      );
      set_loading(false);
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
            <Title title="Datos persónale" />
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
                inputFormat="YYYY-MM-DD"
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
            <Title title="Datos de residencia" />
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
            </>
          )}
        </Grid>
        {/* Datos de notificación */}
        <Grid container spacing={2} mt={0.1}>
          <Grid item xs={12}>
            <Title title="Datos de notificación" />
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
        </Grid>
        {/* Datos adicionales (opcionales) */}
        <Grid container spacing={2} mt={0.1}>
          <Grid item xs={12}>
            <Title title="Datos de notificación (opcionales)" />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              size="small"
              label="Nombre comercial"
              defaultValue={data.nombre_comercial}
              {...register('nombre_comercial')}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              size="small"
              label="Teléfono fijo personal"
              defaultValue={data.telefono_fijo_residencial}
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
              label="Departamento "
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
              {...register('direccion_laboral',)}
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
        </Grid>
        {/* Autorización de notificación y tratamiento de datos */}
        <Grid container spacing={2} mt={0.1}>
          <Grid item xs={12}>
            <Title title="Autorización de notificación y tratamiento de datos" />
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
          <Divider></Divider>
          <Grid item spacing={2} justifyContent="end" container>
            <Grid item>
              <LoadingButton
                type="submit"
                variant="contained"
                fullWidth
                color="success"
                loading={loading}
                disabled={loading}
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
