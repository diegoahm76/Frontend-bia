/* eslint-disable @typescript-eslint/naming-convention */
import { Button, Grid, TextField } from '@mui/material';
import { Controller } from 'react-hook-form';
import { control_warning } from '../../../../../../../almacen/configuracion/store/thunks/BodegaThunks';
import { usePanelVentanilla } from '../../../../../hook/usePanelVentanilla';
import ArrowForward from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useSstepperFn } from '../../../hook/useSstepperFn';
export const FormParte2 = (): JSX.Element => {
  //* hooks
  const { controlSegundoPasoEntrega99 } = usePanelVentanilla();

  // ? stepper hook
  const { handleNext, handleBack } = useSstepperFn();

  return (
    <>
      <form
        style={{
          marginTop: '3rem',
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={8}>
            <Controller
              name="asunto"
              control={controlSegundoPasoEntrega99}
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
                  helperText={error ? 'Es obligatorio subir un archivo' : ''}
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
              control={controlSegundoPasoEntrega99}
              defaultValue=""
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
                  helperText={error ? 'Es obligatorio subir un archivo' : ''}
                  size="small"
                  variant="outlined"
                  value={value}
                  InputLabelProps={{ shrink: true }}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={12}>
            <Controller
              name="descripcion_de_la_solicitud"
              control={controlSegundoPasoEntrega99}
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
                  // name="nombre"
                  label="Descripción de la solicitud"
                  helperText={error ? 'Es obligatorio subir un archivo' : ''}
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
            startIcon={<ArrowForward />}
            onClick={() => {
              console.log('click siuuu');
              //* hacer validaciones previas antes de permitir el avance a la parte 3


              handleNext();
            }}
            sx={{
              width: '35%',
              mr: '2rem',
            }}
          >
            Siguiente
          </Button>


          
         {/* <Button
            variant="contained"
            color="warning"
            onClick={() => {
              console.log('click siuuu');


              //* revisar si se deben hacer validaicones, momentanemante parece que noP

              handleBack();
            }}
            startIcon={<ArrowBackIcon />}
            sx={{
              width: '35%',
              ml: '1.2rem',
            }}
          >
            Volver
          </Button>*/}
        </Grid>
      </form>
    </>
  );
};
