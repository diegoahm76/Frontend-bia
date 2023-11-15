import { Grid } from '@mui/material';
import { FormParte3 } from '../components/FormParte3';
import { Title } from '../../../../../../../../components';

/* eslint-disable @typescript-eslint/naming-convention */
export const Parte3Screen = (): JSX.Element => {
  return (
    <Grid
      item
      xs={12}
      sx={{
        mt: '2rem',
      }}
    >
      <Title title="Anexos" />
      <FormParte3 />
    </Grid>
  );
};
