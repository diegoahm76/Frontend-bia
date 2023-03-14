
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
import { Divider, Grid, Typography } from '@mui/material';
import { control_error } from '../../../../helpers/controlError';


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
  

}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const CrearMedidaForm: React.FC = () => {
  const [open, set_open] = useState(false);

  const handle_click_open = (): void => {
    set_open(true);
  };
  const handle_close = (): void => {
    set_open(false);
  };
  const [medi, set_data_medi] = useState(null);

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const medida = async () => {
    try {
      const url = 'almacen/unidades-medida/get-list/';
      const response = await api.get(url);
      const medida = response.data.map((medidas:Medida )=> ({
        id_unidad_medida: medidas.id_unidad_medida,
        nombre: medidas.id_unidad_medida,
        abreviatura:medidas.abreviatura,
        id_magnitud: medidas.id_magnitud,

      }));
      set_data_medi(medida);
    } 
      catch (e) {
        console.log(e);
        control_error(e);
    }
  };
  useEffect(() => {
    void medida();
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
      
      {medi ? (
          <DataGrid
            autoHeight
            rows={medi}
            columns={columns}
            getRowId={(row) => row.id_unidad_medida}
            pageSize={5}
            rowsPerPageOptions={[5]}
          />
        ) : (
          <Typography>Cargando...</Typography>
        )}

      </Grid>
    </Grid>
  );
};
