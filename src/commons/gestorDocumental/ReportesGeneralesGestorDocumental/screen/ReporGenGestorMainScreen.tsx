/* eslint-disable @typescript-eslint/naming-convention */
import { Button, Grid } from '@mui/material';
import { ApexOptions } from 'apexcharts';
import { useContext, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { ThirdView } from '../componentes/thirdView/ThirdView';
import { BusquedaGeneral } from '../componentes/BusquedaReportes/BusquedaGeneral';
import { BusquedaBasicaGeneradoraReporte } from '../componentes/BusquedaReportes/BusquedaInputsEspecificos/BusquedaBasica';
import { useAppSelector } from '../../../../hooks';
import { FourhView } from '../componentes/fourthView/FourhView';
import { FirstView } from '../componentes/firstView/FirstView';
import { SecondView } from '../componentes/secondView/SecondView';
import { useIndicadores } from '../hooks/useIndicadores';
import { ChartDataContext } from '../context/DataChartContext';
export const ReporGenGestorMainScreen = (): JSX.Element => {
  const { currentBusquedaReporte } = useAppSelector(
    (state) => state.ReportesGeneralesGestorSlice
  );
  // * hooks declaration
  const {
    controlBusquedaGeneradoraReporte,
    handleSubmitBusquedaGeneradoraReporte,
    resetBusquedaGeneradoraReporte,
    watchBusquedaGeneradoraReporte,
  } = useIndicadores();

  //* context declaration
  const { isReporteReady } = useContext(ChartDataContext);

  const props = {
    controlBusquedaGeneradoraReporte,
    handleSubmitBusquedaGeneradoraReporte,
    resetBusquedaGeneradoraReporte,
    watchBusquedaGeneradoraReporte,
  };

  // http://localhost:3000/#/app/gestor_documental/reportes_generales_gestor_documental
  // http://localhost:3000/#/app/gestor_documental/tramites/respuesta_requerimiento_opa
  // https://apexcharts.com/react-chart-demos/column-charts/column-with-data-labels/
  return (
    <>
      {/* dependiendo de la selección de la búsqueda general se filtran los campos de búsqueda y el reporte que se va a mostrar */}
      <BusquedaGeneral {...props} />

      {/* se muestra los inputs según la selección inicial, se no se ha seleccionado nada en general no entra a este componente */}
      <BusquedaBasicaGeneradoraReporte {...props} />

      {isReporteReady &&
        (currentBusquedaReporte?.value === 1 ? (
          <FirstView /> /*: currentBusquedaReporte?.value === 2 ? (
          <SecondView />
        )*/
        ) : currentBusquedaReporte?.value === 3 ? (
          <ThirdView
            controlBusquedaGeneradoraReporte={controlBusquedaGeneradoraReporte}
          />
        ) : currentBusquedaReporte?.value === 4 ? (
          <FourhView />
        ) : (
          <></>
        ))}
    </>
  );
};
