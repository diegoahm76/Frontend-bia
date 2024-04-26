import { ApexOptions } from 'apexcharts';
import React from 'react';
import ReactApexChart from 'react-apexcharts';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Gradient = ({ value, label }: {value: any, label: any}) => {
  const chart_options: ApexOptions = {
    chart: {
      type: 'radialBar',
      width: '400px',
      offsetY: 0,
      sparkline: {
        enabled: true
      },
    },
    plotOptions: {
      radialBar: {
        startAngle: 0,
        endAngle: 365,
         hollow: {
          margin: 0,
          size: '60%',
          background: '#fff',
          position: 'front',
          dropShadow: {
            enabled: true,
            top: 3,
            left: 0,
            blur: 4,
            opacity: 0.24
          }
        },
        track: {
          background: '#fff',
          strokeWidth: '67%',
          margin: 0, // margin is in pixels
          dropShadow: {
            enabled: true,
            top: -3,
            left: 0,
            blur: 4,
            opacity: 0.35
          }
        },

        dataLabels: {
          show: true,
          name: {
            offsetY: -10,
            show: true,
            color: '#888',
            fontSize: '15px'
          },
          value: {
            color: '#888',
            fontSize: '30px',
            show: true,
          }
        }
      }
    },
    grid: {
      padding: {
        top: -10
      }
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        type: 'horizontal',
        shadeIntensity: 0.5,
        gradientToColors: ['#ABE5A1'],
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100]
      }
    },
    stroke: {
      lineCap: 'round'
    },
    labels: [label]
  };

  const chart_series = [value];

  return (
    <>
      <ReactApexChart
        options={chart_options}
        series={chart_series}
        type="radialBar"
        height="250"
      />
    </>
  );
}

