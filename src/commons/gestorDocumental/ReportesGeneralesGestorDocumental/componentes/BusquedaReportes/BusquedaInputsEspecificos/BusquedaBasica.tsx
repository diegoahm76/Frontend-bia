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
import { fetchChartData } from '../../../services/getDataCharts.service';
import { current } from '@reduxjs/toolkit';
import { ModalAndLoadingContext } from '../../../../../../context/GeneralContext';
import { useContext } from 'react';
import { ChartDataContext } from '../../../context/DataChartContext';
import { showAlert } from '../../../../../../utils/showAlert/ShowAlert';
import { formatDateUse } from '../../../../panelDeVentanilla/toolkit/thunks/PqrsdfyComplementos/getPqrsdfPanVen.service';

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
  } = useContext(ModalAndLoadingContext);

  const {
    chartDataViewOne,
    setChartDataViewOne,
    setChartDataViewTwo,
    setChartDataViewThree,
    setChartDataViewFour,
    setIsReportReady,
  } = useContext(ChartDataContext);

  const watchBusquedaGeneradoraReporteExe = watchBusquedaGeneradoraReporte();

  const handleSubmit = () => {
    /*  const chartUrlForPrueba = {
      1: 'http://localhost:3001/chartUno',
      2: 'http://localhost:3001/chartDos',
      3: 'http://localhost:3001/chartTres',
      4: 'http://localhost:3001/chartCuatro',
    }*/
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
    console.log('chartDataViewOne', chartDataViewOne);
    // `gestor/reporte_indices_archivos_carpetas/reporte_general/get/?fecha_inicio=${formattedFechaInicio ?? ''}&fecha_fin=${formattedFechaFin ?? ''}`
    const chartDataHandlers: any = {
      1: {
        setChartData: setChartDataViewOne,
        url: `gestor/reporte_indices_archivos_carpetas/reporte_general/get/?fecha_inicio=${
          formattedFechaInicio ?? ''
        }&fecha_fin=${formattedFechaFin ?? ''}`,
        handleLoading: handleGeneralLoading,
      },
      /*2: {
        setChartData: setChartDataViewTwo,
        url: `gestor/reporte_indices_archivos_carpetas/reporte_unidad/${watchBusquedaGeneradoraReporteExe?.unidad_organizacional?.value ?? 'default'}/get/?fecha_inicio=${
          formattedFechaInicio ?? ''
        }&fecha_fin=${formattedFechaFin ?? ''}`,
        handleLoading: handleSecondLoading,
      },*/
      3: {
        setChartData: setChartDataViewThree,
        url: `gestor/reporte_indices_archivos_carpetas/reporte_unidad/get/${watchBusquedaGeneradoraReporteExe?.seccion_subseccion?.value ?? 0}?fecha_inicio=${
          formattedFechaInicio ?? ''
        }&fecha_fin=${formattedFechaFin ?? ''}`,
        handleLoading: handleThirdLoading,
      },
      // serie_subserie
      4: {
        //gestor/reporte_indices_archivos_carpetas/reporte_unidad_oficina/get/5381/?fecha_inicio=2021-09-01&fecha_fin=2021-09-30&serie_subserie=1
        setChartData: setChartDataViewFour,
        url: `gestor/reporte_indices_archivos_carpetas/reporte_unidad_oficina/get/${watchBusquedaGeneradoraReporteExe?.grupo?.value ?? 0}/?fecha_inicio=${
          formattedFechaInicio ?? ''
        }&fecha_fin=${formattedFechaFin ?? ''}&serie_subserie=${watchBusquedaGeneradoraReporteExe?.serie_subserie?.value ?? ''}`,
        handleLoading: handleFourthLoading,
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
            ) /*: currentBusquedaReporte?.value === 2 ? (
              <BusquedaReporteTipoUno
                controlBusquedaGeneradoraReporte={
                  controlBusquedaGeneradoraReporte
                }
              />
            ) */: currentBusquedaReporte?.value === 3 ? (
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
                resetBusquedaGeneradoraReporte={resetBusquedaGeneradoraReporte}
              />
            ) : (
              <>No hay elemento</>
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
                resetBusquedaGeneradoraReporte({
                  fecha_inicio: '',
                  fecha_fin: '',
                });
                control_info(
                  'Se han limpiado los campos de generación de reporte'
                );
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
