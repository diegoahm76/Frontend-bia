/* eslint-disable @typescript-eslint/naming-convention */
import { Button, Grid } from '@mui/material';
import { ApexOptions } from 'apexcharts';
import { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { ThirdView } from '../componentes/thirdView/ThirdView';
import { BusquedaGeneral } from '../componentes/BusquedaReportes/BusquedaGeneral';
import { BusquedaBasicaGeneradoraReporte } from '../componentes/BusquedaReportes/BusquedaInputsEspecificos/BusquedaBasica';
export const ReporGenGestorMainScreen = (): JSX.Element => {
  // http://localhost:3000/#/app/gestor_documental/reportes_generales_gestor_documental
  // http://localhost:3000/#/app/gestor_documental/tramites/respuesta_requerimiento_opa
  // https://apexcharts.com/react-chart-demos/column-charts/column-with-data-labels/
  return (
    <>
      {/* dependiendo de la selección de la búsqueda general se filtran los campos de búsqueda y el reporte que se va a mostrar */}
      <BusquedaGeneral />

      {/* se muestra los inputs según la selección inicial, se no se ha seleccionado nada en general no entra a este componente */}
      <BusquedaBasicaGeneradoraReporte />
      {/*<ThirdView/>*/}
    </>
  );
};
