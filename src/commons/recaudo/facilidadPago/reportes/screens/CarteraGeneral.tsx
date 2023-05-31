import { Title } from '../../../../../components/Title';
import { Box, Button, Grid, Stack, TextField } from '@mui/material';
import { TablaCarteraGeneral } from '../componentes/TablaCarteraGeneral';
import { GraficaCarteraGeneral } from '../componentes/GraficaCarteraGeneral';
import { FileDownloadOutlined, SearchOutlined } from '@mui/icons-material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const CarteraGeneral: React.FC = () => {

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
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Fecha Corte"
                    value={new Date()}
                    renderInput={(props) => <TextField {...props} />}
                    onChange={()=>{}}
                  />
                </LocalizationProvider>
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
