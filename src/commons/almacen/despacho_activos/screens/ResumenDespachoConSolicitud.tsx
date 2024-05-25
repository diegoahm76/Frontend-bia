import { FormLabel, Grid, Switch, TextField } from '@mui/material';
import React, { FC } from 'react';
import { interface_resumen_despacho_con_solicitud } from '../interfeces/types';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Title } from '../../../../components';
import TablaArticulosSolicitados from '../tables/TablaArticulosSolicitados';
import ResumenConSolicitudDespacho from '../components/ResumenConSolicitudDespacho';
import { convertir_cod_estado } from '../../solicitudDeActivos/validations/validations';
import PrintResumenPDF from '../../autorizarDespachos/components/PrintResumenPDF';


interface props {
  data_solicitud_ver_por_id_con_solicitud: interface_resumen_despacho_con_solicitud;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const ResumenDespachoConSolicitud: FC<props> = ({
  data_solicitud_ver_por_id_con_solicitud,
}) => {



  return (
    <>
      <PrintResumenPDF />
      
      <Grid item xs={12} lg={3}>
        <TextField
          disabled
          fullWidth
          size="small"
          label="Estado despacho: "
          value={convertir_cod_estado(data_solicitud_ver_por_id_con_solicitud?.estado_solicitud) || ''}
        />
      </Grid>

      <Grid item xs={12} lg={3}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            disabled
            label="Fecha de devolución:"
            value={
              Object.keys(data_solicitud_ver_por_id_con_solicitud).length !== 0 ?
                !(dayjs(data_solicitud_ver_por_id_con_solicitud?.items_despacho[0]?.fecha_devolucion ?? null))?.isValid() ?
                  null :
                  dayjs(data_solicitud_ver_por_id_con_solicitud?.items_despacho[0]?.fecha_devolucion ?? null)
                : null
            }
            onChange={() => { }} // No hace nada
            renderInput={(params) => (
              <TextField fullWidth size="small" {...params} />
            )}
          />
        </LocalizationProvider>
      </Grid>

      <Grid item xs={12} lg={3}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            disabled
            label="Fecha de solicitud:"
            value={dayjs(data_solicitud_ver_por_id_con_solicitud?.fecha_solicitud ?? null)}
            onChange={() => { }} // No hace nada
            renderInput={(params) => (
              <TextField fullWidth size="small" {...params} />
            )}
          />
        </LocalizationProvider>
      </Grid>

      <Grid item xs={12} lg={3} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <FormLabel sx={{ fontWeight: '700' }} htmlFor="solicitud_prestamo">
          ¿Es solicitud de préstamo?
        </FormLabel>
        <Switch
          id="solicitud_prestamo"
          checked={data_solicitud_ver_por_id_con_solicitud?.solicitud_prestamo ? true : false}
          disabled
          onChange={() => { }}
        />
      </Grid>

      <Grid item mt={3} xs={12}>
        <Title title='Funcionario solicitante' />
      </Grid>

      <Grid item xs={12} lg={3}>
        <TextField
          disabled
          fullWidth
          size="small"
          label="Tipo de documento:"
          value={data_solicitud_ver_por_id_con_solicitud?.tipo_documento_persona_solicitante ?? ''}
        />
      </Grid>

      <Grid item xs={12} lg={3}>
        <TextField
          disabled
          fullWidth
          size="small"
          label="Número de documento:"
          value={data_solicitud_ver_por_id_con_solicitud?.numero_documento_persona_solicitante ?? ''}
        />
      </Grid>

      <Grid item xs={12} lg={3}>
        <TextField
          disabled
          fullWidth
          size="small"
          label="Nombres:"
          value={data_solicitud_ver_por_id_con_solicitud?.primer_nombre_persona_solicitante ?? ''}
        />
      </Grid>

      <Grid item xs={12} lg={3}>
        <TextField
          disabled
          fullWidth
          size="small"
          label="Apellidos:"
          value={data_solicitud_ver_por_id_con_solicitud?.primer_apellido_persona_solicitante ?? ''}
        />
      </Grid>

      <Grid item mt={3} xs={12}>
        <Title title='Funcionario responsable' />
      </Grid>

      <Grid item xs={12} lg={3}>
        <TextField
          disabled
          fullWidth
          size="small"
          label="Tipo de documento:"
          value={data_solicitud_ver_por_id_con_solicitud?.tipo_documento_funcionario_resp_unidad ?? ''}
        />
      </Grid>

      <Grid item xs={12} lg={3}>
        <TextField
          disabled
          fullWidth
          size="small"
          label="Número de documento:"
          value={data_solicitud_ver_por_id_con_solicitud?.numero_documento_funcionario_resp_unidad ?? ''}
        />
      </Grid>

      <Grid item xs={12} lg={3}>
        <TextField
          disabled
          fullWidth
          size="small"
          label="Nombres:"
          value={data_solicitud_ver_por_id_con_solicitud?.primer_nombre_funcionario_resp_unidad ?? ''}
        />
      </Grid>

      <Grid item xs={12} lg={3}>
        <TextField
          disabled
          fullWidth
          size="small"
          label="Apellidos:"
          value={data_solicitud_ver_por_id_con_solicitud?.primer_apellido_funcionario_resp_unidad ?? ''}
        />
      </Grid>

      <Grid item xs={12} lg={9}>
        <TextField
          disabled
          fullWidth
          size="small"
          label="Justificación de rechazo:"
          value={data_solicitud_ver_por_id_con_solicitud?.justificacion_rechazo_resp ?? ''}
        />
      </Grid>

      <Grid item xs={12} lg={3}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            disabled
            label="Fecha de aprobación:"
            value={dayjs(data_solicitud_ver_por_id_con_solicitud?.fecha_aprobacion_resp ?? null)}
            onChange={() => { }} // No hace nada
            renderInput={(params) => (
              <TextField fullWidth size="small" {...params} />
            )}
          />
        </LocalizationProvider>
      </Grid>

      <Grid item mt={3} xs={12}>
        <Title title='Funcionario operario' />
      </Grid>

      <Grid item xs={12} lg={3}>
        <TextField
          disabled
          fullWidth
          size="small"
          label="Tipo de documento:"
          value={data_solicitud_ver_por_id_con_solicitud?.tipo_documento_persona_operario ?? ''}
        />
      </Grid>

      <Grid item xs={12} lg={3}>
        <TextField
          disabled
          fullWidth
          size="small"
          label="Número de documento:"
          value={data_solicitud_ver_por_id_con_solicitud?.numero_documento_persona_operario ?? ''}
        />
      </Grid>

      <Grid item xs={12} lg={3}>
        <TextField
          disabled
          fullWidth
          size="small"
          label="Nombres:"
          value={data_solicitud_ver_por_id_con_solicitud?.primer_nombre_persona_operario ?? ''}
        />
      </Grid>

      <Grid item xs={12} lg={3}>
        <TextField
          disabled
          fullWidth
          size="small"
          label="Apellidos:"
          value={data_solicitud_ver_por_id_con_solicitud?.primer_apellido_persona_operario ?? ''}
        />
      </Grid>

      <Grid item mt={3} xs={12}>
        <Title title='Funcionario que cierra por no disponibilidad en almacén' />
      </Grid>

      <Grid item xs={12} lg={3}>
        <TextField
          disabled
          fullWidth
          size="small"
          label="Tipo de documento:"
          value={data_solicitud_ver_por_id_con_solicitud?.tipo_documento_persona_cierra_no_dispo_alma ?? ''}
        />
      </Grid>

      <Grid item xs={12} lg={3}>
        <TextField
          disabled
          fullWidth
          size="small"
          label="Número de documento:"
          value={data_solicitud_ver_por_id_con_solicitud?.numero_documento_persona_cierra_no_dispo_alma ?? ''}
        />
      </Grid>

      <Grid item xs={12} lg={3}>
        <TextField
          disabled
          fullWidth
          size="small"
          label="Nombres:"
          value={data_solicitud_ver_por_id_con_solicitud?.primer_nombre_persona_cierra_no_dispo_alma ?? ''}
        />
      </Grid>

      <Grid item xs={12} lg={3}>
        <TextField
          disabled
          fullWidth
          size="small"
          label="Apellidos:"
          value={data_solicitud_ver_por_id_con_solicitud?.primer_apellido_persona_cierra_no_dispo_alma ?? ''}
        />
      </Grid>

      <Grid item xs={12} lg={9}>
        <TextField
          disabled
          fullWidth
          size="small"
          label="Observación cierre:"
          value={data_solicitud_ver_por_id_con_solicitud?.obser_cierre_no_dispo_alma ?? ''}
        />
      </Grid>

      <Grid item xs={12} lg={3}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            disabled
            label="Fecha de cierre:"
            value={!(dayjs(data_solicitud_ver_por_id_con_solicitud?.fecha_cierre_no_dispo_alma ?? null)).isValid() ?
              null :
              dayjs(data_solicitud_ver_por_id_con_solicitud?.fecha_cierre_no_dispo_alma ?? null)
            }
            onChange={() => { }} // No hace nada
            renderInput={(params) => (
              <TextField fullWidth size="small" {...params} />
            )}
          />
        </LocalizationProvider>
      </Grid>

      <Grid item mt={3} xs={12}>
        <Title title='Funcionario almacén que rechaza la solicitud' />
      </Grid>

      <Grid item xs={12} lg={3}>
        <TextField
          disabled
          fullWidth
          size="small"
          label="Tipo de documento:"
          value={data_solicitud_ver_por_id_con_solicitud?.tipo_documento_persona_alma_rechaza ?? ''}
        />
      </Grid>

      <Grid item xs={12} lg={3}>
        <TextField
          disabled
          fullWidth
          size="small"
          label="Número de documento:"
          value={data_solicitud_ver_por_id_con_solicitud?.numero_documento_persona_alma_rechaza ?? ''}
        />
      </Grid>

      <Grid item xs={12} lg={3}>
        <TextField
          disabled
          fullWidth
          size="small"
          label="Nombres:"
          value={data_solicitud_ver_por_id_con_solicitud?.primer_nombre_persona_alma_rechaza ?? ''}
        />
      </Grid>

      <Grid item xs={12} lg={3}>
        <TextField
          disabled
          fullWidth
          size="small"
          label="Apellidos:"
          value={data_solicitud_ver_por_id_con_solicitud?.primer_apellido_persona_alma_rechaza ?? ''}
        />
      </Grid>

      <Grid item xs={12} lg={9}>
        <TextField
          disabled
          fullWidth
          size="small"
          label="Justificación rechazo:"
          value={data_solicitud_ver_por_id_con_solicitud?.justificacion_rechazo_almacen ?? ''}
        />
      </Grid>

      <Grid item xs={12} lg={3}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            disabled
            label="Fecha de cierre:"
            value={!(dayjs(data_solicitud_ver_por_id_con_solicitud?.fecha_rechazo_almacen ?? null)).isValid() ?
              null :
              dayjs(data_solicitud_ver_por_id_con_solicitud?.fecha_rechazo_almacen ?? null)
            }
            onChange={() => { }} // No hace nada
            renderInput={(params) => (
              <TextField fullWidth size="small" {...params} />
            )}
          />
        </LocalizationProvider>
      </Grid>

      <Grid item xs={12} lg={12}>
        <TextField
          disabled
          fullWidth
          size="small"
          label="Motivo:"
          value={data_solicitud_ver_por_id_con_solicitud?.motivo ?? ''}
        />
      </Grid>

      <Grid item xs={12} lg={9}>
        <TextField
          disabled
          fullWidth
          size="small"
          label="Observación:"
          value={data_solicitud_ver_por_id_con_solicitud?.observacion ?? ''}
        />
      </Grid>

      <Grid item xs={12} lg={3}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            disabled
            label="Fecha de cierre:"
            value={!(dayjs(data_solicitud_ver_por_id_con_solicitud?.fecha_cierra_solicitud ?? null)).isValid() ?
              null :
              dayjs(data_solicitud_ver_por_id_con_solicitud?.fecha_cierra_solicitud ?? null)
            }
            onChange={() => { }} // No hace nada
            renderInput={(params) => (
              <TextField fullWidth size="small" {...params} />
            )}
          />
        </LocalizationProvider>
      </Grid>

      <Grid container item xs={12} sx={{
        position: "relative",
        background: "#FAFAFA",
        borderRadius: "15px",
        p: "40px",
        my: "20px",
        boxShadow: "0px 3px 6px #042F4A26",
      }}>
        <Title title="Artículos solicitados" />
        <TablaArticulosSolicitados
          articulos_solicitados={data_solicitud_ver_por_id_con_solicitud?.items_solicitud}
        />
      </Grid>

      <ResumenConSolicitudDespacho
        data_solicitud_ver_por_id_con_solicitud={data_solicitud_ver_por_id_con_solicitud}
      />

    </>
  );
}

// eslint-disable-next-line no-restricted-syntax
export default ResumenDespachoConSolicitud;