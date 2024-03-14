/* eslint-disable @typescript-eslint/naming-convention */
import { Grid, TextField } from '@mui/material';
import React from 'react';
import { Controller } from 'react-hook-form';

export const BusquedaReporteTipoUno = ({
  controlBusquedaGeneradoraReporte,
}: any): JSX.Element => {
  return (
    <>
      <Grid item xs={12} sm={4}>
        <Controller
          name="sede"
          control={controlBusquedaGeneradoraReporte}
          render={({ field: { onChange, value } }) => (
            <TextField
              required
              disabled
              fullWidth
              label="Sede de la corporación"
              type="text"
              size="small"
              variant="outlined"
              value={'TODAS'}
              InputLabelProps={{ shrink: true }}
            />
          )}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <Controller
          name="numero_expediente"
          control={controlBusquedaGeneradoraReporte}
          defaultValue=""
          render={({ field: { onChange, value } }) => (
            <TextField
              disabled
              fullWidth
              label="Expediente / Carpeta"
              type="text"
              size="small"
              variant="outlined"
              value={'TODOS'}
              InputLabelProps={{ shrink: true }}
            />
          )}
        />
      </Grid>
    </>
  );
};
