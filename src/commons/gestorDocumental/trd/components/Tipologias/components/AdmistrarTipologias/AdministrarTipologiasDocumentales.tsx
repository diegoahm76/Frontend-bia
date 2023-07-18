/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable no-extra-boolean-cast */
/* eslint-disable no-constant-condition */
//* borrar las dos de arriba
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
import { useContext } from 'react';
import {
  Autocomplete,
  Box,
  Button,
  // Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  // FormControl,
  // FormControlLabel,
  Grid,
  // IconButton,
  Stack,
  TextField
  // Tooltip,
  // Typography
} from '@mui/material';

//* context
import { ModalContextTRD } from '../../../../context/ModalsContextTrd';
//* controller react-hook-form
import { Controller } from 'react-hook-form';
//* Icons
import CloseIcon from '@mui/icons-material/Close';
import CleanIcon from '@mui/icons-material/CleaningServices';
import SaveIcon from '@mui/icons-material/Save';
import SearchIcon from '@mui/icons-material/Search';
import SyncIcon from '@mui/icons-material/Sync';

import { use_trd } from '../../../../hooks/use_trd';
// import InfoIcon  from '@mui/icons-material/Info';

// * react select
import Select from 'react-select';
import {
  create_tipologia_documental_service,
  get_formatos_documentales_by_code
} from '../../../../toolkit/TRDResources/thunks/TRDResourcesThunks';
import { useAppDispatch, useAppSelector } from '../../../../../../../hooks';
import { get_data_format_documental_type } from '../../../../toolkit/TRDResources/slice/TRDResourcesSlice';

export const AdministrarTipologiasDocumentales = (): JSX.Element => {
  //* se implmenta el dispatch para las funciones
  const dispatch = useAppDispatch();
  const { tipologias_documental_current } = useAppSelector(
    (state: any) => state.trd_slice
  );

  //* se repiten los controladores de la busqueda de tipologias documentales
  //* se importan los elementos necesarios del hook use_trd
  const {
    // ? form create or edit documental typology
    controlBusquedaTipologiasDocumentales,
    resetBusquedaTipologiasDocumentales,
    form_data_searched_tipologia_documental,

    // ? update list of documental formats in the autocomplete element
    set_list_format_documental_type,
    list_format_documental_type,

    // ? button that define create or update the submit button
    title_button_administrar_tipologias
    // set_title_button_administrar_tipologias
  } = use_trd();

  //* context elements that are used in this component
  const {
    closeModalAdministracionTipologiasDocumentales,
    modalAdministracionTipologiasDocumentales,
    openModalBusquedaTipologiasDocumentales
  } = useContext(ModalContextTRD);

  //* useForm

  //* reset all when the modal is closed
  const resetOnCloseModal = (): any => {
    closeModalAdministracionTipologiasDocumentales();
    dispatch(get_data_format_documental_type([]));
    set_list_format_documental_type([]);
    resetBusquedaTipologiasDocumentales();
  };

  return (
    <>
      <Dialog
        fullWidth
        maxWidth="md"
        open={modalAdministracionTipologiasDocumentales}
        onClose={resetOnCloseModal}
      >
        <Box
          component="form"
          onSubmit={(e: any) => {
            e.preventDefault();
            const dataToSend = {
              nombre: form_data_searched_tipologia_documental.nombre,
              formatos: form_data_searched_tipologia_documental.formatos.map(
                (item: any) => item.value
              ),
              cod_tipo_medio_doc:
                form_data_searched_tipologia_documental.cod_tipo_medio_doc.value
            };

            dispatch(create_tipologia_documental_service(dataToSend)).then(
              (res: any) => {
                console.log(res);
              }
            );
          }}
        >
          <DialogTitle>Administración de Tipologias Documentales</DialogTitle>
          <Divider />
          <DialogContent
            sx={{
              mb: '0px',
              justifyContent: 'center'
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="nombre"
                  control={controlBusquedaTipologiasDocumentales}
                  defaultValue=""
                  rules={{ required: true }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error }
                  }) => (
                    <TextField
                      margin="dense"
                      fullWidth
                      label="Nombre de la Tipología Documental"
                      size="small"
                      disabled={
                        tipologias_documental_current?.item_ya_usado ?? false
                      }
                      variant="outlined"
                      value={value}
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => {
                        onChange(e.target.value);
                        // console.log(e.target.value);
                      }}
                      error={!!error}
                      /* helperText={
                        error
                          ? 'Es obligatorio subir un archivo'
                          : 'Seleccione un archivo'
                      } */
                    />
                  )}
                />
              </Grid>

              {/* pending to define active checkbox (especially it's interaction */}
              {/*
            <Grid
                item
                xs={4}
                sm={3}
              >
                {Boolean(5) ? (
                  <Controller
                    name="activo"
                    control={controlBusquedaTipologiasDocumentales}
                    defaultValue=""
                    // rules={{ required: false }}
                    render={({
                      field: { onChange, value },
                      fieldState: { error }
                    }) => (
                      <FormControl
                        fullWidth
                      >
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={value}
                              onChange={(e) => {
                                onChange(e.target.checked);
                              }}
                              // name="checkedB"
                              color="primary"
                            />
                          }
                          label={
                            value ? (
                              <Typography variant="body2">
                                Activo
                                <Tooltip
                                  title="Formato tipo de medio activo"
                                  placement="right"
                                >
                                  <InfoIcon
                                    sx={{
                                      width: '1.2rem',
                                      height: '1.2rem',
                                      ml: '0.5rem',
                                      color: 'green'
                                    }}
                                  />
                                </Tooltip>
                              </Typography>
                            ) : (
                              <Typography variant="body2">
                                Inactivo
                                <Tooltip
                                  title="Formato tipo de medio inactivo"
                                  placement="right"
                                >
                                  <InfoIcon
                                    sx={{
                                      width: '1.2rem',
                                      height: '1.2rem',
                                      ml: '0.5rem',
                                      color: 'orange'
                                    }}
                                  />
                                </Tooltip>
                              </Typography>
                            )
                          }
                        />
                      </FormControl>
                    )}
                  />
                ) : null}
              </Grid>
*/}

              {/* closed space checkbox */}
            </Grid>
          </DialogContent>
          <Divider />
          <DialogTitle>Medios documentales y formatos asociados</DialogTitle>
          <DialogContent
            sx={{
              height: '235px',
              mb: '0px',
              justifyContent: 'center'
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={5}>
                <Controller
                  name="cod_tipo_medio_doc"
                  control={controlBusquedaTipologiasDocumentales}
                  rules={{ required: true }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error }
                  }) => (
                    <div>
                      <Select
                        styles={{
                          control: (base) => ({
                            ...base,
                            height: '56px',
                            minHeight: '56px'
                          })
                        }}
                        value={value}
                        onChange={(selectedOption) => {
                          // *console.log(selectedOption);
                          onChange(selectedOption);
                          dispatch(
                            get_formatos_documentales_by_code(
                              selectedOption.value
                            )
                          ).then((res: any) => {
                            res
                              ? set_list_format_documental_type(
                                  res?.map((format: any) => {
                                    return {
                                      format,
                                      label: format.nombre,
                                      value: format.id_formato_tipo_medio
                                    };
                                  })
                                )
                              : set_list_format_documental_type([]);
                          });
                        }}
                        // isDisabled={!control_format_documental_type._formValues.item.value}
                        options={[
                          { value: null, label: 'Seleccionar' },
                          { value: 'F', label: 'Físico' },
                          { value: 'E', label: 'Electrónico' },
                          { value: 'H', label: 'Híbrido' }
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
                          Tipo de medio documental
                          {/* {trd_current != null
                            ? `CCD seleccionado`
                            : `CDD's no usados en otro TRD`} */}
                        </small>
                      </label>
                    </div>
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={7}>
                <Controller
                  name="formatos"
                  control={controlBusquedaTipologiasDocumentales}
                  rules={{ required: true }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error }
                  }) => (
                    <>
                      <Autocomplete
                        multiple
                        fullWidth
                        size="medium"
                        options={list_format_documental_type ?? []}
                        getOptionLabel={(option: any) => option.label}
                        isOptionEqualToValue={(option: any, value) =>
                          option?.value === value?.value
                        }
                        onChange={(event: any, value: any) => onChange(value)}
                        renderInput={(params) => (
                          <TextField
                            key={params.id}
                            {...params}
                            // label="Formatos para el medio documental seleccionado"
                            placeholder="Formatos para el medio documental seleccionado"
                          />
                        )}
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
                          Formatos para el medio documental seleccionado
                          {/* {trd_current != null
                        ? `CCD seleccionado`
                        : `CDD's no usados en otro TRD`} */}
                        </small>
                      </label>
                    </>
                  )}
                />
              </Grid>
            </Grid>
          </DialogContent>

          <DialogActions>
            <Stack
              direction="row"
              spacing={2}
              sx={{ mr: '15px', mb: '10px', mt: '10px' }}
            >
              <Button
                variant="contained"
                type="submit"
                startIcon={
                  title_button_administrar_tipologias === 'Guardar' ? (
                    <SaveIcon />
                  ) : (
                    <SyncIcon />
                  )
                }
                color="primary"
                // sx={{ ml: '10px' }}
              >
                {title_button_administrar_tipologias === 'Guardar'
                  ? 'GUARDAR TIPOLOGÍA DOCUMENTAL'
                  : 'ACTUALIZAR TIPOLOGÍA DOCUMENTAL'}
              </Button>
              <Button
                variant="outlined"
                startIcon={<SearchIcon />}
                color="primary"
                // sx={{ ml: '10px' }}
                onClick={() => {
                  resetOnCloseModal();
                  openModalBusquedaTipologiasDocumentales();
                  console.log(
                    'REDIRECCIONANDO A BUSCADOR DE TIPOLOGÍAS DOCUMENTALES'
                  );
                }}
              >
                BUSCAR TIPLOGÍAS
              </Button>
              <Button
                variant="contained"
                startIcon={<CleanIcon />}
                color="success"
                // sx={{ ml: '10px' }}
                onClick={() => {
                  resetBusquedaTipologiasDocumentales();
                  set_list_format_documental_type([]);
                  console.log(
                    'limpiando admistrador de tipologías documentales'
                  );
                }}
              >
                LIMPIAR CAMPOS
              </Button>
              <Button
                variant="outlined"
                onClick={resetOnCloseModal}
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
