import type React from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Box, Stack, Button, MenuItem, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import PreviewIcon from '@mui/icons-material/Preview';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Title } from '../../../components';
import { DataGrid } from '@mui/x-data-grid';
import { type GridColDef } from '@mui/x-data-grid';
// import { useAppSelector } from '../store/hooks/hooks';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'Nivel', width: 150 },
  {
    field: 'nombre',
    headerName: 'Nombre',
    width: 300,
    editable: true,
  },
  {
    field: 'acciones',
    headerName: 'Acciones',
    editable: true,
  },
];

const rows = [
  {
    id: 1,
    nombre: 'Snow',
    acciones: 1,
  },
  {
    id: 2,
    nombre: 'Lannister',
    acciones: 2,
  },
  {
    id: 3,
    nombre: 'Lannister',
    acciones: 3,
  },
  {
    id: 4,
    nombre: 'Stark',
    acciones: 4,
  },
  {
    id: 5,
    nombre: 'Targaryen',
    acciones: 5,
  },
  {
    id: 6,
    nombre: 'Melisandre',
    acciones: 6,
  },
  {
    id: 7,
    nombre: 'Clifford',
    acciones: 7,
  },
  {
    id: 8,
    nombre: 'Frances',
    acciones: 8,
  },
  {
    id: 9,
    nombre: 'Roxie',
    acciones: 9,
  },
];

const tipos_unidades = [
  {
    value: 'USD',
    label: '$',
  },
  {
    value: 'EUR',
    label: '€',
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
export const EdicionOrganigramaScreen: React.FC = () => {
  const navigate = useNavigate();
  // const {
  //   // organigram_current,
  //   // levelsOrganigram,
  //   // unityOrganigram,
  //   // moldOrganigram
  // } = useAppSelector((state) => state.organigram);
  const handle_to_go_back = (): void => {
    navigate('/dashboard/gestor-documental/organigrama/crear-organigrama');
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
          boxShadow: '0px 3px 6px #042F4A26',
        }}
      >
        <Grid item xs={12}>
          <Title title="EDICION ORGANIGRAMA" />
          <Box
            component="form"
            sx={{ mt: '20px' }}
            noValidate
            autoComplete="off"
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <TextField
                  required
                  id="outlined-error-helper-text"
                  label="Nombre"
                  helperText="Nombre"
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  error
                  required
                  id="outlined-error-helper-text"
                  label="Versión"
                  helperText="Versión"
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  error
                  required
                  id="filled-error"
                  label="Des"
                  helperText="Ingrese Des"
                  size="small"
                  fullWidth
                />
              </Grid>
            </Grid>
          </Box>
          <Stack direction="row" justifyContent="flex-end" spacing={2}>
            <Button color="primary" variant="outlined" startIcon={<SaveIcon />}>
              EDITAR
            </Button>
          </Stack>
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
                    label="Nombre"
                    helperText="Nombre"
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
                      autoHeight
                      density="compact"
                      rows={rows}
                      columns={columns}
                      pageSize={5}
                      rowsPerPageOptions={[5]}
                      experimentalFeatures={{ newEditingApi: true }}
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
                  error
                  required
                  id="outlined-error-helper-text"
                  label="Nombre"
                  helperText="Nombre"
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  error
                  required
                  id="outlined-error-helper-text"
                  label="Versión"
                  helperText="Versión"
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  id="outlined-select-currency"
                  select
                  label="Select"
                  defaultValue="EUR"
                  helperText="Please select your currency"
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
                  id="outlined-select-currency"
                  select
                  label="Select"
                  defaultValue="EUR"
                  helperText="Please select your currency"
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
                  id="outlined-select-currency"
                  select
                  label="Select"
                  defaultValue="EUR"
                  helperText="Please select your currency"
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
                  id="outlined-select-currency"
                  select
                  label="Select"
                  defaultValue="EUR"
                  helperText="Please select your currency"
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
                  id="outlined-select-currency"
                  select
                  label="Select"
                  defaultValue="EUR"
                  helperText="Please select your currency"
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
                rows={rows}
                columns={columns}
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
            sx={{ m: '20px 0' }}
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
              color="primary"
              variant="contained"
              startIcon={<PreviewIcon />}
            >
              VISUALIZAR
            </Button>
            <Button
              color="success"
              variant="contained"
              startIcon={<SaveIcon />}
            >
              FINALIZAR ORGANIGRAMA
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};
