/* eslint-disable @typescript-eslint/naming-convention */
import React from 'react';
import { UnidadesSeries } from '../components/unidadesSeries/UnidadesSeries';
import { SeccionSelecccionada } from '../components/seccionSeleccionada/SeccionSelecccionada';
import { Grid } from '@mui/material';
import { containerStyles } from '../../../../../../tca/screens/utils/constants/constants';
import { useAppSelector } from '../../../../../../../../hooks';

export const Parte2Screen = (): JSX.Element => {
  //* redux states neccesaries
  const { seccionesSinResponsable, ccdOrganigramaCurrentBusqueda } = useAppSelector(
    (state) => state.AsigUniRespSlice
  );

  // if (!seccionesSinResponsable?.unidades?.length) return <></>;
  if (!ccdOrganigramaCurrentBusqueda) return <></>;
  return (
    <Grid
      container
      sx={{
        ...containerStyles,
        justifyContent: 'center',
      }}
    >
      <UnidadesSeries />
      <SeccionSelecccionada />
    </Grid>
  );
};
