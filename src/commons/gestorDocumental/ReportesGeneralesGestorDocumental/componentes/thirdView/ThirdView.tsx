/* eslint-disable @typescript-eslint/naming-convention */
import { useContext, useState } from 'react';
import { Button, Grid } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { ModalGruposConMasExp } from './gruposConMasExp/ModalGruposConMasExp';
import { Title } from '../../../../../components';
import { ModalAndLoadingContext } from '../../../../../context/GeneralContext';

export const ThirdView = (): JSX.Element => {
  //* context declaration
  const { handleThirdLoading } = useContext(ModalAndLoadingContext);


  const [chartData, setChartData] = useState({
    series: [
      {
        name: 'CREADOS',
        data: [13, 23, 20, 8, 13, 27, 0],
      },
      {
        name: 'ABIERTOS',
        data: [21, 7, 25, 13, 22, 8, 0],
      },
      {
        name: 'CERRADOS',
        data: [44, 55, 41, 67, 22, 43 , 0],
      },
      {
        name: 'REAPERTURADOS',
        data: [11, 17, 15, 15, 21, 14, 8],
      },
    ],
    options: {
      chart: {
        type: 'bar',
        height: 500,
        stacked: true,
        /*toolbar: {
          show: true,
        },*/
        zoom: {
          enabled: false,
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: 'bottom',
              offsetX: -10,
              offsetY: 0,
            },
          },
        },
      ],
      plotOptions: {
        bar: {
          horizontal: false,
          borderRadius: 10,
          dataLabels: {
            total: {
              enabled: true,
              style: {
                fontSize: '13px',
                fontWeight: 900,
                marginBotton: '5rem',
              },
            },
          },
        },
      },
      xaxis: {
        type: 'text',
        categories: [
          'Suelos',
          'Agua',
          'Bióticos',
          'Aire Urbano',
          'Minería',
          'Hidrocarburos',
        ],
      },
      legend: {
        position: 'right',
        offsetY: 40,
      },
      fill: {
        opacity: 1,
      },
    },
  });

  //* debe tener los condicionales para no mostrar la información directamente, solo un "visor inicial"



  return (
    <>
      {/* modal grupos con max exp */}
      <ModalGruposConMasExp />

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
            {/*Stacked Columns*/}
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
          <Grid
            item
            xs={12}
            sm={4}
            sx={{
              mt: '2rem',
            }}
          >
            <Button
              variant="contained"
              color="primary"
              startIcon={<VisibilityIcon />}
              onClick={() => {
                handleThirdLoading(true)
              }}
              fullWidth
            >
              VER LOS GRUPOS QUE MAS CREARON EXPEDIENTES
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
