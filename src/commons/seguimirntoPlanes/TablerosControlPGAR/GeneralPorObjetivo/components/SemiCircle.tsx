import { ApexOptions } from 'apexcharts';
import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { styles } from '../../../../gestorDocumental/actividadesPreviasCambioCCD/modules/delegacionDeOficinasResponsables/components/parte2/components/SeccSubCcdActual/SeccSubCcdActual';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SemiCircleGauge = ({ value, label }: {value: any, label: any}) => {
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
        offsetX: 0,
          offsetY: 0,
        startAngle: -90,
        endAngle: 90,
        track: {
          background: "#e7e7e7",
          strokeWidth: '97%',
        },
        dataLabels: {
          name: {
            show: false
          },
          value: {
            // offsetY: -2,
            fontSize: '22px'
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
        shade: 'light',
        shadeIntensity: 0.4,
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 50, 53, 91]
      },
    },
    labels: ['Average Results'],
    colors: ['#20E647'], // You can set colors for each gauge here
  };

  const chart_series = [value];

  return (
    <div style={{marginBottom: '1rem'}}>
      <p style={{textAlign: 'center', fontWeight: 'bold', marginBottom: '-.5rem'}}>{label}</p>
      <ReactApexChart
        options={chart_options}
        series={chart_series}
        type="radialBar"
        height="auto"
      />
    </div>
  );
}

