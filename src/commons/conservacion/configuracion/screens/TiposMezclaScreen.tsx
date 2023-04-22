/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// Componentes de Material UI
import {
  Grid,
  Box,
  IconButton,
  Avatar,
  Chip,
  Tooltip,
  Stack,
  Button,

} from '@mui/material';
// Icons de Material UI
// import VisibilityIcon from '@mui/icons-material/Visibility';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import BlockIcon from '@mui/icons-material/Block';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import ArticleIcon from '@mui/icons-material/Article';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
// Componentes personalizados
import { Title } from '../../../../components/Title';
// // Hooks
import { useAppDispatch, useAppSelector } from '../../../../hooks';
// Thunks
import { get_mixtures_service, delete_mixture_service, activate_deactivate_mixture_service } from '../store/thunks/configuracionThunks';
import AddMixtureDialogForm from '../componentes/AddMixtureDialogForm';
// // Slices
import { current_mixture } from '../store/slice/configuracionSlice';

const initial_state_current_mixture ={
  id_mezcla: null,
  unidad_medida: "",
  nombre: "",
  item_activo: true,
  item_ya_usado: false,
  id_unidad_medida: null
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export function TiposMezclaScreen(): JSX.Element {
  // const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const  [action, set_action ] = useState<string>("create");
  const { mixtures } = useAppSelector((state) => state.configuracion);
  const [add_mixture_is_active, set_add_mixture_is_active] =
    useState<boolean>(false);

  const columns: GridColDef[] = [
    { field: 'id_mezcla', headerName: 'ID', width: 20 },
    { field: 'id_unidad_medida', headerName: 'ID', width: 20 },
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
      field: 'unidad_medida',
      headerName: 'Unidad medida',
      width: 200,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value=== null ? "Sin definir": params.value}
        </div>
      ),
     
    },
    
    {
      field: 'item_activo',
      headerName: '¿Activo?',
      width: 100,
      renderCell: (params) => {
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        return (params.row.item_activo)?
      
          (
          <Chip size="small" label="ACTIVO" color="success" variant="outlined" />
        ) 
        :
         (
          <Chip size="small" label="INACTIVO" color="error" variant="outlined" />

        )
        
      },
    },
    {
      field: 'acciones',
      headerName: 'Acciones',
      width: 200,
      renderCell: (params) => (
        <>
        <Tooltip title="Detalle">
            <IconButton
              onClick={() => {
                dispatch(current_mixture(params.row));
                set_action("detail")
                set_add_mixture_is_active(true)
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
                <ArticleIcon
                  sx={{ color: 'primary.main', width: '18px', height: '18px' }}
                />

              </Avatar>
            </IconButton>
          </Tooltip>
          {params.row.item_ya_usado?null:
          <Tooltip title="Editar">
            <IconButton
              onClick={() => {
                dispatch(current_mixture(params.row));
                set_action("edit")
                set_add_mixture_is_active(true)
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
          </Tooltip>
          }
          <Tooltip title={params.row.item_activo ? "Desactivar" : "Activar"}>
            <IconButton
              onClick={() => {
                dispatch(activate_deactivate_mixture_service(params.row, params.row.id_mezcla));
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
                {params.row.item_activo ?
                  <BlockIcon // icon desactivar
                    sx={{ color: 'primary.main', width: '18px', height: '18px' }}
                  /> :
                  <DoneOutlineIcon // icon activar
                    sx={{ color: 'primary.main', width: '18px', height: '18px' }}
                  />
                }

              </Avatar>
            </IconButton>
          </Tooltip>
          {params.row.item_ya_usado?null:
          <Tooltip title="Eliminar">
              <IconButton
                onClick={() => {
                  dispatch(delete_mixture_service(params.row.id_mezcla));
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
                  <DeleteIcon
                    sx={{ color: 'primary.main', width: '18px', height: '18px' }}
                  />

                </Avatar>
              </IconButton>
            </Tooltip>
            }
        </>
      ),
    },
  ];

  useEffect(() => {
    void dispatch(get_mixtures_service());
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
        
          <Title title="Tipos de mezcla"></Title>
          <Stack direction="row" spacing={2} sx={{ m: '20px 0' }}>
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={() => {
                dispatch(current_mixture(initial_state_current_mixture));
                set_action("create")
                set_add_mixture_is_active(true);
              }}
            >
              Crear mezcla
            </Button>
          </Stack>
          <Grid item mt={2}>
            <Box sx={{ width: '100%' }}>
              <DataGrid
                density="compact"
                autoHeight
                rows={mixtures}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                experimentalFeatures={{ newEditingApi: true }}
                getRowId={(row) => row.id_mezcla}
              />
            </Box>
          </Grid>
          <AddMixtureDialogForm
            is_modal_active={add_mixture_is_active}
            set_is_modal_active={set_add_mixture_is_active}
            action = {action}
          />
        </Grid> 
      </Grid>
    </>
  );
}

  