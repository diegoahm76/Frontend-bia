import { Chip, Divider, Grid, TextField } from '@mui/material';
import React, { useState } from 'react';
import { Title } from '../../../../components';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import TablaArticulosDespachados from '../tables/TablaArticulosDespachados';
import { interface_resumen_despacho_sin_solicitud } from '../interfeces/types';
interface props {
  data_solicitud_ver_por_id_sin_solicitud: interface_resumen_despacho_sin_solicitud
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const ResumenSinSolicitudDespacho: React.FC<props> = ({
  data_solicitud_ver_por_id_sin_solicitud,
}) => {

  return (
    <>
      <Grid container spacing={2} marginTop={2} sx={{
        position: "relative",
        background: "#FAFAFA",
        borderRadius: "15px",
        p: "40px",
        mb: "20px",
        boxShadow: "0px 3px 6px #042F4A26",
      }}
      >
        <Title title='Resumen del despacho' />

        <Grid item container spacing={2} mt={2} xs={12}>
          <Grid item xs={12} lg={3}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                disabled
                label="Fecha despacho:"
                value={
                  !(dayjs(data_solicitud_ver_por_id_sin_solicitud?.fecha_despacho ?? null)).isValid() ?
                    null :
                    dayjs(data_solicitud_ver_por_id_sin_solicitud?.fecha_despacho ?? null)
                }
                onChange={() => { }} // No hace nada
                renderInput={(params) => (
                  <TextField fullWidth size="small" {...params} />
                )}
              />
            </LocalizationProvider>
          </Grid>

          <Grid item xs={12} lg={9}>
            <TextField
              disabled
              fullWidth
              size="small"
              label="Observación: "
              value={
                Object.keys(data_solicitud_ver_por_id_sin_solicitud).length !== 0
                  ?
                  data_solicitud_ver_por_id_sin_solicitud?.observacion ?? ''
                  : ''
              }
            />
          </Grid>
        </Grid>

        <Grid item mt={3} xs={12}>
          <Title title='Funcionario que despacha' />
        </Grid>

        <Grid item xs={12} lg={3}>
          <TextField
            disabled
            fullWidth
            size="small"
            label="Tipo de documento:"
            value={data_solicitud_ver_por_id_sin_solicitud?.tipo_documento_persona_persona_despacha ?? ''}
          />
        </Grid>

        <Grid item xs={12} lg={3}>
          <TextField
            disabled
            fullWidth
            size="small"
            label="Número de documento:"
            value={data_solicitud_ver_por_id_sin_solicitud?.numero_documento_persona_persona_despacha ?? ''}
          />
        </Grid>

        <Grid item xs={12} lg={3}>
          <TextField
            disabled
            fullWidth
            size="small"
            label="Nombres:"
            value={data_solicitud_ver_por_id_sin_solicitud?.primer_nombre_persona_persona_despacha ?? ''}
          />
        </Grid>

        <Grid item xs={12} lg={3}>
          <TextField
            disabled
            fullWidth
            size="small"
            label="Apellidos:"
            value={data_solicitud_ver_por_id_sin_solicitud?.primer_apellido_persona_persona_despacha ?? ''}
          />
        </Grid>

        <Grid item mt={3} xs={12}>
          <Title title='Funcionario que anula despacho' />
        </Grid>

        <Grid item xs={12} lg={3}>
          <TextField
            disabled
            fullWidth
            size="small"
            label="Tipo de documento:"
            value={data_solicitud_ver_por_id_sin_solicitud?.tipo_documento_persona_anula ?? ''}
          />
        </Grid>

        <Grid item xs={12} lg={3}>
          <TextField
            disabled
            fullWidth
            size="small"
            label="Número de documento:"
            value={data_solicitud_ver_por_id_sin_solicitud?.numero_documento_persona_anula ?? ''}
          />
        </Grid>

        <Grid item xs={12} lg={3}>
          <TextField
            disabled
            fullWidth
            size="small"
            label="Nombres:"
            value={data_solicitud_ver_por_id_sin_solicitud?.primer_nombre_persona_anula ?? ''}
          />
        </Grid>

        <Grid item xs={12} lg={3}>
          <TextField
            disabled
            fullWidth
            size="small"
            label="Apellidos:"
            value={data_solicitud_ver_por_id_sin_solicitud?.primer_apellido_persona_anula ?? ''}
          />
        </Grid>

        <Grid item xs={12} lg={9}>
          <TextField
            disabled
            fullWidth
            size="small"
            label="Justificación de la anulación:"
            value={data_solicitud_ver_por_id_sin_solicitud?.justificacion_anulacion ?? ''}
          />
        </Grid>

        <Grid item xs={12} lg={3}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                disabled
                label="Fecha anulacion:"
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


        <TablaArticulosDespachados
          articulos_despachados={data_solicitud_ver_por_id_sin_solicitud?.items_despacho}
        />

      </Grid>
    </>
  );
}

// eslint-disable-next-line no-restricted-syntax
export default ResumenSinSolicitudDespacho;