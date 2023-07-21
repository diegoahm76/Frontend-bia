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
    if (pathname === '/auth/register') {
      set_extend({
        sm: 10,
        md: 10,
        lg: 8,
      });
    } else if (
      pathname === '/auth/cambiar_contrasena' ||
      pathname === '/auth/recuperar_contrasena' ||
      pathname === '/auth/recuperar_usuario'
    ) {
      set_extend({
        sm: 5,
        md: 4,
        lg: 3,
      });
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
    backgroundImage: `linear-gradient(269deg, rgba(20, 146, 230, 0.7) 0%, rgba(6, 47, 72, 0.7) 34%, rgba(54, 89, 22, 0.7) 100%), url(../image/imagenes/FondoCormaca.jpg)`,
    backgroundSize: '100% 100%',
    backgroundRepeat: 'no-repeat',
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
