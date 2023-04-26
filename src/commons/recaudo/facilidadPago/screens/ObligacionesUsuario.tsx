import { Title } from '../../../../components/Title';
import { TablaObligacionesUsuario } from '../componentes/TablaObligacionesUsuario';
import { Grid, Box, TextField, Button, Stack } from "@mui/material";
import { useNavigate } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ObligacionesUsuario: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <Title title='Listado de Obligaciones del usuario'/>
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
                  required
                  id="outlined-error-helper-text"
                  label="Nombres"
                  helperText='Escribe Nombre y Apellido'
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  required
                  id="outlined-error-helper-text"
                  label="Identificación"
                  helperText='Escribe Número de Identificación'
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  required
                  id="outlined-error-helper-text"
                  label="Correo Electrónico"
                  helperText='Escribe Correo Electrónico'
                  size="small"
                  fullWidth
                />
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
      <p>Sus obligaciones pendientes por pago son las siguientes:</p>
      <TablaObligacionesUsuario />
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
          onClick={() => {
            navigate('registro')
          }}
        >
        Crear Facilidad de Pago
        </Button>
      </Stack>
    </>
  )
}
