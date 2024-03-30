/* eslint-disable @typescript-eslint/naming-convention */
import { Button, Grid } from '@mui/material';
import React, { useContext } from 'react';
import { Title } from '../../../../../components';
import Select from 'react-select';
import { choicesBusquedaReportes } from '../../utils/choicesListaBusquedaReportes';
import { setCurrentBusquedaReporte } from '../../toolkit/ReportesGeneralesGestorSlice';
import { useAppDispatch, useAppSelector } from '../../../../../hooks';
import DoDisturbOffIcon from '@mui/icons-material/DoDisturbOff';
import { control_info } from '../../../alertasgestor/utils/control_error_or_success';
import { ChartDataContext } from '../../context/DataChartContext';

export const BusquedaGeneral = ({
  controlBusquedaGeneradoraReporte,
  handleSubmitBusquedaGeneradoraReporte,
  resetBusquedaGeneradoraReporte,
  watchBusquedaGeneradoraReporte,
}: any): JSX.Element => {
  //* dispatch declaration
  const dispatch = useAppDispatch();

  const { currentBusquedaReporte } = useAppSelector(
    (state) => state.ReportesGeneralesGestorSlice
  );

  //* context declaration
  const { setIsReportReady } = useContext(ChartDataContext);

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
        <Title title="Reportes indicadores gerenciales expedientes / carpetas" />
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
                setIsReportReady(false);
                resetBusquedaGeneradoraReporte({
                  fecha_inicio: '',
                  fecha_fin: '',
                  seccion_subseccion: '',
                  serie_subserie: '',
                  grupo: '',
                });
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
      {currentBusquedaReporte && (
        <Grid
          container
          spacing={2}
          sx={{ mb: '20px', justifyContent: 'center', alignItems: 'center' }}
        >
          <Grid
            item
            xs={12}
            sm={4}
            sx={{
              mt: '2rem',
            }}
          >
            <Button
              variant="contained"
              color="warning"
              startIcon={<DoDisturbOffIcon />}
              onClick={() => {
                dispatch(setCurrentBusquedaReporte(null));
                resetBusquedaGeneradoraReporte({
                  fecha_inicio: '',
                  fecha_fin: '',
                  seccion_subseccion: '',
                  serie_subserie: '',
                  grupo: '',
                });
                setIsReportReady(false);
                control_info('Módulo reiniciado, se ha quitado la selección');
              }}
              fullWidth
            >
              QUITAR SELECCIÓN
            </Button>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};
