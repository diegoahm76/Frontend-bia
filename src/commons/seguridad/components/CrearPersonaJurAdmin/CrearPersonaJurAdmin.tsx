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
  Stack,
} from '@mui/material';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { LoadingButton } from '@mui/lab';
import UpdateIcon from '@mui/icons-material/Update';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { CustomSelect } from '../../../../components/CustomSelect';
import { DialogGeneradorDeDirecciones } from '../../../../components/DialogGeneradorDeDirecciones';
import dayjs, { type Dayjs } from 'dayjs';
import type {
  ClaseTercero,
  ClaseTerceroPersona,
  CrearPersonJuridicaAdmin,
  PropsRegisterAdmin,
  UpdateAutorizaNotificacion,
} from '../../../../interfaces/globalModels';
import { Title } from '../../../../components/Title';
import {
  consultar_clase_tercero,
  consultar_clase_tercero_persona,
  crear_persona_juridica,
} from '../../../seguridad/request/Request';
import { control_error, control_success } from '../../../../helpers';
import { use_register_persona_j } from '../../../auth/hooks/registerPersonaJuridicaHook';
import { DialogHistorialDatosRestringidos } from '../DialogHistorialDatosRestringidos';
import { DialogHistorialEmail } from '../HistoricoEmail/HistoricoEmail';
import { DialogHistorialDirecciones } from '../HistoricoDirecciones/HistoricoDirecciones';
import { DialogHistoricoAutorizaNotificaciones } from '../HistoricoAutorizaNotificaciones/HistoricoAutorizaNotificaciones';
import { DialogAutorizaDatos } from '../../../../components/DialogAutorizaDatos';
import { DatosRepresentanteLegal } from '../DatosRepresentanteLegal/DataRepresentanteLegal';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const CrearPersonaJurAdmin: React.FC<PropsRegisterAdmin> = ({
  id_persona,
  representante_legal,
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
}: PropsRegisterAdmin) => {
  const {
    is_saving,
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
      control_error(err);
    }
  };
  // trae clase tercero por persona
  const get_datos_clase_tercero_persona = async (id_persona: number): Promise<void> => {
    try {
      const response = await consultar_clase_tercero_persona(id_persona);
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

  // establece la fecha de nacimiento
  const on_change_birt_day = (value: Dayjs | null): void => {
    const date = dayjs(value).format('YYYY-MM-DD');
    set_value('fecha_inicio_cargo_rep_legal', date);
    set_fecha_nacimiento(value);
  };

  const search_representante = (): void => {
    void validate_exits_representante(getValues());
  };

  useEffect(() => {
    console.log(representante_legal, 'representante_legal');
    void get_datos_clase_tercero();
    if (id_persona > 0) {
      void get_datos_clase_tercero_persona(id_persona);
    }
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
              disabled={id_persona > 0}
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
              disabled={id_persona > 0}
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
              disabled={id_persona > 0}
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
              disabled={id_persona > 0}
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
              disabled={id_persona > 0}
              value={nacionalidad_empresa}
              options={paises_options}
              required={true}
              errors={errors}
              register={register}
            />
          </Grid>
          {id_persona > 0 && (
            <>
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
            </>
          )}
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
              {...register('complemento_direccion')}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              size="small"
              label="E-mail *"
              error={errors.email?.type === 'required' || error_email && id_persona === 0}
              type="email"
              helperText={
                errors.email?.type === 'required'
                  ? 'Este campo es obligatorio'
                  : error_email && id_persona === 0
                    ? 'Los emails no coinciden'
                    : ''
              }
              {...register('email', {
                required: true,
              })}
            />
          </Grid>
          {id_persona === 0 && (
            <>
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
            </>
          )}
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              size="small"
              label="Celular"
              onCopy={(e: any) => e.preventDefault()}
              error={errors.telefono_celular?.type === 'required' || error_phone && id_persona === 0}
              helperText={
                errors.telefono_celular?.type === 'required'
                  ? 'Este campo es obligatorio'
                  : error_phone && id_persona === 0
                    ? 'Los número de celular no son iguales'
                    : ''
              }
              {...register('telefono_celular')}
            />
          </Grid>
          {id_persona === 0 && (
            <>
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
            </>
          )}
          {id_persona > 0 && (
            <>
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
            </>
          )}
        </Grid>
        {/* Datos del representante legal */}
        <Grid container spacing={2} mt={0.1}>
          <Grid item xs={12}>
            <Title title="DATOS DEL REPRESENTANTE LEGAL" />
          </Grid>
          {id_persona === 0 && (
            <>
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
            </>
          )}
          {id_persona !== 0 && (
            <>
              <Grid item xs={12}>
                <DatosRepresentanteLegal
                  id_representante_legal={representante_legal ?? 0}
                  id_persona={id_persona}
                  fecha_inicio={'2023-05-15'}
                />
              </Grid>
            </>
          )}
        </Grid>
        {/* Datos adicionales (opcionales) */}
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
        {/* Autorización de notificación y tratamiento de datos */}
        <Grid container spacing={2} mt={0.1}>
          {id_persona === 0 && (
            <>
              <Grid item xs={12}>
                <Title title="AUTORIZACIÓN DE NOTIFICACIÓN Y TRATAMIENTO DE DATOS" />
              </Grid>
            </>
          )}
          {id_persona > 0 && (
            <>
              <Grid item xs={12}>
                <Title title="AUTORIZACIÓN DE NOTIFICACIONES" />
              </Grid>
            </>
          )}
          <Grid item xs={12}>
            <FormControlLabel
              label="¿Autoriza notificaciones judiciales por correo electrónico?"
              control={
                <Checkbox
                  size="small"
                  disabled={id_persona > 0}
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
                  disabled={id_persona > 0}
                  checked={acepta_notificacion_sms}
                  {...register('acepta_notificacion_sms')}
                />
              }
            />
          </Grid>
          {id_persona > 0 && (
            <>
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
            </>
          )}
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
                Guardar
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
        id_persona={id_persona ?? 0}
      />
      <DialogHistorialEmail
        is_modal_active={is_modal_active_historico_email}
        set_is_modal_active={set_is_modal_active_historico_email}
        id_persona={id_persona ?? 0}
        tipo_persona={tipo_persona ?? ''}
      />

      <DialogHistorialDirecciones
        is_modal_active={is_modal_active_historico_direcciones}
        set_is_modal_active={set_is_modal_active_historico_direcciones}
        id_persona={id_persona ?? 0}
        tipo_persona={tipo_persona ?? ''}
      />
      <DialogHistoricoAutorizaNotificaciones
        is_modal_active={is_modal_historico_autorizacion}
        set_is_modal_active={set_is_modal_historico_autorizacion}
        id_persona={id_persona ?? 0}
        tipo_persona={tipo_persona ?? ''}
      />
      <DialogAutorizaDatos
        is_modal_active={dialog_notificaciones}
        set_is_modal_active={set_dialog_notificaciones}
        id_persona={id_persona ?? 0}
        data_autorizacion={{
          acepta_autorizacion_email: acepta_notificacion_email,
          acepta_autorizacion_sms: acepta_notificacion_sms,
        }}
        on_result={respuesta_autorizacion}
      />
    </>
  );
};
