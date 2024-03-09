/* eslint-disable @typescript-eslint/naming-convention */
import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Title } from '../../../../../components';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

export const FirstView = (): JSX.Element => {
  const [chartData, setChartData] = useState({
    series: [
      {
        name: 'Creado',
        data: [44, 95],
      },
      {
        name: 'Abierto',
        data: [76, 120],
      },
      {
        name: 'Cerrado',
        data: [55, 370],
      },
      {
        name: 'Reaperturado',
        data: [320, 90],
      },
    ],
    options: {
      chart: {
        type: 'bar',
        height: 500,
        stacked: false,
        zoom: {
          enabled: false,
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '80%',
          endingShape: 'rounded',
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent'],
      },
      xaxis: {
        categories: ['Simples', 'Complejos'],
      },
      yaxis: {
        title: {
          text: 'Cantidad de carpetas / expedientes',
        },
      },
      fill: {
        opacity: 1,
        image: {
          src: [
            'https://imgs.search.brave.com/DTX7_J4iGJnmd6sHOutgYBtOL3lrJS9eLGJ7GKMTdYk/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWNzLnNpYmNvbG9t/YmlhLm5ldC9zaWIt/cmVzb3VyY2VzL2lt/YWdlcy9sb2dvcy1j/YW5hbGVzL3BuZy9s/b2dvLWNhdGFsb2dv/LWIucG5n',
            'https://imgs.search.brave.com/Cx-ODCDpxZzYQHn2ltKSm3AJJ-AykezRgWF87GMvDfo/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9wZXJp/b2RpY29kZWxtZXRh/LmNvbS93cC1jb250/ZW50L3VwbG9hZHMv/MjAyMC8wNy9jb3Jt/YWNhcmVuYS1udWV2/YS1zZWRlLmpwZw',
          ],
        },
      },
      tooltip: {
        y: {
          formatter: function (val: any) {
            return val + ' expedientes';
          },
        },
      },
    },
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
      //https://i0.wp.com/biocarbono.org/wp-content/uploads/2022/01/tmbnl-cormacarena.png
      sx={{
        position: 'relative',
        background: `url('https://scontent.fvvc1-1.fna.fbcdn.net/v/t39.30808-6/357496459_655185239982613_6885073345677477890_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=5f2048&_nc_ohc=nMZ3JqjQTLwAX8GLjc0&_nc_ht=scontent.fvvc1-1.fna&oh=00_AfBYG3SuuSu-uB_ZwE3fIW4rLPmQeISqWd_gmTcLnbcwYg&oe=65F1DAB1') no-repeat center center, #FAFAFA `,
        backgroundSize: '40% 66%',
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
        <div id="html-dist" style={{ width: '100%', height: '100%' }}></div>
      </div>
    </Grid>
  );
};
