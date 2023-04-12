/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { useEffect, useState } from 'react'; // eslint-disable-next-line @typescript-eslint/naming-convention
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import BlockIcon from '@mui/icons-material/Block';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import { Avatar, Box, Chip, Grid, IconButton, Stack, Tooltip } from '@mui/material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { activate_deactivate_porcentaje_service, delete_porcentaje_service, get_porcentaje_service } from '../store/thunks/MarcaMedidaPorcentajeThunks';
import CrearPorcentajeModal from './modales/CrearPorcentajeModal';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { porcentaje_seleccionado } from '../store/slice/MarcaMedidaPorcentajeSlice';


const initial_state_porcentaje_seleccionado = {
 
  id_porcentaje_iva: null,
  porcentaje: 0,
  observacion: "",
  acciones: "",
  registro_precargado: false,
  activo: false,
  item_ya_usado: false,
};
  //
// eslint-disable-next-line @typescript-eslint/naming-convention
export const CrearPorcentajeForm: React.FC = () => {
  const dispatch = useAppDispatch();

  const  [action, set_action ] = useState<string>("create");
  const { porcentaje } = useAppSelector((state) => state.porcentaje); 
   const [add_porcentaje_is_active, set_add_porcentaje_is_active] =
  useState<boolean>(false);
 

const columns: GridColDef[] = [
  { field: 'id_porcentaje_iva', headerName: 'ID', width: 80 },
  { field: 'porcentaje', headerName: 'Porcentaje', width: 80,
  renderCell: (params) => (
    <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
      {params.value}
    </div>
  ),},
  { field: 'observacion', headerName: 'Observación', width: 400 },

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
            dispatch(porcentaje_seleccionado(params.row));
            set_action("edit")
            set_add_porcentaje_is_active(true)
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
            dispatch(activate_deactivate_porcentaje_service(params.row.id_porcentaje_iva, params.row));// true -> activar false -> desactivar
        
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
              dispatch(delete_porcentaje_service(params.row.id_porcentaje_iva));
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
                dispatch(porcentaje_seleccionado(initial_state_porcentaje_seleccionado));
                set_action("create")
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
            action = {action}
          /> 
        </Grid>
      </Grid>
    </>
  );
};
