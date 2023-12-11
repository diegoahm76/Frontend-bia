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
import { Title } from '../../../../../../../components';
import CloseIcon from '@mui/icons-material/Close';
import { Controller } from 'react-hook-form';
import CleanIcon from '@mui/icons-material/CleaningServices';
import Select from 'react-select';
import SaveIcon from '@mui/icons-material/Save';
import { ModalAndLoadingContext } from '../../../../../../../context/GeneralContext';
import { control_warning } from '../../../../../../almacen/configuracion/store/thunks/BodegaThunks';
import { usePanelVentanilla } from '../../../../../panelDeVentanilla/hook/usePanelVentanilla';
import { categoriaArhivo, tieneReplicaFisisca, tieneTipologiaRelacionada } from '../../../../../panelDeVentanilla/module/entrega99/components/modalMetadatos/utils/choices';
export const ModalMetadatos = (): JSX.Element => {
  //* context
  const { modalAgregarMetadatos, handleModalAgregarMetadatos } = useContext(
    ModalAndLoadingContext
  );

  const { fourthLoading, handleFourthLoading } = useContext(
    ModalAndLoadingContext
  );

  //* hooks
  const {
    controlManejoMetadatosModal,
    watchExeManejoModalMetadatos,
    resetManejoMetadatosModal,
    resetManejoMetadatosModalFunction,
  } = usePanelVentanilla();

  //? useeffect to get tipologias documentales

  useEffect(() => {
    if (
      watchExeManejoModalMetadatos.tieneTipologiaRelacionadaMetadatos?.value ===
      'Si'
    ) {
     // function para obtener las tipologias documentales
    }
  }, [watchExeManejoModalMetadatos.tieneTipologiaRelacionadaMetadatos?.value]);

  return (
    <>
      <Dialog
        fullWidth
        maxWidth="md"
        open={modalAgregarMetadatos}
        onClose={() => {
          handleModalAgregarMetadatos(false);
          //* tambien se deben limpiar los datos que se recojan en el modal
        }}
      >
        <Box
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
            console.log(watchExeManejoModalMetadatos);
            //? va a ser necesario almacenar los datos de los metadatos que se establezcan
          }}
        >
          <DialogTitle>
            <Title title="Metadatos del archivo seleccionado" />
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
                          console.log(selectedOption);
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
                          console.log(selectedOption);
                          /* dispatch(
                            getServiceSeriesSubseriesXUnidadOrganizacional(
                              selectedOption.item
                            )
                          ); */
                          onChange(selectedOption);
                        }}
                        // isDisabled={trd_current != null}
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
                  defaultValue=""
                  rules={{ required: true }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <TextField
                      required
                      fullWidth
                      label="Origen del archivo"
                      size="small"
                      variant="outlined"
                      value={'Electrónico'}
                      disabled
                      InputLabelProps={{ shrink: true }}
                      inputProps={{ maxLength: 50 }}
                    />
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
                          console.log(selectedOption);
                          {
                            /* si se selcciona el si se debe mostrar el select de las tipologías documentales que se van a establecer */
                          }
                          onChange(selectedOption);
                        }}
                        // isDisabled={trd_current != null}
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
                ?.value ? null : watchExeManejoModalMetadatos
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
                    rules={{ required: true }}
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
                              console.log(selectedOption);
                              /* dispatch(
                            getServiceSeriesSubseriesXUnidadOrganizacional(
                              selectedOption.item
                            )
                          );*/
                              onChange(selectedOption);
                            }}
                            // isDisabled={trd_current != null}
                            options={[]}
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
                    rules={{ required: true }}
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
                        // console.log(e.target.value);
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
                  resetManejoMetadatosModalFunction();
                }}
                startIcon={<CleanIcon />}
              >
                LIMPIAR CAMPOS
              </Button>
              {/* <Button
                color="error"
                variant="contained"
                onClick={() => {
                  console.log('cerrando modal');

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
                onClick={() => {
                  console.log('cerrando modal');
                }}
                startIcon={<SaveIcon />}
              >
                GUARDAR
              </Button>
              <Button
                color="error"
                variant="outlined"
                onClick={() => {
                  //* en la cerrada tambien se deben limpiar los campos para que no se tienda a producir errrores
                  console.log('cerrando modal');
                  handleModalAgregarMetadatos(false);
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
