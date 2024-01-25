/* eslint-disable @typescript-eslint/naming-convention */
import { ApexOptions } from "apexcharts";
import ReactApexChart from "react-apexcharts";
import { useState } from "react";
import { PQRSDFData } from '../screens/PantallaPindicadores';

interface PQRSDFDataa {
  P_AtencionAPQRSDF: PQRSDFData;
}

export const Graficapiegraficaindicadores: React.FC<PQRSDFDataa> = ({ P_AtencionAPQRSDF }: any) => {
  console.log(P_AtencionAPQRSDF);

  const porcentajeNoRespondidos = Math.trunc(P_AtencionAPQRSDF.porcentaje_vencidas);
  const porcentajeRespondidos = Math.trunc(P_AtencionAPQRSDF.porcentaje_oportunas);
  
  console.log(porcentajeNoRespondidos, porcentajeRespondidos);
  
  const chartData: ApexOptions = {
    chart: {
      width: 380,
      type: "pie",
    },
    labels: ["Mitad 1"],
    series: [5, 95],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  return (
    <>
      <ReactApexChart options={chartData} series={chartData.series} type="pie" height={215} />
    </>
  );
};
