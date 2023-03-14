import { CircularProgress, Grid } from '@mui/material';
import Typography from '@mui/material/Typography';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const CheckingAuth: React.FC = () => {
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
      }}
    >
      <Grid item xs={12} sm={6}>
        <CircularProgress
          size={64}
          sx={{
            color: '#FFFF',
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography
          sx={{
            color: '#FFFF',
            fontSize: 18,
          }}
        >
          Validando, por favor espere...
        </Typography>
      </Grid>
    </Grid>
  );
};
