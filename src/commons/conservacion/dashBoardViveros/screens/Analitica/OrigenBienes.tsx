// import { Stack, Typography } from "@mui/material";
import { type ApexOptions } from "apexcharts";
import ReactApexChart from "react-apexcharts";

interface IProps {
    resumen: any;
}
// eslint-disable-next-line @typescript-eslint/naming-convention
export const OrigenBienes: React.FC<IProps> = (props: IProps) => {
    const chart_data: ApexOptions =  {
        chart: {
        width: 380,
        type: 'pie',
      },
      subtitle:{
        text: 'Plantas y Herramientas del vivero',
        align: 'right',
        floating: true,
        offsetY: 175,
        style: {
          fontSize: '12px',
          fontWeight: 'bold'
        }
      },
      labels: ['Donaciones','Resarcimientos','Compensaciones','Producción propia','Compras / No identificado'],
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
      }],
    };

    const state = {  
        series: (props.resumen === null || props.resumen === undefined) ? [] : [props.resumen.cantidad_donaciones,props.resumen.cantidad_resarcimientos,props.resumen.cantidad_compensaciones,props.resumen.cantidad_prod_propia,props.resumen.cantidad_compras_no_identificado]
        
    }

    
    return (
        <>
                <ReactApexChart options={chart_data} series={state.series} type="pie" height={191}/>
                {/* <Stack
                      direction="row"
                      justifyContent="center"
                    >
                      <Typography variant="subtitle1">
                      Plantas y Herramientas del vivero
                      </Typography>
                </Stack> */}
        </>
    );
}