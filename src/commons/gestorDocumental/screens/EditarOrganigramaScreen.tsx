import type React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Controller } from 'react-hook-form';
// Componentes de Material UI
import { Grid, Box, Stack, Button, MenuItem, TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
// Icons de Material UI
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// Componentes personalizados
import { Title } from '../../../components';
import { OrganigramVisualizerDialog } from '../components/OrganigramVisualizerDialog';
// Hooks
import useEditarOrganigrama from '../hooks/useEditarOrganigrama';
import { useAppSelector } from '../store/hooks/hooks';

const tipos_unidades = [
  {
    value: '1',
    label: 'Test',
  },
  {
    value: 'EUR',
    label: 'Test',
  },
  {
    value: 'BTC',
    label: '฿',
  },
  {
    value: 'JPY',
    label: '¥',
  },
];

// eslint-disable-next-line @typescript-eslint/naming-convention
export const EditarOrganigramaScreen: React.FC = () => {
  const navigate = useNavigate();
  const handle_to_go_back = (): void => {
    navigate('/dashboard/gestor-documental/organigrama/crear-organigrama');
  };
  // Estado global

  const {
    // organigram_current,
    levels_organigram,
    unity_organigram,
    mold_organigram,
  } = useAppSelector((state: any) => state.organigram);
  const [view_organigram, set_view_organigram] = useState(false);

  // Hooks
  const {
    columns_nivel,
    columns_unidades,
    // controlUnidades,
    // defaultColDefOrganigrama,
    // errorsNivel,
    // errorsOrganigrama,
    // errorsUnidades,
    // optionNivel,
    // optionRaiz,
    // optionsAgrupacionD,
    // optionsTipoUnidad,
    // optionUnidadPadre,
    // orden_nivel,
    // title_nivel,
    // // Edita States
    // // Functions
    handle_submit_organigrama,
    onsubmit_edit_organigrama,
    control_organigrama,
    // handleSubmitNivel,
    // registerNivel,
    // submitNivel,
    // handleSubmitUnidades,
    // registerUnidades,
    // setValueUnidades,
    // submitUnidades,
    // onGridReady,
  } = useEditarOrganigrama();

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
                <Box component="form" noValidate autoComplete="off">
                  <TextField
                    required
                    id="outlined-error-helper-text"
                    label="Nombre de nivel"
                    helperText="Ingrese nombre de nivel"
                    size="small"
                    fullWidth
                  />
                  <Stack direction="row" justifyContent="flex-end" spacing={2}>
                    <Button
                      color="primary"
                      variant="outlined"
                      startIcon={<AddIcon />}
                    >
                      AGREGAR
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
            noValidate
            autoComplete="off"
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={3}>
                <TextField
                  required
                  name="codigo"
                  label="Código"
                  helperText="Escribe el código"
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  required
                  name="nombre"
                  label="Nombre"
                  helperText="Escribe el nombre"
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
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
                </TextField>
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  name="nivelUnidad"
                  select
                  label="Nivel de unidad"
                  defaultValue="1"
                  helperText="Selecciones nivel de unidad"
                  size="small"
                  fullWidth
                >
                  {tipos_unidades.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  name="unidadRaiz"
                  select
                  label="Unidad raiz"
                  defaultValue="1"
                  helperText="Seleccione unidad raiz"
                  size="small"
                  fullWidth
                >
                  {tipos_unidades.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  name="agrupacionDocumental"
                  select
                  label="Agrupacion documental"
                  defaultValue="1"
                  helperText="Seleccione agrupacion documental"
                  size="small"
                  fullWidth
                >
                  {tipos_unidades.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  name="nivelPadre"
                  select
                  label="Nivel padre"
                  defaultValue="1"
                  helperText="Seleccione nivel padre"
                  size="small"
                  fullWidth
                >
                  {tipos_unidades.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
          </Box>
          <Stack
            direction="row"
            justifyContent="flex-end"
            spacing={2}
            sx={{ mb: '20px' }}
          >
            <Button color="primary" variant="outlined" startIcon={<AddIcon />}>
              AGREGAR UNIDAD
            </Button>
          </Stack>
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
            >
              VOLVER
            </Button>
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
