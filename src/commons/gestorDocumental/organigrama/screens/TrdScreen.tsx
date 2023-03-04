// Components Material UI
import { Grid, Box, TextField, MenuItem, Stack, Button } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import SearchIcon from '@mui/icons-material/Search';
import { Title } from '../../../../components/Title';

import type {
  GridColDef,
  // GridValueGetterParams
} from '@mui/x-data-grid';
import { DataGrid } from '@mui/x-data-grid';
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

// const currencies = [
//   {
//     value: 'CCD1',
//     label: 'CCD1',
//   },
//   {
//     value: 'CCD2',
//     label: 'CCD2',
//   },
//   {
//     value: 'CCD3',
//     label: 'CCD3',
//   },
//   {
//     value: 'CCD4',
//     label: 'CCD4',
//   },
// ];

// eslint-disable-next-line @typescript-eslint/naming-convention
export const TrdScreen: React.FC = () => {
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
          <Title title="Tabla de retención documental" />
          <Box
            component="form"
            sx={{ mt: '20px' }}
            noValidate
            autoComplete="off"
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <TextField
                  name="tipoUnidad"
                  select
                  label="CCD"
                  defaultValue="Seleccione"
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
              <Grid item xs={12} sm={4}>
                <TextField
                  required
                  name="nombre"
                  label="Nombre"
                  helperText="Nombre del TRD"
                  size="small"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={4}>
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
            sx={{ mb: '20px' }}
          >
            <Button color="primary" variant="outlined" startIcon={<SaveIcon />}>
              EDITAR
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
            {/* <Button
              color="primary"
              variant="outlined"
              startIcon={<ArrowBackIcon />}
              // onClick={handle_to_go_back}
            >
              VOLVER
            </Button> */}
            <Button
              color="primary"
              variant="contained"
              startIcon={<SearchIcon />}
            >
              BUSCAR
            </Button>
            <Button
              color="success"
              variant="contained"
              startIcon={<SaveIcon />}
            >
              LIMPIAR
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};
