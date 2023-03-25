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
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import AddIcon from '@mui/icons-material/Add';
// import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';

// import LockIcon from '@mui/icons-material/Lock';
// import BlockIcon from '@mui/icons-material/Block';
// import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
// import BusinessIcon from '@mui/icons-material/Business';
// import DomainDisabledIcon from '@mui/icons-material/DomainDisabled';
// import DeleteIcon from '@mui/icons-material/Delete';
 import ArticleIcon from '@mui/icons-material/Article';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
// Componentes personalizados
import { Title } from '../../../../../../components/Title';
// // Hooks
import { useAppDispatch, useAppSelector } from '../../../../../../hooks';
// Thunks
import { get_cv_article_all_service } from '../store/thunks/cvComputoThunks';
import CrearCvComputoForm from '../components/CrearCvComputoForm';


// import CrearViveroDialogForm from '../../../../../conservacion/gestorVivero/componentes/CrearViveroDialogForm';
// import CrearViveroDialogForm from '../componentes/CrearViveroDialogForm';
// // Slices
// import { current_nursery } from '../store/slice/indexCvComputo';


// eslint-disable-next-line @typescript-eslint/naming-convention
export function CrearHojaVidaComputoScreen(): JSX.Element {
  // const navigate = useNavigate();
  const dispatch = useAppDispatch();
 // const  [action] = useState<string>("create");
  const { cv_articles } = useAppSelector((state) => state.cv);
  const [add_cv_com_is_active, set_add_cv_com_is_active] =
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
      field: 'tiene_hoja_vida',
      headerName: '¿Hoja de vida?',
      width: 100,
      renderCell: (params) => {
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        return params.row.tiene_hoja_vida ? (
          <Chip size="small" label="SI" color="success" variant="outlined" />
        ) : (
          <Chip size="small" label="NO" color="error" variant="outlined" />

        );
      },
    },
    {
      field: 'cod_tipo_activo',
      headerName: 'Tipo Activo',
      width: 200,
    },
    {
      field: 'estado',
      headerName: 'Estado',
      width: 100,

    },
    
    {
      field: 'acciones',
      headerName: 'Acciones',
      width: 300,
      renderCell: (params) => (
        <>
        <Tooltip title="Detalle">
            <IconButton
              onClick={() => {
                
                set_add_cv_com_is_active(true);              
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
    void dispatch(get_cv_article_all_service());
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
          <Title title="Activos computo - Hojas de vida"></Title>
         
          <Grid item>
            <Box sx={{ width: '100%' }}>
              <DataGrid
                density="compact"
                autoHeight
                rows={cv_articles}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                experimentalFeatures={{ newEditingApi: true }}
                getRowId={(row) => row.id_bien}
              />
            </Box>
          </Grid>
          <CrearCvComputoForm
            is_modal_active={add_cv_com_is_active}
            set_is_modal_active={set_add_cv_com_is_active} title={''}           // action = {action}       
          />
        </Grid>
      </Grid>
    </>
  );
}
