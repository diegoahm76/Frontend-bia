import { Grid, Typography } from '@mui/material';
import { BuscadorPersona } from '../../../components/BuscadorPersona';
import type { InfoPersona } from '../../../interfaces/globalModels';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const HomeScreen: React.FC = () => {
  const on_result = (data: InfoPersona): void => {
    console.log(data);
  };

  return (
    <>
      <Typography>HomeScreen</Typography>
      <Grid container>
        <Grid item xs={12}>
          <BuscadorPersona onResult={on_result} />
        </Grid>
      </Grid>
    </>
  );
};
