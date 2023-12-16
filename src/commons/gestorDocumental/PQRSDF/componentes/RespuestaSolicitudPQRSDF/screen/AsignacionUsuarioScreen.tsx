/* eslint-disable @typescript-eslint/naming-convention */

import { Grid } from '@mui/material';
import { StepperAsignacionUsuario } from '../components/stepper/StepperAsignacionUsuario';
import { Title } from '../../../../../../components';
import { ParteInicial } from '../components/parteInicial/screen/ParteInicial';
import { useEffect } from 'react';

export const AsignacionUsuarioScreen = (): JSX.Element => {
  {
    /*de entrada al módulo se van a tener que realizar ciertas solictudes para llenar infomación dentro de los campos de la entrega*/
  }

  {/* esa información debe pasaar derecho a los frames predispuestos */}

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
          <Title title="Solicitud al usuario sobre PQRSDF" />
          {/* parte Inicial */}
          <ParteInicial />
          {/*stepper*/}
          <StepperAsignacionUsuario />
        </Grid>
      </Grid>
    </>
  );
};
