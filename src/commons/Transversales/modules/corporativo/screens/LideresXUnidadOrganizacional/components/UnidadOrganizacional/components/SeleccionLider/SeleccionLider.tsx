/* eslint-disable @typescript-eslint/naming-convention */

import { useEffect, useState } from 'react';
import { Button, Grid, Stack, TextField } from '@mui/material';
import { containerStyles } from '../../../../../../../../../gestorDocumental/tca/screens/utils/constants/constants';
import { Title } from '../../../../../../../../../../components';
import { Controller } from 'react-hook-form';
import SearchIcon from '@mui/icons-material/Search';
import { useLideresXUnidadOrganizacional } from '../../../../hook/useLideresXUnidadOrganizacional';
import Select from 'react-select';
import CleanIcon from '@mui/icons-material/CleaningServices';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useAppSelector } from '../../../../../../../../../../hooks';
import { getTipoDocumento } from './services/getTipoDocumento.service';
import type { ISeleccionLideresProps } from './types/seleccionLideres.types';

export const SeleccionLider = (): JSX.Element => {
  //* ----- form control declarations -------
  const { control_seleccionar_lideres, reset_seleccionar_lideres } =
    useLideresXUnidadOrganizacional();

  //* states redux selectors
  /* const { organigrama_lideres_current } = useAppSelector(
    (state) => state.lideres_slice
  ); */

  // ? ------- use states declarations -------
  const [tiposDocumentos, setTiposDocumentos] = useState<
    ISeleccionLideresProps[]
  >([]);

  // ? ------- use effect declarations -------
  useEffect(() => {
    void getTipoDocumento()
      .then((res) => {
        const filterDocumentos = res.filter(
          (item: ISeleccionLideresProps) => item.value !== 'NT'
        );
        setTiposDocumentos(filterDocumentos);
      })
      .catch((error) => {
        console.error(error);
        // Handle the error here
      });
  }, []);

  // * functions

  const cleanElementComponent = (): void =>
    reset_seleccionar_lideres({
      tipo_documento: '',
      numero_documento: '',
      nombre_persona: ''
    });

  return (
    <>
      <Grid container sx={containerStyles}>
        <Grid item xs={12}>
          <Title title="Líder" />
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
                        options={tiposDocumentos}
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
              <Grid item xs={12} sm={4}>
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
                      label="Número de documento"
                      size="small"
                      variant="outlined"
                      value={value}
                      onChange={onChange}
                      InputLabelProps={{ shrink: true }}
                      // disabled={true}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={5}>
                <Controller
                  name="nombre_persona"
                  control={control_seleccionar_lideres}
                  defaultValue=""
                  rules={{ required: true }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error }
                  }) => (
                    <TextField
                      fullWidth
                      label="Nombre de la persona"
                      size="small"
                      multiline
                      rows={1}
                      maxRows={2}
                      variant="outlined"
                      value={value}
                      onChange={onChange}
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
                variant="contained"
                startIcon={<SearchIcon />}
                onClick={() => {
                  console.log('BUSCANDO LÍDER...');
                  // onSubmit();
                }}
              >
                BUSCAR
              </Button>

              <Button
                color="success"
                variant="contained"
                startIcon={<CleanIcon />}
                onClick={cleanElementComponent}
              >
                LIMPIAR CAMPOS
              </Button>

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
