import { Grid, Box, TextField } from "@mui/material";

// eslint-disable-next-line @typescript-eslint/naming-convention
export const InputsEncabezadoAdmin: React.FC = () => {
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
        <h3>Datos Encabezado</h3>
        <Grid item xs={12}>
          <Box
            component="form"
            noValidate
            autoComplete="off"
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={3}>
                <TextField
                  id="outlined-error-helper-text"
                  label="Nombre Completo"
                  size="small"
                  fullWidth
                  value="Maria Cardenas"
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  id="outlined-error-helper-text"
                  label="Identificación"
                  size="small"
                  fullWidth
                  value="1140239284"
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  id="outlined-error-helper-text"
                  label="Correo Electrónico"
                  size="small"
                  fullWidth
                  value="maria@gmail.com"
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  id="outlined-error-helper-text"
                  label="Calidad en que actúa la persona"
                  size="small"
                  fullWidth
                  value="Persona Natural"
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  id="outlined-error-helper-text"
                  label="Dirección"
                  size="small"
                  fullWidth
                  value="Cra 23 #203-901"
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  id="outlined-error-helper-text"
                  label="Nombre Obligación"
                  size="small"
                  fullWidth
                  value="Pago tasa TUA"
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  id="outlined-error-helper-text"
                  label="Número Obligación"
                  size="small"
                  fullWidth
                  value="9283812"
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  id="outlined-error-helper-text"
                  label="Teléfono Contacto"
                  size="small"
                  fullWidth
                  value="3154321234"
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  id="outlined-error-helper-text"
                  label="Fecha Solicitud"
                  size="small"
                  fullWidth
                  value="04/26/2023"
                  disabled
                />
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </>
  )
}
