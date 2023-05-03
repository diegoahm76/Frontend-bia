import { Grid, Box, TextField, Button } from "@mui/material";
import { useState } from "react";
import { TablaObligacionesSolicitud } from "./TablaObligacionesSolicitud";

// eslint-disable-next-line @typescript-eslint/naming-convention
export const InputsEncabezadoAdmin: React.FC = () => {
  const [obligaciones, set_obligaciones] = useState(false);

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
                  label="Nombre o Razón Social"
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
                  label="Dirección Notificación"
                  size="small"
                  fullWidth
                  value="Cra 23 #203-901"
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
              <Grid item xs={12} sm={3}>
                <TextField
                  id="outlined-error-helper-text"
                  label="Obligaciones asociadas al radicado nro:"
                  size="small"
                  fullWidth
                  value="QWEO9283812"
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <Button
                  color='info'
                  variant='contained'
                  onClick={() => {
                    set_obligaciones(true)
                  }}
                >
                Consultar listado obligaciones
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        {
          obligaciones ? (
            <>
              <p><strong>Obligaciones objeto de la solicitud</strong></p>
              <TablaObligacionesSolicitud />
            </>
          ) : null
        }
      </Grid>
    </>
  )
}
