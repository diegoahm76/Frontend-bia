/* eslint-disable @typescript-eslint/naming-convention */
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Stack,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Title } from '../../../../../../components';
import { ModalAndLoadingContext } from '../../../../../../context/GeneralContext';
import { useContext, useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

export const ModalGruposConMasExp = (): JSX.Element => {
  // * context declaration
  //* context declaration
  const { thirdLoading, handleThirdLoading } = useContext(
    ModalAndLoadingContext
  );

  //* states declaration
  const [chartData, setChartData] = useState({
    series: [
      {
        name: 'Expedientes',
        data: [2085, 585],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: 'bar',
      },
      plotOptions: {
        bar: {
          borderRadius: 10,
          dataLabels: {
            position: 'top',
          },
        },
      },
      dataLabels: {
        enabled: true,
        formatter: function (val: any) {
          return `${val}`;
        },
        offsetY: -20,
        style: {
          fontSize: '12px',
          colors: ['#304758'],
        },
      },
      xaxis: {
        categories: [
          'Grupo 1',
          'Grupo 2',
        ],
        position: 'top',
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
       /* crosshairs: {
          fill: {
            type: 'gradient',
            gradient: {
              colorFrom: '#D8E3F0',
              colorTo: '#BED1E6',
              stops: [0, 100],
              opacityFrom: 0.4,
              opacityTo: 0.5,
            },
          },
        },*/
       /* tooltip: {
          enabled: true,
        },*/
      },
     /*yaxis: {
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          show: false,
          formatter: function (val: any) {
            return val + '%';
          },
        },
      },*/
     /* title: {
        text: 'Monthly Inflation in Argentina, 2002',
        floating: true,
        offsetY: 330,
        align: 'center',
        style: {
          color: '#444',
        },
      },*/
    },
  });

  //* use Effect declaration
  useEffect(() => {
    if (thirdLoading) {
      console.log('thirdLoading', thirdLoading);
    }

    return () => {};
  }, [thirdLoading]);

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      open={thirdLoading}
      onClose={() => {
        handleThirdLoading(false);
      }}
    >
      <DialogTitle>
        <Title title="Grupos que mas han creado expedientes" />
      </DialogTitle>
      <Divider />
      <DialogContent>
        <div style={{ width: '100%', height: '100%' }}>
          <div id="chart" style={{ width: '100%', height: '100%' }}>
            <ReactApexChart
              series={chartData.series as ApexOptions['series']}
              options={chartData.options as ApexOptions}
              type="bar"
              height={350}
            />
          </div>
          <div id="html-dist"></div>
        </div>
      </DialogContent>

      <DialogActions>
        <Stack
          direction="row"
          spacing={2}
          sx={{ mr: '15px', mb: '10px', mt: '10px' }}
        >
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              handleThirdLoading(false);
            }}
            startIcon={<CloseIcon />}
          >
            CERRAR
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
};
