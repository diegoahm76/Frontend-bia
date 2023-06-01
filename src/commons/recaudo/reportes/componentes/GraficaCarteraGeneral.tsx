import { Box, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const GraficaCarteraGeneral: React.FC = () => {
  const [arr_label, set_arr_label] = useState(Array<string>);
  const [arr_data, set_arr_data] = useState(Array<number>)

  const visible_rows = [
    {
      codigo_contable: 1,
      concepto_deuda: 'Tasa Retributiva',
      valor_sancion: '30300000.00',
    },
    {
      codigo_contable: 2,
      concepto_deuda: 'Tasa Uso de Agua',
      valor_sancion: '12000000.00',
    },
    {
      codigo_contable: 3,
      concepto_deuda: 'Intereses Multas y Sanciones',
      valor_sancion: '75000000.00',
    },
    {
      codigo_contable: 4,
      concepto_deuda: 'Transferencia de Sector Eléctrico',
      valor_sancion: '13400000.00',
    },
  ];

  useEffect(() => {
    const arr_labels = []
    for(let i=0; i<visible_rows.length; i++){
      arr_labels.push(`${visible_rows[i].codigo_contable} ${visible_rows[i].concepto_deuda}`)
    }
    set_arr_label(arr_labels)
  }, [])

  useEffect(() => {
    const arr_series = []
    for(let i=0; i<visible_rows.length; i++){
      arr_series.push(parseFloat(visible_rows[i].valor_sancion))
    }
    set_arr_data(arr_series)
  }, [])

  const options = { labels: arr_label };
  const series = arr_data;

  return (
    <Box sx={{ width: '43%' }}>
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
                  <ReactApexChart options={options} series={series} type='pie' width={470} />
                </Box>
              </Grid>
            </Grid>
          </Grid>
    </Box>
  )
}
