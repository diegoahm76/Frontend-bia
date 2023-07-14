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

export const BusquedaPozos: React.FC = () => {
  const columns: GridColDef[] = [
    {
      field: 'nombre',
      headerName: 'NOMBRE POZO',
      sortable: true,
      width: 200,
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
    rows_register_pozos,
    is_open_pozos,
    set_is_open_pozos,
    fetch_data_pozo,
  } = useContext(DataContext);

  const handleClose = (): void => {
    set_is_open_pozos(false);
  };

  useEffect(() => {
    fetch_data_pozo();
  }, [is_open_pozos]);

  return (
    <Dialog open={is_open_pozos} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Agregar pozos al instrumento</DialogTitle>
      <Divider />
      <DialogContent>
        <Grid container spacing={2}>
          {rows_register_pozos.length > 0 && (
            <Grid item xs={12}>
              <DataGrid
                autoHeight
                rows={rows_register_pozos}
                columns={columns}
                getRowId={(row) => row.id_pozo}
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
