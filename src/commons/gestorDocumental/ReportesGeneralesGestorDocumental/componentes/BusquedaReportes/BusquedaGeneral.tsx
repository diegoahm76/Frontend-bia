/* eslint-disable @typescript-eslint/naming-convention */
import { Grid } from '@mui/material';
import React from 'react';
import { Title } from '../../../../../components';
import Select from 'react-select';
import { choicesBusquedaReportes } from '../../utils/choicesListaBusquedaReportes';
import { setCurrentBusquedaReporte } from '../../toolkit/ReportesGeneralesGestorSlice';
import { useAppDispatch, useAppSelector } from '../../../../../hooks';

export const BusquedaGeneral = (): JSX.Element => {
  //* dispatch declaration
  const dispatch = useAppDispatch();

  const { currentBusquedaReporte } = useAppSelector(
    (state) => state.ReportesGeneralesGestorSlice
  );
  return (
    <Grid
      container
      sx={{
        position: 'relative',
        background: '#FAFAFA',
        borderRadius: '15px',
        p: '20px',
        mb: '20px',
        boxShadow: '0px 3px 6px #042F4A26',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Grid item xs={12} sx={{ mb: '2rem' }}>
        <Title title="Reportes generales de gestor documental" />
      </Grid>
      <Grid
        container
        spacing={2}
        sx={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Grid
          item
          xs={12}
          sm={8}
          sx={{
            zIndex: 20,
          }}
        >
          <div>
            <Select
              required
              value={currentBusquedaReporte}
              onChange={(selectedOption) => {
                dispatch(setCurrentBusquedaReporte(selectedOption));
                console.log(selectedOption);
              }}
              options={choicesBusquedaReportes ?? []}
              placeholder="Seleccionar"
            />
            <label>
              <small
                style={{
                  color: 'rgba(0, 0, 0, 0.6)',
                  fontWeight: 'thin',
                  fontSize: '0.75rem',
                  marginTop: '0.25rem',
                  marginLeft: '0.25rem',
                }}
              >
                Seleccionar tipo de reporte
              </small>
            </label>
          </div>
        </Grid>
      </Grid>
    </Grid>
  );
};
