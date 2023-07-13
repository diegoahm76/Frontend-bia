/* eslint-disable array-callback-return */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { useContext, useEffect, useRef, useState } from 'react';
// Components Material UI
import {
  Grid,
  Box,
  TextField,
  Stack,
  ButtonGroup,
  Button,
  makeStyles
} from '@mui/material';
import Select from 'react-select';
import { DataGrid } from '@mui/x-data-grid';
import SaveIcon from '@mui/icons-material/Save';
import SyncIcon from '@mui/icons-material/Sync';
import SearchIcon from '@mui/icons-material/Search';
import CleanIcon from '@mui/icons-material/CleaningServices';
import { Title } from '../../../../components/Title';
import use_ccd from '../hooks/useCCD';
import { Controller } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import {
  to_resume_ccds_service,
  to_finished_ccds_service,
  get_classification_ccds_service
} from '../store/thunks/ccdThunks';
import CrearSeriesCcdDialog from '../componentes/crearSeriesCcdDialog/CrearSeriesCcdDialog';
import SearchCcdsDialog from '../componentes/searchCcdsDialog/SearchCcdsDialog';
import CrearSubSerieCcdDialog from '../componentes/crearSubSerieDialog/CrearSubserieDialog';
import { get_ccd_current } from '../store/slices/ccdSlice';
import { get_serie_ccd_current } from '../store/slices/seriesSlice';
import { gridStyles } from './utils/constants';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { ModalContext } from '../context/ModalContext';
import { CatalogoSeriesYSubseries } from '../componentes/CatalogoSeriesYSubseries/CatalogoSeriesYSubseries';
import { getCatalogoSeriesYSubseries } from '../componentes/CatalogoSeriesYSubseries/services/CatalogoSeriesYSubseries.service';
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { DownloadButton } from '../../../../utils/DownloadButton/DownLoadButton';
import { LoadingButton } from '@mui/lab';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {
  create_or_delete_assignments_service,
  get_assignments_service
} from '../store/thunks/assignmentsThunks';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const CcdScreen: React.FC = () => {
  const {
    openModalModalSeriesAndSubseries,
    busquedaCreacionCCDModal,
    openModalBusquedaCreacionCCD,
    loadingButton
  } = useContext(ModalContext);

  const dispatch: any = useAppDispatch();

  const { ccd_current } = useAppSelector((state: any) => state.ccd);
  const { series_ccd, serie_ccd_current } = useAppSelector(
    (state: any) => state.series
  );
  const { subseries_ccd, subserie_ccd_current } = useAppSelector(
    (state: any) => state.subseries
  );
  const { seriesAndSubseries } = useAppSelector(
    (state: any) => state.slice_series_and_subseries
  );
  const { assignments_ccd } = useAppSelector((state: any) => state.assignments);
  const [flag_btn_finish, set_flag_btn_finish] = useState<boolean>(true);

  // console.log(series_ccd);
  useEffect(() => {
    set_flag_btn_finish(
      ccd_current?.fecha_terminado !== null &&
        ccd_current?.fecha_terminado !== '' &&
        ccd_current?.fecha_terminado !== undefined
    );
    console.log(
      '🚀 CcdScreen.tsx ~ 45 ~ useEffect ~ ccd_current?.fecha_terminado',
      ccd_current?.fecha_terminado
    );
  }, [ccd_current?.fecha_terminado]);

  useEffect(() => {
    dispatch(getCatalogoSeriesYSubseries(ccd_current?.id_ccd));
    get_assignments_service(ccd_current?.id_ccd)(dispatch);
  }, [ccd_current]);

  // Hooks
  const {
    // States
    list_unitys,
    list_organigrams,
    list_sries,
    list_subsries,
    list_sries_asignacion,
    title,
    title_button_asing,
    create_is_active,
    set_create_sub_serie_active,
    create_sub_serie_active,
    consulta_ccd_is_active,
    columns_asignacion,
    //! control series y subseries para catalogo de unidad organizacional
    control,
    control_create_ccd,
    errors,
    errors_create_ccd,
    // save_ccd,
    // Edita States
    set_title,
    set_create_is_active,
    set_consulta_ccd_is_active,
    // // Functions
    on_submit_create_ccd,
    on_submit_create_or_delete_relation_unidad,
    create_or_delete_relation_unidad,
    clean_ccd
  } = use_ccd() as any;

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
          <Title title="Cuadro de clasificación documental - Busca CCD por nombre y versión" />
          <form
            style={{
              marginTop: '20px'
            }}
            onSubmit={(e: any) => {
              on_submit_create_ccd(e);
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
                  name="organigrama"
                  rules={{ required: true }}
                  control={control_create_ccd}
                  render={({ field }) => (
                    <div>
                      <Select
                        {...field}
                        isDisabled={ccd_current != null || ccd_current?.actual}
                        value={field.value}
                        options={list_organigrams}
                        placeholder="Seleccionar"
                      />
                      <label htmlFor={field.name}>
                        <small
                          style={{
                            color: 'rgba(0, 0, 0, 0.6)',
                            fontWeight: 'thin',
                            fontSize: '0.75rem'
                          }}
                        >
                          {ccd_current
                            ? `
                              Organigrama Seleccionado
                            `
                            : `Seleccionar Organigrama`}
                        </small>
                      </label>
                    </div>
                  )}
                />
                {errors_create_ccd.organigrama != null && (
                  <div className="col-12">
                    <small className="text-center text-danger">
                      Este campo es obligatorio
                    </small>
                  </div>
                )}
              </Grid>
              <Grid
                item
                xs={12}
                sm={3}
                sx={{
                  zIndex: 2
                }}
              >
                <Controller
                  name="unidades_organigrama"
                  control={control_create_ccd}
                  render={({ field }) => (
                    <div>
                      <Select
                        {...field}
                        isDisabled={ccd_current != null || ccd_current?.actual}
                        value={field.value}
                        options={list_unitys}
                        placeholder="Seleccionar"
                      />
                      <label htmlFor={field.name}>
                        <small
                          style={{
                            color: 'rgba(0, 0, 0, 0.6)',
                            fontWeight: 'thin',
                            fontSize: '0.75rem'
                          }}
                        >
                          {ccd_current
                            ? `Unidad Seleccionada`
                            : `Seleccionar Unidad`}
                        </small>
                      </label>
                    </div>
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <Controller
                  name="nombre_ccd"
                  control={control_create_ccd}
                  defaultValue=""
                  rules={{ required: true }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error }
                  }) => (
                    <TextField
                      margin="dense"
                      fullWidth
                      disabled={ccd_current?.actual}
                      size="small"
                      label="Nombre CCD"
                      variant="outlined"
                      value={value}
                      onChange={onChange}
                      error={!(error == null)}
                      helperText={
                        error != null
                          ? 'Es obligatorio ingresar un nombre'
                          : 'Ingrese nombre'
                      }
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <Controller
                  name="version"
                  control={control_create_ccd}
                  defaultValue=""
                  rules={{ required: true }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error }
                  }) => (
                    <TextField
                      margin="dense"
                      fullWidth
                      disabled={ccd_current?.actual}
                      size="small"
                      label="Versión CCD"
                      variant="outlined"
                      value={value}
                      onChange={onChange}
                      error={!(error == null)}
                      helperText={
                        error != null
                          ? 'Es obligatorio ingresar una versión'
                          : 'Ingrese versión'
                      }
                    />
                  )}
                />
              </Grid>
              {/* new spaces */}
              <Grid item xs={12} sm={3}>
                <Controller
                  name="valor_aumento_serie"
                  control={control_create_ccd}
                  defaultValue=""
                  rules={{ required: true }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error }
                  }) => (
                    <TextField
                      margin="dense"
                      fullWidth
                      size="small"
                      label="Valor aumento series CCD"
                      /* sx={{
                        color: series_ccd.length > 0 || ccd_current?.fecha_terminado ? 'red' : 'blue'
                      }} */
                      style={{
                        color: series_ccd.length > 0 || ccd_current?.fecha_terminado ? 'red' : 'blue'
                      }}
                      disabled={
                        series_ccd.length > 0 || ccd_current?.fecha_terminado || ccd_current?.actual
                      }
                      variant="outlined"
                      value={value}
                      onChange={onChange}
                      error={!(error == null)}
                      helperText={
                        error != null
                          ? 'Es obligatorio ingresar un valor de aumento de serie'
                          : 'Ingrese valor aumento series'
                      }
                    />
                  )}
                />
              </Grid>
              {/* second new space */}
              <Grid item xs={12} sm={3}>
                <Controller
                  name="valor_aumento_subserie"
                  control={control_create_ccd}
                  defaultValue=""
                  rules={{ required: true }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error }
                  }) => (
                    <TextField
                      margin="dense"
                      fullWidth
                      size="small"
                      label="valor aumento subseries CCD"
                      variant="outlined"
                      disabled={subseries_ccd.length > 0 || ccd_current?.fecha_terminado || ccd_current?.actual}
                      value={value}
                      onChange={onChange}
                      error={!(error == null)}
                      helperText={
                        error != null
                          ? 'Es obligatorio ingresar un valor de aumento de subserie'
                          : 'Ingrese valor aumento subseries'
                      }
                    />
                  )}
                />
              </Grid>
              {/* third new spaces  */}
              {/* fourth new spaces, optional for the support route  */}
              <Grid item xs={12} sm={3}>
                <Controller
                  name="ruta_soporte"
                  control={control_create_ccd}
                  defaultValue=""
                  rules={{ required: false }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error }
                  }) => (
                    <>
                      <Button
                        variant={
                          value === '' || value === null
                            ? 'outlined'
                            : 'contained'
                        }
                        component="label"
                        style={{
                          marginTop: '.15rem',
                          width: '100%'
                        }}
                        startIcon={<CloudUploadIcon />}
                      >
                        {value === '' || value === null
                          ? 'Subir archivo'
                          : 'Archivo subido'}
                        <input
                          style={{ display: 'none' }}
                          type="file"
                          disabled={ccd_current?.actual}
                          onChange={(e) => {
                            console.log('valueeee', value);
                            const files = (e.target as HTMLInputElement).files;
                            if (files && files.length > 0) {
                              onChange(files[0]);
                              console.log(files[0]);
                            }
                          }}
                        />
                      </Button>
                      <label htmlFor="">
                        <small
                          style={{
                            color: 'rgba(0, 0, 0, 0.6)',
                            fontWeight: 'thin',
                            fontSize: '0.75rem'
                          }}
                        >
                          {control_create_ccd._formValues.ruta_soporte
                            ? control_create_ccd._formValues.ruta_soporte
                                .name ??
                              control_create_ccd._formValues.ruta_soporte.replace(
                                /https?:\/\/back-end-bia-beta\.up\.railway\.app\/media\//,
                                ''
                              )
                            : 'Seleccione archivo'}
                        </small>
                      </label>
                    </>
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={2} sx={{ marginTop: '.15rem' }}>
                <DownloadButton
                  fileName="ruta_soporte"
                  condition={
                    ccd_current === null ||
                    ccd_current?.ruta_soporte === null ||
                    ccd_current?.ruta_soporte === ''
                  }
                  fileUrl={ccd_current?.ruta_soporte}
                />
              </Grid>

              {/* end new spaces */}
            </Grid>
            <Stack
              direction="row"
              justifyContent="flex-end"
              spacing={2}
              sx={{ mt: '20px' }}
            >
              <Button
                color="primary"
                variant="outlined"
                startIcon={<SearchIcon />}
                onClick={() => {
                  set_consulta_ccd_is_active(true)
                }}
              >
                BUSCAR CCD
              </Button>

              <LoadingButton
                loading={loadingButton}
                type="submit"
                color="primary"
                variant="contained"
                disabled={ccd_current?.actual}
                startIcon={ccd_current != null ? <SyncIcon /> : <SaveIcon />}
              >
                {ccd_current != null ? 'ACTUALIZAR CCD' : 'CREAR CCD'}
              </LoadingButton>
              <Button
                color="success"
                variant="contained"
                startIcon={<CleanIcon />}
                onClick={() => {
                  clean_ccd();
                  // clean formulario
                }}
              >
                LIMPIAR CAMPOS
              </Button>
            </Stack>
          </form>
        </Grid>
      </Grid>
      {busquedaCreacionCCDModal ? (
        <>
          <Grid container sx={gridStyles}>
            <Grid item xs={12}>
              <Title title="Administrar catálogo de series y subseries" />
              <Box
                component="form"
                sx={{ mt: '20px' }}
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                autoComplete="off"
              >
                <Grid container spacing={2} sx={{ ZIndex: 10 }}>
                  <Grid
                    item
                    xs={12}
                    sm={2}
                    sx={{
                      zIndex: 6
                    }}
                  >
                    <Controller
                      name="series"
                      control={control}
                      render={({
                        field: { onChange, value, name },
                        fieldState: { error }
                      }) => (
                        <>
                          <Select
                            styles={{
                              control: (provided) => ({
                                ...provided,
                                // maxHeight: '200px',
                                overflowY: 'auto'
                              })
                            }}
                            value={value}
                            onChange={(selectedOption: any) => {
                              onChange(selectedOption);
                              dispatch(
                                get_serie_ccd_current(selectedOption.value)
                              );
                              console.log(
                                'Valor seleccionado:',
                                selectedOption
                              );
                            }}
                            options={list_sries}
                            // isSearchable
                            placeholder="Seleccionar"
                          />
                          <label htmlFor={name}>
                            <small
                              style={{
                                color: 'rgba(0, 0, 0, 0.6)',
                                fontWeight: 'thin',
                                fontSize: '0.75rem'
                              }}
                            >
                              {/* {error ? (
                                <span className="text-danger text-small d-block mb-2">
                                  {error.message}
                                </span>
                              ) : (
                                ''
                              )} */}
                              series
                            </small>
                          </label>
                        </>
                      )}
                    />
                    {/* {errors.sries !== null && (
                      <div className="col-12">
                        <small className="text-center text-danger">
                          Campo obligatorio
                        </small>
                      </div>
                    )} */}
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <ButtonGroup
                      variant="contained"
                      aria-label=" primary button group"
                    >
                      <Button
                        onClick={() => {
                          set_create_is_active(true);
                          set_title('Administrar series');
                        }}
                        disabled={
                          ccd_current === null || ccd_current?.id_ccd === null
                        }
                      >
                        ADMINISTRAR SERIES
                      </Button>
                    </ButtonGroup>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={2}
                    sx={{
                      zIndex: 6
                    }}
                  >
                    <Controller
                      name="subserie"
                      control={control}
                      render={({
                        field: { onChange, value, name },
                        fieldState: { error }
                      }) => (
                        <>
                          <Select
                            value={value}
                            options={list_subsries}
                            placeholder="Seleccionar"
                            onChange={(selectedOption) => {
                              onChange(selectedOption); // Actualiza el valor seleccionado en el controlador
                              // Aquí puedes agregar cualquier lógica adicional que desees ejecutar cuando se seleccione una opción

                              //! apenas se obtengan los valores de la subserie, se debe analizar que nueva petición se debe hacer
                              // console.log('Valor seleccionado:', selectedOption);
                            }}
                            // isClearable
                            // isSearchable
                          />
                          <label htmlFor={name}>
                            <small
                              style={{
                                color: 'rgba(0, 0, 0, 0.6)',
                                fontWeight: 'thin',
                                fontSize: '0.75rem'
                              }}
                            >
                              {/* {error ? (
                                <span className="text-danger text-small d-block mb-2">
                                  {error.message}
                                </span>
                              ) : (
                                ''
                              )} */}
                              subseries
                            </small>
                          </label>
                        </>
                      )}
                    />
                    {/* {errors.subserie !== null && (
                      <div className="col-12">
                        <small className="text-center text-danger">
                          Campo obligatorio
                        </small>
                      </div>
                    )} */}
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <ButtonGroup
                      variant="contained"
                      aria-label=" primary button group"
                    >
                      <Button
                        onClick={() => {
                          set_create_sub_serie_active(true);
                          set_title('Administrar subseries');
                        }}
                        disabled={serie_ccd_current === null || ccd_current?.actual}
                      >
                        ADMINISTRAR SUBSERIES
                      </Button>
                    </ButtonGroup>
                  </Grid>
                </Grid>
                {/**/}
                <Grid
                  item
                  xs={12}
                  sm={12}
                  justifyContent="center"
                  alignItems="center"
                  sx={{
                    mt: '20px',
                    display: 'flex'
                  }}
                >
                  <ButtonGroup
                    variant="contained"
                    aria-label=" primary button group"
                  >
                    <Button
                      color="warning"
                      variant="outlined"
                      disabled={ccd_current === null}
                      onClick={() => {
                        console.log('ver catalogo de series y subseries');
                        openModalModalSeriesAndSubseries();
                        dispatch(
                          getCatalogoSeriesYSubseries(ccd_current.id_ccd)
                        );
                      }}
                    >
                      <VisibilityIcon
                        sx={{
                          color: 'primary.main',
                          width: '18px',
                          height: '18px',
                          marginRight: '7px'
                        }}
                      />{' '}
                      VER CATÁLOGO
                    </Button>
                  </ButtonGroup>
                </Grid>
                {/* */}
              </Box>
            </Grid>
          </Grid>

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
              <Title title="Administrar catálogo de series y subseries por Unidad Organizacional" />
              <Box
                component="form"
                sx={{ mt: '20px', mb: '20px' }}
                noValidate
                autoComplete="off"
              >
                <Grid container spacing={3}>
                  <Grid
                    item
                    xs={12}
                    sm={4}
                    sx={{
                      zIndex: 5
                    }}
                  >
                    <label className="text-terciary">
                      {' '}
                      Unidades
                      <samp className="text-danger">*</samp>
                    </label>
                    {/* este controler debe ser reemplazado por uno que me permite un dinamismo de los datos del ccd */}
                    <Controller
                      name="unidades_asignacion"
                      control={control}
                      rules={{
                        required: true
                      }}
                      render={({ field }) => (
                        <Select
                          {...field}
                          value={field.value}
                          options={list_unitys}
                          placeholder="Seleccionar"
                        />
                      )}
                    />
                    {/* {errors.unidades_asignacion !== null && (
                      <div className="col-12">
                        <small className="text-center text-danger">
                          Este campo es obligatorio
                        </small>
                      </div>
                    )} */}
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={5}
                    sx={{
                      zIndex: 5
                    }}
                  >
                    <label className="text-terciary">
                      Catálogo de series y subseries
                      <samp className="text-danger">*</samp>
                    </label>
                    <Controller
                      name="catalogo_asignacion"
                      control={control}
                      rules={{
                        required: true
                      }}
                      render={({
                        field: { onChange, value },
                        fieldState: { error }
                      }) => (
                        <Select
                          value={value}
                          // isMulti prop will enable the multi select
                          isMulti
                          onChange={(selectedOption) => {
                            // console.log('selectedOption', selectedOption);
                            onChange(selectedOption);
                          }}
                          options={list_sries_asignacion}
                          placeholder="Seleccionar"
                        />
                      )}
                    />
                    {errors.subserie_asignacion != null && (
                      <div className="col-12">
                        <small className="text-center text-danger">
                          Este campo es obligatorio
                        </small>
                      </div>
                    )}
                  </Grid>
                  {/* FINALIZAR EVENTO */}
                  <Grid
                    item
                    xs={12}
                    sm={3}
                    sx={{
                      marginTop: '25px'
                    }}
                  >
                    <Button
                      fullWidth
                      onClick={() => {
                        void dispatch(create_or_delete_relation_unidad);
                        void dispatch(get_assignments_service(ccd_current));
                      }}
                      color="primary"
                      variant="contained"
                      startIcon={<SaveIcon />}
                    >
                      {title_button_asing}
                    </Button>
                  </Grid>
                </Grid>
              </Box>
              <Grid item>
                <Box sx={{ width: '100%' }}>
                  <DataGrid
                    density="compact"
                    autoHeight
                    // ! se deben realizar cambios de filtro para la seleccion de los datos
                    rows={assignments_ccd}
                    sx={{
                      zIndex: 2
                    }}
                    columns={columns_asignacion}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    experimentalFeatures={{ newEditingApi: true }}
                    getRowId={(row) => row.id_cat_serie_und}
                  />
                </Box>
              </Grid>
              <Stack
                direction="row"
                justifyContent="flex-end"
                spacing={2}
                sx={{ mt: '20px' }}
              >
                {flag_btn_finish ? (
                  <Button
                    onClick={() => {
                      void dispatch(
                        to_resume_ccds_service(set_flag_btn_finish, ccd_current)
                      );
                    }}
                    color="success"
                    variant="contained"
                    startIcon={<SaveIcon />}
                  >
                    REANUDAR
                  </Button>
                ) : (
                  <Button
                    onClick={() => {
                      void dispatch(
                        to_finished_ccds_service(
                          set_flag_btn_finish,
                          ccd_current
                        )
                      );
                    }}
                    color="success"
                    variant="contained"
                    startIcon={<SaveIcon />}
                  >
                    TERMINAR
                  </Button>
                )}
              </Stack>
            </Grid>
          </Grid>
        </>
      ) : null}

      <CrearSeriesCcdDialog
        is_modal_active={create_is_active}
        set_is_modal_active={set_create_is_active}
        title={title}
      />
      <CrearSubSerieCcdDialog
        is_modal_active={create_sub_serie_active}
        set_is_modal_active={set_create_sub_serie_active}
        title={title}
      />
      {/* dialogo catalogo de series y subseries */}
      <CatalogoSeriesYSubseries />

      {consulta_ccd_is_active && (
        <SearchCcdsDialog
          is_modal_active={consulta_ccd_is_active}
          set_is_modal_active={set_consulta_ccd_is_active}
          title={title}
        />
      )}
    </>
  );
};
