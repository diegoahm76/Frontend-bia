/* eslint-disable @typescript-eslint/naming-convention */
import React from 'react';
import { useFormTransferDoc } from '../hook/useFormTransferDoc';
import { Grid } from '@mui/material';
import { Title } from '../../../../../components';
import { StepperTranferDocs } from '../components/stepperTransferDocs/StepperTransferDocs';

export const TransferDocMainScreen = (): JSX.Element => {
  const {
    controlHistorialTransferencias,
    resetHistorialTransferencias,
    watchHistorialTransferenciasExe,
  } = useFormTransferDoc();

  const props = {
    controlHistorialTransferencias,
    resetHistorialTransferencias,
    watchHistorialTransferenciasExe,
  };
  return (
    <>
      <Grid
        container
        sx={{
          position: 'relative',
          background: '#FAFAFA',
          borderRadius: '15px',
          p: '40px',
          mb: '30px',
          boxShadow: '0px 3px 6px #042F4A26',
        }}
      >
        <Grid item xs={12}>
          <Title title="Transferencias documentales" />
          {/* parte Inicial */}
          {/*  <ParteInicial />*/}
          {/*stepper*/}
          <StepperTranferDocs {...props} />
        </Grid>
      </Grid>
    </>
  );
};
