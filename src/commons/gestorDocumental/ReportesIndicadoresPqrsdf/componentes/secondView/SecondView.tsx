/* eslint-disable @typescript-eslint/naming-convention */
import { useContext, useEffect, useState } from 'react';
import { Button, Grid } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { Title } from '../../../../../components';
import { Indices } from '../indices/Indices';
import {  ChartDataContextPQRSDF } from '../../context/DataChartContext';

export const SecondView = (): JSX.Element => {
  const {chartDataViewTwo} = useContext(ChartDataContextPQRSDF);
  return (
    <>
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
          <Title title="Reporte de índices PQRSDF" />
        </Grid>
        <div style={{ width: '100%', height: '100%' }}>
          <div id="chart" style={{ width: '100%', height: '100%' }}>
            {/*Stacked Columns*/}
            <ReactApexChart
              series={chartDataViewTwo?.series as ApexOptions['series'] ?? []}
              options={chartDataViewTwo?.options as ApexOptions ?? []}
              type="bar"
              height={750}
            />
          </div>
          <div id="html-dist"></div>
        </div>
        <Grid
          container
          spacing={2}
          sx={{ mb: '20px', justifyContent: 'center', alignItems: 'center' }}
        ></Grid>
      </Grid>
    </>
  );
};
