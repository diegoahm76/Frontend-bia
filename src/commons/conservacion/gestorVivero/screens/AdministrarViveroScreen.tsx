import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// Componentes de Material UI
import {
  Grid,
  Box,
  Stack,
  Button,
  IconButton,
  Avatar,
  // Chip,
} from '@mui/material';
// Icons de Material UI
import AddIcon from '@mui/icons-material/Add';
// import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
// Componentes personalizados
import { Title } from '../../../../components/Title';
// // Hooks
 import { useAppDispatch, useAppSelector } from '../../../../hooks';
 // Thunks
 import { get_nurseries_service } from '../store/thunks/gestorViveroThunks';
 import CrearViveroDialogForm from '../componentes/CrearViveroDialogForm';
// // Slices
 import { current_nursery } from '../store/slice/viveroSlice';

// eslint-disable-next-line @typescript-eslint/naming-convention
export function AdministrarViveroScreen(): JSX.Element {
  // const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { nurseries } = useAppSelector((state) => state.nursery);
  const [add_nursery_is_active, set_add_nursery_is_active] =
    useState<boolean>(false);

    const columns: GridColDef[] = [
      { field: 'id_vivero', headerName: 'ID', width: 20 },
      {
        field: 'nombre',
        headerName: 'Nombre',
        width: 200,
        renderCell: (params) => (
          <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
            {params.value}
          </div>
        ),
      },
      {
        field: 'direccion',
        headerName: 'Direccion',
        width: 200,
      },
      {
        field: 'cod_municipio',
        headerName: 'Municipio',
        width: 100,
      },
      {
        field: 'area_mt2',
        headerName: 'Area',
        width: 100,
        type: 'number'
      },
      {
        field: 'area_propagacion_mt2',
        headerName: 'Area propagacion',
        width: 100,
        type: 'number'
      },
  
      {
        field: 'acciones',
        headerName: 'Acciones',
        width: 100,
        renderCell: (params) => (
          <>
            <IconButton
              onClick={() => {
                dispatch(current_nursery(params.row));
                // console.log("editar "+ params.row)
                // navigate(
                //   '/dashboard/gestor-documental/organigrama/editar-organigrama'
                // );
              }}
            >
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
          </>
        ),
      },
    ];

  useEffect(() => {
    void dispatch(get_nurseries_service());
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
          <Title title="VIVEROS"></Title>
          <Stack direction="row" spacing={2} sx={{ m: '20px 0' }}>
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={() => {
                set_add_nursery_is_active(true);
              }}
            >
              CREAR VIVERO
            </Button>
          </Stack>
          <Grid item>
            <Box sx={{ width: '100%' }}>
              <DataGrid
                density="compact"
                autoHeight
                rows={nurseries}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                experimentalFeatures={{ newEditingApi: true }}
                getRowId={(row) => row.id_vivero}
              />
            </Box>
          </Grid>
           <CrearViveroDialogForm
            is_modal_active={add_nursery_is_active}
            set_is_modal_active={set_add_nursery_is_active}
          /> 
        </Grid>
      </Grid>
    </>
  );
}
