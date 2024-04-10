import { Chip, Divider, Grid, TextField } from '@mui/material';
import React, { useState } from 'react';
import { Title } from '../../../../components';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import TablaArticulosDespachados from '../tables/TablaArticulosDespachados';
import { interface_articulos_despachados, interface_inputs_resumen_despacho } from '../interfaces/types';
import dayjs from 'dayjs';

interface props {
  inputs_resumen_despacho: interface_inputs_resumen_despacho
  data_articulos_despachados: interface_articulos_despachados[]
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const ResumenDespacho: React.FC<props> = ({
  inputs_resumen_despacho,
  data_articulos_despachados,
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
                value={!(dayjs(inputs_resumen_despacho.fecha_despacho)).isValid() && null}
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
              label="Motivo"
              value={inputs_resumen_despacho.motivo ?? ''}
            />
          </Grid>
        </Grid>

        <Grid item mt={3} xs={12}>
          <Divider orientation="horizontal" variant="fullWidth" style={{marginBlock: 'auto', width: '100%'}}>
            <Chip label="FUNCIONARIO QUE DESPACHA" size="small" />
          </Divider>
        </Grid>

        <Grid item xs={12} lg={3}>
          <TextField
            disabled
            fullWidth
            size="small"
            label="Tipo de documento"
            value={inputs_resumen_despacho.tp_documento_pers_despacha ?? ''}
          />
        </Grid>

        <Grid item xs={12} lg={3}>
          <TextField
            disabled
            fullWidth
            size="small"
            label="Documento"
            value={inputs_resumen_despacho.documento_pers_despacha ?? ''}
          />
        </Grid>

        <Grid item xs={12} lg={3}>
          <TextField
            disabled
            fullWidth
            size="small"
            label="Nombres"
            value={inputs_resumen_despacho.nombres_pers_despacha ?? ''}
          />
        </Grid>

        <Grid item xs={12} lg={3}>
          <TextField
            disabled
            fullWidth
            size="small"
            label="Apellidos"
            value={inputs_resumen_despacho.apellidos_pers_despacha ?? ''}
          />
        </Grid>

        <Grid item mt={3} xs={12}>
          <Divider orientation="horizontal" variant="fullWidth" style={{marginBlock: 'auto', width: '100%'}}>
            <Chip label="FUNCIONARIO QUE ANULA" size="small" />
          </Divider>
        </Grid>

        <Grid item xs={12} lg={3}>
          <TextField
            disabled
            fullWidth
            size="small"
            label="Tipo de documento"
            value={inputs_resumen_despacho.tp_documento_pers_anula ?? ''}
          />
        </Grid>

        <Grid item xs={12} lg={3}>
          <TextField
            disabled
            fullWidth
            size="small"
            label="Documento"
            value={inputs_resumen_despacho.documento_pers_anula ?? ''}
          />
        </Grid>

        <Grid item xs={12} lg={3}>
          <TextField
            disabled
            fullWidth
            size="small"
            label="Nombres"
            value={inputs_resumen_despacho.nombres_pers_anula ?? ''}
          />
        </Grid>

        <Grid item xs={12} lg={3}>
          <TextField
            disabled
            fullWidth
            size="small"
            label="Apellidos"
            value={inputs_resumen_despacho.apellidos_pers_anula ?? ''}
          />
        </Grid>

        <Grid item xs={12} lg={9}>
          <TextField
            disabled
            fullWidth
            size="small"
            label="Justificación"
            value={inputs_resumen_despacho.justificacion ?? ''}
          />
        </Grid>

        <Grid item xs={12} lg={3}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              disabled
              label="Fecha de anulación:"
              value={!(dayjs(inputs_resumen_despacho.fecha_anulacion)).isValid() && null}
              onChange={() => { }} // No hace nada
              renderInput={(params) => (
                <TextField fullWidth size="small" {...params} />
              )}
            />
          </LocalizationProvider>
        </Grid>

        <TablaArticulosDespachados 
          articulos_despachados={data_articulos_despachados}
        />

      </Grid>
    </>
  );
}

// eslint-disable-next-line no-restricted-syntax
export default ResumenDespacho;