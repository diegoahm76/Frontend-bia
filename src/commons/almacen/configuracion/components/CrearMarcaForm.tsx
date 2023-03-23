import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';

import AddIcon from '@mui/icons-material/Add';

import { DataGrid, type GridColDef } from '@mui/x-data-grid';

import { Box, Grid, Stack, Chip } from '@mui/material';
import CrearMarcaModal from './modales/CrearMarcaModal';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { get_marca_service } from '../store/thunks/MarcaMedidaPorcentajeThunks';


  // eslint-disable-next-line @typescript-eslint/naming-convention
export const CrearMarcaForm: React.FC = () => {

  const dispatch = useAppDispatch();
  const { marca } = useAppSelector((state) => state.marca); 
 
  const [add_marca_is_active, set_add_marca_is_active] =
  useState<boolean>(false);
const columns: GridColDef[] = [
  { field: 'id_marca', headerName: 'ID', width: 200 },
  { field: 'nombre', headerName: 'Nombre', width: 200 },
  {field: 'activo', headerName: '¿Activo?', width: 100,
    renderCell: (params) => {
      return params.row.activo === true ? (
        <Chip size="small" label="Sí" color="success" variant="outlined" />
      ) : (
        <Chip size="small" label="No" color="error" variant="outlined" />
      );
    },
  },
  {
    field: 'item_ya_usado',
    headerName: '¿Usado?',
    width: 100,
    renderCell: (params) => {
      return params.row.item_ya_usado === true ? (
        <Chip size="small" label="Sí" color="success" variant="outlined" />
      ) : (
        <Chip size="small" label="No" color="error" variant="outlined" />
      );
    },
  },
  { field: 'acciones', headerName: 'Acciones', width: 200 },

];
  useEffect(() => {
    void dispatch(get_marca_service());
  }, []);
 

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
        
          <Stack direction="row" spacing={2} sx={{ m: '20px 0' }}>
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={() => {
                set_add_marca_is_active(true);
              }}
            >
              CREAR MARCA
            </Button>
          </Stack>
          <Grid item>
            <Box sx={{ width: '100%' }}>
              <DataGrid
                density="compact"
                autoHeight
                rows={marca}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                experimentalFeatures={{ newEditingApi: true }}
                getRowId={(row) => row.id_marca}
              />
            </Box>
          </Grid>
           <CrearMarcaModal
            is_modal_active={add_marca_is_active}
            set_is_modal_active={set_add_marca_is_active}
          /> 
        </Grid>
      </Grid>
    </>
  );
};
