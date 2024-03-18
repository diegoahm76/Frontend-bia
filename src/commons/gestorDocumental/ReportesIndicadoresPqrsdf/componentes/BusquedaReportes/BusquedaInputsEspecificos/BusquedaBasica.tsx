/* eslint-disable @typescript-eslint/naming-convention */
import { Button } from '@mui/material';
import CleanIcon from '@mui/icons-material/CleaningServices';
import { LoadingButton } from '@mui/lab';
import { Grid, Stack, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { Title } from '../../../../../../components';
import { useAppSelector } from '../../../../../../hooks';
import GrainIcon from '@mui/icons-material/Grain';
import { control_info } from '../../../../alertasgestor/utils/control_error_or_success';
import { BusquedaReporteTipoUno } from './busquedaTipoReporteUno/BusquedaReporteTipoUno';
import { BusquedaReporteTipoTres } from './busquedaTipoReporteTres/BusquedaReporteTipoTres';
import { BusquedaReporteTipoCuatro } from './busquedaTipoReporteCuatro/BusquedaReporteTipoCuatro';
import { current } from '@reduxjs/toolkit';
import { ModalAndLoadingContext } from '../../../../../../context/GeneralContext';
import { useContext } from 'react';
// import { ChartDataContext } from '../../../context/DataChartContext';
import { showAlert } from '../../../../../../utils/showAlert/ShowAlert';
import { BusquedaReporteTipoDos } from './busquedaTipoReporteDos/BusquedaReporteTipoDos';
import { BusquedaReporteTipoCinco } from './busquedaTipoReporteCinco/BusquedaReporteTipoCinco';
import { ChartDataContextPQRSDF } from '../../../context/DataChartContext';
import { formatDateUse } from '../../../../panelDeVentanilla/toolkit/thunks/PqrsdfyComplementos/getPqrsdfPanVen.service';
import { fetchChartData } from '../../../../ReportesGeneralesGestorDocumental/services/getDataCharts.service';

export const BusquedaBasicaGeneradoraReporte = ({
  controlBusquedaGeneradoraReporte,
  handleSubmitBusquedaGeneradoraReporte,
  resetBusquedaGeneradoraReporte,
  watchBusquedaGeneradoraReporte,
}: any): JSX.Element => {
  //* redux states
  const { currentBusquedaReporte } = useAppSelector(
    (state) => state.ReportesGeneralesGestorSlice
  );

  //* context declaration
  const {
    generalLoading,
    handleGeneralLoading,
    secondLoading,
    handleSecondLoading,
    thirdLoading,
    handleThirdLoading,
    fourthLoading,
    handleFourthLoading,
    fifthLoading,
    handleFifthLoading,
  } = useContext(ModalAndLoadingContext);

  const {
    chartDataViewOne,
    setChartDataViewOne,
    setChartDataViewTwo,
    setChartDataViewThree,
    setChartDataViewFour,
    setIsReportReady,
    setChartDataViewFifth,
  } = useContext(ChartDataContextPQRSDF);

  const watchBusquedaGeneradoraReporteExe = watchBusquedaGeneradoraReporte();

  const handleSubmit = () => {
    console.log('realizando la búsqueda');
    const formattedFechaInicio = controlBusquedaGeneradoraReporte._formValues
    .fecha_inicio
    ? encodeURIComponent(
        formatDateUse(
          new Date(controlBusquedaGeneradoraReporte._formValues.fecha_inicio)
        )
      )
    : '';
  const formattedFechaFin = controlBusquedaGeneradoraReporte._formValues
    .fecha_fin
    ? encodeURIComponent(
        formatDateUse(
          new Date(controlBusquedaGeneradoraReporte._formValues.fecha_fin)
        )
      )
    : '';

    // gestor/reporte_indices_pqrsdf/reporte_general/get/?fecha_inicio&fecha_fin
    const chartDataHandlers: any = {
      1: {
        setChartData: setChartDataViewOne,
        url: `gestor/reporte_indices_pqrsdf/reporte_general/get/?fecha_inicio=${formattedFechaInicio ?? ''}&fecha_fin=${formattedFechaFin ?? ''}`,
        handleLoading: handleGeneralLoading,
      },
      2: {
        setChartData: setChartDataViewTwo,
        url: 'http://localhost:3001/chartDos',
        handleLoading: handleSecondLoading,
      },
      3: {
        setChartData: setChartDataViewThree,
        url: 'http://localhost:3001/chartTres',
        handleLoading: handleThirdLoading,
      },
      4: {
        setChartData: setChartDataViewFour,
        url: 'http://localhost:3001/chartCuatro',
        handleLoading: handleFourthLoading,
      },
      5: {
        setChartData: setChartDataViewFifth,
        url: 'http://localhost:3001/chartCinco',
        handleLoading: handleFifthLoading,
      },
    };

    const handlers = chartDataHandlers[currentBusquedaReporte?.value];

    if (handlers) {
      fetchChartData(
        handlers.setChartData,
        handlers.url,
        handlers.handleLoading,
        setIsReportReady
      );
    } else {
      showAlert('Atención', 'Indicador no válido', 'warning');
    }
  };

  if (!currentBusquedaReporte) {
    return <></>;
  }

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
      }}
    >
      <Grid item xs={12}>
        <Title
          title={`Búsqueda generadora de indicadores gerenciales para:  ${currentBusquedaReporte?.label}`}
        />
        <form
          onSubmit={(w) => {
            w.preventDefault();
            console.log('busvando elemento');
            handleSubmit();
          }}
          style={{
            marginTop: '2.2rem',
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Controller
                name="fecha_inicio"
                control={controlBusquedaGeneradoraReporte}
                defaultValue=""
                render={({ field: { onChange, value } }) => (
                  <TextField
                    // required
                    fullWidth
                    label="Fecha inicio"
                    type="date"
                    size="small"
                    variant="outlined"
                    value={value}
                    InputLabelProps={{ shrink: true }}
                    inputProps={{
                      max: new Date().toISOString().split("T")[0],
                    }}
                    onChange={(e) => {
                      onChange(e.target.value);
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Controller
                name="fecha_fin"
                control={controlBusquedaGeneradoraReporte}
                defaultValue=""
                render={({ field: { onChange, value } }) => (
                  <TextField
                    // required
                    fullWidth
                    label="Fecha final"
                    type="date"
                    size="small"
                    variant="outlined"
                    value={value}
                    InputLabelProps={{ shrink: true }}
                    inputProps={{
                      max: new Date().toISOString().split("T")[0],
                    }}
                    onChange={(e) => {
                      onChange(e.target.value);
                    }}
                  />
                )}
              />
            </Grid>
            {currentBusquedaReporte?.value === 1 ? (
              <BusquedaReporteTipoUno
                controlBusquedaGeneradoraReporte={
                  controlBusquedaGeneradoraReporte
                }
              />
            ) : currentBusquedaReporte?.value === 2 ? (
              <BusquedaReporteTipoDos
                controlBusquedaGeneradoraReporte={
                  controlBusquedaGeneradoraReporte
                }
              />
            ) : currentBusquedaReporte?.value === 3 ? (
              <BusquedaReporteTipoTres
                controlBusquedaGeneradoraReporte={
                  controlBusquedaGeneradoraReporte
                }
              />
            ) : currentBusquedaReporte?.value === 4 ? (
              <BusquedaReporteTipoCuatro
                controlBusquedaGeneradoraReporte={
                  controlBusquedaGeneradoraReporte
                }
              />
            ) : currentBusquedaReporte?.value === 5 ? (
              <BusquedaReporteTipoCinco
                controlBusquedaGeneradoraReporte={
                  controlBusquedaGeneradoraReporte
                }
                resetBusquedaGeneradoraReporte={resetBusquedaGeneradoraReporte}
              />
            ) : (
              <>No hay elemento definido</>
            )}
          </Grid>

          <Stack
            direction="row"
            justifyContent="flex-end"
            spacing={2}
            sx={{ mb: '20px', mt: '20px' }}
          >
            <LoadingButton
              loading={
                generalLoading || secondLoading || thirdLoading || fourthLoading
              }
              type="submit"
              color="primary"
              variant="contained"
              startIcon={<GrainIcon />}
            >
              GENERAR REPORTE
            </LoadingButton>
            <Button
              color="primary"
              variant="outlined"
              startIcon={<CleanIcon />}
              onClick={() => {
                console.log('limpiar campos');
                control_info(
                  'Se han limpiado los campos de generación de reporte'
                );
                resetBusquedaGeneradoraReporte({
                  fecha_inicio: '',
                  fecha_fin: '',
                  tipo_reporte: '',
                  estado_pqrsdf: '',
                  sede: '',
                  unidad: '',
                  grupo: '',
                });
              }}
            >
              LIMPIAR CAMPOS
            </Button>
          </Stack>
        </form>
      </Grid>
    </Grid>
  );
};
