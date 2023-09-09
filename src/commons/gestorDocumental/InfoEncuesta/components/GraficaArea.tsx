// eslint-disable-next-line @typescript-eslint/naming-convention
/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { type ApexOptions } from "apexcharts";
import ReactApexChart from "react-apexcharts";

// eslint-disable-next-line @typescript-eslint/naming-convention
export const GraficaArea: React.FC = () => {
  // Datos para el Gráfico de Área
  const chartData: ApexOptions = {
    chart: {
      width: 380,
      type: "area", // Configuramos el tipo de gráfico como "area" para un Gráfico de Área
    },
    xaxis: {
      categories: ["Enero", "Febrero", "Marzo", "Abril", "Mayo"],
    },
    yaxis: {
      title: {
        text: "Valores",
      },
    },
    title: {
    //   text: "Ejemplo de Gráfico de Área",
    },
    series: [
      {
        name: "Serie 1",
        data: [30, 40, 25, 50, 49],
      },
    ],
  };

  return (
    <>
      <ReactApexChart options={chartData} series={chartData.series} type="area" height={215} />
    </>
  );
};
