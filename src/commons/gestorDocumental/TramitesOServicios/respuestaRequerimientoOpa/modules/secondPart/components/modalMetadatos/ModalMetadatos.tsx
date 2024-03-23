/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/naming-convention */
import React, { useContext, useEffect } from 'react';
import {
  Autocomplete,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Skeleton,
  Stack,
  TextField,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Controller } from 'react-hook-form';
import CleanIcon from '@mui/icons-material/CleaningServices';
import Select from 'react-select';
import SaveIcon from '@mui/icons-material/Save';
import {
  categoriaArhivo,
  origenArchivo,
  tieneReplicaFisisca,
  tieneTipologiaRelacionada,
} from './utils/choices';
import { getTipologiasDocumentalesMetadatos } from '../../services/getTipologiasDocumentales.service';
import { TipologiaDocumental } from '../parte3/components/types/FormParte3.types';
import {
  handleCleanField,
  handleCloseModal,
} from './functions/modalFn.functions';
import CancelIcon from '@mui/icons-material/Cancel';
import { ModalAndLoadingContext } from '../../../../../../../../context/GeneralContext';
import { useAppDispatch, useAppSelector } from '../../../../../../../../hooks';
import { control_warning } from '../../../../../../../almacen/configuracion/store/thunks/BodegaThunks';
import { control_success } from '../../../../../../../../helpers';
import { Title } from '../../../../../../../../components';
import { setMetadatos } from '../../../../toolkit/slice/ResRequerimientoOpaSlice';

export const ModalMetadatos = ({
  tipologiasDocumentales,
  setTipologiasDocumentales,
  watchFormulario,
  resetManejoMetadatosModalFunction,
  controlManejoMetadatosModal,
  watchExeManejoModalMetadatos,
  resetManejoMetadatosModal,
}: {
  tipologiasDocumentales: any;
  setTipologiasDocumentales: React.Dispatch<React.SetStateAction<any>>;
  watchFormulario: any;
  resetManejoMetadatosModalFunction: any;
  controlManejoMetadatosModal: any;
  watchExeManejoModalMetadatos: any;
  resetManejoMetadatosModal: any;
}): JSX.Element => {
  //* dispatch declaration
  const dispatch = useAppDispatch();
  //* context
  const { modalAgregarMetadatos, handleModalAgregarMetadatos } = useContext(
    ModalAndLoadingContext
  );

  const { fourthLoading, handleFourthLoading } = useContext(
    ModalAndLoadingContext
  );
  //* redux states
  const { metadatos, currentAnexo, viewMode } = useAppSelector(
    (state) => state.ResRequerimientoOpaSlice
  );

  //* hooks
/*  const {
  
  } = usePanelVentanilla();*/

  //? useeffect to get tipologias documentales
  useEffect(() => {
    if (
      watchExeManejoModalMetadatos.tieneTipologiaRelacionadaMetadatos?.value ===
      'Si'
    ) {
      void getTipologiasDocumentalesMetadatos(handleFourthLoading).then(
        (tipologias) => {
          setTipologiasDocumentales(tipologias);
        }
      );
    }
  }, [watchExeManejoModalMetadatos.tieneTipologiaRelacionadaMetadatos?.value]);

  useEffect(() => {
    if (metadatos && currentAnexo) {
      resetManejoMetadatosModal({
        categoriaArchivoMetadatos: {
          value: metadatos?.categoriaArchivoMetadatos?.value
            ? metadatos?.categoriaArchivoMetadatos?.value
            : '',
          label: metadatos?.categoriaArchivoMetadatos?.label
            ? metadatos?.categoriaArchivoMetadatos?.label
            : '',
        },
        tieneReplicaFisicaMetadatos: {
          value: metadatos?.tieneReplicaFisicaMetadatos?.value
            ? metadatos?.tieneReplicaFisicaMetadatos?.value
            : '',
          label: metadatos?.tieneReplicaFisicaMetadatos?.label
            ? metadatos?.tieneReplicaFisicaMetadatos?.label
            : '',
        },
        origenArchivoMetadatos: {
          value: metadatos?.origenArchivoMetadatos?.value
            ? metadatos?.origenArchivoMetadatos?.value
            : '',
          label: metadatos?.origenArchivoMetadatos?.label
            ? metadatos?.origenArchivoMetadatos?.label
            : '',
        },
        tieneTipologiaRelacionadaMetadatos: {
          value: metadatos?.tieneTipologiaRelacionadaMetadatos?.value
            ? metadatos?.tieneTipologiaRelacionadaMetadatos?.value
            : '',
          label: metadatos?.tieneTipologiaRelacionadaMetadatos?.label
            ? metadatos?.tieneTipologiaRelacionadaMetadatos?.label
            : '',
        },
        tipologiasDocumentalesMetadatos: {
          value: metadatos?.tipologiasDocumentalesMetadatos?.value
            ? metadatos?.tipologiasDocumentalesMetadatos?.value
            : '',
          label: metadatos?.tipologiasDocumentalesMetadatos?.label
            ? metadatos?.tipologiasDocumentalesMetadatos?.label
            : '',
        },
        cualTipologiaDocumentalMetadatos:
          metadatos?.cualTipologiaDocumentalMetadatos ?? '',
        asuntoMetadatos: metadatos?.asuntoMetadatos ?? '',
        descripcionMetadatos: metadatos?.descripcionMetadatos ?? '',
        palabrasClavesMetadatos: metadatos?.palabrasClavesMetadatos ?? [],
      });
    }
  }, [metadatos, currentAnexo]);

  // ? functions
  const handleSubmit = async () => {
    console.log('watchExeManejoModalMetadatos', watchExeManejoModalMetadatos);

    for (let key in watchExeManejoModalMetadatos) {
      // Si la clave es una de las excepciones, continúa con la siguiente iteración
      if (
        key === 'tipologiasDocumentalesMetadatos' ||
        key === 'cualTipologiaDocumentalMetadatos'
      ) {
        continue;
      }

      let value =
        watchExeManejoModalMetadatos[
          key as keyof typeof watchExeManejoModalMetadatos
        ];

      // Comprueba si el valor es una cadena vacía
      if (value === '') {
        control_warning('Todos los campos son obligatorios');
        return;
      }

      // Comprueba si el valor es un objeto y, en caso afirmativo, si su propiedad 'value' es una cadena vacía o si el objeto está vacío
      if (
        typeof value === 'object' &&
        (value.value === '' || Object.keys(value).length === 0)
      ) {
        control_warning('Todos los campos son obligatorios');
        return;
      }
    }

    dispatch(setMetadatos(watchExeManejoModalMetadatos as any));
    control_success('Se han establecido los metadatos');
    handleModalAgregarMetadatos(false);
    // resetManejoMetadatosModalFunction();
  };
  return (
    <>
      <Dialog
        fullWidth
        maxWidth="md"
        open={modalAgregarMetadatos}
        onClose={() => {
          // handleModalAgregarMetadatos(false);
          //* tambien se deben limpiar los datos que se recojan en el modal
        }}
      >
        <Box
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <DialogTitle>
            <Title title="Metadatos" />
          </DialogTitle>
          <Divider />
          <DialogContent
            sx={{
              mb: '0px',
              justifyContent: 'center',
            }}
          >
            <Grid container spacing={2}>
              <Grid
                item
                xs={12}
                sm={4}
                sx={{
                  mt: '1.2rem',
                  mb: '1.2rem',
                  zIndex: 10,
                }}
              >
                {/* Categoria del archivo */}
                <Controller
                  name="categoriaArchivoMetadatos"
                  control={controlManejoMetadatosModal}
                  rules={{ required: true }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <div>
                      <Select
                        value={value}
                        // name="id_ccd"
                        onChange={(selectedOption) => {
                          //  console.log('')(selectedOption);
                          /*dispatch(
                            getServiceSeriesSubseriesXUnidadOrganizacional(
                              selectedOption.item
                            )
                          );*/
                          onChange(selectedOption);
                        }}
                        options={categoriaArhivo ?? []}
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
                          Categoría del archivo
                        </small>
                      </label>
                    </div>
                  )}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={4}
                sx={{
                  mt: '1.2rem',
                  mb: '1.2rem',
                  zIndex: 10,
                }}
              >
                <Controller
                  name="tieneReplicaFisicaMetadatos"
                  control={controlManejoMetadatosModal}
                  rules={{ required: true }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <div>
                      <Select
                        value={value}
                        onChange={(selectedOption) => {
                          //  console.log('')(selectedOption);
                          /* dispatch(
                            getServiceSeriesSubseriesXUnidadOrganizacional(
                              selectedOption.item
                            )
                          ); */
                          onChange(selectedOption);
                        }}
                        // isDisabled={trd_current != ''}
                        options={tieneReplicaFisisca ?? []}
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
                          Tiene réplica física
                        </small>
                      </label>
                    </div>
                  )}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={4}
                sx={{
                  mt: '1.2rem',
                  mb: '1.2rem',
                }}
              >
                <Controller
                  name="origenArchivoMetadatos"
                  control={controlManejoMetadatosModal}
                  rules={{ required: true }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <div>
                      <Select
                        value={value}
                        onChange={(selectedOption) => {
                          //  console.log('')(selectedOption);
                          /* dispatch(
                            getServiceSeriesSubseriesXUnidadOrganizacional(
                              selectedOption.item
                            )
                          ); */
                          onChange(selectedOption);
                        }}
                        // isDisabled={trd_current != ''}
                        options={
                          watchFormulario.ruta_soporte
                            ? origenArchivo.filter((el) => el.value !== 'F')
                            : origenArchivo
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
                          Origen archivo
                        </small>
                      </label>
                    </div>
                  )}
                />
              </Grid>

              {/*Inicio de segunda fila*/}
              <Grid
                item
                xs={12}
                sm={4}
                sx={{
                  mt: '1.2rem',
                  mb: '1.2rem',
                  zIndex: 5,
                }}
              >
                <Controller
                  name="tieneTipologiaRelacionadaMetadatos"
                  control={controlManejoMetadatosModal}
                  rules={{ required: true }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <div>
                      <Select
                        value={value}
                        onChange={(selectedOption) => {
                          //  console.log('')(selectedOption);
                          {
                            /* si se selcciona el si se debe mostrar el select de las tipologías documentales que se van a establecer */
                          }
                          onChange(selectedOption);
                        }}
                        // isDisabled={trd_current != ''}
                        options={tieneTipologiaRelacionada ?? []}
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
                          ¿Tiene tipología relacionada?
                        </small>
                      </label>
                    </div>
                  )}
                />
              </Grid>
              {/* se debe revisar en que momento mostrar este combo de select */}

              {!watchExeManejoModalMetadatos.tieneTipologiaRelacionadaMetadatos
                ?.value ? (
                ''
              ) : watchExeManejoModalMetadatos
                  .tieneTipologiaRelacionadaMetadatos?.value === 'Si' ? (
                <Grid
                  item
                  xs={12}
                  sm={4}
                  sx={{
                    mt: '1.2rem',
                    mb: '1.2rem',
                    zIndex: 5,
                  }}
                >
                  <Controller
                    name="tipologiasDocumentalesMetadatos"
                    control={controlManejoMetadatosModal}
                    // rules={{ required: true }}
                    render={({
                      field: { onChange, value },
                      fieldState: { error },
                    }) => (
                      <div>
                        {fourthLoading ? (
                          <Skeleton variant="text" height={35} /> // Reemplaza esto con tu componente de Skeleton
                        ) : (
                          <Select
                            value={value}
                            onChange={(selectedOption) => {
                              //  console.log('')(selectedOption);
                              /* dispatch(
                            getServiceSeriesSubseriesXUnidadOrganizacional(
                              selectedOption.item
                            )
                          );*/
                              onChange(selectedOption);
                            }}
                            // isDisabled={trd_current != ''}
                            options={
                              tipologiasDocumentales.map(
                                (tipologia: TipologiaDocumental) => {
                                  return {
                                    value: tipologia?.id_tipologia_documental,
                                    label: tipologia?.nombre,
                                  };
                                }
                              ) ?? []
                            }
                            placeholder="Seleccionar"
                          />
                        )}
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
                            Tipología documental
                          </small>
                        </label>
                      </div>
                    )}
                  />
                </Grid>
              ) : (
                <Grid
                  item
                  xs={12}
                  sm={4}
                  sx={{
                    mt: '1.2rem',
                    mb: '1.2rem',
                  }}
                >
                  <Controller
                    name="cualTipologiaDocumentalMetadatos"
                    control={controlManejoMetadatosModal}
                    defaultValue=""
                    // rules={{ required: true }}
                    render={({
                      field: { onChange, value },
                      fieldState: { error },
                    }) => (
                      <TextField
                        required
                        fullWidth
                        label="¿Cual?"
                        size="small"
                        variant="outlined"
                        value={value}
                        InputLabelProps={{ shrink: true }}
                        onChange={(e) => {
                          onChange(e.target.value);
                          e.target.value.length === 50 &&
                            control_warning(
                              'máximo 50 caracteres para definir la tipología documental'
                            );
                        }}
                        inputProps={{ maxLength: 50 }}
                      />
                    )}
                  />
                </Grid>
              )}

              <Grid
                item
                xs={12}
                sm={12}
                sx={{
                  mt: '1.2rem',
                  mb: '1.2rem',
                }}
              >
                <Controller
                  name="asuntoMetadatos"
                  control={controlManejoMetadatosModal}
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
                          control_warning(
                            'máximo 50 caracteres para el asunto'
                          );
                        // //  console.log('')(e.target.value);
                      }}
                      inputProps={{ maxLength: 50 }}
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
                }}
              >
                <Controller
                  name="descripcionMetadatos"
                  control={controlManejoMetadatosModal}
                  defaultValue=""
                  rules={{ required: true }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextField
                      required
                      multiline
                      rows={4}
                      fullWidth
                      label="Descripción"
                      size="small"
                      variant="outlined"
                      value={value}
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => {
                        onChange(e.target.value);
                        e.target.value.length === 255 &&
                          control_warning(
                            'máximo 255 caracteres para la descripción'
                          );
                      }}
                      inputProps={{ maxLength: 255 }}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={12} sx={{ mt: '1.2rem', mb: '1.2rem' }}>
                <Controller
                  name="palabrasClavesMetadatos"
                  control={controlManejoMetadatosModal}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <Autocomplete
                      onChange={(event, newValue) => {
                        if (newValue.length <= 5) {
                          onChange(newValue);
                          return;
                        }

                        newValue.pop();
                        onChange(newValue);
                        control_warning(
                          'Solo puedes establecer un máximo de 5 palabras clave'
                        );
                      }}
                      value={value}
                      multiple
                      id="tags-filled"
                      options={[]}
                      freeSolo
                      renderTags={(value: readonly string[], getTagProps) =>
                        value.map((option: string, index: number) => (
                          <Chip
                            variant="outlined"
                            label={option}
                            {...getTagProps({ index })}
                          />
                        ))
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Palabras claves"
                          placeholder="Seleccionar"
                        />
                      )}
                    />
                  )}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <Divider />
          <DialogActions>
            <Stack
              direction="row"
              spacing={2}
              sx={{ mr: '15px', mb: '10px', mt: '10px' }}
            >
              <Button
                variant="outlined"
                color="primary"
                onClick={() => {
                  dispatch(setMetadatos('' as any));
                  resetManejoMetadatosModalFunction();
                }}
                startIcon={<CleanIcon />}
              >
                Limpiar campos
              </Button>
              {/* <Button
                color="error"
                variant="contained"
                onClick={() => {
                  //  console.log('')('cerrando modal');

                  resetManejoMetadatosModal();
                }}
                startIcon={<CloseIcon />}
              >
                CANCELAR
              </Button>*/}
              <Button
                color="success"
                type="submit"
                variant="contained"
                disabled={viewMode}
                startIcon={<SaveIcon />}
              >
                GUARDAR
              </Button>
              <Button
                color="error"
                variant="outlined"
                onClick={() => {
                  handleCloseModal(
                    resetManejoMetadatosModalFunction,
                    handleModalAgregarMetadatos
                  );
                }}
                startIcon={<CloseIcon />}
              >
                CERRAR
              </Button>
            </Stack>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );
};
