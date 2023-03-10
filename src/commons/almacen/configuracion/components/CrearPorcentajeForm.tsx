import { useEffect, useState } from 'react'; // eslint-disable-next-line @typescript-eslint/naming-convention
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import { Divider, Grid } from '@mui/material';
import { api } from '../../../../api/axios';
import {
  DataGrid,
  type GridValidRowModel,
  type GridColDef,
  type GridValueGetterParams,
} from '@mui/x-data-grid';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 90,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params: GridValueGetterParams<GridValidRowModel>) => {
      const data = params.row as Marca;
      return `${data.firstName ?? ''} ${data.lastName ?? ''}`;
    },
  },
];
interface Marca {
  id: number;
  lastName: string;
  firstName: null | string;
  age: null | number;
}
const rows: Marca[] = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
];

// eslint-disable-next-line @typescript-eslint/naming-convention
export const CrearPorcentajeForm: React.FC = () => {
  const [open, set_open] = useState(false);

  const handle_click_open = (): void => {
    set_open(true);
  };
  const handle_close = (): void => {
    set_open(false);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/explicit-function-return-type
  const porcentaj = async () => {
    try {
      const url = 'almacen/porcentajes/get-list/';
      const response = await api.get(url);
      console.log('porcentaje', response);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    void porcentaj();
  }, []);

  return (
    <Grid container>
      <Grid item xs={12}>
        <Button
          sx={{ mb: '20px' }}
          variant="outlined"
          onClick={handle_click_open}
          startIcon={<AddIcon />}
        >
          Crear
        </Button>
        <Dialog open={open} onClose={handle_close}>
          <DialogTitle>CREAR PORCENTAJE</DialogTitle>
          <Divider />
          <DialogContent>
            <DialogContentText>
              Ingrese el porcentaje que desea Crear
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Porcentaje"
              type="Any"
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <Divider />
          <DialogActions>
            <Button variant="outlined" onClick={handle_close}>
              Cerrar
            </Button>
            <Button
              variant="contained"
              color="primary"
              startIcon={<SaveIcon />}
              onClick={handle_close}
            >
              Guardar
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
      <Grid item xs={12}>
        <DataGrid
          autoHeight
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </Grid>
    </Grid>
  );
};
