import { Grid, Box, TextField } from "@mui/material";
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const InputsEncabezado: React.FC = () => {
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
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Fecha Solicitud"
                  value={new Date()}
                  renderInput={(props) => <TextField {...props} />}
                  onChange={()=>{}}
                  disabled
                />
                </LocalizationProvider>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </>
  )
}
