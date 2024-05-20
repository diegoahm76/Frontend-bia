/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */

import { Button, Grid, Stack, TextField } from '@mui/material';
import { Controller } from 'react-hook-form';

//* icons
import SearchIcon from '@mui/icons-material/Search';

//* icons


import { useContext, lazy } from 'react';

import { useAppSelector } from '../../../../../../../../../../hooks';
import { Title } from '../../../../../../../../../../components';
import { useLideresXUnidadOrganizacional } from '../../../../hook/useLideresXUnidadOrg';
import { OrganigramaChip } from './utils/ChipComponent';
import { ModalContextLideres } from '../../../../context/ModalContextLideres';

const BusquedaAvanOrgModal = lazy(async () => {
  const module = await import('./components/BusquedaAvanzadaOrg/BusquedaAvanOrg');
  return { default: module.BusquedaAvanOrgModal };
});


export const OrganigramaViewInicio = (): JSX.Element => {
  //* redux states
  const { organigrama_lideres_current } = useAppSelector(
    (state) => state.lideres_slice
  );

  //* hooks
  const { control_organigrama_lideres_por_unidad } =
    useLideresXUnidadOrganizacional();

  // ? useContext declaration
  const {
    // modalBusquedaAvanzadaOrganigrama,
    openModalBusquedaAvanzadaOrganigrama
    // closeModalBusquedaAvanzadaOrganigrama
  } = useContext(ModalContextLideres);

  //* ----- Onsubmit function -----
  const onSubmit = (data?: any): void => {
    //  console.log('')(data);
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
          <Title title="Líderes por Unidad Organizacional - (Organigrama)" />
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
                      value={
                        organigrama_lideres_current?.nombre ||
                        organigrama_lideres_current?.nombre_organigrama
                      }
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
                      value={
                        organigrama_lideres_current?.descripcion ||
                        organigrama_lideres_current?.descripcion_organigrama
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
                          : '' ||
                            (organigrama_lideres_current?.fecha_puesta_produccion_organigrama &&
                              new Date(
                                organigrama_lideres_current?.fecha_puesta_produccion_organigrama
                              ).toLocaleString())
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
                      value={
                        organigrama_lideres_current?.version ||
                        organigrama_lideres_current?.version_organigra
                      }
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
                variant="contained"
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
