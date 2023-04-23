import { Grid, Typography } from '@mui/material';
import { BuscadorPersona } from '../../../components/BuscadorPersona';
import { type InfoPersona } from '../../../interfaces/globalModels';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const HomeScreen: React.FC = () => {
  const result_search = (data_persona: InfoPersona): void => {
    console.log(data_persona);
  };

  return (
    <>
      <Typography>HomeScreen</Typography>
      <Grid container>
        <Grid item xs={12}>
          <BuscadorPersona onResult={result_search} />
        </Grid>
      </Grid>
    </>
  );
};
