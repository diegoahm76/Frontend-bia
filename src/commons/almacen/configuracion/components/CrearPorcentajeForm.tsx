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
import { Divider, Grid, Typography } from '@mui/material';
import { api } from '../../../../api/axios';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { control_error } from '../../../../helpers/controlError';

const columns: GridColDef[] = [
  {
    field: 'id_porcentaje_iva',
    headerName: 'ID Porcentaje de Iva',
    width: 200,
  },
  { field: 'porcentaje', headerName: 'Porcentaje', width: 200 },
  { field: 'observacion', headerName: 'Observación', width: 200 },
  { field: 'acciones', headerName: 'Acciones', width: 200 },
];
interface Porcentaje {
  id_porcentaje_iva: number;
  porcentaje: number;
  observacion: string;
  acciones: string;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const CrearPorcentajeForm: React.FC = () => {
  const [open, set_open] = useState(false);

  const handle_click_open = (): void => {
    set_open(true);
  };
  const handle_close = (): void => {
    set_open(false);
  };
  const [porcentaj, set_data_porcentaj] = useState([]);
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const porcentaje = async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/explicit-function-return-type
    try {
      const url = 'almacen/porcentajes/get-list/';
      const response = await api.get(url);
      const porcentaje = response.data.map((porcentajes: Porcentaje) => ({
        id_porcentaje_iva: porcentajes.id_porcentaje_iva,
        porcentaje: porcentajes.porcentaje,
        observacion: porcentajes.observacion,
        acciones: porcentajes.acciones,
      }));
      set_data_porcentaj(porcentaje);
    } catch (e) {
      console.log(e);
      control_error(e);
    }
  };

  useEffect(() => {
    void porcentaje();
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
            >
              Guardar
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
      <Grid item xs={12}>
        {porcentaj.length > 0 ? (
          <DataGrid
            autoHeight
            rows={porcentaj}
            columns={columns}
            getRowId={(row) => row.id_porcentaje_iva}
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
