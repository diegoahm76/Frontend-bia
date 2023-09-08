/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable import/no-duplicates */
/* eslint-disable @typescript-eslint/no-unused-vars */
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { ApexOptions } from "apexcharts";
import ReactApexChart from "react-apexcharts";
// eslint-disable-next-line @typescript-eslint/naming-convention
export const GraficaBar: React.FC = () => {
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
            categories: ['Planta sana', 'Planta en cuarentena'],
        }
    };

    const series = [
        {
            name: 'En distribución',
            data: [25, 15] // Reemplaza estos valores con tus datos reales
        },
        {
            name: 'En producción',
            data: [35, 45] // Reemplaza estos valores con tus datos reales
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