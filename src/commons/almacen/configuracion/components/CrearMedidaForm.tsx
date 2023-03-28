import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { Box, Grid, Stack } from '@mui/material';

import { get_medida_service } from '../store/thunks/MarcaMedidaPorcentajeThunks';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import CrearMedidaModal from './modales/CrearMedidaModal';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const CrearMedidaForm: React.FC = () => {

  const dispatch = useAppDispatch();
  const { medida } = useAppSelector((state) => state.medida); 
 
  const [add_medida_is_active, set_add_medida_is_active] =
  useState<boolean>(false);

const columns: GridColDef[] = [
  { field: 'id_unidad_medida', headerName: 'ID', width: 100 },
  { field: 'nombre', headerName: 'Nombre', width: 200 },
  { field: 'abreviatura', headerName: 'Abreviatura', width: 200 },
   { field: 'acciones', headerName: 'Acciones', width: 200 },

];
  useEffect(() => {
    void dispatch(get_medida_service());
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
                set_add_medida_is_active(true);
              }}
            >
              CREAR MEDIDA
            </Button>
          </Stack>
          <Grid item>
            <Box sx={{ width: '100%' }}>
              <DataGrid
                density="compact"
                autoHeight
                rows={medida}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                experimentalFeatures={{ newEditingApi: true }}
                getRowId={(row) => row.id_unidad_medida}
              />
            </Box>
          </Grid>
           <CrearMedidaModal
            is_modal_active={add_medida_is_active}
            set_is_modal_active={set_add_medida_is_active}
          /> 
        </Grid>
      </Grid>
    </>
  );
};
