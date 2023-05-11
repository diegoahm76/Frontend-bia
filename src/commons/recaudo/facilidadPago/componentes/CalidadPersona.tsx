import { Grid, Box, TextField, Button } from "@mui/material";
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';

/* eslint-disable @typescript-eslint/naming-convention */
export const PersonaNatural: React.FC = () => {
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
                value={'Cl 45 # 302A-320'}
                size="small"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                disabled
                label="Ciudad"
                value={'Bogotá'}
                size="small"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                disabled
                label="Teléfono Contacto"
                value={'3123457865'}
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
                value={'Cl 32 #201-305'}
                size="small"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                disabled
                label="Ciudad"
                value={'Bogotá'}
                size="small"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                disabled
                label="Teléfono Contacto"
                value={'3214932553'}
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

export const DeudorSolidario: React.FC = () => {
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
                value={'Ej 1'}
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
                value={'Cra 34 #213-201'}
                size="small"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                disabled
                label="Ciudad"
                value={'Medellín'}
                size="small"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                disabled
                label="Teléfono Contacto"
                value={'3214923232'}
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
