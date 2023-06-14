import { Box, Button, Grid, Stack, TextField } from '@mui/material';
import { Title } from '../../../../components/Title';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { Add } from '@mui/icons-material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const DetalleFacilidadPago: React.FC = () => {
  const [estado] = useState('Cancelada/Anulada');
  const navigate = useNavigate();

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

        {/* <h3>Encabezado</h3> */}
        <Grid item xs={12}>
          <Box
            component="form"
            noValidate
            autoComplete="off"
          >
            <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Title title={estado !== 'Cancelada/Anulada' ? `Detalle de la Facilidad de Pago ${'#2121231'}` : `Facilidad de Pago Cancelada o Bloqueada ${'#2121231'}`} />
                </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  label="Nombres"
                  size="small"
                  fullWidth
                  value="Maria Cardenas"
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  label="Identificación"
                  size="small"
                  fullWidth
                  value="1140239284"
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  label="Correo Electrónico"
                  size="small"
                  fullWidth
                  value="maria@gmail.com"
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  label="Nombre Facilidad Pago"
                  size="small"
                  fullWidth
                  value="Permiso 1"
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  label="Días Mora"
                  size="small"
                  fullWidth
                  value="180"
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  label="Número Resolución"
                  size="small"
                  fullWidth
                  value="QWEO92-83812"
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  label="Fecha Solicitud"
                  size="small"
                  fullWidth
                  value="04/26/2023"
                  disabled
                />
              </Grid>
              <Grid item xs={12} sm={15}>
                <TextField
                  multiline
                  rows={4}
                  value={"Aquí van las observaciones escritas por el usuario."}
                  label="Observación"
                  size="small"
                  disabled
                  fullWidth
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
                  label="Estado"
                  size="small"
                  fullWidth
                  value={"Cancelada/Anulada"}
                  disabled
                />
              </Grid>
            </Grid>
          </Box>
        </Grid>
        {
          estado !== "Cancelada/Anulada" ? (
            <Grid item xs={12} mt='20px'>
              <Box
                component="form"
                noValidate
                autoComplete="off"
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={2}>
                    <TextField
                      label="Plan de Pagos"
                      size="small"
                      fullWidth
                      value={"Si"}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <Button
                      color='primary'
                      variant='outlined'
                      size='medium'
                      startIcon={<CloudDownloadIcon />}
                      onClick={() => { }}
                    >
                      Ver
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <TextField
                      label="Resolución"
                      size="small"
                      fullWidth
                      value={"Si"}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <Button
                      color='primary'
                      variant='outlined'
                      size='medium'
                      startIcon={<CloudDownloadIcon />}
                      onClick={() => { }}
                    >
                      Ver
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          ) : (
            <Grid item xs={12} mt='20px'>
              <Box
                component="form"
                noValidate
                autoComplete="off"
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={2}>
                    <TextField
                      label="Plan de Pagos"
                      size="small"
                      fullWidth
                      value={"No"}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <TextField
                      label="Resolución"
                      size="small"
                      fullWidth
                      value={"Si"}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <Button
                      color='primary'
                      variant='outlined'
                      size='medium'
                      startIcon={<CloudDownloadIcon />}
                      onClick={() => { }}
                    >
                      Ver
                    </Button>
                  </Grid>
                </Grid>
                <Stack
                  direction="row"
                  justifyContent="right"
                  spacing={2}
                  sx={{ mb: '20px' }}
                >
                  <Button
                    color='primary'
                    variant='contained'
                    startIcon={<Add />}
                    sx={{ marginTop: '30px' }}
                    onClick={() => {
                      navigate('/') // aún no se ha construido esta pantalla
                    }}
                  >
                    Crear recurso de reposición
                  </Button>
                </Stack>
              </Box>
            </Grid>
          )
        }
      </Grid>
    </>
  )
}
