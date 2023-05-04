import { Box, Button, Grid, TextField, TextareaAutosize } from '@mui/material';
import { Title } from '../../../../components/Title';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const DetalleFacilidadPago: React.FC = () => {

  return (
    <>
      <Title title={`Detalle de la Facilidad de Pago ${'#2121231'}`} />
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
        <h3>Encabezado</h3>
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
                  label="Nombres"
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
                  label="Nombre Facilidad Pago"
                  size="small"
                  fullWidth
                  value="Permiso 1"
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  id="outlined-error-helper-text"
                  label="Días Mora"
                  size="small"
                  fullWidth
                  value="180"
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  id="outlined-error-helper-text"
                  label="Número Resolución"
                  size="small"
                  fullWidth
                  value="QWEO92-83812"
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
            <Grid item xs={12} sm={3}>
                <p>Observación</p>
                <TextareaAutosize
                  minRows={6}
                  cols={153}
                  value="Aquí van las observaciones escritas por el usuario."
                  disabled
                />
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
        <h3>Seguimiento - Detalle</h3>
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
                  label="Estado"
                  size="small"
                  fullWidth
                  value={"Aprobado"}
                  disabled
                />
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={12} mt='20px'>
          <Box
            component="form"
            noValidate
            autoComplete="off"
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={2}>
                <TextField
                  id="outlined-error-helper-text"
                  label="Plan de Pagos"
                  size="small"
                  fullWidth
                  value={"Si"}
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <Button
                  color='info'
                  variant='outlined'
                  size='medium'
                  onClick={() => {}}
                >
                  Ver
                </Button>
              </Grid>
              <Grid item xs={12} sm={2}>
                <TextField
                  id="outlined-error-helper-text"
                  label="Resolución"
                  size="small"
                  fullWidth
                  value={"Si"}
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <Button
                  color='info'
                  variant='outlined'
                  size='medium'
                  onClick={() => {}}
                >
                  Ver
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </>
  )
}
