/* eslint-disable @typescript-eslint/naming-convention */
import { Grid, TextField } from '@mui/material'
import React from 'react'
import { Controller } from 'react-hook-form'

export const BusquedaReporteTipoDos = ({
  controlBusquedaGeneradoraReporte,
}: any): JSX.Element => {
  return (
    <>
      <Grid item xs={12} sm={4}>
        <Controller
          name="estado_pqrsdf"
          control={controlBusquedaGeneradoraReporte}
          render={() => (
            <TextField
              required
              disabled
              fullWidth
              label="Estado de la PQRSDF"
              type="text"
              size="small"
              variant="outlined"
              value={'TODOS'}
              InputLabelProps={{ shrink: true }}
            />
          )}
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <Controller
          name="sede"
          control={controlBusquedaGeneradoraReporte}
          render={() => (
            <TextField
              required
              disabled
              fullWidth
              label="Sede de la PQRSDF"
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
  )
}
