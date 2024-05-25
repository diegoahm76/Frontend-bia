/* eslint-disable @typescript-eslint/naming-convention */

import { Button, Grid, Input, TextField } from '@mui/material';
import { FormParte1 } from '../components/FormParte1';
import { Title } from '../../../../../../../../../components';

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
      <Title title="Información de la OPA a realizar la solicitud de requerimiento" />
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

