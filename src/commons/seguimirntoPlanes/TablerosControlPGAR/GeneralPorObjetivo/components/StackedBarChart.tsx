import { ApexOptions } from 'apexcharts';
import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const StackedBarChart = (data: any) => {

  useEffect(() => {
    console.log(data)
  }, [data]);

  const [chart_data, set_chart_data] = useState<{
    series: ApexAxisChartSeries | ApexNonAxisChartSeries;
    options: ApexOptions;
  }>({
    options: {
      chart: {
        type: 'bar',
        stacked: true,
        toolbar: {
          show: true
        }
      },
      colors: ['#008FFB', '#00E396', '#FEB019', '#FF4560'],
      plotOptions: {
        bar: {
          horizontal: false,
        },
      },
      theme: {
        mode: 'light',
      },

    },
    series: [
      {
        name: 'Q1 Budget',
        data: [44000, 55000, 41000, 67000, 22000]
      },
      {
        name: 'Q1 Actual',
        data: [48000, 50000, 40000, 65000, 25000]
      },
      {
        name: 'Q2 Budget',
        data: [44000, 55000, 41000, 67000, 22000]
      },
      {
        name: 'Q2 Actual',
        data: [48000, 50000, 40000, 65000, 25000]
      },
    ]
  });

  return (
    <ReactApexChart options={chart_data.options} series={chart_data.series} type="bar" height={400} />
  );
};
