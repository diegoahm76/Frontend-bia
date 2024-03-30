/* eslint-disable @typescript-eslint/naming-convention */
import { Grid } from '@mui/material';
import { FormParte2 } from '../components/FormParte2';
import { Title } from '../../../../../../../../components';

export const Parte2Screen = ({
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
      <Title title="Respuesta requerimiento / solicitud PQRSDF" />
      <FormParte2
        controlFormulario={controlFormulario}
        handleSubmitFormulario={handleSubmitFormulario}
        errorsFormulario={errorsFormulario}
        resetFormulario={resetFormulario}
        watchFormulario={watchFormulario}
      />
    </Grid>
  );
};
