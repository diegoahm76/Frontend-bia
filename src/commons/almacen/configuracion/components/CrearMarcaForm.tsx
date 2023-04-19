/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import BlockIcon from '@mui/icons-material/Block';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { Box, Grid, Stack, Chip, Tooltip, IconButton, Avatar } from '@mui/material';
import CrearMarcaModal from './modales/CrearMarcaModal';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { activate_deactivate_marca_service, delete_marca_service, get_marca_service } from '../store/thunks/MarcaMedidaPorcentajeThunks';
import { marca_seleccionada } from '../store/slice/MarcaMedidaPorcentajeSlice';



const initial_state_marca_seleccionada = {
 
  id_marca: null,
  nombre: "",
  activo: false,
  item_ya_usado: false,
};
  // eslint-disable-next-line @typescript-eslint/naming-convention
export const CrearMarcaForm: React.FC = () => {

  const dispatch = useAppDispatch();
  const  [action, set_action ] = useState<string>("create");
  const { marca } = useAppSelector((state) => state.marca); 
   const [add_marca_is_active, set_add_marca_is_active] =
  useState<boolean>(false);

const columns: GridColDef[] = [
  { field: 'id_marca', headerName: 'ID', width: 200 },
  { field: 'nombre', headerName: 'Nombre', width: 200, 
  renderCell: (params) => (
    <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
      {params.value}
    </div>
  ), },

  {field: 'activo', headerName: '¿Activo?', width: 100,
    renderCell: (params) => {
      return params.row.activo === true ? (
      <Chip size="small" label="Activo" color="success" variant="outlined" />
      ) : (
        <Chip size="small" label="Inactivo" color="error" variant="outlined" />
      );
    },
  },
  {field: 'item_ya_usado', headerName: '¿Usado?',  width: 100,
    renderCell: (params) => {
      return params.row.item_ya_usado === true ? (
        <Chip size="small" label="Sí" color="success" variant="outlined" />
      ) : (
        <Chip size="small" label="No" color="error" variant="outlined" />
      );
    },
  },
  { field: 'acciones', headerName: 'Acciones', width: 300,
  renderCell: (params) => (
    <>
    {params.row.item_ya_usado?null:
      <Tooltip title="Editar">
        <IconButton
          onClick={() => {
            dispatch(marca_seleccionada(params.row));
            set_action("edit")
            set_add_marca_is_active(true)
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
      <Tooltip title={params.row.activo ? "Desactivar" : "Activar"}>
        <IconButton
          onClick={() => {
            dispatch(activate_deactivate_marca_service(params.row.id_marca, params.row));// true -> activar false -> desactivar
        
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
            {params.row.activo ?
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
              dispatch(delete_marca_service(params.row.id_marca));
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
                dispatch(marca_seleccionada(initial_state_marca_seleccionada));
                set_action("create")
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
            action = {action}
          /> 
        </Grid>
      </Grid>
    </>
  );
};
