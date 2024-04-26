import { ApexOptions } from 'apexcharts';
import { useState } from 'react';
import ReactApexChart from 'react-apexcharts';


// eslint-disable-next-line @typescript-eslint/naming-convention
export const LineChart = () => {

  const [chart_data, set_chart_data] = useState<{
    series: ApexAxisChartSeries | ApexNonAxisChartSeries;
    options: ApexOptions;
  }>({
    options: {
      chart: {
        height: 350,
        type: 'line',
        zoom: {
          enabled: false
        }
      },
      colors: ['#543C52', '#FFD700', '#26A65B'], // Colores de las líneas
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth'
      },
      markers: {
        size: 6,
      },
      theme: {
        mode: 'light', // Establece el tema claro
      },
      // ... otras opciones
    },

    series: [{
      name: "Session Duration",
      data: [45, 52, 38, 24]
    },
    {
      name: "Page Views",
      data: [35, 41, 62, 42]
    },
    {
      name: 'Total Visits',
      data: [87, 57, 74, 99]
    }
  ],

  });

  return (
    <ReactApexChart options={chart_data.options} series={chart_data.series} type="line" height={400} />
  );
};
