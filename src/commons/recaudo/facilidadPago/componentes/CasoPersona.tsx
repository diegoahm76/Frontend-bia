import { Grid, Box, TextField, FormControl, MenuItem, Select, InputLabel } from "@mui/material";

/* eslint-disable @typescript-eslint/naming-convention */

export const PersonaNatural: React.FC = () => {
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
      <h3>Caso Persona Natural</h3>
      <Grid item xs={12}>
        <Box
          component="form"
          noValidate
          autoComplete="off"
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={3} >
              <TextField
                size="small"
                fullWidth
                helperText='Carga Documento de Identidad'
                variant="outlined"
                type="file"
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                required
                id="outlined-error-helper-text"
                label="Dirección Notificación"
                helperText='Escribe la Dirección de Notificación'
                size="small"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                required
                id="outlined-error-helper-text"
                label="Ciudad"
                helperText='Escribe la Ciudad'
                size="small"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                required
                id="outlined-error-helper-text"
                label="Teléfono Contacto"
                helperText='Escribe el Teléfono de Contacto'
                size="small"
                fullWidth
              />
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  </>
  )
}

export const PersonaJuridica: React.FC = () => {
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
      <h3>Caso Persona Juridica / Apoderado</h3>
      <Grid item xs={12}>
        <Box
          component="form"
          noValidate
          autoComplete="off"
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={3} >
              <TextField
                size="small"
                fullWidth
                helperText='Carga Documento de Identidad Apoderado'
                variant="outlined"
                type="file"
              />
            </Grid>
            <Grid item xs={12} sm={3} >
              <TextField
                size="small"
                fullWidth
                helperText='Carga Documento Poder'
                variant="outlined"
                type="file"
              />
            </Grid>
            <Grid item xs={12} sm={3} >
              <TextField
                size="small"
                fullWidth
                helperText='Carga Cert. Existencia y Representación Legal'
                variant="outlined"
                type="file"
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                required
                id="outlined-error-helper-text"
                label="Dirección Notificación"
                helperText='Escribe la Dirección de Notificación'
                size="small"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                required
                id="outlined-error-helper-text"
                label="Ciudad"
                helperText='Escribe la Ciudad'
                size="small"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                required
                id="outlined-error-helper-text"
                label="Teléfono Contacto"
                helperText='Escribe el Teléfono de Contacto'
                size="small"
                fullWidth
              />
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  </>
  )
}

export const DeudorSolidario: React.FC = () => {
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
      <h3>Caso Deudor Solidario</h3>
      <Grid item xs={12}>
        <Box
          component="form"
          noValidate
          autoComplete="off"
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={3}>
              <FormControl size="small" fullWidth>
                <InputLabel id="demo-simple-select-label">Tipo Deudor Solidario</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Tipo Deudor Solidario"
                >
                  <MenuItem>Ej 1</MenuItem>
                  <MenuItem>Ej 2</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={3} >
              <TextField
                size="small"
                fullWidth
                helperText='Carga Documento Deudor Solidario'
                variant="outlined"
                type="file"
              />
            </Grid>
            <Grid item xs={12} sm={3} >
              <TextField
                size="small"
                fullWidth
                helperText='Carga Oficio Respaldando Deuda'
                variant="outlined"
                type="file"
              />
            </Grid>
            <Grid item xs={12} sm={3} >
              <TextField
                size="small"
                fullWidth
                helperText='Carga Cert. Existencia y Representación Legal'
                variant="outlined"
                type="file"
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                required
                id="outlined-error-helper-text"
                label="Dirección Notificación"
                helperText='Escribe la Dirección de Notificación'
                size="small"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                required
                id="outlined-error-helper-text"
                label="Ciudad"
                helperText='Escribe la Ciudad'
                size="small"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                required
                id="outlined-error-helper-text"
                label="Teléfono Contacto"
                helperText='Escribe el Teléfono de Contacto'
                size="small"
                fullWidth
              />
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  </>
  )
}
