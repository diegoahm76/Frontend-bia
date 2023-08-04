/* eslint-disable @typescript-eslint/naming-convention */

import { Button, Grid, Stack, TextField } from '@mui/material';
import { containerStyles } from '../../../../../../../../../gestorDocumental/tca/screens/utils/constants/constants';
import { Title } from '../../../../../../../../../../components';
import { Controller } from 'react-hook-form';
import SearchIcon from '@mui/icons-material/Search';
import { useLideresXUnidadOrganizacional } from '../../../../hook/useLideresXUnidadOrganizacional';
import Select from 'react-select';

export const SeleccionLider = (): JSX.Element => {
  //* ----- form control declarations -------
  const { control_seleccionar_lideres } = useLideresXUnidadOrganizacional();

  return (
    <>
      <Grid container sx={containerStyles}>
        <Grid item xs={12}>
          <Title title="Líderes por Unidad Organizacional - (Organigrama)" />
          <form
            onSubmit={(w) => {
              w.preventDefault();
              console.log('abrir modal');
              //  onSubmit();
            }}
            style={{
              marginTop: '20px'
            }}
          >
            <Grid container spacing={2}>
              <Grid
                item
                xs={12}
                sm={3}
                sx={{
                  zIndex: 2
                }}
              >
                <Controller
                  name="tipo_documento"
                  control={control_seleccionar_lideres}
                  rules={{ required: true }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error }
                  }) => (
                    <div>
                      <Select
                        value={value}
                        onChange={(selectedOption) => {
                          /*  void get_catalogo_TRD_service(
                            selectedOption.value
                          ).then((res) => {
                            console.log(res);
                            dispatch(set_catalog_trd_action(res));
                          });
*/
                          onChange(selectedOption);
                        }}
                        isDisabled={
                          false
                          /* solo cuando el organigrama que estoy usando esté fuera de producción */
                        }
                        options={[
                          {
                            value: 'TI',
                            label: 'Tarjeta de identidad'
                          },
                          {
                            value: 'CC',
                            label: 'Cédula de ciudadanía'
                          },
                          {
                            value: 'RC',
                            label: 'Registro civil'
                          },
                          {
                            value: 'NU',
                            label: 'NUIP'
                          },
                          {
                            value: 'CE',
                            label: 'Cédula extranjeria'
                          },
                          {
                            value: 'PA',
                            label: 'Pasaporte'
                          },
                          {
                            value: 'PE',
                            label: 'Permiso especial de permanencia'
                          },
                          {
                            value: 'NT',
                            label: 'NIT'
                          }
                        ]}
                        placeholder="Seleccionar"
                      />
                      <label>
                        <small
                          style={{
                            color: 'rgba(0, 0, 0, 0.6)',
                            fontWeight: 'thin',
                            fontSize: '0.75rem',
                            marginTop: '0.25rem',
                            marginLeft: '0.25rem'
                          }}
                        >
                          Tipo de documento
                        </small>
                      </label>
                    </div>
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={3.3}>
                <Controller
                  name="numero_documento"
                  control={control_seleccionar_lideres}
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
                      value={value}
                      InputLabelProps={{ shrink: true }}
                      disabled={true}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={4.5}>
                <Controller
                  name="descripcion"
                  control={control_seleccionar_lideres}
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
                      value={value}
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
              <Button
                color="primary"
                variant="outlined"
                startIcon={<SearchIcon />}
                onClick={() => {
                  console.log('abrir modal de busqueda avanzada de lideres');
                  // onSubmit();
                }}
              >
                BÚSQUEDA AVANZADA LÍDER
              </Button>
            </Stack>
          </form>
        </Grid>
      </Grid>

      {/* modal búsqueda avanzada de lideres */}

      {/* modal búsqueda avanzada de lideres */}
    </>
  );
};
