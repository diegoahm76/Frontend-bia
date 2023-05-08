import { Title } from '../../../../components/Title';
import { TablaObligacionesUsuario } from '../componentes/TablaObligacionesUsuario';
import { Grid, Box, TextField, Button, Stack } from "@mui/material";
import { Add } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ObligacionesUsuario: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <Title title='Listado de Obligaciones del Usuario Externo'/>
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
              <Grid item xs={12} sm={3}>
                <TextField
                  disabled
                  label="Nombres"
                  size="small"
                  fullWidth
                  value={'Marcela Cardenas'}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  disabled
                  label="Identificación"
                  size="small"
                  fullWidth
                  value={'4394204323'}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  disabled
                  label="Correo Electrónico"
                  size="small"
                  fullWidth
                  value={'marce@gmail.com'}
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
          >
              <p>Sus obligaciones pendientes por pago son las siguientes:</p>
              <TablaObligacionesUsuario />
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
                    navigate('registro')
                  }}
                >
                Crear Facilidad de Pago
                </Button>
              </Stack>
          </Box>
        </Grid>
      </Grid>
    </>
  )
}
