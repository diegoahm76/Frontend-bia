/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
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
  Button
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
import { DownloadButton } from '../../../../utils/DownloadButton/DownLoadButton';
import { get_serie_ccd_current } from '../store/slices/seriesSlice';
import { gridStyles } from './utils/constants';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { ModalContext } from '../context/ModalContext';
import { CatalogoSeriesYSubseries } from '../componentes/CatalogoSeriesYSubseries/CatalogoSeriesYSubseries';
import { getCatalogoSeriesYSubseries } from '../componentes/CatalogoSeriesYSubseries/services/CatalogoSeriesYSubseries.service';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const CcdScreen: React.FC = () => {
  const { openModalModalSeriesAndSubseries } = useContext(ModalContext);

  const dispatch: any = useAppDispatch();
  const { ccd_current } = useAppSelector((state: any) => state.ccd);
  const { serie_ccd_current } = useAppSelector((state: any) => state.series);
  const { assignments_ccd } = useAppSelector((state: any) => state.assignments);
  const [flag_btn_finish, set_flag_btn_finish] = useState<boolean>(true);

  useEffect(() => {
    set_flag_btn_finish(
      ccd_current?.fecha_terminado !== null &&
        ccd_current?.fecha_terminado !== '' &&
        ccd_current?.fecha_terminado !== undefined
    );

    console.log(
      '🚀 ~ file: CcdScreen.tsx ~ line 45 ~ useEffect ~ ccd_current?.fecha_terminado',
      ccd_current?.fecha_terminado
    );
    /* if (ccd_current?.fecha_terminado != null) {
      set_flag_btn_finish(true);
    } else {
      set_flag_btn_finish(false);
    } */
  }, [ccd_current?.fecha_terminado]);

  /* useEffect(() => {
    if (ccd_current?.id_ccd) {
      dispatch(to_resume_ccds_service(ccd_current?.id_ccd));
    }
  }, [ccd_current?.id_ccd]); */

  // Hooks
  const {
    // States
    list_unitys,
    list_organigrams,
    list_sries,
    list_subsries,
    title,
    title_button_asing,
    create_is_active,
    set_create_sub_serie_active,
    create_sub_serie_active,
    consulta_ccd_is_active,
    columns_asignacion,
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
    // get_row_class,
    on_submit_create_ccd,
    on_submit,
    // register_create_ccd,
    handle_submit,
    handle_submit_create_ccd,

    clean_ccd
    // file,
    // set_file
  } = use_ccd() as any;
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleClearFile = (): void => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
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
          <Title title="Cuadro de clasificación documental" />
          <form
            style={{
              marginTop: '20px'
            }}
            onSubmit={(e: any) => {
              // console.log('hola')
              console.log(e);
              on_submit_create_ccd(e);
            }}

            // sx={{ mt: '20px' }}
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            /* onSubmit={handle_submit_create_ccd(on_submit_create_ccd)} */
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={3}>
                <Controller
                  name="organigrama"
                  rules={{ required: true }}
                  control={control_create_ccd}
                  render={({ field }) => (
                    <Select
                      {...field}
                      isDisabled={ccd_current != null}
                      value={field.value}
                      options={list_organigrams}
                      placeholder="Seleccionar"
                    />
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
              <Grid item xs={12} sm={3}>
                <Controller
                  name="unidades_organigrama"
                  control={control_create_ccd}
                  render={({ field }) => (
                    <Select
                      {...field}
                      isDisabled={ccd_current != null}
                      value={field.value}
                      options={list_unitys}
                      placeholder="Seleccionar"
                    />
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
                      size="small"
                      label="Nombre"
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
                      size="small"
                      label="Versión"
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
                      label="Valor aumento serie"
                      disabled={ccd_current != null}
                      variant="outlined"
                      value={value}
                      onChange={onChange}
                      error={!(error == null)}
                      helperText={
                        error != null
                          ? 'Es obligatorio ingresar un valor de aumento de serie'
                          : 'Ingrese valor aumento serie'
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
                      label="valor aumento subserie"
                      variant="outlined"
                      disabled={ccd_current !== null}
                      value={value}
                      onChange={onChange}
                      error={!(error == null)}
                      helperText={
                        error != null
                          ? 'Es obligatorio ingresar un valor de aumento de subserie'
                          : 'Ingrese un valor de aumento subserie'
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
                  defaultValue={ccd_current?.ruta_soporte || ''}
                  rules={{ required: false }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error }
                  }) => (
                    <TextField
                      margin="dense"
                      fullWidth
                      size="small"
                      // value={value}
                      variant="outlined"
                      type="file"
                      inputRef={fileInputRef}
                      disabled={
                        ccd_current?.ruta_soporte != null /* ||
                        ccd_current?.ruta_sopoorte !== '' ||
                        ccd_current?.ruta_sopoorte !== undefined */
                      }
                      InputLabelProps={{ shrink: true }}
                      // onChange={onChange}
                      onChange={(e) => {
                        const files = (e.target as HTMLInputElement).files;

                        if (files && files.length > 0) {
                          onChange(files[0]);
                          console.log(files[0]);
                          // set_file(files[0]);
                        }
                      }}
                      error={!!error}
                      helperText={
                        error
                          ? 'Es obligatorio subir un archivo'
                          : 'Seleccione un archivo'
                      }
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
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
                  void dispatch(
                    get_classification_ccds_service(
                      control_create_ccd._formValues.nombre_ccd,
                      control_create_ccd._formValues.version
                    )
                  ).then((data: any) => {
                    /*  if (data.data.length > 0) {

                      set_ccd_current(data.data[0]);
                      set_save_ccd(false);
                      set_create_ccd_is_active(false);
                      set_update_ccd_is_active(true);
                      set_delete_ccd_is_active(true);
                    } */
                    console.log(data);
                    if (
                      data.data.length > 0 &&
                      control_create_ccd._formValues.nombre_ccd !== '' &&
                      control_create_ccd._formValues.version !== ''
                    ) {
                      dispatch(get_ccd_current(data.data[0]));
                      set_consulta_ccd_is_active(true);
                      set_title('Consultar CCD');
                      // set_ccd_current(data);
                      // set_save_ccd(false);
                      // set_create_ccd_is_active(false);
                      // set_update_ccd_is_active(false);
                      // set_delete_ccd_is_active(false);
                    }
                  });
                }}
              >
                BUSCAR CCD
              </Button>
              <Button
                type="submit"
                color="primary"
                variant="contained"
                startIcon={ccd_current != null ? <SyncIcon /> : <SaveIcon />}
              >
                {ccd_current != null ? 'ACTUALIZAR CCD' : 'CREAR CCD'}
              </Button>
              <Button
                color="success"
                variant="contained"
                startIcon={<CleanIcon />}
                onClick={() => {
                  clean_ccd();
                  handleClearFile();
                  // set_file(null);
                  // clean formulario
                }}
              >
                LIMPIAR CAMPOS
              </Button>
            </Stack>
          </form>
        </Grid>
      </Grid>
      {/* {save_ccd && ( */}
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
              <Grid container spacing={2}>
                <Grid item xs={12} sm={2}>
                  <Controller
                    name="series"
                    control={control}
                    render={({
                      field: { onChange, value },
                      fieldState: { error }
                    }) => (
                      <Select
                        // {...field}
                        value={value}
                        onChange={(selectedOption: any) => {
                          // Actualiza el valor seleccionado en el controlador
                          // Aquí puedes agregar cualquier lógica adicional que desees ejecutar cuando se seleccione una opción
                          if (!selectedOption.value) {
                            onChange(null);
                            console.log(selectedOption.value);
                          } else {
                            onChange(selectedOption);
                            dispatch(
                              get_serie_ccd_current(selectedOption.value)
                            );
                          }
                          //! dentro del selectedOption se encuentra el id_serie_doc, lo que me permite hacer la petición a la subserie de la serie seleccionada
                          console.log('Valor seleccionado:', selectedOption);
                        }}
                        options={list_sries}
                        // isClearable
                        isSearchable
                        placeholder="Seleccionar"
                      />
                    )}
                  />
                  {errors.sries !== null && (
                    <div className="col-12">
                      <small className="text-center text-danger">
                        Campo obligatorio
                      </small>
                    </div>
                  )}
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
                      CREAR SERIE
                    </Button>
                    {/*                    <Button disabled>CLONAR</Button>
                    <Button disabled>PREVISUALIZAR</Button> */}
                  </ButtonGroup>
                </Grid>
                <Grid item xs={12} sm={2}>
                  <Controller
                    name="subserie"
                    control={control}
                    render={({
                      field: { onChange, value },
                      fieldState: { error }
                    }) => (
                      <Select
                        // {...field}
                        value={value}
                        options={list_subsries}
                        placeholder="Seleccionar"
                        onChange={(selectedOption) => {
                          onChange(selectedOption); // Actualiza el valor seleccionado en el controlador
                          // Aquí puedes agregar cualquier lógica adicional que desees ejecutar cuando se seleccione una opción

                          //! apenas se obtengan los valores de la subserie, se debe analizar que nueva petición se debe hacer
                          console.log('Valor seleccionado:', selectedOption);
                        }}
                        // isClearable
                        isSearchable
                      />
                    )}
                  />
                  {errors.subserie !== null && (
                    <div className="col-12">
                      <small className="text-center text-danger">
                        Campo obligatorio
                      </small>
                    </div>
                  )}
                </Grid>

                <Grid item xs={12} sm={4}>
                  <ButtonGroup
                    variant="contained"
                    aria-label=" primary button group"
                  >
                    <Button
                      onClick={() => {
                        set_create_sub_serie_active(true);
                        // set_create_is_active(true);
                        set_title('Administrar subseries');
                      }}
                      disabled={serie_ccd_current === null}
                    >
                      CREAR SUBSERIE
                    </Button>
                    {/* <Button disabled>CLONAR</Button>
                    <Button disabled>PREVISUALIZAR</Button> */}
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
                      dispatch(getCatalogoSeriesYSubseries(ccd_current.id_ccd));
                      // getCatalogoSeriesYSubseries();
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
                    SERIES Y SUBSERIES
                  </Button>
                  {/*                    <Button disabled>CLONAR</Button>
                    <Button disabled>PREVISUALIZAR</Button> */}
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
            <Title title="Asignaciones" />
            <Box
              component="form"
              sx={{ mt: '20px', mb: '20px' }}
              noValidate
              autoComplete="off"
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={3}>
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
                  {errors.unidades_asignacion !== null && (
                    <div className="col-12">
                      <small className="text-center text-danger">
                        Este campo es obligatorio
                      </small>
                    </div>
                  )}
                </Grid>
                <Grid item xs={12} sm={3}>
                  <label className="text-terciary">
                    Series
                    <samp className="text-danger">*</samp>
                  </label>
                  <Controller
                    name="sries_asignacion"
                    control={control}
                    rules={{
                      required: true
                    }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        value={field.value}
                        options={list_sries}
                        placeholder="Seleccionar"
                      />
                    )}
                  />
                  {errors.sries_asignacion != null && (
                    <div className="col-12">
                      <small className="text-center text-danger">
                        Este campo es obligatorio
                      </small>
                    </div>
                  )}
                </Grid>
                <Grid item xs={12} sm={3}>
                  <label className="text-terciary">
                    Subseries
                    <samp className="text-danger">*</samp>
                  </label>
                  <Controller
                    name="subserie_asignacion"
                    control={control}
                    rules={{
                      required: true
                    }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        value={field.value}
                        isMulti
                        options={list_subsries}
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
                <Grid item xs={12} sm={3}>
                  <Button
                    fullWidth
                    onClick={() => {
                      /* void dispatch(
                        to_assign_ccds_service(
                          ccd_current,
                          set_flag_btn_finish,
                          set_title_button_asing
                        )
                      ); */
                      console.log('guardando la relación de asignaciones');
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
                {/* <DataGrid
                  density="compact"
                  autoHeight
                  rows={assignments_ccd}
                  columns={columns_asignacion}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                  experimentalFeatures={{ newEditingApi: true }}
                /> */}
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
                      to_finished_ccds_service(set_flag_btn_finish, ccd_current)
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
