/* eslint-disable @typescript-eslint/naming-convention */
import { Button, Grid } from '@mui/material';
import { ApexOptions } from 'apexcharts';
import { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { ThirdView } from '../componentes/thirdView/ThirdView';
import { BusquedaGeneral } from '../componentes/BusquedaReportes/BusquedaGeneral';
import { BusquedaBasicaGeneradoraReporte } from '../componentes/BusquedaReportes/BusquedaInputsEspecificos/BusquedaBasica';
import { useAppSelector } from '../../../../hooks';
import { FourhView } from '../componentes/fourthView/FourhView';
export const ReporGenGestorMainScreen = (): JSX.Element => {
  const { currentBusquedaReporte } = useAppSelector(
    (state) => state.ReportesGeneralesGestorSlice
  );
  // http://localhost:3000/#/app/gestor_documental/reportes_generales_gestor_documental
  // http://localhost:3000/#/app/gestor_documental/tramites/respuesta_requerimiento_opa
  // https://apexcharts.com/react-chart-demos/column-charts/column-with-data-labels/
  return (
    <>
      {/* dependiendo de la selección de la búsqueda general se filtran los campos de búsqueda y el reporte que se va a mostrar */}
      <BusquedaGeneral />

      {/* se muestra los inputs según la selección inicial, se no se ha seleccionado nada en general no entra a este componente */}
      <BusquedaBasicaGeneradoraReporte />
      {currentBusquedaReporte?.value === 1 ? (
        <></>
      ) : currentBusquedaReporte?.value === 2 ? (
        <></>
      ) : currentBusquedaReporte?.value === 3 ? (
        <ThirdView/>
      ) : currentBusquedaReporte?.value === 4 ? (
        <FourhView/>
      ) : (
        <></>
      )}
    </>
  );
};
