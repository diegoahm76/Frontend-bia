import { FormLabel, Grid, Switch, TextField } from '@mui/material';
import React, { FC } from 'react';
import { interface_resumen_despacho_sin_solicitud } from '../interfeces/types';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import ResumenSinSolicitudDespacho from '../components/ResumenSinSolicitudDespacho';
import { Title } from '../../../../components';
import PrintResumenPDF from '../../autorizarDespachos/components/PrintResumenPDF';


interface props {
  data_solicitud_ver_por_id_sin_solicitud: interface_resumen_despacho_sin_solicitud
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const ResumenDespachoSinSolicitud: FC<props> = ({
  data_solicitud_ver_por_id_sin_solicitud,
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
            data_solicitud_ver_por_id_sin_solicitud?.estado_despacho === 'Ep' ? 'En espera' :
              data_solicitud_ver_por_id_sin_solicitud?.estado_despacho === 'Ac' ? 'Aceptada' :
                data_solicitud_ver_por_id_sin_solicitud?.estado_despacho === 'Re' ? 'Rechazada' :
                  data_solicitud_ver_por_id_sin_solicitud?.estado_despacho === 'An' ? 'Anulada' : ''
          }
        />
      </Grid>

      <Grid item xs={12} lg={3}>
        <TextField
          disabled
          fullWidth
          size="small"
          label="¿Es despacho sin solicitud?"
          value={data_solicitud_ver_por_id_sin_solicitud?.despacho_sin_solicitud ? 'SI' : 'NO'}
        />
      </Grid>

      <Grid item xs={12} lg={6}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            disabled
            label="Fecha de solicitud:"
            value={
              !(dayjs(data_solicitud_ver_por_id_sin_solicitud?.fecha_solicitud ?? null)).isValid() ?
                null :
                dayjs(data_solicitud_ver_por_id_sin_solicitud?.fecha_solicitud ?? null)
            }
            onChange={() => { }} // No hace nada
            renderInput={(params) => (
              <TextField fullWidth size="small" {...params} />
            )}
          />
        </LocalizationProvider>
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
          value={data_solicitud_ver_por_id_sin_solicitud?.tipo_documento_persona_solicita ?? ''}
        />
      </Grid>

      <Grid item xs={12} lg={3}>
        <TextField
          disabled
          fullWidth
          size="small"
          label="Número de documento:"
          value={data_solicitud_ver_por_id_sin_solicitud?.numero_documento_persona_solicita ?? ''}
        />
      </Grid>

      <Grid item xs={12} lg={3}>
        <TextField
          disabled
          fullWidth
          size="small"
          label="Nombres:"
          value={data_solicitud_ver_por_id_sin_solicitud?.primer_nombre_persona_solicita ?? ''}
        />
      </Grid>

      <Grid item xs={12} lg={3}>
        <TextField
          disabled
          fullWidth
          size="small"
          label="Apellidos:"
          value={data_solicitud_ver_por_id_sin_solicitud?.primer_apellido_persona_solicita ?? ''}
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
          value={
            Object.keys(data_solicitud_ver_por_id_sin_solicitud).length !== 0 ?
              data_solicitud_ver_por_id_sin_solicitud?.asignaciones_activo[0]?.tipo_documento_funcionario_resp_unidad ?? ''
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
            Object.keys(data_solicitud_ver_por_id_sin_solicitud).length !== 0 ?
              data_solicitud_ver_por_id_sin_solicitud?.asignaciones_activo[0]?.numero_documento_funcionario_resp_unidad ?? ''
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
            Object.keys(data_solicitud_ver_por_id_sin_solicitud).length !== 0 ?
              data_solicitud_ver_por_id_sin_solicitud?.asignaciones_activo[0]?.primer_nombre_funcionario_resp_unidad ?? ''
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
            Object.keys(data_solicitud_ver_por_id_sin_solicitud).length !== 0 ?
              data_solicitud_ver_por_id_sin_solicitud?.asignaciones_activo[0]?.primer_apellido_funcionario_resp_unidad ?? ''
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
            Object.keys(data_solicitud_ver_por_id_sin_solicitud).length !== 0 ?
              data_solicitud_ver_por_id_sin_solicitud?.asignaciones_activo[0]?.observacion ?? ''
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
              Object.keys(data_solicitud_ver_por_id_sin_solicitud).length !== 0 ?
                !(dayjs(data_solicitud_ver_por_id_sin_solicitud?.asignaciones_activo[0]?.fecha_asignacion ?? null)).isValid() ?
                  null :
                  dayjs(data_solicitud_ver_por_id_sin_solicitud?.asignaciones_activo[0]?.fecha_asignacion ?? null)
                : null
            }
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
          value={
            Object.keys(data_solicitud_ver_por_id_sin_solicitud).length !== 0 ?
              data_solicitud_ver_por_id_sin_solicitud?.asignaciones_activo[0]?.tipo_documento_persona_operario ?? ''
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
            Object.keys(data_solicitud_ver_por_id_sin_solicitud).length !== 0 ?
              data_solicitud_ver_por_id_sin_solicitud?.asignaciones_activo[0]?.numero_documento_persona_operario ?? ''
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
            Object.keys(data_solicitud_ver_por_id_sin_solicitud).length !== 0 ?
              data_solicitud_ver_por_id_sin_solicitud?.asignaciones_activo[0]?.primer_nombre_persona_operario ?? ''
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
            Object.keys(data_solicitud_ver_por_id_sin_solicitud).length !== 0 ?
              data_solicitud_ver_por_id_sin_solicitud?.asignaciones_activo[0]?.primer_apellido_persona_operario ?? ''
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
          value={data_solicitud_ver_por_id_sin_solicitud?.despacho_anulado ? 'SI' : 'NO'}
        />
      </Grid>

      <Grid item xs={12} lg={6}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            disabled
            label="Fecha de anulacion:"
            value={
              !(dayjs(data_solicitud_ver_por_id_sin_solicitud?.fecha_anulacion ?? null)).isValid() ?
                null :
                dayjs(data_solicitud_ver_por_id_sin_solicitud?.fecha_anulacion ?? null)
            }
            onChange={() => { }} // No hace nada
            renderInput={(params) => (
              <TextField fullWidth size="small" {...params} />
            )}
          />
        </LocalizationProvider>
      </Grid>

      <ResumenSinSolicitudDespacho
        data_solicitud_ver_por_id_sin_solicitud={data_solicitud_ver_por_id_sin_solicitud}
      />


    </>
  );
}

// eslint-disable-next-line no-restricted-syntax
export default ResumenDespachoSinSolicitud;