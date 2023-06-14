import { Grid, Box, TextField, FormControl } from "@mui/material";
import esLocale from 'dayjs/locale/es';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const EncabezadoRegistro: React.FC = () => {

  return (
    <>
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
            <Grid container spacing={2}>
              <Grid item xs={12} sm={3}>
                <TextField
                  disabled
                  label="Nombre o Razón Social"
                  size="small"
                  fullWidth
                  value={'Marcela Cardenas'}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  disabled
                  label="Identificación"
                  size="small"
                  fullWidth
                  value={'138223930'}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  disabled
                  label="Correo Electrónico"
                  size="small"
                  fullWidth
                  value={'marce@gmail.com'}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  disabled
                  label="Dirección Notificación"
                  size="small"
                  fullWidth
                  value={'Cl 56 #220-120'}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <FormControl fullWidth>
                  <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={esLocale}>
                    <DatePicker
                      label="Fecha Solicitud"
                      disabled
                      inputFormat="YYYY/MM/DD"
                      openTo="day"
                      views={[ 'day', 'month', 'year' ]}
                      value={new Date()}
                      onChange={()=>{}}
                      renderInput={(params) => (
                        <TextField
                          size='small'
                          fullWidth
                          disabled
                          {...params}
                        />
                      )}
                    />
                  </LocalizationProvider>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </>
  )
}
