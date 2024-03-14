/* eslint-disable @typescript-eslint/naming-convention */
import { Button, Grid } from '@mui/material';
import { ApexOptions } from 'apexcharts';
import { useContext, useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { ThirdView } from '../componentes/thirdView/ThirdView';
import { BusquedaGeneral } from '../componentes/BusquedaReportes/BusquedaGeneral';
import { BusquedaBasicaGeneradoraReporte } from '../componentes/BusquedaReportes/BusquedaInputsEspecificos/BusquedaBasica';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { FourhView } from '../componentes/fourthView/FourhView';
import { FirstView } from '../componentes/firstView/FirstView';
import { SecondView } from '../componentes/secondView/SecondView';
import { useIndicadores } from '../hooks/useIndicadores';
import { ChartDataContextPQRSDF } from '../context/DataChartContext';
import { FifthView } from '../componentes/fifthView/FifithView';
import { setCurrentBusquedaReporte } from '../../ReportesGeneralesGestorDocumental/toolkit/ReportesGeneralesGestorSlice';

export const ReportIndicadoresPqrsdf = (): JSX.Element => {
  const { currentBusquedaReporte } = useAppSelector(
    (state) => state.ReportesGeneralesGestorSlice
  );

  const dispatch = useAppDispatch();
  // * hooks declaration
  const {
    controlBusquedaGeneradoraReporte,
    handleSubmitBusquedaGeneradoraReporte,
    resetBusquedaGeneradoraReporte,
    watchBusquedaGeneradoraReporte,
  } = useIndicadores();

  useEffect(() => {
    dispatch(setCurrentBusquedaReporte(null))
  }
  , []);

  //* context declaration
  const { isReporteReady } = useContext(ChartDataContextPQRSDF);

  const props = {
    controlBusquedaGeneradoraReporte,
    handleSubmitBusquedaGeneradoraReporte,
    resetBusquedaGeneradoraReporte,
    watchBusquedaGeneradoraReporte,
  };

  // http://localhost:3000/#/app/gestor_documental/reportes_pqrsdf_gestor_documental
  return (
    <>
      {/* dependiendo de la selección de la búsqueda general se filtran los campos de búsqueda y el reporte que se va a mostrar */}
      <BusquedaGeneral {...props} />

      {/* se muestra los inputs según la selección inicial, se no se ha seleccionado nada en general no entra a este componente */}
      <BusquedaBasicaGeneradoraReporte {...props} />

      {currentBusquedaReporte?.value === 1 ? (
        <FirstView />
      ) : currentBusquedaReporte?.value === 2 ? (
        <SecondView/>
      ) : currentBusquedaReporte?.value === 3 ? (
        <ThirdView/>
      ) : currentBusquedaReporte?.value === 4 ? (
        <FourhView/>
      ) : currentBusquedaReporte?.value === 5 ? (
        <FifthView/>
      ) : (
        <></>
      )}

     {/* {isReporteReady &&
        (currentBusquedaReporte?.value === 1 ? (
        <FirstView />
      ) : currentBusquedaReporte?.value === 2 ? (
        <SecondView/>
      ) : currentBusquedaReporte?.value === 3 ? (
        <ThirdView/>
      ) : currentBusquedaReporte?.value === 4 ? (
        <FourhView/>
      ) : currentBusquedaReporte?.value === 5 ? (
        <FifthView/>
      ) : (
        <></>
      ))}*/}
    </>
  );
};
