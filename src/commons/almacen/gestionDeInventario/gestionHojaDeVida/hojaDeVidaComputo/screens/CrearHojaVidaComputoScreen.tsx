/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { useEffect, useState } from 'react';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

import {
  Grid,
  Box,
  IconButton,
  Avatar,
  Chip,
  Stack,
  Button,
  Tooltip,

} from '@mui/material';




import { DataGrid, type GridColDef } from '@mui/x-data-grid';
// Componentes personalizados
import { Title } from '../../../../../../components/Title';
// // Hooks
import { useAppDispatch, useAppSelector } from '../../../../../../hooks';
// Thunks

import CrearCvComputoForm from '../components/CrearCvComputoForm';
// // Slices
import { current_computer } from '../store/slices/indexCvComputo';
// import { get_cv_computer_service, } from '../store/thunks/cvComputoThunks';



const initial_state_current_computer = {
  id_bien: 0,
  codigo_bien: null,
  nro_elemento_bien: null,
  nombre: "",
  cod_tipo_bien: null,
  cod_tipo_activo: null,
  nivel_jerarquico: null,
  nombre_cientifico: null,
  descripcion: "",
  doc_identificador_nro: null,
  cod_metodo_valoracion: null,
  cod_tipo_depreciacion: null,
  cantidad_vida_util: null,
  valor_residual: null,
  stock_minimo: null,
  stock_maximo: null,
  solicitable_vivero: false,
  tiene_hoja_vida: false,
  maneja_hoja_vida: false,
  visible_solicitudes: false,
  id_marca: null,
  id_unidad_medida: null,
  id_articulo: 0,
  id_porcentaje_iva: null,
  id_unidad_medida_vida_util: null,
  id_bien_padre: null,
  cod_tipo_elemento_vivero: 0,
  es_semilla_vivero: false,
  estado: "",
  marca: "",
  nombre_padre: "",
  porcentaje_iva: 0,
  unidad_medida: "",
  unidad_medida_vida_util: "",
}


// eslint-disable-next-line @typescript-eslint/naming-convention
export function CrearHojaVidaComputoScreen(): JSX.Element {
  // const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { computers } = useAppSelector((state) => state.cv);
  const [action, set_action] = useState<string>("create");
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
      field: 'maneja_hoja_vida',
      headerName: '¿maneja Hoja de vida?',
      width: 120,
      renderCell: (params) => {
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        return params.row.maneja_hoja_vida ? (
          <Chip size="small" label="SI" color="success" variant="outlined" />
        ) : (
          <Chip size="small" label="NO" color="error" variant="outlined" />

        );
      },
    },
    {
      field: 'cod_tipo_activo',
      headerName: 'Tipo Activo',
      width: 50,
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
          {params.row.tiene_hoja_vida ?
            <Tooltip title="Editar">
              <IconButton
                onClick={() => {
                  dispatch(current_computer(params.row));
                  set_action("create")
                  set_add_cv_com_is_active(true)
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
            </Tooltip> :
            <Tooltip title="Crear hoja de vida">
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
                  <NoteAddIcon
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
    // void dispatch(get_cv_computer_service())

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


          <Title title="Computadores"></Title>
          <Stack direction="row" spacing={2} sx={{ m: '20px 0' }}>
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={() => {
                dispatch(current_computer(initial_state_current_computer));
                set_action("create")
                set_add_cv_com_is_active(true);
              }}
            >
              Crear hoja de vida
            </Button>
          </Stack>

          <Grid item>
            <Box sx={{ width: '100%' }}>
              <DataGrid
                density="compact"
                autoHeight
                rows={computers}
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
            set_is_modal_active={set_add_cv_com_is_active}
            action={action}
          />

        </Grid>
      </Grid>
    </>
  );
}
