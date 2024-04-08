/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/naming-convention
import { type ApexOptions } from "apexcharts";
import ReactApexChart from "react-apexcharts";
import { api } from "../../../../api/axios";
import { useState, useEffect } from "react";
import { Propstorta, ReporteRangoEdad } from "../interfaces/types";

export const Graficapie: React.FC <Propstorta>= ({selectedEncuestaId}) => {
      const [reporteRangoEdad, setReporteRangoEdad] = useState<ReporteRangoEdad | null>(null);
      useEffect(() => {
        const fetchReporteRangoEdad = async (): Promise<void> => {
          try {
            const url = `/gestor/encuestas/reporte_rango_edad/get/${selectedEncuestaId}/`;
            const res = await api.get<ReporteRangoEdad>(url);
            setReporteRangoEdad(res.data);
          } catch (error) {
            console.error(error);
          }
        };
      
        fetchReporteRangoEdad();
      }, [selectedEncuestaId]);
      const labels = reporteRangoEdad?.data.registros.map((registro) => registro.nombre) || [];
      const series = reporteRangoEdad?.data.registros.map((registro) => registro.total) || [];
      const chartData: ApexOptions = {
        chart: {
            width: 380,
            type: "pie",
        },
        labels: labels,  // Usar "labels" aquí
        title: {},
        series: series,  // Usar "series" aquí
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
            {/* <h1>{selectedEncuestaId}</h1> */}
                <ReactApexChart options={chartData} series={chartData.series} type="pie" height={215} />
            </>
        </>
    );
};