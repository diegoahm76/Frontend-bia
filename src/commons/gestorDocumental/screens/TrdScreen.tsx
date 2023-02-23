// Components Material UI
import { Grid, Box, TextField, MenuItem, Stack, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
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

const currencies = [
  {
    value: 'CCD1',
    label: 'CCD1',
  },
  {
    value: 'CCD2',
    label: 'CCD2',
  },
  {
    value: 'CCD3',
    label: 'CCD3',
  },
  {
    value: 'CCD4',
    label: 'CCD4',
  },
];

// eslint-disable-next-line @typescript-eslint/naming-convention
export const TrdScreen: React.FC = () => {
  return (
    <>
      <Grid container spacing={2}>
        {/* Chart */}

        <Grid item xs={12}>
          <Grid
            item
            className={`border px-4 text-white fs-5 p-1`}
            sx={{
              display: 'grid',
              background:
                'transparent linear-gradient(269deg, #1492E6 0%, #062F48 34%, #365916 100%) 0% 0% no-repeat padding-box',
              width: '100%',
              height: '40px',
              color: 'white',
              borderRadius: '10px',
              pl: '20px',
              alignContent: 'center',
            }}
          >
            Tabla de retención documental
          </Grid>
          <Grid item>
            <Box
              component="form"
              sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
              }}
              noValidate
              autoComplete="off"
            >
              <div>
                <TextField
                  error
                  required
                  id="outlined-select-currency"
                  select
                  label="CCD"
                  helperText="Seleccione CCD"
                  variant="filled"
                >
                  {currencies.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  error
                  required
                  id="outlined-error-helper-text"
                  label="Nombre del TRD"
                  helperText="Nombre del TRD"
                  variant="filled"
                />
                <TextField
                  error
                  required
                  id="filled-error"
                  label="Versión"
                  helperText="Ingrese versión"
                  variant="filled"
                />
              </div>
            </Box>
            <Box sx={{ height: 400, width: '100%' }}>
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
                disableSelectionOnClick
                experimentalFeatures={{ newEditingApi: true }}
              />
            </Box>
            <Stack
              direction="row"
              justifyContent="flex-end"
              spacing={2}
              sx={{ mt: '20px' }}
            >
              <Button variant="outlined" startIcon={<DeleteIcon />}>
                Delete
              </Button>
              <Button variant="contained" endIcon={<SendIcon />}>
                Send
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
