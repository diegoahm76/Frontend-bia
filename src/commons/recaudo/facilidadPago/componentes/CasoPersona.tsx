import { Grid, Box, TextField, Button, FormControl, MenuItem, Select, InputLabel } from "@mui/material";

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
        p: '20px',
        boxShadow: '0px 3px 6px #042F4A26',
      }}
    >
      <h3>Caso Persona Natural</h3>
      <Grid item xs={12}>
        <Box
          component="form"
          sx={{ mt: '20px' }}
          noValidate
          autoComplete="off"
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={3}>
              <input
                required
                accept="image/*"
                style={{ display: 'none' }}
                id="upload-button-documento-identidad"
                type="file"
              />
              <label htmlFor="upload-button-documento-identidad">
                <Button
                  variant="outlined"
                  component="span"
                >
                  Documento de Identidad
                </Button>
              </label>
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
        p: '20px',
        boxShadow: '0px 3px 6px #042F4A26',
      }}
    >
      <h3>Caso Persona Juridica / Apoderado</h3>
      <Grid item xs={12}>
        <Box
          component="form"
          sx={{ mt: '20px' }}
          noValidate
          autoComplete="off"
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={3}>
              <input
                required
                accept="image/*"
                style={{ display: 'none' }}
                id="upload-button-documento-identidad"
                type="file"
              />
              <label htmlFor="upload-button-documento-identidad">
                <Button
                  variant="outlined"
                  component="span"
                >
                  Documento de Identidad Apoderado
                </Button>
              </label>
            </Grid>
            <Grid item xs={12} sm={3}>
              <input
                required
                accept="image/*"
                style={{ display: 'none' }}
                id="upload-button-documento-poder"
                type="file"
              />
              <label htmlFor="upload-button-documento-poder">
                <Button
                  variant="outlined"
                  component="span"
                >
                  Documento Poder
                </Button>
              </label>
            </Grid>
            <Grid item xs={12} sm={3}>
              <input
                required
                accept="image/*"
                style={{ display: 'none' }}
                id="upload-button-cert-existencia"
                type="file"
              />
              <label htmlFor="upload-button-cert-existencia">
                <Button
                  variant="outlined"
                  component="span"
                >
                  Cert. Existencia y Representación Legal
                </Button>
              </label>
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
        p: '20px',
        boxShadow: '0px 3px 6px #042F4A26',
      }}
    >
      <h3>Caso Deudor Solidario</h3>
      <Grid item xs={12}>
        <Box
          component="form"
          sx={{ mt: '20px' }}
          noValidate
          autoComplete="off"
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={3}>
              <FormControl fullWidth>
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
            <Grid item xs={12} sm={3}>
              <input
                required
                accept="image/*"
                style={{ display: 'none' }}
                id="upload-button-documento-identidad"
                type="file"
              />
              <label htmlFor="upload-button-documento-identidad">
                <Button
                  variant="outlined"
                  component="span"
                >
                  Documento Deudor Solidario
                </Button>
              </label>
            </Grid>
            <Grid item xs={12} sm={3}>
              <input
                required
                accept="image/*"
                style={{ display: 'none' }}
                id="upload-button-respaldo-deuda"
                type="file"
              />
              <label htmlFor="upload-button-respaldo-deuda">
                <Button
                  variant="outlined"
                  component="span"
                >
                  Oficio Respaldando Deuda
                </Button>
              </label>
            </Grid>
            <Grid item xs={12} sm={3}>
              <input
                required
                accept="image/*"
                style={{ display: 'none' }}
                id="upload-button-cert-existencia"
                type="file"
              />
              <label htmlFor="upload-button-cert-existencia">
                <Button
                  variant="outlined"
                  component="span"
                >
                  Cert. Existencia y Representación Legal
                </Button>
              </label>
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
