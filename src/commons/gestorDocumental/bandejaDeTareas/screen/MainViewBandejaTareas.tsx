/* eslint-disable @typescript-eslint/naming-convention */

import { Grid } from '@mui/material';
import { containerStyles } from '../../tca/screens/utils/constants/constants';
import { Title } from '../../../../components';
import { BandejaDeTareasScreen } from '../mainModule/bandejaDeTareas/screen/bandejaDeTareas/BandejaDeTareasScren';

export const MainViewBandejaTareas = (): JSX.Element => {

  return (
    <Grid container sx={containerStyles}>
      <Title title="Bandeja de tareas" />
      <BandejaDeTareasScreen />
    </Grid>
  );
};
