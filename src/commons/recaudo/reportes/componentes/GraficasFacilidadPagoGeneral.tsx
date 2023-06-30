import { Box, Grid, Stack } from '@mui/material';
import ReactApexChart from 'react-apexcharts';
import { useSelector } from 'react-redux';
import { type FacilidadGeneral } from '../interfaces/interfaces';

interface RootState {
  reportes_recaudo: {
    reportes_recaudo: FacilidadGeneral;
  }
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const GraficasFacilidadPagoGeneral: React.FC = () => {
  const { reportes_recaudo } = useSelector((state: RootState) => state.reportes_recaudo);

  const options = { labels: ['Cobro Coactivo', 'Cobro Persuasivo'] };
  const series = [reportes_recaudo.total_sanciones_coactivo, reportes_recaudo.total_sanciones_persuasivo];

  const series_bar = [{
    data: [reportes_recaudo.total_sanciones_coactivo, reportes_recaudo.total_sanciones_persuasivo]
  }]

  return (
    <Box sx={{ width: '100%' }}>
          <Grid
            container
            sx={{
              position: 'relative',
              background: '#FAFAFA',
              borderRadius: '15px',
              p: '20px',
              mb: '20px',
              boxShadow: '0px 3px 6px #042F4A26',
            }}
          >
            <Grid item xs={12}>
              <Grid item>
                <Box sx={{ width: '100%' }}>
                  <Stack
                    direction="row"
                    justifyContent="space-around"
                    sx={{ mb: '20px' }}
                    spacing={2}
                  >
                    {
                      reportes_recaudo.total_general !== undefined ? (
                        <>
                          <ReactApexChart options={options} series={series} type='pie' width={470} />
                          <ReactApexChart options={options} series={series_bar} type='bar' width={470} />
                        </>
                      ) : null
                    }
                  </Stack>
                </Box>
              </Grid>
            </Grid>
          </Grid>
    </Box>
  )
}
