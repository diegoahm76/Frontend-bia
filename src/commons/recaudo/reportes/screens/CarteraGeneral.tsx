import { Title } from '../../../../components/Title';
import { Box, Button, FormControl, Grid, Stack, TextField } from '@mui/material';
import { TablaCarteraGeneral } from '../componentes/TablaCarteraGeneral';
import { GraficaCarteraGeneral } from '../componentes/GraficaCarteraGeneral';
import { FileDownloadOutlined, SearchOutlined } from '@mui/icons-material';
import esLocale from 'dayjs/locale/es';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useState } from 'react';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const CarteraGeneral: React.FC = () => {
  const [date, set_date] = useState<Date | null>(new Date());

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handle_date_change = (date: Date | null) => {
    set_date(date);
  };

  return (
    <>
      <Title title='Informe General de Cartera - Totalizado a fecha de corte seleccionada'/>
      <Grid
        container
        sx={{
          position: 'relative',
          background: '#FAFAFA',
          borderRadius: '15px',
          mb: '20px',
          mt: '20px',
          p: '20px',
          boxShadow: '0px 3px 6px #042F4A26',
        }}
      >
        <Grid item xs={12}>
          <Box
            component="form"
            noValidate
            autoComplete="off"
          >
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ mb: '20px' }}
            >
              <Stack
                direction="row"
                justifyContent="left"
                spacing={2}
              >
                <FormControl>
                  <LocalizationProvider dateAdapter={AdapterDayjs} locale={esLocale}>
                    <DatePicker
                      label="Fecha Corte"
                      inputFormat="DD/MM/YYYY"
                      openTo="day"
                      views={[ 'day', 'month', 'year' ]}
                      value={date}
                      onChange={handle_date_change}
                      renderInput={(params) => (
                        <TextField
                          required
                          {...params}
                        />
                      )}
                    />
                  </LocalizationProvider>
                </FormControl>
                <Button
                  color='primary'
                  variant='contained'
                  startIcon={<SearchOutlined />}
                  onClick={() => {
                  }}
                >
                  Consultar
                </Button>
              </Stack>
              <Stack
                direction="row"
                justifyContent="right"
                spacing={2}
              >
                <Button
                  color='primary'
                  variant='outlined'
                  startIcon={<FileDownloadOutlined />}
                  onClick={() => {
                  }}
                >
                  Exportar Excel
                </Button>
                <Button
                  color='primary'
                  variant='outlined'
                  startIcon={<FileDownloadOutlined />}
                  onClick={() => {
                  }}
                >
                  Exportar PDF
                </Button>
              </Stack>
            </Stack>
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ mb: '20px', mt: '40px' }}
            >
              <TablaCarteraGeneral />
              <GraficaCarteraGeneral />
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </>
  )
}
