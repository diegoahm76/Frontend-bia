// eslint-disable-next-line @typescript-eslint/naming-convention
/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { type ApexOptions } from "apexcharts";
import ReactApexChart from "react-apexcharts";
import { api } from "../../../../api/axios";
import { Propstorta } from "../interfaces/types";
interface ReporteSexo {
  success: boolean;
  detail: string;
  data: {
    registros: {
      nombre: string;
      total: number;
    }[];
    total: number;
  };
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const GraficaArea: React.FC <Propstorta> = ({selectedEncuestaId}) => {

  const [reporteSexo, setReporteSexo] = useState<ReporteSexo | null>(null);
  useEffect(() => {
    const fetchReporteSexo = async (): Promise<void> => {
      try {
        const url = `/gestor/encuestas/reporte_tipos_sexo/get/${selectedEncuestaId}/`;
        const res = await api.get<ReporteSexo>(url);  // Asumo que estás usando 'api' para las solicitudes.
        setReporteSexo(res.data);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchReporteSexo();
  }, [selectedEncuestaId]);
  const labels = reporteSexo?.data.registros.map(registro => registro.nombre) || [];
  const series = reporteSexo?.data.registros.map(registro => registro.total) || [];
  const chartData: ApexOptions = {
    chart: {
      width: 380,
      type: "pie",
    },
    labels: labels,  // Actualiza las etiquetas
    series: series,  // Actualiza los datos
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
          <>
              <ReactApexChart options={chartData} series={chartData.series} type="pie" height={215} />
          </>
      </>
  );
};