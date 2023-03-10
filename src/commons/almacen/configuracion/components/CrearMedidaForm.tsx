
import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Avatar, Divider, Grid, IconButton } from '@mui/material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';


const columns: GridColDef[] = [
  { field: 'id', headerName: 'Id Marca', width: 170 },
  { field: 'marca', headerName: 'Marca', width: 200 },
  {
    field: 'acciones',
    headerName: 'Aciones',
    width: 200,
    renderCell: (params) => (
      <>
        <IconButton>
          <Avatar
            sx={{
              width: 24,
              height: 24,
              background: '#fff',
              border: '2px solid',
            }}
            variant="rounded"
          >
            <EditIcon
              sx={{ color: 'primary.main', width: '18px', height: '18px' }}
            />
          </Avatar>
        </IconButton>
        <IconButton>
          <Avatar
            sx={{
              width: 24,
              height: 24,
              background: '#fff',
              border: '2px solid',
            }}
            variant="rounded"
          >
            <DeleteIcon
              sx={{ color: 'primary.main', width: '18px', height: '18px' }}
            />
          </Avatar>
        </IconButton>
      </>
    ),
  },
];
interface Marca {
  id: number;
  acciones: string;
  marca: null | string;
}
const rows: Marca[] = [
  { id: 1, marca: 'Snow', acciones: 'Jon' },
  { id: 2, marca: 'Lannister', acciones: 'Cersei' },
  { id: 3, marca: 'Lannister', acciones: 'Jaime' },
];
// eslint-disable-next-line @typescript-eslint/naming-convention
export const CrearMedidaForm: React.FC = () => {
  const [open, set_open] = useState(false);

  const handle_click_open = (): void => {
    set_open(true);
  };
  const handle_close = (): void => {
    set_open(false);
  };
 
  
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
          <DialogTitle>CREAR MEDIDA</DialogTitle>
          <Divider />
          <DialogContent>
            <DialogContentText>
              Ingrese la medida que desea Crear
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Medida"
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
