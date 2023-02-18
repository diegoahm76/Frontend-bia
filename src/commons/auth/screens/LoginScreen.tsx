import { Grid } from '@mui/material';

export const LoginScreen: React.FC = () => {
  return (
    <Grid
      spacing={0}
      direction={'column'}
      alignItems={'center'}
      justifyContent={'center'}
      sx={{ minHeight: '100vh', backgroundColor: 'primary.main' }}
    ></Grid>
  );
};
