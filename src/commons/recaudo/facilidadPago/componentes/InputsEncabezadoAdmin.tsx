import { Grid, Box, TextField, FormControl, InputLabel, Select, MenuItem, TextareaAutosize, Button, Stack } from "@mui/material";
import { useState } from "react";

interface event {
  target: {
    value: string
  }
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const InputsEncabezadoAdmin: React.FC = () => {
  const [plan_pagos, set_plan_pagos] = useState('')
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
        <h3>Detalles de la Solicitud</h3>
        <Grid item xs={12}>
          <Box
            component="form"
            noValidate
            autoComplete="off"
          >
            <Grid container spacing={2}>
            </Grid>
          </Box>
        </Grid>
      </Grid>
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
        <h3>Respuesta de Cormacarena</h3>
        <Grid item xs={12}>
          <Box
            component="form"
            noValidate
            autoComplete="off"
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={3}>
                <FormControl size="small" fullWidth>
                  <InputLabel id="demo-simple-select-label">Asignar Estado</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Plazo"
                  >
                    <MenuItem>Ej 1</MenuItem>
                    <MenuItem>Ej 2</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={3}>
                <FormControl size="small" fullWidth>
                  <InputLabel id="demo-simple-select-label">Aprobado</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Plazo"
                  >
                    <MenuItem value="si">Si</MenuItem>
                    <MenuItem value="no">No</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item>
                <p>Observación</p>
                <TextareaAutosize minRows={8} cols={153} />
              </Grid>
              <Grid item xs={12} sm={3}>
                <FormControl size="small" fullWidth>
                  <InputLabel id="demo-simple-select-label">¿Crear plan de pagos?</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Plazo"
                    onChange={(event: event)=>{
                      const { value } = event.target
                      set_plan_pagos(value)
                    }}
                  >
                    <MenuItem value="si">Si</MenuItem>
                    <MenuItem value="no">No</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              {
                plan_pagos === "si" ? (
                  <Grid item xs={12} sm={3}>
                    <Button
                      color='info'
                      variant='contained'
                      onClick={() => {}}
                    >
                    Crear Plan de Pagos
                    </Button>
                  </Grid>
                ) : null
              }
            </Grid>
          </Box>
        </Grid>
      </Grid>
      <Stack
        direction="row"
        justifyContent="right"
        spacing={2}
        sx={{ mb: '20px' }}
      >
        <Button
          color='info'
          variant='contained'
          sx={{ marginTop: '30px' }}
          onClick={() => {}}
        >
        Actualizar / Enviar
        </Button>
      </Stack>
    </>
  )
}
