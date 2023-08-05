import { type ApexOptions } from "apexcharts";
import ReactApexChart from "react-apexcharts";

interface IProps {
    resumen: any;
}
// eslint-disable-next-line @typescript-eslint/naming-convention
export const EtapasMaterialVegetal: React.FC<IProps> = (props: IProps) => {
    const chart_data: ApexOptions = 
    {
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
            fontSize: '12px',
            colors: ['#fff']
          }
        },
        stroke: {
          show: true,
          width: 1,
          colors: ['#fff']
        },
        tooltip: {
          shared: true,
          intersect: false
        },
        xaxis: {
          categories: ['Planta sana','Planta en cuarentena'],
        },
    }
    const state = {  
        series: [{
            data:  (props.resumen === null || props.resumen === undefined) ? [] : [props.resumen.plantas_cuarentena_produccion,props.resumen.plantas_cuarentena_distribucion]
        }, {
            data:  (props.resumen === null || props.resumen === undefined) ? [] : [props.resumen.plantas_produccion,props.resumen.plantas_distribucion]
        }]
    }
    return (
        <>
                <ReactApexChart options={chart_data} series={state.series} type="bar" height={215}/>
        </>
    );
}