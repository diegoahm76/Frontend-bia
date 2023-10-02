import { Grid } from '@mui/material';
import React from 'react';
import { containerStyles } from '../../../../../../tca/screens/utils/constants/constants';
import { Title } from '../../../../../../../../components';
import { CoincidenciasHalladasCCD } from '../components/coincidenciasHalladasCCD/CoincidenciasHalladasCCD';
import { PersistenciaConfirmadaCCD } from '../components/persistenciaConfirmadaCCD/PersistenciaConfirmadaCCD';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SelSeccionesPerScreen = (): JSX.Element => {
  return (
    <Grid container sx={containerStyles}>
      <Title title="Selección de secciones persistentes" />

      {/* Coincidencias halladas de los CCD */}

      <CoincidenciasHalladasCCD />

      {/* persistencias confirmadas en nuevo ccd */}
      <PersistenciaConfirmadaCCD />
    </Grid>
  );
};
