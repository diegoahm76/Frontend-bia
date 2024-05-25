/* eslint-disable @typescript-eslint/naming-convention */
import { useContext, useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { Title } from '../../../../../components';
import { ModalAndLoadingContext } from '../../../../../context/GeneralContext';
import { ChartDataContextPQRSDF } from '../../context/DataChartContext';

export const ThirdView = (): JSX.Element => {
  //* context declaration
  const {chartDataViewThree} = useContext(ChartDataContextPQRSDF);

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
              series={chartDataViewThree?.series as ApexOptions['series'] ?? []}
              options={chartDataViewThree?.options as ApexOptions ?? []}
              type="bar"
              height={1200}
            />
          </div>
          <div id="html-dist"></div>
        </div>
      </Grid>

    </>
  );
};
