import { Title } from '../../../../components/Title';
import { InputsEncabezadoAdmin } from '../componentes/InputsEncabezadoAdmin';
import { Grid, Box, FormControl, InputLabel, Select, MenuItem, TextareaAutosize, Button, Stack } from "@mui/material";
import { useState } from "react";

interface event {
  target: {
    value: string
  }
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const VisualizarSolicitudAdmin: React.FC = () => {
  const [plan_pagos, set_plan_pagos] = useState('');
  const [resolucion, set_resolucion] = useState('');
  return (
    <>
      <Title title='Visualizar solicitud Facilidad de Pago - Usuario Cormacarena'/>
      <InputsEncabezadoAdmin />
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
                    label="Asignar Estado"
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
                    label="Aprobado"
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
                    label="¿Crear plan de pagos?"
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
              <Grid item xs={12} sm={3}>
                <FormControl size="small" fullWidth>
                  <InputLabel id="demo-simple-select-label">¿Crear Resolución?</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="¿Crear Resolución?"
                    onChange={(event: event)=>{
                      const { value } = event.target
                      set_resolucion(value)
                    }}
                  >
                    <MenuItem value="si">Si</MenuItem>
                    <MenuItem value="no">No</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              {
                resolucion === "si" ? (
                  <Grid item xs={12} sm={3}>
                    <Button
                      color='info'
                      variant='contained'
                      onClick={() => {}}
                    >
                    Crear Resolución
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
