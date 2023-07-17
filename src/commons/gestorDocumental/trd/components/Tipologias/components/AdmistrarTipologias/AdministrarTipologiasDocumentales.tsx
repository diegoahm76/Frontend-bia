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

import { use_trd } from '../../../../hooks/use_trd';
// import InfoIcon  from '@mui/icons-material/Info';

// * react select
import Select from 'react-select';

export const AdministrarTipologiasDocumentales = (): JSX.Element => {
  //* se repiten los controladores de la busqueda de tipologias documentales
  const {
    controlBusquedaTipologiasDocumentales,
    // form_data_searched_tipologia_documental,
    resetBusquedaTipologiasDocumentales
  } = use_trd();

  //* context elements that are used in this component
  const {
    closeModalAdministracionTipologiasDocumentales,
    modalAdministracionTipologiasDocumentales
  } = useContext(ModalContextTRD);

  //* useForm

  //* reset all when the modal is closed
  const resetOnCloseModal = (): any => {
    closeModalAdministracionTipologiasDocumentales();
    /* reset_searched_trd_modal({
      nombre: '',
      version: ''
    });
    dispatch(get_trds([])); */
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
            console.log('administrando tipologias documentales');
            /* dispatch(
              get_tipologias_documentales_by_name(
                form_data_searched_tipologia_documental.nombre
              )
            ); */
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
                  // rules={{ required: false }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error }
                  }) => (
                    <TextField
                      margin="dense"
                      fullWidth
                      label="Nombre de la Tipología Documental"
                      size="small"
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
            {/* <DataGrid
              sx={{ mt: '15px' }}
              density="compact"
              autoHeight
              rows={tipologias}
              columns={columns_tipologias_documentales_trd}
              pageSize={5}
              rowsPerPageOptions={[7]}
              experimentalFeatures={{ newEditingApi: true }}
              getRowId={(row) => row.id_tipologia_documental}
            /> */}
          </DialogContent>
          <Divider />
          <DialogTitle>Medios documentales y formatos asociados</DialogTitle>
          <DialogContent
            sx={{
              height: '20f0px',
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
                          console.log(selectedOption);
                          onChange(selectedOption);
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
                  render={({
                    field: { onChange, value },
                    fieldState: { error }
                  }) => (
                    <>
                      <Autocomplete
                        multiple
                        fullWidth
                        size="medium"
                        options={[
                          { value: 'papel', label: 'Papel' },
                          { value: 'microfilm', label: 'Microfilm' },
                          { value: 'microficha', label: 'Microficha' },
                          { value: 'fotografia', label: 'Fotografía' }
                        ]}
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
                       /* onChange={(event, value) => {
                          console.log(value);
                        }} */
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
            {/* <DataGrid

              sx={{ mt: '15px' }}
              density="compact"
              autoHeight
              rows={tipologias}
              columns={columns_tipologias_documentales_trd}
              pageSize={5}
              rowsPerPageOptions={[7]}
              experimentalFeatures={{ newEditingApi: true }}
              getRowId={(row) => row.id_tipologia_documental}
            /> */}
          </DialogContent>

          <DialogActions>
            <Stack
              direction="row"
              spacing={2}
              sx={{ mr: '15px', mb: '10px', mt: '10px' }}
            >
              <Button
                variant="contained"
                startIcon={<SaveIcon />}
                color="primary"
                // sx={{ ml: '10px' }}
                onClick={() => {
                  resetBusquedaTipologiasDocumentales();
                  console.log('GUARDANDO TIPOLOGÍAS DOCUMENTALES TRD');
                }}
              >
                GUARDAR TIPOLOGÍA DOCUMENTAL
              </Button>
              <Button
                variant="outlined"
                startIcon={<SearchIcon />}
                color="primary"
                // sx={{ ml: '10px' }}
                onClick={() => {
                  resetBusquedaTipologiasDocumentales();
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

/* 
  
  <Grid item xs={12}>
                  <Autocomplete
                    multiple
                    fullWidth
                    size="medium"
                    options={cuenca}
                    getOptionLabel={(option: any) => option.label}
                    isOptionEqualToValue={(option: any, value) =>
                      option?.value === value?.value
                    }
                    renderInput={(params) => (
                      <TextField
                        key={params.id}
                        {...params}
                        label="Asociar Cuenca"
                        placeholder="Asociar Cuenca"
                      />
                    )}
                    {...register('id_cuencas')}
                    onChange={handle_change_autocomplete}
                  />
                </Grid>
  
  const [cuenca, set_cuenca] = useState<ValueProps[]>([]); */

/* const fetch_data_cuencas = async (): Promise<void> => {
    try {
      const response = await get_cuencas();
      if (response?.length > 0) {
        const data_cuenca = response.map((item: IpropsCuenca) => ({
          value: item.id_cuenca,
          label: item.nombre,
        }));
        setValue('id_cuencas', data_cuenca.map((e) => e.value) as never[]);
        set_cuenca(data_cuenca);
      }
    } catch (error: any) {
      control_error(error.response.data.detail);
    }
  };

const handle_change_autocomplete = (
    event: React.SyntheticEvent<Element, Event>,
    value: ValueProps[],
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<ValueProps>
  ): void => {
    setValue('id_cuencas', value.map((e) => e.value) as never[]);
    set_cuenca(value);
  }; */
