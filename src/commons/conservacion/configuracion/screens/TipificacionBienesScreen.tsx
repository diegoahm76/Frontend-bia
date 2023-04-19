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
} from '@mui/material';
// Icons de Material UI
// import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import ArticleIcon from '@mui/icons-material/Article';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
// Componentes personalizados
import { Title } from '../../../../components/Title';
// // Hooks
import { useAppDispatch, useAppSelector } from '../../../../hooks';
// Thunks
import { get_bienes_service } from '../store/thunks/configuracionThunks';
import EditarBienDialogForm from '../componentes/EditarBienDialogForm';
// // Slices
import { current_bien } from '../store/slice/configuracionSlice';



// eslint-disable-next-line @typescript-eslint/naming-convention
export function TipificacionBienesScreen(): JSX.Element {
  // const navigate = useNavigate();
  
  const dispatch = useAppDispatch();
  const  [action, set_action ] = useState<string>("create");
  const { bienes } = useAppSelector((state) => state.configuracion);
  const [edit_bien_is_active, set_edit_bien_is_active] =
    useState<boolean>(false);

  const columns: GridColDef[] = [
    { field: 'id_bien', headerName: 'ID', width: 20 },
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
      field: 'nombre_cientifico',
      headerName: 'Nombre cientifico',
      width: 200,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value=== null ? "Sin definir": params.value}
        </div>
      ),
     
    },
    {
      field: 'cod_tipo_elemento_vivero',
      headerName: 'Tipo elemento',
      width: 200,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value=== null ? "Sin definir": params.value}
        </div>
      ),
    },
    {
      field: 'es_semilla_vivero',
      headerName: '¿Semilla?',
      width: 100,
      renderCell: (params) => {
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        return (params.row.cod_tipo_elemento_vivero === "MV")?
         (params.row.es_semilla_vivero ? 
          (
          <Chip size="small" label="SI" color="success" variant="outlined" />
        ) 
        :
         (
          <Chip size="small" label="NO" color="error" variant="outlined" />

        ))
        :
        <Chip size="small" label="N/A" color="primary" variant="outlined" />
      },
    },
    {
      field: 'acciones',
      headerName: 'Acciones',
      width: 100,
      renderCell: (params) => (
        <>
        <Tooltip title="Detalle">
            <IconButton
              onClick={() => {
                dispatch(current_bien(params.row));
                set_action("detail")
                set_edit_bien_is_active(true)
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
          <Tooltip title="Editar">
            <IconButton
              onClick={() => {
                dispatch(current_bien(params.row));
                set_action("edit")
                set_edit_bien_is_active(true)
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
        </>
      ),
    },
  ];

  useEffect(() => {
    void dispatch(get_bienes_service());
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
          <Title title="Tipificación de bienes de vivero"></Title>
          <Grid item mt={2}>
            <Box sx={{ width: '100%' }}>
              <DataGrid
                density="compact"
                autoHeight
                rows={bienes}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                experimentalFeatures={{ newEditingApi: true }}
                getRowId={(row) => row.id_bien}
              />
            </Box>
          </Grid>
          <EditarBienDialogForm
            is_modal_active={edit_bien_is_active}
            set_is_modal_active={set_edit_bien_is_active}
            action = {action}
          />
        </Grid>
      </Grid>
    </>
  );
}

  