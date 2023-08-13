import { Grid, Box, TextField, Button } from "@mui/material";
import { CloudDownload } from '@mui/icons-material';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const VistaReposicion: React.FC = () => {

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
              <Grid item xs={12} sm={4}>
                <TextField
                  disabled
                  label="Nombre o Razón Social"
                  size="small"
                  fullWidth
                  value={''}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  disabled
                  label="Identificación"
                  size="small"
                  fullWidth
                  value={''}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  disabled
                  label="Correo Electrónico"
                  size="small"
                  fullWidth
                  value={''}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  disabled
                  label="Dirección Notificación"
                  size="small"
                  fullWidth
                  value={''}
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
        <Grid item xs={12}>
          <Box
            component="form"
            noValidate
            autoComplete="off"
            mb='40px'
          >
            <Grid container spacing={2} mb='20px'>
              <Grid item xs={12} sm={4}>
                <Button
                  variant="outlined"
                  fullWidth
                  size='medium'
                  component="label"
                  startIcon={<CloudDownload />}
                  onClick={()=>{}}
                >
                  Ver Recurso de Reposición
                </Button>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Button
                  variant="outlined"
                  fullWidth
                  size='medium'
                  component="label"
                  startIcon={<CloudDownload />}
                >
                  Ver Anexos y Pruebas
                </Button>
              </Grid>
              <Grid item xs={12} sm={15}>
                <TextField
                  multiline
                  rows={4}
                  label="Observación"
                  size="small"
                  fullWidth
                  value={''}
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
