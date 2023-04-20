import { useState, useEffect } from 'react';
import { Card, CardContent, Divider, Grid } from '@mui/material';
import { useLocation } from 'react-router-dom';

interface Props {
  children: JSX.Element;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const AuthLayout: React.FC<Props> = ({ children }: Props) => {
  const { pathname } = useLocation();
  const [extent, set_extend] = useState({
    sm: 6,
    md: 6,
    lg: 6,
  });

  useEffect(() => {
    switch (pathname) {
      case '/auth/register':
        set_extend({
          sm: 10,
          md: 10,
          lg: 8,
        });
        break;
      case '/auth/login':
        set_extend({
          sm: 6,
          md: 6,
          lg: 6,
        });
        break;
      case '/auth/cambiar_contrasena':
        set_extend({
          sm: 5,
          md: 5,
          lg: 3,
        });
        break;
      case '/auth/recuperar_contrasena':
        set_extend({
          sm: 5,
          md: 4,
          lg: 3,
        });
        break;
    }
  }, []);

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
          sm={extent.sm}
          md={extent.md}
          lg={extent.lg}
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
              {/* ELemento hijo que se mostrara */}
              {children}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
};
