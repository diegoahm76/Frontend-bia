import { Grid } from '@mui/material';
import { FormParte3 } from '../components/FormParte3';
import { AccionesFinales } from '../../AccionesFinales/AccionesFinales';
import { Title } from '../../../../../../../../../components';

/* eslint-disable @typescript-eslint/naming-convention */
export const Parte3Screen = ({
  controlFormulario,
  handleSubmitFormulario,
  errorsFormulario,
  resetFormulario,
  watchFormulario,
  setInfoReset,
}: any): JSX.Element => {
  return (
    <Grid
      item
      xs={12}
      sx={{
        mt: '2rem',
      }}
    >
      <Title title="Anexos del requerimiento" />
      <FormParte3
        controlFormulario={controlFormulario}
        handleSubmitFormulario={handleSubmitFormulario}
        errorsFormulario={errorsFormulario}
        resetFormulario={resetFormulario}
        watchFormulario={watchFormulario}
        setInfoReset={setInfoReset}
      />
      <AccionesFinales
        controlFormulario={controlFormulario}
        handleSubmitFormulario={handleSubmitFormulario}
        errorsFormulario={errorsFormulario}
        resetFormulario={resetFormulario}
        watchFormulario={watchFormulario}
        setInfoReset={setInfoReset}
      />
    </Grid>
  );
};
