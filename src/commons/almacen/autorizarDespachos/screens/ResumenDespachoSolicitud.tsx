import { FormLabel, Grid, Switch, TextField } from '@mui/material';
import React, { FC } from 'react';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { interface_resumen_solicitud_despacho } from '../interfaces/types';
import { Title } from '../../../../components';
import ResumenSinSolicitudDespacho from '../components/ResumenSinSolicitudDespacho';
import TablaArticulosSolicitados from '../tables/TablaArticulosSolicitados';
import { useDispatch } from 'react-redux';
import { open_drawer_desktop } from '../../../../store/layoutSlice';
import jsPDF from 'jspdf';
import PrintResumenPDF from '../components/PrintResumenPDF';


interface props {
  data_resumen_solicitud_despacho: interface_resumen_solicitud_despacho
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const ResumenDespachoSolicitud: FC<props> = ({
  data_resumen_solicitud_despacho,
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
          value={
            data_resumen_solicitud_despacho?.estado_despacho === 'Ep' ? 'En espera' :
              data_resumen_solicitud_despacho?.estado_despacho === 'Ac' ? 'Aceptada' :
                data_resumen_solicitud_despacho?.estado_despacho === 'Re' ? 'Rechazada' :
                  data_resumen_solicitud_despacho?.estado_despacho === 'An' ? 'Anulada' : ''
          }
        />
      </Grid>

      <Grid item xs={12} lg={3}>
        <TextField
          disabled
          fullWidth
          size="small"
          label="¿Es despacho sin solicitud?"
          value={data_resumen_solicitud_despacho?.despacho_sin_solicitud ? 'SI' : 'NO'}
        />
      </Grid>

      <Grid item xs={12} lg={6}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            disabled
            label="Fecha de solicitud:"
            value={
              !(dayjs(data_resumen_solicitud_despacho?.fecha_solicitud ?? null)).isValid() ?
                null :
                dayjs(data_resumen_solicitud_despacho?.fecha_solicitud ?? null)
            }
            onChange={() => { }} // No hace nada
            renderInput={(params) => (
              <TextField fullWidth size="small" {...params} />
            )}
          />
        </LocalizationProvider>
      </Grid>

      <Grid container item xs={12} mt={2}>
        <Title title='Funcionario solicitante' />
      </Grid>

      <Grid item xs={12} lg={3}>
        <TextField
          disabled
          fullWidth
          size="small"
          label="Tipo de documento:"
          value={data_resumen_solicitud_despacho?.tipo_documento_persona_solicita ?? ''}
        />
      </Grid>

      <Grid item xs={12} lg={3}>
        <TextField
          disabled
          fullWidth
          size="small"
          label="Número de documento:"
          value={data_resumen_solicitud_despacho?.numero_documento_persona_solicita ?? ''}
        />
      </Grid>

      <Grid item xs={12} lg={3}>
        <TextField
          disabled
          fullWidth
          size="small"
          label="Nombres:"
          value={data_resumen_solicitud_despacho?.primer_nombre_persona_solicita ?? ''}
        />
      </Grid>

      <Grid item xs={12} lg={3}>
        <TextField
          disabled
          fullWidth
          size="small"
          label="Apellidos:"
          value={data_resumen_solicitud_despacho?.primer_apellido_persona_solicita ?? ''}
        />
      </Grid>

      <Grid container item xs={12} mt={2}>
        <Title title='Funcionario responsable' />
      </Grid>

      <Grid item xs={12} lg={3}>
        <TextField
          disabled
          fullWidth
          size="small"
          label="Tipo de documento:"
          value={
            Object.keys(data_resumen_solicitud_despacho).length !== 0 ?
              data_resumen_solicitud_despacho?.asignaciones_activo[0]?.tipo_documento_funcionario_resp_unidad ?? ''
              : ''
          }
        />
      </Grid>

      <Grid item xs={12} lg={3}>
        <TextField
          disabled
          fullWidth
          size="small"
          label="Número de documento:"
          value={
            Object.keys(data_resumen_solicitud_despacho).length !== 0 ?
              data_resumen_solicitud_despacho?.asignaciones_activo[0]?.numero_documento_funcionario_resp_unidad ?? ''
              : ''
          }
        />
      </Grid>

      <Grid item xs={12} lg={3}>
        <TextField
          disabled
          fullWidth
          size="small"
          label="Nombres:"
          value={
            Object.keys(data_resumen_solicitud_despacho).length !== 0 ?
              data_resumen_solicitud_despacho?.asignaciones_activo[0]?.primer_nombre_funcionario_resp_unidad ?? ''
              : ''
          }
        />
      </Grid>

      <Grid item xs={12} lg={3}>
        <TextField
          disabled
          fullWidth
          size="small"
          label="Apellidos:"
          value={
            Object.keys(data_resumen_solicitud_despacho).length !== 0 ?
              data_resumen_solicitud_despacho?.asignaciones_activo[0]?.primer_apellido_funcionario_resp_unidad ?? ''
              : ''
          }
        />
      </Grid>

      <Grid item xs={12} lg={9}>
        <TextField
          disabled
          fullWidth
          size="small"
          label="Observación:"
          value={
            Object.keys(data_resumen_solicitud_despacho).length !== 0 ?
              data_resumen_solicitud_despacho?.asignaciones_activo[0]?.observacion ?? ''
              : ''
          }
        />
      </Grid>

      <Grid item xs={12} lg={3}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            disabled
            label="Fecha de asignación:"
            value={
              Object.keys(data_resumen_solicitud_despacho).length !== 0 ?
                !(dayjs(data_resumen_solicitud_despacho?.asignaciones_activo[0]?.fecha_asignacion ?? null)).isValid() ?
                  null :
                  dayjs(data_resumen_solicitud_despacho?.asignaciones_activo[0]?.fecha_asignacion ?? null)
                : null
            }
            onChange={() => { }} // No hace nada
            renderInput={(params) => (
              <TextField fullWidth size="small" {...params} />
            )}
          />
        </LocalizationProvider>
      </Grid>

      <Grid container item xs={12} mt={2}>
        <Title title='Funcionario operario' />
      </Grid>

      <Grid item xs={12} lg={3}>
        <TextField
          disabled
          fullWidth
          size="small"
          label="Tipo de documento:"
          value={
            Object.keys(data_resumen_solicitud_despacho).length !== 0 ?
              data_resumen_solicitud_despacho?.asignaciones_activo[0]?.tipo_documento_persona_operario ?? ''
              : ''
          }
        />
      </Grid>

      <Grid item xs={12} lg={3}>
        <TextField
          disabled
          fullWidth
          size="small"
          label="Número de documento:"
          value={
            Object.keys(data_resumen_solicitud_despacho).length !== 0 ?
              data_resumen_solicitud_despacho?.asignaciones_activo[0]?.numero_documento_persona_operario ?? ''
              : ''
          }
        />
      </Grid>

      <Grid item xs={12} lg={3}>
        <TextField
          disabled
          fullWidth
          size="small"
          label="Nombres:"
          value={
            Object.keys(data_resumen_solicitud_despacho).length !== 0 ?
              data_resumen_solicitud_despacho?.asignaciones_activo[0]?.primer_nombre_persona_operario ?? ''
              : ''
          }
        />
      </Grid>

      <Grid item xs={12} lg={3}>
        <TextField
          disabled
          fullWidth
          size="small"
          label="Apellidos:"
          value={
            Object.keys(data_resumen_solicitud_despacho).length !== 0 ?
              data_resumen_solicitud_despacho?.asignaciones_activo[0]?.primer_apellido_persona_operario ?? ''
              : ''
          }
        />
      </Grid>

      <Grid item xs={12} lg={6}>
        <TextField
          disabled
          fullWidth
          size="small"
          label="¿Despacho anulado?:"
          value={data_resumen_solicitud_despacho?.despacho_anulado ? 'SI' : 'NO'}
        />
      </Grid>

      <Grid item xs={12} lg={6}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            disabled
            label="Fecha de anulación:"
            value={
              !(dayjs(data_resumen_solicitud_despacho?.fecha_anulacion ?? null)).isValid() ?
                null :
                dayjs(data_resumen_solicitud_despacho?.fecha_anulacion ?? null)
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
          articulos_solicitados={data_resumen_solicitud_despacho?.items_solicitud}
        />
      </Grid>

      <ResumenSinSolicitudDespacho
        data_resumen_solicitud_despacho={data_resumen_solicitud_despacho}
      />


    </>
  );
}

// eslint-disable-next-line no-restricted-syntax
export default ResumenDespachoSolicitud;