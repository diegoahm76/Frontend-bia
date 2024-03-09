/* eslint-disable @typescript-eslint/naming-convention */
import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Title } from '../../../../../components';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

export const FourhView = (): JSX.Element => {
  const [chartData, setChartData] = useState({
    series: [
      {
        name: 'Creado',
        data: [14]
      },
      {
        name: 'Abierto',
        data: [76]
      },
      {
        name: 'Cerrado',
        data: [55]
      },
      {
        name: 'Reaperturado',
        data: [35]
      }
    ],
    options: {
      chart: {
        type: 'bar',
        height: 500,
        stacked: false,
        zoom: {
          enabled: false,
        }
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '80%',
          endingShape: 'rounded'
        },
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
      },
      xaxis: {
        categories: ['Grupo aguas'],
      },
      yaxis: {
        title: {
          text: 'Cantidad de carpetas / expedientes'
        }
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        y: {
          formatter: function (val: any) {
            return val + " expedientes"
          }
        }
      }
    }
  });

  //* use Effect declaration
  useEffect(() => {
   /* if (thirdLoading) {
      console.log('thirdLoading', thirdLoading);
    }*/

    return () => {};
  }, []);

  return (
    <Grid
        container
        sx={{
          position: 'relative',
          background: `url('https://i0.wp.com/biocarbono.org/wp-content/uploads/2022/01/tmbnl-cormacarena.png') no-repeat center center, #FAFAFA `,
          backgroundSize: '55% 55%',
          borderRadius: '15px',
          p: '20px',
          mb: '20px',
          boxShadow: '0px 3px 6px #042F4A26',
          width: '100%',
        }}
      >
        <Grid item xs={12} sx={{ mb: '1rem' }}>
          <Title title="Reporte de índices de carpetas / expedientes" />
        </Grid>
        <div style={{ width: '100%', height: '100%' }}>
          <div id="chart" style={{ width: '100%', height: '100%' }}>
            <ReactApexChart
              series={chartData.series as ApexOptions['series']}
              options={chartData.options as ApexOptions}
              type="bar"
              height={500}
            />
          </div>
          <div id="html-dist"></div>
        </div>
        <Grid
          container
          spacing={2}
          sx={{ mb: '20px', justifyContent: 'center', alignItems: 'center' }}
        >
        </Grid>
      </Grid>
  );
}
