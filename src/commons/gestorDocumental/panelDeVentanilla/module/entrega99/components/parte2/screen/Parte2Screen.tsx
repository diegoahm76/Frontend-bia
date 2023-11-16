/* eslint-disable @typescript-eslint/naming-convention */
import { Grid } from '@mui/material';
import { Title } from '../../../../../../../../components';
import { FormParte2 } from '../components/FormParte2';

export const Parte2Screen = (): JSX.Element => {
  return (
    <Grid
      item
      xs={12}
      sx={{
        mt: '2rem',
      }}
    >
      <Title title="Solicitud de complemento de información al usuario" />
      <FormParte2 />
    </Grid>
  );
};
