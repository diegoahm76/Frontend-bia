
import ReactApexChart from 'react-apexcharts';
import { type ApexOptions } from 'apexcharts';

interface IProps {
  data: number[][]|null,
  chart_id: string
  }

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
const ChartData = ({
  data,
  chart_id
}: IProps) => {
    const chart_data: ApexOptions = {
        chart: {
          id: chart_id+"_1",
          type: "line",
          height: 430,
          toolbar: {
            autoSelected: "pan",
            show: false
          }
        },
        colors: ["#546E7A"],
        stroke: {
          width: 3
        },
        dataLabels: {
          enabled: false
        },
        fill: {
          opacity: 1,
        },
        markers: {
          size: 1,
          colors: ["#546E7A"],
          strokeColors: '#546E7A',
          strokeWidth: 0,
          shape: "square",
        },
        xaxis: {
          type: 'datetime'
        },
      
      
    };
    const series= [
      {
        name: chart_id,
        data: data??[]
      }
    ]
  
    const chart_data_2: ApexOptions = {
        chart: {
          id: chart_id,
          height: 230,
          type: "area",
          brush:{
            target: chart_id+"_1",
            enabled: true
          },
          selection: {
            enabled: true,
            
          },
        },
        colors: ['#008FFB'],
        fill: {
          type: 'gradient',
          gradient: {
            opacityFrom: 0.91,
            opacityTo: 0.1,
          }
        },
        xaxis: {
          type: 'datetime',
          tooltip: {
            enabled: false
          }
        },
        yaxis: {
          tickAmount: 2
        }
      
    };

  return (
    <>
       <div id="wrapper">
  <div id="chart-line2">
  <ReactApexChart options={chart_data} series={series} type='line' height={230} />

</div>
  <div id="chart-line">
     <ReactApexChart options={chart_data_2} series={series} type='area' height={130} />

</div>
</div>
 
  </>
  );
};
// eslint-disable-next-line no-restricted-syntax
export default ChartData;
