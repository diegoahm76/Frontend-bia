/* eslint-disable @typescript-eslint/naming-convention */

import {  Grid } from '@mui/material';
import { containerStyles } from '../../../../../../../../../gestorDocumental/tca/screens/utils/constants/constants';
import { Title } from '../../../../../../../../../../components';

export const SeleccionLider = (): JSX.Element => {
  return (
    <>
      <Grid container sx={containerStyles}>
        <Grid item xs={12}>
          <Title title="Líderes por Unidad Organizacional - (Organigrama)" />
          <form
            onSubmit={(w) => {
              w.preventDefault();
              console.log('abrir modal')
             //  onSubmit();
            }}
            style={{
              marginTop: '20px'
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={3.3}>
                <Controller
                  name="nombre"
                  control={control_organigrama_lideres_por_unidad}
                  defaultValue=""
                  rules={{ required: true }}
                  render={() => (
                    <TextField
                      fullWidth
                      label="Nombre del Organigrama"
                      size="small"
                      variant="outlined"
                      value={organigrama_lideres_current?.nombre}
                      InputLabelProps={{ shrink: true }}
                      disabled={true}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={4.5}>
                <Controller
                  name="descripcion"
                  control={control_organigrama_lideres_por_unidad}
                  defaultValue=""
                  rules={{ required: true }}
                  render={() => (
                    <TextField
                      fullWidth
                      label="Descripción"
                      size="small"
                      multiline
                      rows={1}
                      maxRows={2}
                      variant="outlined"
                      value={organigrama_lideres_current?.descripcion}
                      InputLabelProps={{ shrink: true }}
                      disabled={true}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={2.6}>
                <Controller
                  name="fecha_puesta_produccion"
                  control={control_organigrama_lideres_por_unidad}
                  defaultValue=""
                  render={() => (
                    <TextField
                      fullWidth
                      label="Fecha Puesta en Producción"
                      size="small"
                      variant="outlined"
                      value={
                        organigrama_lideres_current?.fecha_puesta_produccion
                          ? new Date(
                              organigrama_lideres_current?.fecha_puesta_produccion
                            ).toLocaleString()
                          : ''
                      }
                      disabled={true}
                      InputLabelProps={{ shrink: true }}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={1.5}>
                <Controller
                  name="verison"
                  control={control_organigrama_lideres_por_unidad}
                  defaultValue=""
                  render={() => (
                    <TextField
                      fullWidth
                      label="Versión"
                      size="small"
                      variant="outlined"
                      value={organigrama_lideres_current?.version}
                      InputLabelProps={{ shrink: true }}
                      disabled={true}
                    />
                  )}
                />
              </Grid>
            </Grid>

            <Stack
              direction="row"
              justifyContent="flex-end"
              spacing={2}
              sx={{ mb: '20px', mt: '20px', alignItems: 'center' }}
            >
              <OrganigramaChip
                organigrama_lideres_current={organigrama_lideres_current}
              />

              <Button
                color="primary"
                variant="outlined"
                startIcon={<SearchIcon />}
                onClick={openModalBusquedaAvanzadaOrganigrama}
              >
                BÚSQUEDA AVANZADA ORGANIGRAMA
              </Button>
            </Stack>
          </form>
        </Grid>
      </Grid>

      {/* modal búsqueda avanzada organigrama */}
      <BusquedaAvanOrgModal />
      {/* modal búsqueda avanzada organigrama */}
    </>
  );
};
