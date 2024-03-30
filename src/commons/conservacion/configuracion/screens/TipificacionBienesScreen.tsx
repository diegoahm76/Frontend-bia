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
  Button,
  TextField,
  Divider,
  Typography,
} from '@mui/material';
// Icons de Material UI
// import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import ArticleIcon from '@mui/icons-material/Article';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import SearchIcon from '@mui/icons-material/Search';
// Componentes personalizados
import { Title } from '../../../../components/Title';
// // Hooks
import { useAppDispatch, useAppSelector } from '../../../../hooks';
// Thunks
import { get_bienes_service } from '../store/thunks/configuracionThunks';
import EditarBienDialogForm from '../componentes/EditarBienDialogForm';
// // Slices
import { current_bien, reset_state } from '../store/slice/configuracionSlice';

import ButtonGroup from '@mui/material/ButtonGroup';

import { download_xls } from '../../../../documentos-descargar/XLS_descargar';

import Limpiar from '../../componentes/Limpiar';
import { download_pdf } from '../../../../documentos-descargar/PDF_descargar';


// eslint-disable-next-line @typescript-eslint/naming-convention
export function TipificacionBienesScreen(): JSX.Element {
  // const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const [action, set_action] = useState<string>('create');
  const { bienes } = useAppSelector((state) => state.configuracion);
  const [edit_bien_is_active, set_edit_bien_is_active] =
    useState<boolean>(false);
  const [searchtext, setsearchtext] = useState('');
  const [filterednurseries, setfilterednurseries] = useState<any[]>(bienes);

  const columns: GridColDef[] = [
    // { field: 'id_bien', headerName: 'ID', width: 20 },
    {
      field: 'nombre',
      headerName: 'Nombre',
      width: 200,flex: 1,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'nombre_cientifico',
      headerName: 'Nombre científico',
      width: 200,flex: 1,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value === null ? 'Sin definir' : params.value}
        </div>
      ),
    },
    {
      field: 'cod_tipo_elemento_vivero',
      headerName: 'Tipo de elemento',
      width: 200,flex: 1,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value === null ? 'Sin definir' : params.value}
        </div>
      ),
    },
    {
      field: 'es_semilla_vivero',
      headerName: '¿Semilla?',
      width: 100,flex: 1,
      renderCell: (params) => {
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        return params.row.cod_tipo_elemento_vivero === 'MV' ? (
          params.row.es_semilla_vivero ? (
            <Chip size="small" label="SI" color="success" variant="outlined" />
          ) : (
            <Chip size="small" label="NO" color="error" variant="outlined" />
          )
        ) : (
          <Chip size="small" label="N/A" color="primary" variant="outlined" />
        );
      },
    },
    {
      field: 'acciones',
      headerName: 'Acciones',
      width: 100,flex: 1,
      renderCell: (params) => (
        <>
          <Tooltip title="Detalle">
            <IconButton
              onClick={() => {
                dispatch(current_bien(params.row));
                set_action('detail');
                set_edit_bien_is_active(true);
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
                set_action('edit');
                set_edit_bien_is_active(true);
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

  useEffect(() => {
    void dispatch(get_bienes_service()).then((response: any) => {
      //  console.log('')(response);
      setfilterednurseries(response.data);
      
    });
  }, [dispatch]);



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
          marginTop:"20px",
          marginLeft:"-2px",
          boxShadow: '0px 3px 6px #042F4A26',
        }}
        spacing={2}
      >
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12} spacing={2}>
              <Title title="Tipificación de bienes de vivero"></Title>
            </Grid>
            <Grid item xs={10}>
              <TextField
                label="Buscar"
                value={searchtext}
                onChange={(e) => {
                  setsearchtext(e.target.value);
                }}
                variant="outlined"
                size="small"
                style={{ marginBottom: '10px' }}
              />
              <Button
                variant="contained"
                onClick={() => {
                  const filterednurseries = bienes.filter((bienes) =>
                    bienes.nombre
                      .toLowerCase()
                      .includes(searchtext.toLowerCase())
                  );
                  setfilterednurseries(filterednurseries);
                }}
                style={{ marginLeft: '4px', top: '2px' }}
              >
                <SearchIcon />
              </Button>
            </Grid>
            <Grid item xs={2}>
              <ButtonGroup style={{ margin: 7, display: 'flex', justifyContent: 'flex-end' }}>
              
                {download_xls({ nurseries: filterednurseries, columns })}
                {download_pdf({ nurseries: filterednurseries, columns ,title: 'Bienes de vivero', })}
              </ButtonGroup>
            </Grid>
          </Grid>

          <Divider />

          <Grid item sx={{ marginTop: '20px' }}>
            <Box sx={{ width: '100%' }}>
              {
                (filterednurseries && filterednurseries.length > 0) ? (
                  <DataGrid
                    density="compact"
                    autoHeight
                    rows={filterednurseries ?? []}
                    columns={columns ?? []}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    experimentalFeatures={{ newEditingApi: true }}
                    getRowId={(row) => row.id_bien}
                  />
                ) : (
                  <Typography variant="h6" component="h2">
                    No hay datos disponibles
                  </Typography>
                )
              }
            </Box>
          </Grid>
          <EditarBienDialogForm
            is_modal_active={edit_bien_is_active}
            set_is_modal_active={set_edit_bien_is_active}
            action={action}
          />
        </Grid>



        <Grid item xs={12} md={3}>
          <Limpiar
            dispatch={dispatch}
            reset_state={reset_state}
            set_initial_values={null}
            variant_button={'outlined'}
            button_clean_show={false}
          />
        </Grid>
      </Grid>
    </>
  );
}
