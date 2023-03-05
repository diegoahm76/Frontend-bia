import type React from 'react';
import { useState, useEffect } from 'react';
import Select, { type SingleValue } from 'react-select';
import { useNavigate } from 'react-router-dom';
import { Controller } from 'react-hook-form';
import {
  Grid,
  Box,
  Stack,
  Button,
  TextField,
  Typography,
  // MenuItem,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Title } from '../../../../components';
import { OrganigramVisualizerDialog } from '../componentes/OrganigramVisualizerDialog';
import {
  type IDocumentaryGroup,
  type ILevelFather,
  type ILevelUnity,
  type ITypeUnity,
} from '../interfaces/organigrama';
import useEditarOrganigrama from '../hooks/useEditarOrganigrama';
import { useAppDispatch, useAppSelector } from '../store/hooks/hooks';
import { to_finalize_organigram_service } from '../store/thunks/organigramThunks';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const EditarOrganigramaScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Estado global
  const [view_organigram, set_view_organigram] = useState(false);
  const {
    organigram_current,
    levels_organigram,
    unity_organigram,
    mold_organigram,
  } = useAppSelector((state) => state.organigram);

  // Hooks
  const {
    control_organigrama,
    handle_submit_organigrama,
    onsubmit_edit_organigrama,
    // default_col_def_organigrama,
    // errors_organigrama,

    columns_nivel,
    orden_nivel,
    title_nivel,
    control_nivel,
    handle_submit_nivel,
    submit_nivel,
    // errors_nivel,

    columns_unidades,
    option_nivel,
    control_unidades,
    option_raiz,
    options_agrupacion_d,
    options_tipo_unidad,
    option_unidad_padre,
    submit_unidades,
    handle_submit_unidades,
    set_value_unidades,
    // errors_unidades,

    // onGridReady,
  } = useEditarOrganigrama();

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const set_unity_root = (option: SingleValue<ILevelUnity>) => {
    set_value_unidades(
      'unidadRaiz',
      option?.orden === 1
        ? {
            label: 'Si',
            value: true,
          }
        : {
            label: 'No',
            value: false,
          }
    );
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    set_value_unidades('nivelUnidad', option!);
  };

  const handle_to_go_back = (): void => {
    navigate('/dashboard/gestor-documental/organigrama/crear-organigrama');
  };

  useEffect(() => {
    if (organigram_current.id_organigrama === null) {
      navigate('/dashboard/gestor-documental/organigrama/crear-organigrama');
    }
  }, []);

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
          <Title title="EDICION ORGANIGRAMA" />
          <Box
            component="form"
            sx={{ mt: '20px' }}
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onSubmit={handle_submit_organigrama(onsubmit_edit_organigrama)}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <Controller
                  name="nombre"
                  control={control_organigrama}
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
              <Grid item xs={12} sm={4}>
                <Controller
                  name="version"
                  control={control_organigrama}
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
              <Grid item xs={12} sm={4}>
                <Controller
                  name="descripcion"
                  control={control_organigrama}
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
                      label="Descripcion"
                      variant="outlined"
                      value={value}
                      onChange={onChange}
                      error={!(error == null)}
                      helperText={
                        error != null
                          ? 'Es obligatorio ingresar una descripción'
                          : 'Ingrese descripción'
                      }
                    />
                  )}
                />
              </Grid>
            </Grid>
            <Stack direction="row" justifyContent="flex-end" spacing={2}>
              <Button
                type="submit"
                color="primary"
                variant="outlined"
                startIcon={<SaveIcon />}
              >
                EDITAR
              </Button>
            </Stack>
          </Box>
        </Grid>
      </Grid>
      <Grid
        container
        sx={{
          position: 'relative',
          background: '#FAFAFA',
          borderRadius: '15px',
          mb: '20px',
          p: '20px',
          boxShadow: '0px 3px 6px #042F4A26',
        }}
      >
        <Grid item xs={12}>
          <Title title="NIVELES ORGANIZACIONALES" />
          <Box sx={{ mt: '20px' }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <Box
                  component="form"
                  // eslint-disable-next-line @typescript-eslint/no-misused-promises
                  onSubmit={handle_submit_nivel(submit_nivel)}
                >
                  <Typography>Nivel {orden_nivel}</Typography>
                  <Controller
                    name="nombre"
                    control={control_nivel}
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
                        label="Nombre de nivel"
                        variant="outlined"
                        value={value}
                        onChange={onChange}
                        error={!(error == null)}
                        helperText={
                          error != null
                            ? 'Es obligatorio ingresar un nombre'
                            : 'Ingrese nombre del nivel'
                        }
                      />
                    )}
                  />
                  <Stack direction="row" justifyContent="flex-end" spacing={2}>
                    <Button
                      type="submit"
                      color="primary"
                      variant="outlined"
                      startIcon={
                        title_nivel === 'Agregar' ? <AddIcon /> : <EditIcon />
                      }
                    >
                      {title_nivel === 'Agregar' ? 'AGREGAR' : 'EDITAR'}
                    </Button>
                  </Stack>
                </Box>
              </Grid>
              <Grid item xs={12} sm={8}>
                <Grid item>
                  <Box sx={{ width: '100%' }}>
                    <DataGrid
                      density="compact"
                      autoHeight
                      rows={levels_organigram}
                      columns={columns_nivel}
                      pageSize={10}
                      rowsPerPageOptions={[5]}
                      experimentalFeatures={{ newEditingApi: true }}
                      getRowId={(row) => row.id_nivel_organigrama}
                    />
                  </Box>
                </Grid>
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
          <Title title="UNIDADES ORGANIZACIONALES" />
          <Box
            component="form"
            sx={{ mt: '20px' }}
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onSubmit={handle_submit_unidades(submit_unidades)}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={3}>
                <Controller
                  name="codigo"
                  control={control_unidades}
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
                      label="Código"
                      variant="outlined"
                      value={value}
                      onChange={onChange}
                      error={!(error == null)}
                      helperText={
                        error != null
                          ? 'Es obligatorio ingresar un código'
                          : 'Ingrese código'
                      }
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <Controller
                  name="nombre"
                  control={control_unidades}
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
                          : 'Ingrese un nombre'
                      }
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                {/* <TextField
                  name="tipoUnidad"
                  select
                  label="Select"
                  defaultValue="1"
                  helperText="Seleccione tipo de unidad"
                  size="small"
                  fullWidth
                >
                  {tipos_unidades.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField> */}
                <Controller
                  name="tipoUnidad"
                  control={control_unidades}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      value={field.value}
                      onChange={(option: SingleValue<ITypeUnity>) => {
                        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                        set_value_unidades('tipoUnidad', option!);
                      }}
                      options={options_tipo_unidad.map((item) =>
                        item.value !== 'LI' && unity_organigram.length === 0
                          ? { ...item, isDisabled: true }
                          : { ...item, isDisabled: false }
                      )}
                      placeholder="Seleccionar"
                    />
                  )}
                />

                {/* <Controller
                  name="typeUnity"
                  control={control_unidades}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      select
                      size="small"
                      label="Tipo de unidad"
                      variant="outlined"
                      fullWidth
                      // error={!!errors_}
                      // helperText={errors.tipoUnidad ? errors_unidades : ''}
                      onChange={(e) => {
                        field.onChange(e.target.value as ITypeUnity); // update the value of the field
                        set_value_unidades(
                          'tipoUnidad',
                          e.target.value as ITypeUnity
                        );
                      }}
                    >
                      {options_tipo_unidad.map((item) => (
                        <MenuItem
                          key={item.value}
                          value={item}
                          disabled={
                            item.value !== 'LI' && unity_organigram.length === 0
                          }
                        >
                          {item.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                /> */}
              </Grid>
              <Grid item xs={12} sm={3}>
                <Controller
                  name="nivelUnidad"
                  control={control_unidades}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      value={field.value}
                      onChange={(option: SingleValue<ILevelUnity>) => {
                        set_unity_root(option);
                      }}
                      options={option_nivel}
                      placeholder="Seleccionar"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <Controller
                  name="unidad_raiz"
                  control={control_unidades}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      isDisabled={true}
                      value={field.value}
                      options={option_raiz}
                      placeholder="Seleccionar unidad raiz"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <Controller
                  name="agrupacionDocumental"
                  control={control_unidades}
                  render={({ field }) => (
                    <Select
                      {...field}
                      value={field.value}
                      onChange={(option: SingleValue<IDocumentaryGroup>) => {
                        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                        set_value_unidades('agrupacionDocumental', option!);
                      }}
                      options={options_agrupacion_d}
                      placeholder="Seleccionar"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <Controller
                  name="nivelPadre"
                  control={control_unidades}
                  render={({ field }) => (
                    <Select
                      {...field}
                      value={field.value}
                      onChange={(option: SingleValue<ILevelFather>) => {
                        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                        set_value_unidades('nivelPadre', option!);
                      }}
                      options={option_unidad_padre}
                      placeholder="Seleccionar"
                    />
                  )}
                />
              </Grid>
            </Grid>
            <Stack
              direction="row"
              justifyContent="flex-end"
              spacing={2}
              sx={{ mb: '20px' }}
            >
              <Button
                type="submit"
                color="primary"
                variant="outlined"
                startIcon={<AddIcon />}
              >
                AGREGAR UNIDAD
              </Button>
            </Stack>
          </Box>
          <Grid item>
            <Box sx={{ width: '100%' }}>
              <DataGrid
                density="compact"
                autoHeight
                rows={unity_organigram}
                columns={columns_unidades}
                pageSize={10}
                rowsPerPageOptions={[5]}
                experimentalFeatures={{ newEditingApi: true }}
                getRowId={(row) => row.id_unidad_organizacional}
              />
            </Box>
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
              startIcon={<ArrowBackIcon />}
              onClick={handle_to_go_back}
            ></Button>
            <Button
              disabled={mold_organigram.length === 0}
              color="primary"
              variant="contained"
              startIcon={<VisibilityIcon />}
              onClick={() => {
                set_view_organigram(true);
              }}
            >
              VER
            </Button>
            <Button
              color="success"
              variant="contained"
              startIcon={<SaveIcon />}
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              onClick={async () =>
                await dispatch(
                  to_finalize_organigram_service(
                    String(organigram_current.id_organigrama),
                    navigate
                  )
                )
              }
            >
              FINALIZAR
            </Button>
          </Stack>

          <OrganigramVisualizerDialog
            is_modal_active={view_organigram}
            set_is_modal_active={set_view_organigram}
          />
        </Grid>
      </Grid>
    </>
  );
};
