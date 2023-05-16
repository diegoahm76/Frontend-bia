import { useState } from 'react';
import { Box, Button, Grid, Stack, TextField } from '@mui/material';
import { Title } from '../../../components';
import { CambioContrasenaModal } from '../components/datosAcceso/CambioContrasenaModal';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const DatosAccesoScreen: React.FC = () => {
  const [datos_acceso, set_datos_acceso] = useState<boolean>(false);

  return (
    <>
      <Grid
        container
        sx={{
          position: 'relative',
          background: '#FAFAFA',
          borderRadius: '15px',
          p: '20px',
          mb: '20px',
          boxShadow: '0px 3px 6px #042F4A26',
        }}
      >
        <Grid item xs={12}>
          <Title title="Mis datos de acceso" />
          <Box
            component="form"
            sx={{ mt: '20px' }}
            noValidate
            autoComplete="off"
          >
            <Grid container>
              <Grid item container spacing={2} xs={12} sm={4}>
                <Grid item xs={12} sm={12}>
                  <TextField label="Nombre de usuario" size="small" fullWidth />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField label="Tipo usuario" size="small" fullWidth />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    // label="fecha activacion inicial"
                    type="date"
                    size="small"
                    fullWidth
                  />
                </Grid>
                <Stack justifyContent="center" sx={{ p: '20px' }}>
                  <Button color="success" variant="contained">
                    Guardar
                  </Button>
                </Stack>
              </Grid>

              <Grid
                item
                xs={12}
                sm={6}
                sx={{
                  pl: '150px',
                }}
              >
                <img
                  height={150}
                  width={200}
                  src="https://d500.epimg.net/cincodias/imagenes/2016/07/04/lifestyle/1467646262_522853_1467646344_noticia_normal.jpg"
                  alt="No hay imagen"
                />
                <TextField type="file" size="small" fullWidth />

                <Stack justifyContent="center" sx={{ p: '20px' }}>
                  <Button
                    color="warning"
                    variant="contained"
                    onClick={() => {
                      set_datos_acceso(true);
                    }}
                  >
                    Cambiar contraseña
                  </Button>
                </Stack>
              </Grid>
              {datos_acceso && (
                <CambioContrasenaModal
                  is_modal_active={datos_acceso}
                  set_is_modal_active={set_datos_acceso}
                />
              )}
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};
