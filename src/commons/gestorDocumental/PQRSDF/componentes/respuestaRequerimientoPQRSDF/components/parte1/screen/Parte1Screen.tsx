/* eslint-disable @typescript-eslint/naming-convention */

import { Grid } from '@mui/material';
import { FormParte1 } from '../components/FormParte1';
import { Title } from '../../../../../../../../components';

export const Parte1Screen = ({
  controlFormulario,
  handleSubmitFormulario,
  errorsFormulario,
  resetFormulario,
  watchFormulario,
}: any): JSX.Element => {
  return (
    <Grid
      item
      xs={12}
      sx={{
        mt: '2rem',
      }}
    >
      <Title title="Información del PQRSDF a responder el requerimiento / solicitud" />
      <FormParte1
        controlFormulario={controlFormulario}
        handleSubmitFormulario={handleSubmitFormulario}
        errorsFormulario={errorsFormulario}
        resetFormulario={resetFormulario}
        watchFormulario={watchFormulario}
      />
    </Grid>
  );
};
// Compare this snippet from src/commons/gestorDocumental/panelDeVentanilla/module/entrega99/components/parte1/screen/Parte1Screen.tsx:

