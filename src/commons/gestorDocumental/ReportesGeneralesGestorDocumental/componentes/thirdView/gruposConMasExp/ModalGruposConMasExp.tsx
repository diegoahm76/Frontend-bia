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
  const {openModalOne,  handleOpenModalOne} = useContext(ModalAndLoadingContext);

  //* states declaration
  const [chartData, setChartData] = useState({
    series: [
      {
        name: 'Expedientes',
        data: [2085, 585, 1000, 1200],
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
          'Grupo 3',
          'Grupo 4',
        ],
        position: 'top',
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },

    },
  });

  //* use Effect declaration
  useEffect(() => {
    if (openModalOne) {
      console.log('thirdLoading', openModalOne);
      // ? aquí se debe hacer la petición para obtener los datos
    }

    return () => {};
  }, [openModalOne]);

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      open={openModalOne}
      onClose={() => {
        handleOpenModalOne(false);
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
              series={chartData?.series as ApexOptions['series'] ?? []}
              options={chartData?.options as ApexOptions ?? []}
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
              handleOpenModalOne(false);
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
