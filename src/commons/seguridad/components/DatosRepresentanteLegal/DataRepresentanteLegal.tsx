import { useEffect, useState } from 'react';
import type { DataPersonas } from '../../../../interfaces/globalModels';
import { Button, Grid, MenuItem, Stack, TextField } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import type { PropsDatosRepresentanteLegal } from './types';
import { control_error } from '../../../../helpers';
import { consultar_datos_persona } from '../../../seguridad/request/Request';
import { CustomSelect } from '../../../../components/CustomSelect';
import { DialogRepresentanteLegal } from '../DialogCambioRepresentanteLegal/DialogCambioRepresentanteLegal';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { DialogHistoricoRepresentanteLegal } from '../HistoricoRepresentanteLegal/HistoricoRepresentanteLegal';
import { use_register_persona_j } from '../../../auth/hooks/registerPersonaJuridicaHook';
import dayjs, { type Dayjs } from 'dayjs';
import { useSelector } from 'react-redux';
import type { AuthSlice } from '../../../auth/interfaces';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const DatosRepresentanteLegal: React.FC<
  PropsDatosRepresentanteLegal
> = ({
  id_representante_legal,
  id_persona,
  fecha_inicio,
  register,
  setValue: set_value,
  errors,
  watch,
  getValues,
  set_id_reoresentante_legal,
}: PropsDatosRepresentanteLegal) => {
  const { ciudad_notificacion_opt } = use_register_persona_j({
    watch,
    setValue: set_value,
    getValues,
  });

  const [datos_representante, set_datos_representante] = useState<DataPersonas>(
    {
      id_persona: 0,
      nombre_unidad_organizacional_actual: '',
      tiene_usuario: false,
      primer_nombre: '',
      segundo_nombre: '',
      primer_apellido: '',
      segundo_apellido: '',
      tipo_persona: '',
      numero_documento: '',
      digito_verificacion: '',
      nombre_comercial: '',
      razon_social: '',
      pais_residencia: '',
      municipio_residencia: '',
      direccion_residencia: '',
      direccion_residencia_ref: '',
      ubicacion_georeferenciada: '',
      direccion_laboral: '',
      direccion_notificaciones: '',
      pais_nacimiento: '',
      fecha_nacimiento: '',
      sexo: '',
      fecha_asignacion_unidad: '',
      es_unidad_organizacional_actual: '',
      email: '',
      email_empresarial: '',
      telefono_fijo_residencial: '',
      telefono_celular: '',
      telefono_empresa: '',
      cod_municipio_laboral_nal: '',
      cod_municipio_notificacion_nal: '',
      telefono_celular_empresa: '',
      telefono_empresa_2: '',
      cod_pais_nacionalidad_empresa: '',
      acepta_notificacion_sms: false,
      acepta_notificacion_email: false,
      acepta_tratamiento_datos: false,
      cod_naturaleza_empresa: '',
      direccion_notificacion_referencia: '',
      fecha_cambio_representante_legal: '',
      fecha_inicio_cargo_rep_legal: '',
      fecha_inicio_cargo_actual: '',
      fecha_a_finalizar_cargo_actual: '',
      observaciones_vinculacion_cargo_actual: '',
      fecha_ultim_actualizacion_autorizaciones: '',
      fecha_creacion: '',
      fecha_ultim_actualiz_diferente_crea: '',
      tipo_documento: '',
      estado_civil: '',
      id_cargo: 0,
      id_unidad_organizacional_actual: 0,
      representante_legal: 0,
      cod_municipio_expedicion_id: '',
      id_persona_crea: 0,
      id_persona_ultim_actualiz_diferente_crea: 0,
      cod_departamento_expedicion: '',
      cod_departamento_residencia: '',
      cod_departamento_notificacion: '',
      cod_departamento_laboral: '',
    }
  );
  const { userinfo } = useSelector((state: AuthSlice) => state.auth);

  const [
    is_modal_active_historico_representante,
    set_is_modal_active_historico_representante,
  ] = useState(false);

  const [fecha_inicio_representante, set_fecha_inicio_representante] =
    useState<Dayjs | null>(null);

  const handle_change_fecha_inicio_representante = (
    value: Dayjs | null
  ): void => {
    const date = dayjs(value).format('YYYY-MM-DD');
    set_value('fecha_inicio_cargo_rep_legal', date);
    set_fecha_inicio_representante(value);
  };

  const handle_open_historico_representante = (): void => {
    set_is_modal_active_historico_representante(true);
  };
  const result_representante = (
    result_representante_datalle: DataPersonas
  ): void => {
    set_datos_representante({
      ...datos_representante,
      id_persona: result_representante_datalle.id_persona,
      nombre_unidad_organizacional_actual:
        result_representante_datalle.nombre_unidad_organizacional_actual,
      tiene_usuario: result_representante_datalle.tiene_usuario,
      primer_nombre: result_representante_datalle.primer_nombre,
      segundo_nombre: result_representante_datalle.segundo_nombre,
      primer_apellido: result_representante_datalle.primer_apellido,
      segundo_apellido: result_representante_datalle.segundo_apellido,
      tipo_persona: result_representante_datalle.tipo_persona,
      numero_documento: result_representante_datalle.numero_documento,
      digito_verificacion: result_representante_datalle.digito_verificacion,
      nombre_comercial: result_representante_datalle.nombre_comercial,
      razon_social: result_representante_datalle.razon_social,
      pais_residencia: result_representante_datalle.pais_residencia,
      municipio_residencia: result_representante_datalle.municipio_residencia,
      direccion_residencia: result_representante_datalle.direccion_residencia,
      direccion_residencia_ref:
        result_representante_datalle.direccion_residencia_ref,
      ubicacion_georeferenciada:
        result_representante_datalle.ubicacion_georeferenciada,
      direccion_laboral: result_representante_datalle.direccion_laboral,
      direccion_notificaciones:
        result_representante_datalle.direccion_notificaciones,
      pais_nacimiento: result_representante_datalle.pais_nacimiento,
      fecha_nacimiento: result_representante_datalle.fecha_nacimiento,
      sexo: result_representante_datalle.sexo,
      fecha_asignacion_unidad:
        result_representante_datalle.fecha_asignacion_unidad,
      es_unidad_organizacional_actual:
        result_representante_datalle.es_unidad_organizacional_actual,
      email: result_representante_datalle.email,
      email_empresarial: result_representante_datalle.email_empresarial,
      telefono_fijo_residencial:
        result_representante_datalle.telefono_fijo_residencial,
      telefono_celular: result_representante_datalle.telefono_celular,
      telefono_empresa: result_representante_datalle.telefono_empresa,
      cod_municipio_laboral_nal:
        result_representante_datalle.cod_municipio_laboral_nal,
      cod_municipio_notificacion_nal:
        result_representante_datalle.cod_municipio_notificacion_nal,
      telefono_celular_empresa:
        result_representante_datalle.telefono_celular_empresa,
      telefono_empresa_2: result_representante_datalle.telefono_empresa_2,
      cod_pais_nacionalidad_empresa:
        result_representante_datalle.cod_pais_nacionalidad_empresa,
      acepta_notificacion_sms:
        result_representante_datalle.acepta_notificacion_sms,
      acepta_notificacion_email:
        result_representante_datalle.acepta_notificacion_email,
      acepta_tratamiento_datos:
        result_representante_datalle.acepta_tratamiento_datos,
      cod_naturaleza_empresa:
        result_representante_datalle.cod_naturaleza_empresa,
      direccion_notificacion_referencia:
        result_representante_datalle.direccion_notificacion_referencia,
      fecha_cambio_representante_legal:
        result_representante_datalle.fecha_cambio_representante_legal,
      fecha_inicio_cargo_rep_legal:
        result_representante_datalle.fecha_inicio_cargo_rep_legal,
      fecha_inicio_cargo_actual:
        result_representante_datalle.fecha_inicio_cargo_actual,
      fecha_a_finalizar_cargo_actual:
        result_representante_datalle.fecha_a_finalizar_cargo_actual,
      observaciones_vinculacion_cargo_actual:
        result_representante_datalle.observaciones_vinculacion_cargo_actual,
      fecha_ultim_actualizacion_autorizaciones:
        result_representante_datalle.fecha_ultim_actualizacion_autorizaciones,
      fecha_creacion: result_representante_datalle.fecha_creacion,
      fecha_ultim_actualiz_diferente_crea:
        result_representante_datalle.fecha_ultim_actualiz_diferente_crea,
      tipo_documento:
        result_representante_datalle.fecha_ultim_actualiz_diferente_crea,
      estado_civil: result_representante_datalle.estado_civil,
      id_cargo: result_representante_datalle.id_cargo,
      id_unidad_organizacional_actual:
        result_representante_datalle.id_unidad_organizacional_actual,
      representante_legal: result_representante_datalle.representante_legal,
      cod_municipio_expedicion_id:
        result_representante_datalle.cod_municipio_expedicion_id,
      id_persona_crea: result_representante_datalle.id_persona_crea,
      id_persona_ultim_actualiz_diferente_crea:
        result_representante_datalle.id_persona_ultim_actualiz_diferente_crea,
      cod_departamento_expedicion:
        result_representante_datalle.cod_departamento_expedicion,
      cod_departamento_residencia:
        result_representante_datalle.cod_departamento_residencia,
      cod_departamento_notificacion:
        result_representante_datalle.cod_departamento_notificacion,
      cod_departamento_laboral:
        result_representante_datalle.cod_departamento_laboral,
    });
    set_fecha_inicio_representante(
      dayjs(result_representante_datalle.fecha_inicio_cargo_rep_legal)
    );
    set_value(
      'fecha_inicio_cargo_rep_legal',
      result_representante_datalle.fecha_inicio_cargo_rep_legal
    );
    set_id_reoresentante_legal(result_representante_datalle.id_persona);
  };
  const get_datos_representante_legal = async (
    id_representante_legal: number
  ): Promise<void> => {
    try {
      const {
        data: { data: response },
      } = await consultar_datos_persona(id_representante_legal);
      set_id_reoresentante_legal(response.id_persona);
      set_datos_representante(response);
    } catch (err) {
      control_error('Ocurrio un error con los datos del representante legal');
    }
  };

  useEffect(() => {
    void get_datos_representante_legal(id_representante_legal);
    set_fecha_inicio_representante(fecha_inicio as any);
  }, [id_representante_legal !== undefined && id_representante_legal !== 0]);

  const tipos_doc = [
    {
      value: 'CC',
      label: 'Cédula de ciudadanía',
    },
    {
      value: 'CE',
      label: 'Cédula extranjería',
    },
    {
      value: 'TI',
      label: 'Tarjeta de identidad',
    },
    {
      value: 'RC',
      label: 'Registro civil',
    },
    {
      value: 'NU',
      label: 'NUIP',
    },
    {
      value: 'PA',
      label: 'Pasaporte',
    },
    {
      value: 'PE',
      label: 'Permiso especial de permanencia',
    },
  ];

  return (
    <>
      <Grid container spacing={2}>
        {/* datos de representante legal */}
        {datos_representante !== undefined && datos_representante !== null && (
          <>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Tipo de Documento"
                id="tipo-doc-representante"
                select
                fullWidth
                size="small"
                margin="dense"
                required
                autoFocus
                disabled
                value={datos_representante?.tipo_documento}
              >
                {tipos_doc.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Número Identificación"
                id="documento_representante"
                type="number"
                fullWidth
                size="small"
                margin="dense"
                required
                value={datos_representante?.numero_documento}
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Representante Legal"
                type="text"
                fullWidth
                size="small"
                margin="dense"
                required
                autoFocus
                value={datos_representante?.primer_nombre}
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="text"
                size="small"
                label="Dirección"
                disabled
                required
                autoFocus
                value={datos_representante?.direccion_notificaciones}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="text"
                size="small"
                label="Telefono"
                disabled
                required
                autoFocus
                value={datos_representante?.telefono_celular}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomSelect
                label="Ciudad"
                name="cod_municipio_notificacion_nal"
                value={datos_representante?.cod_municipio_notificacion_nal}
                options={ciudad_notificacion_opt}
                disabled={true}
                required={false}
                errors={errors}
                register={register}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="email"
                size="small"
                label="E-mail"
                disabled
                required={false}
                autoFocus
                value={datos_representante?.email_empresarial}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Fecha de inicio como representante legal"
                  inputFormat="YYYY-MM-DD"
                  openTo="day"
                  value={dayjs(fecha_inicio_representante)}
                  onChange={handle_change_fecha_inicio_representante}
                  views={['year', 'month', 'day']}
                  renderInput={(params) => (
                    <TextField
                      fullWidth
                      size="small"
                      {...params}
                      {...register('fecha_inicio_cargo_rep_legal', {
                        required: true,
                      })}
                      error={
                        errors.fecha_inicio_representante?.type === 'required'
                      }
                      helperText={
                        errors.fecha_inicio_representante?.type === 'required'
                          ? 'Este campo es obligatorio'
                          : ''
                      }
                    />
                  )}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12}>
              <Stack
                justifyContent="flex-end"
                sx={{ m: '0 0 0 0' }}
                direction="row"
                spacing={2}
              >
                <DialogRepresentanteLegal onResult={result_representante} />
                {id_persona !== userinfo.id_persona && (
                  <>
                    <Button
                      variant="outlined"
                      color='warning'
                      startIcon={<RemoveRedEyeIcon />}
                      onClick={() => {
                        handle_open_historico_representante();
                      }}
                    >
                      Historico Representante Legal
                    </Button>
                  </>
                )}
              </Stack>
            </Grid>
          </>
        )}
      </Grid>

      <DialogHistoricoRepresentanteLegal
        is_modal_active={is_modal_active_historico_representante}
        set_is_modal_active={set_is_modal_active_historico_representante}
        id_persona={id_persona}
      />
    </>
  );
};
