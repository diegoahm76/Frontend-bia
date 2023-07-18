/* eslint-disable @typescript-eslint/naming-convention */

import { Box, Grid, Button, Typography } from '@mui/material';
import '../../css/App.css';
export const OfflineScreen = (): JSX.Element => {
  return (
    <>
      <Grid
        container
        bgcolor="#fff"
        height="100vh"
        justifyContent="center"
        alignContent="center"
      >
        <Grid item xs={12} container justifyContent="center">
          <Grid item xs={12} sm={6} padding={1}>
            <Typography
              variant="h4"
              textAlign={'center'}
              sx={{
                marginBottom: '5rem'
              }}
            >
              Error de conexión!
            </Typography>
            <Box className="no_connection_bg"></Box>
            <Box className="contant_box_no_connection">
              <Typography textAlign="center" variant="h6" className="font-arvo">
                ¡Ups! Parece que has perdido la conexión a internet.
              </Typography>
              <Typography textAlign="center" variant="h6" className="font-arvo">
                Por favor, revisa y vuelve a intentarlo.
              </Typography>
            </Box>
          </Grid>

          <Grid
            item
            container
            alignItems="center"
            direction="column"
            justifyContent="center"
          >
            <Button
              fullWidth
              onClick={() => {
                window.location.reload();
              }}
              variant="contained"
              color="primary"
              sx={{ width: '200px', mt: '1rem' }}
            >
              Refrescar página
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
