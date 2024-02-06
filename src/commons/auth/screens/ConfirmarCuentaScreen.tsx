
import {
  Grid,
  Typography,
  Button,
  Card,
  CardContent,
  Divider,
} from '@mui/material';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ConfirmarCuentaScreen: React.FC = () => {
  return (
    <Grid
      container
      direction={'column'}
      alignItems={'center'}
      justifyContent={'center'}
      padding={2}
      sx={{
        minHeight: '100vh',
        backgroundColor: '#042f4a',
        backgroundImage: 'url(../image/back_login.svg)',
        backgroundSize: 'cover',
      }}
    >
      <Grid container justifyContent={'center'}>
        <Grid
          item
          xs={12}
          sm={10}
          md={10}
          lg={6}
          sx={{
            backgroundColor: '#ffff',
            borderRadius: 5,
          }}
        >
          <Card sx={{ borderRadius: 5, padding: 2 }}>
            <CardContent>
              <Grid
                item
                xs={12}
                container
                justifyContent="center"
                sx={{
                  background: '#fafafa',
                  padding: '10px 0 0 0',
                  borderRadius: '15px',
                }}
              >
                <img
                  src="../image/logos/logo_bia.png"
                  alt="Logo BIA"
                  className="logo"
                />
              </Grid>
              <Divider className="divider2" sx={{ m: '20px 0' }} />
              <Grid
                container
                justifyContent="center"
                alignContent="center"
                padding={3}
                spacing={3}
              >
                <Grid item xs={12}>
                  <Typography variant="h4" textAlign="center">
                    Confirmación de cuenta exitosa
                  </Typography>
                  {/* cuenta_confirmada && */}
                </Grid>
                <Grid item xs={12} container justifyContent="center">
                  <Grid item xs={12} sm={4}>
                    <Button fullWidth variant="contained" href="#/auth/login">
                      Iniciar sesión
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
};
