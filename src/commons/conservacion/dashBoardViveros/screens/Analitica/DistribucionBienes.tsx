/* eslint-disable @typescript-eslint/naming-convention */
import { type ApexOptions } from "apexcharts";
import ReactApexChart from "react-apexcharts";

interface IProps {
    resumen: any;
}
// eslint-disable-next-line @typescript-eslint/naming-convention
export const DistribucionBienes: React.FC<IProps> = (props: IProps) => {
    const chart_data: ApexOptions =  {
        chart: {
        width: 380,
        type: 'pie',
      },
      labels: ['Plantas','Herramientas'],
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
    };

    const state = {  
        series: [(props.resumen === null || props.resumen === undefined) ? [] : props.resumen.cantidad_plantas,props.resumen.cantidad_herramientas
        ]
    }
    return (
        <>
                <ReactApexChart options={chart_data} series={state.series} type="pie" height={215}/>
        </>
    );
}

