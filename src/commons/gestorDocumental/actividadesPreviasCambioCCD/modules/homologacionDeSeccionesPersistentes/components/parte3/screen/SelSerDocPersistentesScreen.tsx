/* eslint-disable @typescript-eslint/naming-convention */
import React from 'react';
import { containerStyles } from '../../../../../../tca/screens/utils/constants/constants';
import { Grid } from '@mui/material';
import { Title } from '../../../../../../../../components';
import { AgrupDocCoincidentesCCD } from '../components/AgrupDocCoincidentesCCD/AgrupDocCoincidentesCCD';
import { PersistenciaSerConfir } from '../components/PersistenciaSerConfir/PersistenciaSerConfir';
import { SecSubSeleccionada } from '../components/SecSubSeleccionada/SecSubSeleccionada';
import { useAppSelector } from '../../../../../../../../hooks';

export const SelSerDocPersistentesScreen = (): JSX.Element => {
  //* redux states declarations
  const { currentPersistenciaSeccionSubseccion } = useAppSelector(
    (state) => state.HomologacionesSlice
  );

  //* se hace la condional por si el objeto no tiene valores con los que se pueda trabajar
  if (
    !currentPersistenciaSeccionSubseccion ||
    Object.keys(currentPersistenciaSeccionSubseccion).length === 0
  )
    return <></>;

  return (
    <Grid container sx={containerStyles}>
      <Title title="Selección de series documentales persistentes entre CCD's" />

      {/* campo de texto con los valores  */}
      <SecSubSeleccionada />

      {/*Agrupaciones documentales coincidentes entre CCD */}

      <AgrupDocCoincidentesCCD />

      {/* Persistencia de series confirmadas en nuevo CCD */}
      <PersistenciaSerConfir />
    </Grid>
  );
};
