
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { api } from '../../../../api/axios';
import { Divider, Grid } from '@mui/material';


const columns: GridColDef[] = [
  { field: 'id_unidad_medida', headerName: 'Id Unidad de Medida', width: 200 },
  { field: 'nombre', headerName: 'Nombre', width: 200 },
  { field: 'abreviatura', headerName: 'Abreviatura', width: 200 },
  { field: 'id_magnitud', headerName: 'Id Magnitud', width: 200 },

  
];
interface Medida {

  id_unidad_medida: number,
  nombre: string,
  abreviatura: string,
  id_magnitud: number,
  precargado: boolean,
  activo: boolean, 
  itemYaUsado: boolean,

}
const rows: Medida[] = [
  
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

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const medid = async () => {
    try {
      const url = 'almacen/unidades-medida/get-list/';
      const response = await api.get(url);
      console.log('medida', response);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    void medid();
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
