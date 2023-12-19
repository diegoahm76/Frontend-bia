/* eslint-disable @typescript-eslint/naming-convention */

import { Button, Grid, Input, TextField } from '@mui/material';
import { Title } from '../../../../../../../../components';
import { RenderDataGrid } from '../../../../../../tca/Atom/RenderDataGrid/RenderDataGrid';
import { FormParte1 } from '../components/FormParte1';

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
      <Title title="Información del PQRSDF a solicitar complemento de información" />
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

