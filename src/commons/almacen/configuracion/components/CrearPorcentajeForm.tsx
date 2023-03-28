import { useEffect, useState } from 'react'; // eslint-disable-next-line @typescript-eslint/naming-convention
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

import { Box, Grid, Stack } from '@mui/material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { get_porcentaje_service } from '../store/thunks/MarcaMedidaPorcentajeThunks';
import CrearPorcentajeModal from './modales/CrearPorcentajeModal';
import { useAppDispatch, useAppSelector } from '../../../../hooks';



// eslint-disable-next-line @typescript-eslint/naming-convention
export const CrearPorcentajeForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const { porcentaje} = useAppSelector((state) => state.porcentaje); 
 
  const [add_porcentaje_is_active, set_add_porcentaje_is_active] =
  useState<boolean>(false);

const columns: GridColDef[] = [
  { field: 'id_porcentaje_iva', headerName: 'ID', width: 80 },
  { field: 'porcentaje', headerName: 'Porcentaje', width: 80 },
 { field: 'observacion', headerName: 'Observación', width: 300 },
  { field: 'acciones', headerName: 'Acciones', width: 100 },

];
  useEffect(() => { 
    void dispatch(get_porcentaje_service());
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
                set_add_porcentaje_is_active(true);
              }}
            >
              CREAR PORCENTAJE
            </Button>
          </Stack>
          <Grid item>
            <Box sx={{ width: '100%' }}>
              <DataGrid
                density="compact"
                autoHeight
                rows={porcentaje}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                experimentalFeatures={{ newEditingApi: true }}
                getRowId={(row) => row.id_porcentaje_iva}
              />
            </Box>
          </Grid>
           <CrearPorcentajeModal
            is_modal_active={add_porcentaje_is_active}
            set_is_modal_active={set_add_porcentaje_is_active}
          /> 
        </Grid>
      </Grid>
    </>
  );
};
