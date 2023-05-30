import { Grid, Box, TextField, Button } from "@mui/material";
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { type Contacto } from '../interfaces/interfaces';
import { useSelector } from 'react-redux';

interface RootState {
  calidad_personas: {
    calidad_personas: Contacto;
  }
}

/* eslint-disable @typescript-eslint/naming-convention */
export const PersonaNatural: React.FC = () => {
  const { calidad_personas } = useSelector((state: RootState) => state.calidad_personas);
  return (
    <>
      <p><strong>Caso Persona Natural</strong></p>
      <Grid item xs={12}>
        <Box
          component="form"
          noValidate
          autoComplete="off"
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={3.5}>
              <Button
                color='primary'
                variant='outlined'
                size='medium'
                startIcon={<CloudDownloadIcon />}
                onClick={() => {}}
              >
                Ver Documento de Identidad
              </Button>
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                disabled
                label="Dirección Notificación"
                value={`${calidad_personas.direccion_notificaciones}`}
                size="small"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                disabled
                label="Ciudad"
                value={`${calidad_personas.ciudad}`}
                size="small"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                disabled
                label="Teléfono Contacto"
                value={`${calidad_personas.telefono_celular}`}
                size="small"
                fullWidth
              />
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </>
  )
}

export const PersonaJuridica: React.FC = () => {
  const { calidad_personas } = useSelector((state: RootState) => state.calidad_personas);
  return (
    <>
      <p><strong>Caso Persona Juridica / Apoderado</strong></p>
      <Grid item xs={12}>
        <Box
          component="form"
          noValidate
          autoComplete="off"
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4.6}>
              <Button
                color='primary'
                variant='outlined'
                size='medium'
                startIcon={<CloudDownloadIcon />}
                onClick={() => {}}
              >
                Ver Documento de Identidad Apoderado
              </Button>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Button
                color='primary'
                variant='outlined'
                size='medium'
                startIcon={<CloudDownloadIcon />}
                onClick={() => {}}
              >
                Ver Documento Poder
              </Button>
            </Grid>
            <Grid item xs={12} sm={5}>
              <Button
                color='primary'
                variant='outlined'
                size='medium'
                startIcon={<CloudDownloadIcon />}
                onClick={() => {}}
              >
                Ver Cert. Existencia y Representación Legal
              </Button>
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                disabled
                label="Dirección Notificación"
                value={`${calidad_personas.direccion_notificaciones}`}
                size="small"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                disabled
                label="Ciudad"
                value={`${calidad_personas.ciudad}`}
                size="small"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                disabled
                label="Teléfono Contacto"
                value={`${calidad_personas.telefono_celular}`}
                size="small"
                fullWidth
              />
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </>
  )
}

export const DeudorSolidarioNatural: React.FC = () => {
  const { calidad_personas } = useSelector((state: RootState) => state.calidad_personas);
  return (
    <>
      <p><strong>Caso Deudor Solidario</strong></p>
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
                label="Tipo Deudor Solidario"
                value={'Deudor Solidario Natural'}
                size="small"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Button
                color='primary'
                variant='outlined'
                size='medium'
                startIcon={<CloudDownloadIcon />}
                onClick={() => {}}
              >
                Ver Documento Deudor Solidario
              </Button>
            </Grid>
            <Grid item xs={12} sm={3.7}>
              <Button
                color='primary'
                variant='outlined'
                size='medium'
                startIcon={<CloudDownloadIcon />}
                onClick={() => {}}
              >
                Ver Oficio Respaldando Deuda
              </Button>
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                disabled
                label="Dirección Notificación"
                value={`${calidad_personas.direccion_notificaciones}`}
                size="small"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                disabled
                label="Ciudad"
                value={`${calidad_personas.ciudad}`}
                size="small"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                disabled
                label="Teléfono Contacto"
                value={`${calidad_personas.telefono_celular}`}
                size="small"
                fullWidth
              />
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </>
  )
}

export const DeudorSolidarioJuridico: React.FC = () => {
  const { calidad_personas } = useSelector((state: RootState) => state.calidad_personas);
  return (
    <>
      <p><strong>Caso Deudor Solidario</strong></p>
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
                label="Tipo Deudor Solidario"
                value={'Deudor Solidario Natural'}
                size="small"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Button
                color='primary'
                variant='outlined'
                size='medium'
                startIcon={<CloudDownloadIcon />}
                onClick={() => {}}
              >
                Ver Documento Deudor Solidario
              </Button>
            </Grid>
            <Grid item xs={12} sm={3.7}>
              <Button
                color='primary'
                variant='outlined'
                size='medium'
                startIcon={<CloudDownloadIcon />}
                onClick={() => {}}
              >
                Ver Oficio Respaldando Deuda
              </Button>
            </Grid>
            <Grid item xs={12} sm={5}>
              <Button
                color='primary'
                variant='outlined'
                size='medium'
                startIcon={<CloudDownloadIcon />}
                onClick={() => {}}
              >
                Ver Cert. Existencia y Representación Legal
              </Button>
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                disabled
                label="Dirección Notificación"
                value={`${calidad_personas.direccion_notificaciones}`}
                size="small"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                disabled
                label="Ciudad"
                value={`${calidad_personas.ciudad}`}
                size="small"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                disabled
                label="Teléfono Contacto"
                value={`${calidad_personas.telefono_celular}`}
                size="small"
                fullWidth
              />
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </>
  )
}
