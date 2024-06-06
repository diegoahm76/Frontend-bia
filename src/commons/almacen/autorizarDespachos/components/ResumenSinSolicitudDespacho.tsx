import { Button, Chip, Divider, Grid, TextField } from '@mui/material';
import React, { useState } from 'react';
import { Title } from '../../../../components';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { interface_resumen_solicitud_despacho } from '../interfaces/types';
import TablaArticulosDespachados from '../tables/TablaArticulosDespachados';
import { baseURL } from '../../../../api/axios';

interface props {
  data_resumen_solicitud_despacho: interface_resumen_solicitud_despacho
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const ResumenSinSolicitudDespacho: React.FC<props> = ({
  data_resumen_solicitud_despacho,
}) => {

  const url_base = baseURL.replace("/api/", "");

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
                  !(dayjs(data_resumen_solicitud_despacho?.fecha_despacho ?? null)).isValid() ?
                    null :
                    dayjs(data_resumen_solicitud_despacho?.fecha_despacho ?? null)
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
                Object.keys(data_resumen_solicitud_despacho).length !== 0
                  ?
                  data_resumen_solicitud_despacho?.observacion ?? ''
                  : ''
              }
            />
          </Grid>
        </Grid>

        <Title title='Funcionario que despacha' />

        <Grid item xs={12} lg={3}>
          <TextField
            disabled
            fullWidth
            size="small"
            label="Tipo de documento:"
            value={data_resumen_solicitud_despacho?.tipo_documento_persona_persona_despacha ?? ''}
          />
        </Grid>

        <Grid item xs={12} lg={3}>
          <TextField
            disabled
            fullWidth
            size="small"
            label="Número de documento:"
            value={data_resumen_solicitud_despacho?.numero_documento_persona_persona_despacha ?? ''}
          />
        </Grid>

        <Grid item xs={12} lg={3}>
          <TextField
            disabled
            fullWidth
            size="small"
            label="Nombres:"
            value={data_resumen_solicitud_despacho?.primer_nombre_persona_persona_despacha ?? ''}
          />
        </Grid>

        <Grid item xs={12} lg={3}>
          <TextField
            disabled
            fullWidth
            size="small"
            label="Apellidos:"
            value={data_resumen_solicitud_despacho?.primer_apellido_persona_persona_despacha ?? ''}
          />
        </Grid>

        <Title title='Funcionario que anula el despacho' />

        <Grid item xs={12} lg={3}>
          <TextField
            disabled
            fullWidth
            size="small"
            label="Tipo de documento:"
            value={data_resumen_solicitud_despacho?.tipo_documento_persona_anula ?? ''}
          />
        </Grid>

        <Grid item xs={12} lg={3}>
          <TextField
            disabled
            fullWidth
            size="small"
            label="Número de documento:"
            value={data_resumen_solicitud_despacho?.numero_documento_persona_anula ?? ''}
          />
        </Grid>

        <Grid item xs={12} lg={3}>
          <TextField
            disabled
            fullWidth
            size="small"
            label="Nombres:"
            value={data_resumen_solicitud_despacho?.primer_nombre_persona_anula ?? ''}
          />
        </Grid>

        <Grid item xs={12} lg={3}>
          <TextField
            disabled
            fullWidth
            size="small"
            label="Apellidos:"
            value={data_resumen_solicitud_despacho?.primer_apellido_persona_anula ?? ''}
          />
        </Grid>

        <Grid item xs={12} lg={9}>
          <TextField
            disabled
            fullWidth
            size="small"
            label="Justificación de la anulación:"
            value={data_resumen_solicitud_despacho?.justificacion_anulacion ?? ''}
          />
        </Grid>

        <Grid item xs={12} lg={3}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                disabled
                label="Fecha anulacion:"
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


        <TablaArticulosDespachados
          articulos_despachados={data_resumen_solicitud_despacho?.items_despacho}
        />

        <Title title='Anexos'/>
        {data_resumen_solicitud_despacho?.archivos_digitales?.length > 0 && data_resumen_solicitud_despacho?.archivos_digitales?.map((archivo, index) => (
          <Button
            sx={{mt: '1rem'}}
            key={index}
            variant="outlined"
            color="primary"
            onClick={() => window.open(url_base + archivo.ruta_archivo, '_blank')}
          >
            {archivo.nombre_de_Guardado}
          </Button>
        ))}

      </Grid>
    </>
  );
}

// eslint-disable-next-line no-restricted-syntax
export default ResumenSinSolicitudDespacho;