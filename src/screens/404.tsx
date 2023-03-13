import { Box, Button, Grid, Typography } from '@mui/material';
import '../css/App.css';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Page404: React.FC = () => {
  return (
    <Grid
      container
      bgcolor="#fff"
      height="100vh"
      justifyContent="center"
      alignContent="center"
    >
      <Grid item xs={12} container justifyContent="center">
        <Grid item xs={12} sm={6} padding={1}>
          <Box className="four_zero_four_bg">
            <Typography variant="h1" textAlign={'center'}>
              404
            </Typography>
          </Box>
          <Box className="contant_box_404">
            <Typography textAlign="center" variant="h6" className="font-arvo">
              Parece que estás perdido
            </Typography>
            <Typography textAlign="center" variant="h6" className="font-arvo">
              La página que buscas no esta disponible!
            </Typography>
          </Box>
        </Grid>

        <Grid
          item
          xs={12}
          container
          alignItems="center"
          direction="column"
          justifyContent="center"
        >
          <Button
            onClick={() => {
              window.history.go(-1);
            }}
            variant="outlined"
            sx={{ width: '100px' }}
          >
            Volver
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};
