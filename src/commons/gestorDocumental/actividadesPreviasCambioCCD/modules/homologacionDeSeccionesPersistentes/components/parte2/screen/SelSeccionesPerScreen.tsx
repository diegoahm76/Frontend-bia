/* eslint-disable @typescript-eslint/naming-convention */
import { Grid } from '@mui/material';
import React, { useContext } from 'react';
import { containerStyles } from '../../../../../../tca/screens/utils/constants/constants';
import { Title } from '../../../../../../../../components';
import { CoincidenciasHalladasCCD } from '../components/coincidenciasHalladasCCD/CoincidenciasHalladasCCD';
import { PersistenciaConfirmadaCCD } from '../components/persistenciaConfirmadaCCD/PersistenciaConfirmadaCCD';
import { useAppSelector } from '../../../../../../../../hooks';
import { Loader } from '../../../../../../../../utils/Loader/Loader';
import { ModalAndLoadingContext } from '../../../../../../../../context/GeneralContext';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SelSeccionesPerScreen = (): JSX.Element => {
  //* redux states neccesaries
  const { ccdOrganigramaCurrentBusqueda } = useAppSelector(
    (state) => state.HomologacionesSlice
  );

  const { generalLoading } = useContext(ModalAndLoadingContext);

  if (generalLoading) {
    return (
      <Grid
        container
        sx={{
          ...containerStyles,
          boxShadow: 'none',
          background: '#fff',
          position: 'static',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Loader altura={300} />
      </Grid>
    );
  }

  if (!ccdOrganigramaCurrentBusqueda) return <></>;

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
