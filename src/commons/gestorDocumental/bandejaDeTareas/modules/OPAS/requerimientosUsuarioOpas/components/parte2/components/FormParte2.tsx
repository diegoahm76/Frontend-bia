/* eslint-disable @typescript-eslint/naming-convention */
import { Button, Grid, TextField } from '@mui/material';
import { Controller } from 'react-hook-form';

import ArrowForward from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { useEffect } from 'react';
import { useStepperRequerimiento } from '../../../../../../hook/useStepperRequerimiento';
import { control_warning } from '../../../../../../../../almacen/configuracion/store/thunks/BodegaThunks';
export const FormParte2 = ({
  controlFormulario,
  // handleSubmitFormulario,
  // errorsFormulario,
  // resetFormulario,
  watchFormulario,
  // setInfoReset,
}: any): JSX.Element => {
  // ? stepper hook
  const { handleNext, /*handleBack*/ } = useStepperRequerimiento();

    //* redux states functions
/*    const { currentAnexo } = useAppSelector(
      (state: any) => state.RequerimientoUsarioSlice
    );
  


  useEffect(() => {
    if (currentAnexo) {
      //  console.log('')('currentAnexo', currentAnexo);
      setInfoReset({
        ...currentAnexo,
      });
    }
  }, [currentAnexo]);
*/
  return (
    <>
      <form
        onSubmit={(e: any) => {
          e.preventDefault();
          if (
            /*watchFormulario.asunto.length === 0 ||*/
            watchFormulario.descripcion_de_la_solicitud.length === 0
          ) {
            control_warning('El campo de las observaciones sobre la solicitud es obligatorio');
            return;
          }

          handleNext();
        }}
        style={{
          marginTop: '3rem',
        }}
      >
        <Grid container spacing={2}>
          {/*<Grid item xs={12} sm={8}>
            <Controller
              name="asunto"
              control={controlFormulario}
              defaultValue=""
              rules={{ required: true }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  required
                  fullWidth
                  label="Asunto requerimiento"
                  size="small"
                  variant="outlined"
                  value={value}
                  InputLabelProps={{ shrink: true }}
                  onChange={(e) => {
                    onChange(e.target.value);
                    e.target.value.length === 50 &&
                      control_warning('máximo 50 caracteres');
                  }}
                  inputProps={{ maxLength: 50 }}
                />
              )}
            />
          </Grid>*/}
          <Grid item xs={12} sm={12}>
            <Controller
              name="fecha_de_solicitud"
              control={controlFormulario}
              rules={{ required: true }}
              render={() => (
                <TextField
                  required
                  fullWidth
                  disabled
                  type="date"
                  label="Fecha de solicitud"
                  size="small"
                  variant="outlined"
                  value={new Date().toISOString().slice(0, 10)}
                  InputLabelProps={{ shrink: true }}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={12}>
            <Controller
              name="descripcion_de_la_solicitud"
              control={controlFormulario}
              defaultValue=""
              rules={{ required: true }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  required
                  fullWidth
                  multiline
                  rows={10}
                  label="Observaciones de la solicitud"
                  size="small"
                  variant="outlined"
                  value={value}
                  InputLabelProps={{ shrink: true }}
                  onChange={(e) => {
                    onChange(e.target.value);
                    e.target.value.length === 255 &&
                      control_warning('máximo 255 caracteres');
                  }}
                  inputProps={{ maxLength: 255 }}
                />
              )}
            />
          </Grid>
        </Grid>

        <Grid
          item
          spacing={2}
          container
          xs={12}
          sm={12}
          sx={{
            width: '100%',
            maxWidth: '100%',
            mt: '2rem',
            justifyContent: 'center',
            textAlign: 'center',
            paddingBottom: '1.2rem',
          }}
        >
          <Button
            variant="contained"
            color="primary"
            type="submit"
            endIcon={<ArrowForward />}
            sx={{
              width: '35%',
              mr: '2rem',
            }}
          >
             Siguiente paso
          </Button>
        </Grid>
      </form>
    </>
  );
};
