/* eslint-disable @typescript-eslint/naming-convention */
import { Grid } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { Title } from '../../../../../components';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { ChartDataContextPQRSDF } from '../../context/DataChartContext';

export const FourhView = (): JSX.Element => {

  const {chartDataViewFour} = useContext(ChartDataContextPQRSDF);

  return (
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
          <ReactApexChart
            series={chartDataViewFour?.series as ApexOptions['series'] ?? []}
            options={chartDataViewFour?.options as ApexOptions ?? []}
            type="bar"
            height={775}
          />
        </div>
        <div id="html-dist"></div>
      </div>
    </Grid>
  );
};
