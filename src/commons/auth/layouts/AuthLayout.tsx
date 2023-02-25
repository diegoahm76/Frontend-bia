import { Grid } from '@mui/material';
import { useLocation } from 'react-router-dom';

interface Props {
  children: JSX.Element;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const AuthLayout: React.FC<Props> = ({ children }: Props) => {
  const { pathname } = useLocation();
  const mode = pathname === '/auth/register' ? 2 : false;
  return (
    <Grid
      container
      direction={'column'}
      alignItems={'center'}
      justifyContent={'center'}
      padding={2}
      sx={{
        minHeight: '100vh',
        backgroundColor: 'primary.secondary',
      }}
    >
      <Grid container justifyContent={'center'}>
        <Grid
          item
          className="box-shadow"
          xs={12}
          sm={mode === 2 ? 9 : 6}
          md={mode === 2 ? 8 : 5}
          lg={mode === 2 ? 4 : 3}
          sx={{
            backgroundColor: '#ffff',
            padding: 2,
            borderRadius: 5,
          }}
        >
          <Grid item xs={12} container justifyContent="center" mb={3}>
            <img
              src="../image/logos/logo_bia.png"
              alt="Logo BIA"
              className="logo"
            />
          </Grid>
          {/* ELemento hijo que se mostrara */}
          {children}
        </Grid>
      </Grid>
    </Grid>
  );
};
