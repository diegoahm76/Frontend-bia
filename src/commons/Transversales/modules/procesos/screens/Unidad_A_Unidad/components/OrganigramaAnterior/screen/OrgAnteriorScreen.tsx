/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */

import { Grid, TextField } from '@mui/material';
import { Controller } from 'react-hook-form';
import { Title } from '../../../../../../../../../components';
// import SearchIcon from '@mui/icons-material/Search';
import { useUnidadAUnidad } from '../../../hook/useUnidadAUnidad';

export const OrgAnteriorScreen = (): JSX.Element => {
  //* redux states
  /*  const { organigrama_lideres_current } = useAppSelector(
    (state) => state.lideres_slice
  );
*/
  //* hooks
  const { control_organigrama_anterior } = useUnidadAUnidad();

  // ? useContext declaration
  /*  const {
     modalBusquedaAvanzadaOrganigrama,
    openModalBusquedaAvanzadaOrganigrama
    closeModalBusquedaAvanzadaOrganigrama
  } = useContext(ModalContextLideres);
*/
  //* ----- Onsubmit function -----
  const onSubmit = (data?: any): void => {
    console.log(data);
  };

  return (
    <>
      <Grid
        container
        sx={{
          position: 'relative',
          background: '#FAFAFA',
          borderRadius: '15px',
          p: '20px',
          mb: '20px',
          boxShadow: '0px 3px 6px #042F4A26'
        }}
      >
        <Grid item xs={12}>
          <Title title="Organigrama Anterior" />
          <form
            onSubmit={(w) => {
              w.preventDefault();
              onSubmit();
            }}
            style={{
              marginTop: '20px'
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={3.5}>
                <Controller
                  name="nombre"
                  control={control_organigrama_anterior}
                  defaultValue=""
                  rules={{ required: true }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error }
                  }) => (
                    <TextField
                      fullWidth
                      label="Nombre del Organigrama"
                      size="small"
                      variant="outlined"
                      value={
                        value
                        /* organigrama_lideres_current?.nombre ||
                        organigrama_lideres_current?.nombre_organigrama */
                      }
                      InputLabelProps={{ shrink: true }}
                      disabled={true}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={5.5}>
                <Controller
                  name="descripcion"
                  control={control_organigrama_anterior}
                  defaultValue=""
                  rules={{ required: true }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error }
                  }) => (
                    <TextField
                      fullWidth
                      label="Descripción"
                      size="small"
                      multiline
                      rows={1}
                      maxRows={2}
                      variant="outlined"
                      value={
                        value
                        /* organigrama_lideres_current?.descripcion ||
                        organigrama_lideres_current?.descripcion_organigrama */
                      }
                      InputLabelProps={{ shrink: true }}
                      disabled={true}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={3}>
                <Controller
                  name="verison"
                  control={control_organigrama_anterior}
                  render={({
                    field: { onChange, value },
                    fieldState: { error }
                  }) => (
                    <TextField
                      fullWidth
                      label="Versión"
                      size="small"
                      variant="outlined"
                      value={
                        value
                        /* organigrama_lideres_current?.version ||
                        organigrama_lideres_current?.version_organigra */
                      }
                      InputLabelProps={{ shrink: true }}
                      disabled={true}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={2.6}>
                <Controller
                  name="fecha_puesta_produccion"
                  control={control_organigrama_anterior}
                  defaultValue=""
                  render={({
                    field: { onChange, value },
                    fieldState: { error }
                  }) => (
                    <TextField
                      fullWidth
                      label="Fecha Puesta en Producción"
                      size="small"
                      variant="outlined"
                      value={
                        value
                        /*  organigrama_lideres_current?.fecha_puesta_produccion
                          ? new Date(
                              organigrama_lideres_current?.fecha_puesta_produccion
                            ).toLocaleString()
                          : '' ||
                            (organigrama_lideres_current?.fecha_puesta_produccion_organigrama &&
                              new Date(
                                organigrama_lideres_current?.fecha_puesta_produccion_organigrama
                              ).toLocaleString()) */
                      }
                      disabled={true}
                      InputLabelProps={{ shrink: true }}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={2.6}>
                <Controller
                  name="fecha_retiro_produccion"
                  control={control_organigrama_anterior}
                  defaultValue=""
                  render={({
                    field: { onChange, value },
                    fieldState: { error }
                  }) => (
                    <TextField
                      fullWidth
                      label="Fecha Retiro en Producción"
                      size="small"
                      variant="outlined"
                      value={
                        value
                        /*  organigrama_lideres_current?.fecha_puesta_produccion
                          ? new Date(
                              organigrama_lideres_current?.fecha_puesta_produccion
                            ).toLocaleString()
                          : '' ||
                            (organigrama_lideres_current?.fecha_puesta_produccion_organigrama &&
                              new Date(
                                organigrama_lideres_current?.fecha_puesta_produccion_organigrama
                              ).toLocaleString()) */
                      }
                      disabled={true}
                      InputLabelProps={{ shrink: true }}
                    />
                  )}
                />
              </Grid>
            </Grid>

            {/* <Stack
              direction="row"
              justifyContent="flex-end"
              spacing={2}
              sx={{ mb: '20px', mt: '20px', alignItems: 'center' }}
            >
              <Button
                color="primary"
                variant="outlined"
                startIcon={<SearchIcon />}
                onClick={() => {
                  console.log('click on siuuuu');
                }}
              >
                SIUUUUUU
              </Button>
            </Stack> */}
          </form>
        </Grid>
      </Grid>

      {/* modal búsqueda avanzada organigrama */}
      {/* <BusquedaAvanOrgModal /> */}
      {/* modal búsqueda avanzada organigrama */}
    </>
  );
};
