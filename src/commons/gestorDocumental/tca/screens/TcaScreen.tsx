// Components Material UI
import {
  Grid,
  Box,
  TextField,
  MenuItem,
  Stack,
  ButtonGroup,
  Button,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import SearchIcon from '@mui/icons-material/Search';
import CleanIcon from '@mui/icons-material/CleaningServices';
import { Title } from '../../../../components/Title';

import type {
  GridColDef,
  // GridValueGetterParams
} from '@mui/x-data-grid';
import { DataGrid } from '@mui/x-data-grid';
import { useState } from 'react';
import CrearSeriesCcdDialog from '../../ccd/componentes/CrearSeriesCcdDialog';
// Graficas

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'firstName',
    headerName: 'First name',
    width: 150,
    editable: true,
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 150,
    editable: true,
  },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    // valueGetter: (params: GridValueGetterParams) =>
    //   `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

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
export const TcaScreen: React.FC = () => {
  const [create_is_active, set_create_is_active] = useState<boolean>(false);

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
          <Title title="Tabla de control de acceso" />
          <Box
            component="form"
            sx={{ mt: '20px' }}
            noValidate
            autoComplete="off"
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={3}>
                <TextField
                  name="tipoUnidad"
                  select
                  label="Organigrama"
                  defaultValue="Seleccione"
                  helperText="Seleccione organigrama"
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
                  name="tipoUnidad"
                  select
                  label="Unidades"
                  defaultValue="Seleccione"
                  helperText="Seleccione unidades"
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
                  required
                  name="nombre"
                  label="Nombre del CCD"
                  helperText="Nombre del CCD"
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextField
                  required
                  name="version"
                  label="Versión"
                  helperText="Ingrese versión"
                  size="small"
                  fullWidth
                />
              </Grid>
            </Grid>
          </Box>
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
              // onClick={handle_to_go_back}
            >
              BUSCAR
            </Button>
            <Button
              color="primary"
              variant="contained"
              startIcon={<SaveIcon />}
            >
              ACTUALIZAR
            </Button>
            <Button
              color="success"
              variant="contained"
              startIcon={<CleanIcon />}
            >
              LIMPIAR
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
            noValidate
            autoComplete="off"
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={2}>
                <TextField
                  name="tipoUnidad"
                  select
                  label="Series"
                  defaultValue="Seleccione"
                  helperText="Seleccione series"
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
              <Grid item xs={12} sm={4}>
                <ButtonGroup
                  variant="contained"
                  aria-label=" primary button group"
                >
                  <Button
                    onClick={() => {
                      set_create_is_active(true);
                      // set_title('Crear series');
                    }}
                  >
                    CREAR
                  </Button>
                  <Button>CLONAR</Button>
                  <Button>PREVISUALIZAR</Button>
                </ButtonGroup>
              </Grid>
              <Grid item xs={12} sm={2}>
                <TextField
                  name="tipoUnidad"
                  select
                  label="Subseries"
                  defaultValue="Seleccione"
                  helperText="Seleccione subserie"
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
              <Grid item xs={12} sm={4}>
                <ButtonGroup
                  variant="contained"
                  aria-label=" primary button group"
                >
                  <Button>CREAR</Button>
                  <Button>CLONAR</Button>
                  <Button>PREVISUALIZAR</Button>
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
                <TextField
                  name="tipoUnidad"
                  select
                  label="Unidades"
                  defaultValue="Seleccione"
                  helperText="Seleccione Unidad"
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
                  name="tipoUnidad"
                  select
                  label="Series"
                  defaultValue="Seleccione"
                  helperText="Seleccione Serie"
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
                  name="tipoUnidad"
                  select
                  label="Subseries"
                  defaultValue="Seleccione subseries"
                  helperText="Seleccione CCD"
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
                <Button
                  fullWidth
                  color="primary"
                  variant="contained"
                  startIcon={<SaveIcon />}
                >
                  GUARDAR SELECCIÓN
                </Button>
              </Grid>
            </Grid>
          </Box>
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
            sx={{ mt: '20px' }}
          >
            <Button
              color="success"
              variant="contained"
              startIcon={<SaveIcon />}
            >
              REANUDAR
            </Button>
          </Stack>
        </Grid>
      </Grid>
      <CrearSeriesCcdDialog
        is_modal_active={create_is_active}
        set_is_modal_active={set_create_is_active}
        title="title"
      />
    </>
  );
};
