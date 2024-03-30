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
import { fetchChartData } from '../../../services/getDataCharts.service';
import { ChartDataContext } from '../../../context/DataChartContext';

export const ModalGruposConMasExp = ({
  controlBusquedaGeneradoraReporte,
}: any): JSX.Element => {
  // * context declaration
  //* context declaration
  const {openModalOne,  handleOpenModalOne, handleOpenModalTwo} = useContext(ModalAndLoadingContext);
    //* context declaration
    const { setIsReportReady } = useContext(ChartDataContext);

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
      fetchChartData( 
      setChartData,
      `gestor/reporte_indices_archivos_carpetas/reporte_unidad_total/get/${controlBusquedaGeneradoraReporte?._formValues?.seccion_subseccion?.value ?? 0}?${controlBusquedaGeneradoraReporte._formValues.fecha_inicio}/${controlBusquedaGeneradoraReporte._formValues.fecha_fin}`,
      handleOpenModalTwo,
      setIsReportReady
      // ? aquí se debe hacer la petición para obtener los datos
      )
    }

    return () => {};
  }, [openModalOne]);

  return (
    <Dialog
      fullWidth
      maxWidth="md"
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
