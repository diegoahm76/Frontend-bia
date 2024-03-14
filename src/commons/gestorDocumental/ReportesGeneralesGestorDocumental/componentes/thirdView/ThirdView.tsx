/* eslint-disable @typescript-eslint/naming-convention */
import { useContext, useEffect, useState } from 'react';
import { Button, Grid } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { ModalGruposConMasExp } from './gruposConMasExp/ModalGruposConMasExp';
import { Title } from '../../../../../components';
import { ModalAndLoadingContext } from '../../../../../context/GeneralContext';
import { ChartDataContext } from '../../context/DataChartContext';

export const ThirdView = ({
  controlBusquedaGeneradoraReporte
}: any): JSX.Element => {
  //* context declaration
  const { handleOpenModalOne } = useContext(ModalAndLoadingContext);
  const {chartDataViewThree} = useContext(ChartDataContext);

  useEffect(() => {
    handleOpenModalOne(false);
  }
  , []);

  return (
    <>
      {/* modal grupos con max exp */}
      <ModalGruposConMasExp
        controlBusquedaGeneradoraReporte={controlBusquedaGeneradoraReporte}
      />

      <Grid
        container
        sx={{
          position: 'relative',
          background: `url('https://api.gbif.org/v1/image/unsafe/https%3A%2F%2Fraw.githubusercontent.com%2FSIB-Colombia%2Flogos%2Fmain%2Fsocio-SiB-cormacarena.png') no-repeat center center, #FFFFFF `,
          backgroundSize: 'contain',
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
              series={chartDataViewThree?.series as ApexOptions['series'] ?? []}
              options={chartDataViewThree?.options as ApexOptions ?? []}
              type="bar"
              height={650}
            />
          </div>
          <div id="html-dist"></div>
        </div>
      </Grid>
        <Grid
          container
          sx={{
            position: 'relative',
            background: '#FAFAFA',
            borderRadius: '15px',
            p: '20px',
            mb: '20px',
            boxShadow: '0px 3px 6px #042F4A26',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            
          }}
        >
          <Grid
            item
            xs={12}
            sm={4}
          >
            <Button
              variant="contained"
              color="primary"
              startIcon={<VisibilityIcon />}
              onClick={() => {
                handleOpenModalOne(true);
              }}
              fullWidth
            >
             GRUPOS QUE MAS CREARON EXPEDIENTES
            </Button>
          </Grid>
        </Grid>
    </>
  );
};
