import { Chip, Divider, Grid, TextField } from '@mui/material';
import React, { useState } from 'react';
import { Title } from '../../../../components';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import TablaArticulosDespachados from '../tables/TablaArticulosDespachados';
import { interface_resumen_despacho_con_solicitud } from '../interfeces/types';

interface props {
  data_solicitud_ver_por_id_con_solicitud: interface_resumen_despacho_con_solicitud
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const ResumenConSolicitudDespacho: React.FC<props> = ({
  data_solicitud_ver_por_id_con_solicitud,
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
                label="Fecha de despacho:"
                value={
                  Object.keys(data_solicitud_ver_por_id_con_solicitud).length !== 0 ?
                    !(dayjs(data_solicitud_ver_por_id_con_solicitud?.despachos[0]?.fecha_despacho)).isValid() ?
                      null :
                      dayjs(data_solicitud_ver_por_id_con_solicitud?.despachos[0]?.fecha_despacho)
                    : null
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
                Object.keys(data_solicitud_ver_por_id_con_solicitud).length !== 0
                  ?
                  data_solicitud_ver_por_id_con_solicitud?.despachos[0]?.observacion ?? ''
                  : ''
              }
            />
          </Grid>
        </Grid>

        <Grid item mt={3} xs={12}>
          <Divider orientation="horizontal" variant="fullWidth" style={{ marginBlock: 'auto', width: '100%' }}>
            <Chip label="FUNCIONARIO QUE DESPACHA" size="small" />
          </Divider>
        </Grid>

        <Grid item xs={12} lg={3}>
          <TextField
            disabled
            fullWidth
            size="small"
            label="Tipo de documento"
            value={
              Object.keys(data_solicitud_ver_por_id_con_solicitud).length !== 0
                ?
                data_solicitud_ver_por_id_con_solicitud?.despachos[0]?.tipo_documento_persona_despacha ?? ''
                : ''
            }
          />
        </Grid>

        <Grid item xs={12} lg={3}>
          <TextField
            disabled
            fullWidth
            size="small"
            label="Documento"
            value={
              Object.keys(data_solicitud_ver_por_id_con_solicitud).length !== 0
                ?
                data_solicitud_ver_por_id_con_solicitud?.despachos[0]?.numero_documento_persona_despacha ?? ''
                : ''
            }
          />
        </Grid>

        <Grid item xs={12} lg={3}>
          <TextField
            disabled
            fullWidth
            size="small"
            label="Nombres"
            value={
              Object.keys(data_solicitud_ver_por_id_con_solicitud).length !== 0
                ?
                data_solicitud_ver_por_id_con_solicitud?.despachos[0]?.primer_nombre_persona_despacha ?? ''
                : ''
            }
          />
        </Grid>

        <Grid item xs={12} lg={3}>
          <TextField
            disabled
            fullWidth
            size="small"
            label="Apellidos"
            value={
              Object.keys(data_solicitud_ver_por_id_con_solicitud).length !== 0
                ?
                data_solicitud_ver_por_id_con_solicitud?.despachos[0]?.primer_apellido_persona_despacha ?? ''
                : ''
            }
          />
        </Grid>

        <Grid item mt={3} xs={12}>
          <Divider orientation="horizontal" variant="fullWidth" style={{ marginBlock: 'auto', width: '100%' }}>
            <Chip label="FUNCIONARIO QUE ANULA" size="small" />
          </Divider>
        </Grid>

        <Grid item xs={12} lg={3}>
          <TextField
            disabled
            fullWidth
            size="small"
            label="Tipo de documento"
            value={
              Object.keys(data_solicitud_ver_por_id_con_solicitud).length !== 0
                ?
                data_solicitud_ver_por_id_con_solicitud?.despachos[0]?.tipo_documento_persona_anula ?? ''
                : ''
            }
          />
        </Grid>

        <Grid item xs={12} lg={3}>
          <TextField
            disabled
            fullWidth
            size="small"
            label="Documento"
            value={
              Object.keys(data_solicitud_ver_por_id_con_solicitud).length !== 0
                ?
                data_solicitud_ver_por_id_con_solicitud?.despachos[0]?.numero_documento_persona_anula ?? ''
                : ''
            }
          />
        </Grid>

        <Grid item xs={12} lg={3}>
          <TextField
            disabled
            fullWidth
            size="small"
            label="Nombres"
            value={
              Object.keys(data_solicitud_ver_por_id_con_solicitud).length !== 0
                ?
                data_solicitud_ver_por_id_con_solicitud?.despachos[0]?.primer_nombre_persona_anula ?? ''
                : ''
            }
          />
        </Grid>

        <Grid item xs={12} lg={3}>
          <TextField
            disabled
            fullWidth
            size="small"
            label="Apellidos"
            value={
              Object.keys(data_solicitud_ver_por_id_con_solicitud).length !== 0
                ?
                data_solicitud_ver_por_id_con_solicitud?.despachos[0]?.primer_apellido_persona_anula ?? ''
                : ''
            }
          />
        </Grid>

        <Grid item xs={12} lg={9}>
          <TextField
            disabled
            fullWidth
            size="small"
            label="Justificación"
            value={
              Object.keys(data_solicitud_ver_por_id_con_solicitud).length !== 0
                ?
                data_solicitud_ver_por_id_con_solicitud?.despachos[0]?.justificacion_anulacion ?? ''
                : ''
            }
          />
        </Grid>

        <Grid item xs={12} lg={3}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              disabled
              label="Fecha de anulación:"
              value={
                Object.keys(data_solicitud_ver_por_id_con_solicitud).length !== 0 ?
                  !(dayjs(data_solicitud_ver_por_id_con_solicitud?.despachos[0]?.fecha_anulacion)).isValid() ?
                    null :
                    dayjs(data_solicitud_ver_por_id_con_solicitud?.despachos[0]?.fecha_anulacion)
                  : null
              }
              onChange={() => { }} // No hace nada
              renderInput={(params) => (
                <TextField fullWidth size="small" {...params} />
              )}
            />
          </LocalizationProvider>
        </Grid>

        <TablaArticulosDespachados
          articulos_despachados={data_solicitud_ver_por_id_con_solicitud?.items_despacho}
        />

      </Grid>
    </>
  );
}

// eslint-disable-next-line no-restricted-syntax
export default ResumenConSolicitudDespacho;