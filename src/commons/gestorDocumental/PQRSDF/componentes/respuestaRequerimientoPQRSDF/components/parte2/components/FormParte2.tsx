/* eslint-disable @typescript-eslint/naming-convention */
import { Button, Grid, TextField } from '@mui/material';
import { Controller } from 'react-hook-form';
import ArrowForward from '@mui/icons-material/ArrowForward';
import Select from 'react-select';
import { useStepperRequerimiento } from '../../../../../../bandejaDeTareas/hook/useStepperRequerimiento';
import { control_warning } from '../../../../../../../almacen/configuracion/store/thunks/BodegaThunks';

export const FormParte2 = ({
  controlFormulario,
  watchFormulario,
}:
any): JSX.Element => {
  // ? stepper hook
  const { handleNext } = useStepperRequerimiento();
  return (
    <>
      <form
        onSubmit={(e: any) => {
          e.preventDefault();
          if (
            !watchFormulario.medio_de_solicitud.value ||
            watchFormulario.asunto.length === 0 ||
            watchFormulario.descripcion_de_la_solicitud.length === 0
          ) {
            control_warning(
              'Todos los campos son obligatorios, por favor diligenciarlos'
            );
            return;
          }

          handleNext();
        }}
        style={{
          marginTop: '3rem',
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={8}>
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
                  label="Asunto"
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
          </Grid>
          <Grid item xs={12} sm={4}>
            <Controller
              name="fecha_de_solicitud"
              control={controlFormulario}
              rules={{ required: true }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <TextField
                  required
                  fullWidth
                  disabled
                  type="date"
                  label="Fecha de solicitud"
                  size="small"
                  variant="outlined"
                  //* se debe poner la condicional del reset
                  value={new Date().toISOString().slice(0, 10)}
                  InputLabelProps={{ shrink: true }}
                />
              )}
            />
          </Grid>

          <Grid
            item
            xs={12}
            sm={12}
            sx={{
              mt: '1.2rem',
              mb: '1.2rem',
              zIndex: 10,
            }}
          >
            <Controller
              name="medio_de_solicitud"
              control={controlFormulario}
              rules={{ required: true }}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <div>
                  <Select
                    value={value}
                    name="medio_de_solicitud"
                    onChange={(selectedOption) => {
                      onChange(selectedOption);
                    }}
                    options={
                      [
                        {
                          value: 'Telefóno',
                          label: 'Telefóno',
                        },
                        {
                          value: 'Portal web',
                          label: 'Portal web',
                        },
                        {
                          value: 'Redes sociales',
                          label: 'Redes sociales',
                        },
                        {
                          value: 'Instalaciones de la corporación',
                          label: 'Instalaciones de la corporación',
                        },
                      ] ?? []
                    }
                    placeholder="Seleccionar"
                  />
                  <label>
                    <small
                      style={{
                        color: 'rgba(0, 0, 0, 0.6)',
                        fontWeight: 'thin',
                        fontSize: '0.75rem',
                        marginTop: '0.25rem',
                        marginLeft: '0.25rem',
                      }}
                    >
                      Medio de solicitud
                    </small>
                  </label>
                </div>
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
                  rows={5}
                  name='descripcion_de_la_solicitud'
                  label="Descripción de la solicitud"
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
              width: '55%',
              mr: '2rem',
            }}
          >
            Siguiente paso (paso final)
          </Button>
        </Grid>
      </form>
    </>
  );
};
