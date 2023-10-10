/* eslint-disable @typescript-eslint/naming-convention */
import React from 'react';
import { UnidadesSeries } from '../components/unidadesSeries/UnidadesSeries';
import { SeccionSelecccionada } from '../components/seccionSeleccionada/SeccionSelecccionada';
import { Grid } from '@mui/material';
import { containerStyles } from '../../../../../../tca/screens/utils/constants/constants';

export const Parte2Screen = (): JSX.Element => {
  return (
    <Grid container sx={containerStyles}>
      <UnidadesSeries />
      <SeccionSelecccionada />
    </Grid>
  );
};
