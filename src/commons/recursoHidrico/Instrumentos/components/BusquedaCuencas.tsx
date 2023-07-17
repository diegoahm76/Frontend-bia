/* eslint-disable @typescript-eslint/naming-convention */
import { useContext, useEffect } from 'react';
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
} from '@mui/material';
import { DataContext } from '../context/contextData';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';

export const BusquedaCuencas: React.FC = () => {
  const columns: GridColDef[] = [
    {
      field: 'nombre',
      headerName: 'NOMBRE CUENCA',
      sortable: true,
      width: 300,
    },
    {
      field: 'ACCIONES',
      headerName: 'ACCIONES',
      width: 200,
      renderCell: (params) => (
        <>
          <IconButton onClick={() => {}}>
            <Avatar
              sx={{
                width: 24,
                height: 24,
                background: '#fff',
                border: '2px solid',
              }}
              variant="rounded"
            >
              <AddIcon
                titleAccess="Agregar"
                sx={{ color: 'primary.main', width: '18px', height: '18px' }}
              />
            </Avatar>
          </IconButton>
        </>
      ),
    },
  ];

  const {
    rows_register_cuencas,
    is_open_cuenca,
    set_is_open_cuenca,
    fetch_data_cuencas,
  } = useContext(DataContext);

  const handleClose = (): void => {
    set_is_open_cuenca(false);
  };

  useEffect(() => {
    fetch_data_cuencas();
  }, [is_open_cuenca]);

  return (
    <Dialog open={is_open_cuenca} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Agregar cuencas al instrumento</DialogTitle>
      <Divider />
      <DialogContent>
        <Grid container spacing={2}>
          {rows_register_cuencas.length > 0 && (
            <Grid item xs={12}>
              <DataGrid
                autoHeight
                rows={rows_register_cuencas}
                columns={columns}
                getRowId={(row) => row.id_cuenca}
                pageSize={5}
                rowsPerPageOptions={[5]}
              />
            </Grid>
          )}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="contained" color="primary">
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
