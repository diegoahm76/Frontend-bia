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
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { api } from '../../../../api/axios';
import { control_error } from '../../../../helpers/controlError';


const columns: GridColDef[] = [
  { field: 'id_marca"', headerName: 'ID Marca', width: 200 },
  { field: 'nombre', headerName: 'Nombre', width: 200 },
  { field: 'acciones', headerName: 'Acciones', width: 200 },
];
interface Marca {
  id_marca: number;
  nombre: string;
  activo: boolean;
  item_ya_usado: boolean;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const CrearMarcaForm: React.FC = () => {
  const [open, set_open] = useState(false);
  const [nombre, set_nombre] = useState('');
  const [activo, set_activo] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [item_ya_usado, set_item_ya_usado] = useState(false);

  const handle_click_open = (): void => {
    set_open(true);
  };
  const handle_close = (): void => {
    set_open(false);
  };

  const [marc, set_data_marca] = useState(null);
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const marca = async () => {
    try {
      const url = 'almacen/marcas/get-list/';
      const response = await api.get(url);
      const marca = response.data.map((marcas: Marca) => ({
        id_marca: marcas.id_marca,
        nombre: marcas.nombre,
        activo: marcas.activo,
      }));
      set_data_marca(marca);
    } catch (e) {
      console.log(e);
      control_error(e);
    }
  };
  // interface FromDataType {
  //   nombre: string;
  //   activo: boolean;
  //   item_ya_usado: boolean;
  // }
  // const response_body: FromDataType = {
  //   nombre: '',
  //   activo: true,
  //   item_ya_usado: true,
  // };
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  // const on_submit_handler = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   response_body.nombre = nombre;
  //   response_body.activo = activo;
  //   response_body.item_ya_usado = item_ya_usado;
  //   console.log(JSON.stringify(response_body));
  //   const { data} = api.post('almacen/marcas/create/', response_body);
    
  // };

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  // const input_change_handler = (
  //   setFunction: React.Dispatch<React.SetStateAction<string>>,
  //   event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  // ) => {
  //   setFunction(event.target.value);
  //   console.log(event.target.value);
  // };

  useEffect(() => {
    void marca();
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
        <Dialog open = {false}>
          <form >
            <DialogTitle>CREAR MARCA</DialogTitle>
            <Divider />
            <DialogContent>
              <DialogContentText>
                Ingrese la marca que desea Crear
              </DialogContentText>
              {/* <TextField
                autoFocus
                onChange={(e) => {
                  input_change_handler(set_nombre, e);
                }}
                margin="dense"
                id="name"
                label="Marca"
                type="Any"
                fullWidth
                variant="standard"
              /> */}
            </DialogContent>
            <Divider />
            <DialogActions>
              <Button variant="outlined" onClick={handle_close}>
                Cerrar
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                startIcon={<SaveIcon />}
              >
                Guardar
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </Grid>
      <Grid item xs={12}>
        {marc ? (
          <DataGrid
            autoHeight
            rows={marc}
            columns={columns}
            getRowId={(row) => row.id_marca}
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
