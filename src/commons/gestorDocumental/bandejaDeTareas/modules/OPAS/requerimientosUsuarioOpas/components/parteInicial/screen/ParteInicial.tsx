/* eslint-disable @typescript-eslint/naming-convention */

import { useContext } from 'react';
import { PerSolicitaRequerimiento } from '../components/perSolicitaRequerimiento/PerSolicitaRequerimiento';
import { PersonaTitular } from '../components/personaTitular/PersonaTitular';
import { Grid } from '@mui/material';
import { ModalAndLoadingContext } from '../../../../../../../../../context/GeneralContext';
import { Loader } from '../../../../../../../../../utils/Loader/Loader';

export const ParteInicial: React.FC = (): JSX.Element => {
  const { generalLoading } =
    useContext(ModalAndLoadingContext);

  if (generalLoading) {
    return (
      <Grid
        container
        sx={{
          position: 'relative',
          justifyContent: 'center',
          background: '#FAFAFA',
          borderRadius: '15px',
          p: '2rem',
          mt: '1.2rem',
          mb: '1.2rem',
          boxShadow: '0px 3px 6px #042F4A26',
        }}
      >
        <Loader altura={400} />
      </Grid>
    );
  }

  return (
    <>
      <PersonaTitular />
      <PerSolicitaRequerimiento />
    </>
  );
};
