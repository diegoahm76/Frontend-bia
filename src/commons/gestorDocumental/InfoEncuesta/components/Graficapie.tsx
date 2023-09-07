/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable import/no-duplicates */
/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/naming-convention
import { type ApexOptions } from "apexcharts";
import ReactApexChart from "react-apexcharts";

export const Graficapie: React.FC = () => {
    const chartData: ApexOptions = {
        chart: {
            width: 380,
            type: "pie", // Cambiar el tipo de gráfico a "pie" para una gráfica de tipo tarta
        },
        labels: ["Categoría 1", "Categoría 2", "Categoría 3", "Categoría 4", "Categoría 5"],
        title: {
            // text: "Ejemplo de Gráfica de Tarta",
        },
        series: [44, 55, 13, 43, 22],
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