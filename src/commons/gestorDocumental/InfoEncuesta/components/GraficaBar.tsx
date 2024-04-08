/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ApexOptions } from "apexcharts";
import { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { api } from "../../../../api/axios";
import { Propstorta, ReporteRegion } from "../interfaces/types";
// eslint-disable-next-line @typescript-eslint/naming-convention, react/prop-types
export const GraficaBar: React.FC<Propstorta> = ({ selectedEncuestaId }) => {
    const fetchReporteRegion = async (): Promise<void> => {
        try {
            const url = `/gestor/encuestas/reporte_region/get/${selectedEncuestaId}/`;
            const res = await api.get<ReporteRegion>(url);
            setReporteRegion(res.data);
        } catch (error) {
            console.error(error);
        }
    };
    const [reporteRegion, setReporteRegion] = useState<ReporteRegion | null>(null);
    useEffect(() => {
        fetchReporteRegion();
    }, [selectedEncuestaId]);
    const categories = reporteRegion?.data.registros.map(registro => registro.nombre) || [];
    const dataTotals = reporteRegion?.data.registros.map(registro => registro.total) || [];
    const chartData: ApexOptions = {
        chart: {
            type: 'bar',
            height: 430
        },
        plotOptions: {
            bar: {
                horizontal: true,
                dataLabels: {
                    position: 'top',
                },
            }
        },
        dataLabels: {
            enabled: true,
            offsetX: -6,
            style: {
                fontSize: '14px',
                colors: ['#fff']
            }
        },
        stroke: {
            show: true,
            colors: ['#fff']
        },
        tooltip: {
            shared: true,
            intersect: false
        },
        xaxis: {
            categories: categories,  // Actualiza las categorías
        }
    };

    const series = [
        {
            name: 'Total por región',
            data: dataTotals  // Actualiza los datos
        }
    ];  
    return (
        <>
            <>
                <ReactApexChart options={chartData} series={series} type="bar" height={330} />
            </>
        </>
    );
};