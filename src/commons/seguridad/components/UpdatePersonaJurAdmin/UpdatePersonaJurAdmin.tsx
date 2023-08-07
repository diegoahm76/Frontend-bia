/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { useEffect, useState } from 'react';
import {
  Grid,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Autocomplete,
  type AutocompleteChangeReason,
  type AutocompleteChangeDetails,
  Stack,
} from '@mui/material';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { LoadingButton } from '@mui/lab';
import UpdateIcon from '@mui/icons-material/Update';
import { CustomSelect } from '../../../../components/CustomSelect';
import { DialogGeneradorDeDirecciones } from '../../../../components/DialogGeneradorDeDirecciones';
import type {
  ClaseTercero,
  ClaseTerceroPersona,
  DataJuridicaUpdate,
  PropsRegisterAdmin,
  UpdateAutorizaNotificacion,
} from '../../../../interfaces/globalModels';
import { Title } from '../../../../components/Title';
import {
  consultar_clase_tercero,
  consultar_clase_tercero_persona,
  editar_persona_juridica,
} from '../../request/Request'
import { control_error, control_success } from '../../../../helpers';
import { use_register_persona_j } from '../../../auth/hooks/registerPersonaJuridicaHook';
import { DialogHistorialDatosRestringidos } from '../DialogHistorialDatosRestringidos';
import { DialogHistorialEmail } from '../HistoricoEmail/HistoricoEmail';
import { DialogHistorialDirecciones } from '../HistoricoDirecciones/HistoricoDirecciones';
import { DialogHistoricoAutorizaNotificaciones } from '../HistoricoAutorizaNotificaciones/HistoricoAutorizaNotificaciones';
import { DialogAutorizaDatos } from '../../../../components/DialogAutorizaDatos';
import { DatosRepresentanteLegal } from '../DatosRepresentanteLegal/DataRepresentanteLegal';
import { type AxiosError } from 'axios';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const UpdatePersonaJurAdmin: React.FC<PropsRegisterAdmin> = ({
  data,
  tipo_persona,
  register,
  handleSubmit: handle_submit,
  setValue: set_value,
  errors,
  isValid: is_valid,
  watch,
  getValues,
  reset,
}: PropsRegisterAdmin) => {
  const {
    is_saving,
    paises_options,
    dpto_notifiacion_opt,
    ciudad_notificacion_opt,
    naturaleza_empresa_opt,
    nacionalidad_empresa,
    naturaleza_empresa,
    dpto_notifiacion,
    ciudad_notificacion,
    direccion_notificaciones,
    is_modal_active,
    set_value_direction,
    on_change,
    open_modal,
  } = use_register_persona_j({ watch, setValue: set_value, getValues });

  const [type_direction, set_type_direction] = useState('');
  const [id_reoresentante_legal, set_id_reoresentante_legal] = useState(0);
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
  // trae todas las clase tercero
  const get_datos_clase_tercero = async (): Promise<void> => {
    try {
      const response = await consultar_clase_tercero();
      set_clase_tercero(response);
    } catch (err) {
      const temp = err as AxiosError;
      if (temp.response?.status !== 404) {
        control_error(err);
      }
    }
  };
  // trae clase tercero por persona
  const get_datos_clase_tercero_persona = async (id_persona: number): Promise<void> => {
    try {
      const response = await consultar_clase_tercero_persona(id_persona);
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      if (response && response.length > 0) {
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
      }
      // return;
    } catch (err) {
      const temp = err as AxiosError;
      if (temp.response?.status !== 404) {
        control_error(err);
      }
    }
  };
  useEffect(() => {
    void get_datos_clase_tercero();
  }, []);

  useEffect(() => {
    if (data !== undefined) {
      set_value('tipo_persona', data.tipo_persona);
      set_value('cod_pais_nacionalidad_empresa', data.cod_pais_nacionalidad_empresa);
      set_value('cod_naturaleza_empresa', data.cod_naturaleza_empresa);
      // set_dpto_notifiacion(data.cod_departamento_notificacion);
      set_value('dpto_notifiacion', data.cod_departamento_notificacion);
      set_value('cod_departamento_notificacion', data.cod_departamento_notificacion);
      set_value('cod_municipio_notificacion_nal', data.cod_municipio_notificacion_nal);
      set_value('direccion_notificaciones', data.direccion_notificaciones);
      set_value('direccion_notificacion_referencia', data.direccion_notificacion_referencia);
      set_value('acepta_notificacion_email', data.acepta_notificacion_email);
      set_value('acepta_notificacion_sms', data.acepta_notificacion_sms)

      // datos adicionales

      set_value('email', data.email);
      set_value('telefono_celular_empresa', data.telefono_celular_empresa);
      set_value('complementp', data.direccion_notificaciones);
      set_value('telefono_empresa', data.telefono_empresa);
      set_value('telefono_empresa_2', data.telefono_empresa_2);
      set_value('email_empresarial', data.email_empresarial);
      set_value('complemento_direccion', data.direccion_notificacion_referencia)
      set_value('direccion_notificacion_referencia', data.direccion_notificacion_referencia)

    }
    if (data?.id_persona !== undefined) {
      void get_datos_clase_tercero_persona(data?.id_persona);
    }

  }, [data]);

  const on_submit_update_juridica = handle_submit(async (datos) => {
    try {
      datos.ubicacion_georeferenciada = '';
      delete datos.dpto_notifiacion;
      delete datos.cod_departamento_notificacion
      datos.representante_legal = id_reoresentante_legal;
      await editar_persona_juridica(data?.id_persona, datos as DataJuridicaUpdate);
      control_success('Se actualizo el usuario correctamente');
      reset(); // limpiar campos
    } catch (error) {
      control_error('Ha ocuriido un error, intente nuevamente');
    }
  });
  return (
    <>
      {data && (
        <>
          <form
            onSubmit={(e) => {
              void on_submit_update_juridica(e);
            }}
          >
            {/* Datos empresariales */}
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
                  disabled={true}
                  value={data?.digito_verificacion}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth
                  size="small"
                  label="Razón social *"
                  disabled={true}
                  value={data?.razon_social}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth
                  size="small"
                  label="Nombre comercial *"
                  disabled={true}
                  value={data?.nombre_comercial}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <CustomSelect
                  onChange={on_change}
                  label="Naturaleza empresa *"
                  name="cod_naturaleza_empresa"
                  disabled={true}
                  value={naturaleza_empresa}
                  options={naturaleza_empresa_opt}
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
                  disabled={true}
                  value={nacionalidad_empresa}
                  options={paises_options}
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
            </Grid>
            {/* Datos de notificación */}
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
                  defaultValue={data?.direccion_notificacion_referencia}
                  {...register('direccion_notificacion_referencia')}
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
                      ? 'Este campo es obligatorio' : ''
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
                  defaultValue={data?.telefono_celular_empresa}
                  onCopy={(e: any) => e.preventDefault()}
                  error={errors.telefono_celular_empresa?.type === 'required'}
                  helperText={
                    errors.telefono_celular_empresa?.type === 'required'
                      ? 'Este campo es obligatorio' : ''
                  }
                  {...register('telefono_celular_empresa')}
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
                    Historico E-mail
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<RemoveRedEyeIcon />}
                    onClick={() => {
                      handle_open_historico_email();
                    }}
                  >
                    Historico Direcciones
                  </Button>
                </Stack>
              </Grid>
            </Grid>
            {/* Datos del representante legal */}
            <Grid container spacing={2} mt={0.1}>
              <Grid item xs={12}>
                <Title title="DATOS DEL REPRESENTANTE LEGAL" />
              </Grid>
              <Grid item xs={12}>
                <DatosRepresentanteLegal
                  id_representante_legal={data?.representante_legal as number}
                  id_persona={data?.id_persona}
                  fecha_inicio={data?.fecha_inicio_cargo_rep_legal}
                  errors={errors}
                  register={register}
                  setValue={set_value}
                  getValues={getValues}
                  watch={watch}
                  set_id_reoresentante_legal={set_id_reoresentante_legal}
                />
              </Grid>
            </Grid>
            {/* Datos adicionales (opcionales) */}
            <Grid container spacing={2} mt={0.1}>
              <Grid item xs={12}>
                <Title title="DATOS ADICIONALES (OPCIONALES)" />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth
                  type="text"
                  size="small"
                  label="Teléfono fijo de la empresa"
                  defaultValue={data?.telefono_empresa} // Utiliza 'defaultValue' en lugar de 'value'
                  {...register('telefono_empresa')}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth
                  size="small"
                  type="number"
                  label="Teléfono móvil complementario"
                  defaultValue={data?.telefono_empresa_2} // Utiliza 'defaultValue' en lugar de 'value'
                  {...register('telefono_empresa_2')}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  fullWidth
                  type="email"
                  size="small"
                  label="Correo electrónico complementario"
                  defaultValue={data?.email_empresarial} // Utiliza 'defaultValue' en lugar de 'value'
                  {...register('email_empresarial')}
                />
              </Grid>
            </Grid>
            {/* Autorización de notificación y tratamiento de datos */}
            <Grid container spacing={2} mt={0.1}>
              <Grid item xs={12}>
                <Title title="AUTORIZACIÓN DE NOTIFICACIONES" />
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
                    Actualizar
                  </LoadingButton>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </>
      )}
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
        tipo_persona={tipo_persona ?? ''}
      />

      <DialogHistorialDirecciones
        is_modal_active={is_modal_active_historico_direcciones}
        set_is_modal_active={set_is_modal_active_historico_direcciones}
        id_persona={data?.id_persona ?? 0}
        tipo_persona={tipo_persona ?? ''}
      />
      <DialogHistoricoAutorizaNotificaciones
        is_modal_active={is_modal_historico_autorizacion}
        set_is_modal_active={set_is_modal_historico_autorizacion}
        id_persona={data?.id_persona ?? 0}
        tipo_persona={tipo_persona ?? ''}
      />
      <DialogAutorizaDatos
        is_modal_active={dialog_notificaciones}
        set_is_modal_active={set_dialog_notificaciones}
        id_persona={data?.id_persona ?? 0}
        data_autorizacion={{
          acepta_autorizacion_email: acepta_notificacion_email,
          acepta_autorizacion_sms: acepta_notificacion_sms,
        }}
        on_result={respuesta_autorizacion}
      />
    </>
  );
};
