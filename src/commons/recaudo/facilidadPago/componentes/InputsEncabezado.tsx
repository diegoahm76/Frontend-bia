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
                  required
                  id="outlined-error-helper-text"
                  label="Nombre o Razón Social"
                  helperText='Escribe Nombre o Razón Social'
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  required
                  id="outlined-error-helper-text"
                  label="Identificación"
                  helperText='Escribe Número de Identificación'
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  required
                  id="outlined-error-helper-text"
                  label="Correo Electrónico"
                  helperText='Escribe Correo Electrónico'
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  required
                  id="outlined-error-helper-text"
                  label="Dirección Notificación"
                  helperText='Escribe Dirección Notificación'
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Fecha Solicitud"
                  value={new Date()}
                  renderInput={(props) => <TextField {...props} />}
                  onChange={()=>{}}
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
