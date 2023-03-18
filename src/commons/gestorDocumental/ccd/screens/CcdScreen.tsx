import { useEffect, useState } from 'react';
// Components Material UI
import {
  Grid,
  Box,
  TextField,
  Stack,
  ButtonGroup,
  Button,
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
import CrearSeriesCcdDialog from '../componentes/CrearSeriesCcdDialog';
import SearchCcdsDialog from '../componentes/SearchCcdsDialog';
import {
  to_resume_ccds_service,
  to_finished_ccds_service,
} from '../store/thunks/ccdThunks';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const CcdScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const { ccd_current } = useAppSelector((state) => state.ccd);
  const { assignments_ccd } = useAppSelector((state) => state.assignments);
  const [flag_btn_finish, set_flag_btn_finish] = useState<boolean>(true);

  useEffect(() => {
    if (ccd_current?.fecha_terminado != null) {
      set_flag_btn_finish(true);
    } else {
      set_flag_btn_finish(false);
    }
  }, [ccd_current]);

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
    clean_ccd,
  } = use_ccd();

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
          boxShadow: '0px 3px 6px #042F4A26',
        }}
      >
        <Grid item xs={12}>
          <Title title="Cuadro de clasificación documental" />
          <Box
            component="form"
            sx={{ mt: '20px' }}
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onSubmit={handle_submit_create_ccd(on_submit_create_ccd)}
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
                    fieldState: { error },
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
                    fieldState: { error },
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
                  set_consulta_ccd_is_active(true);
                  set_title('Consultar CCD');
                }}
              >
                BUSCAR
              </Button>
              <Button
                type="submit"
                color="primary"
                variant="contained"
                startIcon={ccd_current != null ? <SyncIcon /> : <SaveIcon />}
              >
                {ccd_current != null ? 'ACTUALIZAR' : 'GUARDAR'}
              </Button>
              <Button
                color="success"
                variant="contained"
                startIcon={<CleanIcon />}
                onClick={() => {
                  clean_ccd();
                }}
              >
                LIMPIAR
              </Button>
            </Stack>
          </Box>
        </Grid>
      </Grid>
      {/* {save_ccd && ( */}
      <>
        <Grid
          container
          sx={{
            position: 'relative',
            background: '#FAFAFA',
            borderRadius: '15px',
            p: '20px',
            mb: '20px',
            boxShadow: '0px 3px 6px #042F4A26',
          }}
        >
          <Grid item xs={12}>
            <Title title="Registro de series y subseries" />
            <Box
              component="form"
              sx={{ mt: '20px' }}
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              onSubmit={handle_submit(on_submit)}
              autoComplete="off"
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={2}>
                  <Controller
                    name="sries"
                    control={control}
                    render={() => (
                      <Select options={list_sries} placeholder="Seleccionar" />
                    )}
                  />
                  {errors.sries !== null && (
                    <div className="col-12">
                      <small className="text-center text-danger">
                        Este campo es obligatorio
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
                        set_title('Crear series');
                      }}
                    >
                      CREAR
                    </Button>
                    <Button disabled>CLONAR</Button>
                    <Button disabled>PREVISUALIZAR</Button>
                  </ButtonGroup>
                </Grid>
                <Grid item xs={12} sm={2}>
                  <Controller
                    name="subserie"
                    control={control}
                    render={() => (
                      <Select
                        options={list_subsries}
                        placeholder="Seleccionar"
                      />
                    )}
                  />
                  {errors.subserie !== null && (
                    <div className="col-12">
                      <small className="text-center text-danger">
                        Este campo es obligatorio
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
                        set_title('Crear subseries');
                      }}
                    >
                      CREAR
                    </Button>
                    <Button disabled>CLONAR</Button>
                    <Button disabled>PREVISUALIZAR</Button>
                  </ButtonGroup>
                </Grid>
              </Grid>
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
            boxShadow: '0px 3px 6px #042F4A26',
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
                  <Controller
                    name="unidades_asignacion"
                    control={control}
                    rules={{
                      required: true,
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
                      required: true,
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
                      required: true,
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
                  rows={assignments_ccd}
                  columns={columns_asignacion}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                  experimentalFeatures={{ newEditingApi: true }}
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
                    void dispatch(to_resume_ccds_service(set_flag_btn_finish));
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
                      to_finished_ccds_service(set_flag_btn_finish)
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
