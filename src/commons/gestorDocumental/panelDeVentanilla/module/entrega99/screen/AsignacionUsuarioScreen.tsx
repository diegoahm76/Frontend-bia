/* eslint-disable @typescript-eslint/naming-convention */

import { Grid } from '@mui/material';
import { StepperAsignacionUsuario } from '../components/stepper/StepperAsignacionUsuario';
import { Title } from '../../../../../../components';

export const AsignacionUsuarioScreen = (): JSX.Element => {
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
          {/*parte 1*/}
          {/* parte2 */}
          {/* parte3 */}
          {/*stepper*/}
          <StepperAsignacionUsuario />
        </Grid>
      </Grid>
    </>
  );
};
