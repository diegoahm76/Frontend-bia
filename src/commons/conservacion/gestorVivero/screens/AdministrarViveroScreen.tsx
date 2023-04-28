/* eslint-disable @typescript-eslint/strict-boolean-expressions */
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
  Chip,
  Tooltip,
} from '@mui/material';
// Icons de Material UI
import AddIcon from '@mui/icons-material/Add';
// import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';
import BlockIcon from '@mui/icons-material/Block';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import BusinessIcon from '@mui/icons-material/Business';
import DomainDisabledIcon from '@mui/icons-material/DomainDisabled';
import ArticleIcon from '@mui/icons-material/Article';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
// Componentes personalizados
import { Title } from '../../../../components/Title';
// // Hooks
import { useAppDispatch, useAppSelector } from '../../../../hooks';
// Thunks
import { activate_deactivate_nursery_service, delete_nursery_service, get_nurseries_service } from '../store/thunks/gestorViveroThunks';
import CrearViveroDialogForm from '../componentes/CrearViveroDialogForm';
// // Slices
import { current_nursery } from '../store/slice/viveroSlice';

const initial_state_current_nursery = {
  id_vivero: null,
  nombre: '',
  cod_municipio: '',
  direccion: '',
  area_mt2: null,
  area_propagacion_mt2: null,
  tiene_area_produccion: false,
  tiene_areas_pep_sustrato: false,
  tiene_area_embolsado: false,
  cod_tipo_vivero: null,
  fecha_inicio_viverista_actual: null,
  cod_origen_recursos_vivero: null,
  fecha_creacion: null,
  en_funcionamiento: true,
  fecha_ultima_apertura: null,
  justificacion_apertura: '',
  fecha_cierre_actual: null,
  justificacion_cierre: null,
  vivero_en_cuarentena: false,
  fecha_inicio_cuarentena: null,
  justificacion_cuarentena: null,
  ruta_archivo_creacion: null,
  activo: true,
  item_ya_usado: true,
  id_viverista_actual: null,
  id_persona_crea: null,
  id_persona_abre: null,
  id_persona_cierra: null,
  id_persona_cuarentena: null,
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export function AdministrarViveroScreen(): JSX.Element {
  const dispatch = useAppDispatch();
  const  [action, set_action ] = useState<string>("create");
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
      field: 'Activo',
      headerName: '¿Disponible?',
      width: 100,
      renderCell: (params) => {
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        return params.row.activo ? (
          <Chip size="small" label="Activo" color="success" variant="outlined" />
        ) : (
          <Chip size="small" label="Inactivo" color="error" variant="outlined" />

        );
      },
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
      field: 'en_funcionamiento',
      headerName: 'Estado',
      width: 100,
      renderCell: (params) => {
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        return params.row.en_funcionamiento ? (
          <Chip size="small" label="Abierto" color="success" variant="outlined" />
        ) : (
          <Chip size="small" label="Cerrado" color="error" variant="outlined" />
        );
      },
    },
    {
      field: 'vivero_en_cuarentena',
      headerName: 'Cuarentena',
      width: 100,
      renderCell: (params) => {
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        return params.row.vivero_en_cuarentena ? (
          <Chip size="small" label="En Cuarentena" color="error" variant="outlined" />
        ) : (
          <Chip size="small" label="Sin Cuarentena" color="success" variant="outlined" />

        );
      },
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
      width: 300,
      renderCell: (params) => (
        <>
        <Tooltip title="Detalle">
            <IconButton
              onClick={() => {
                dispatch(current_nursery(params.row));
                set_action("detail")
                set_add_nursery_is_active(true)
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
                dispatch(current_nursery(params.row));
                set_action("edit")
                set_add_nursery_is_active(true)
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
          <Tooltip title={params.row.activo ? "Desactivar" : "Activar"}>
            <IconButton
              onClick={() => {
                dispatch(activate_deactivate_nursery_service(params.row.id_vivero));
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

          {params.row.activo === true && params.row.id_viverista_actual?
            <>
              <Tooltip title={params.row.en_funcionamiento ? "Cerrar" : "Abrir"}>
               
                <IconButton
                // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                  href= {`#/app/conservacion/gestor_vivero/apertura_cierre/${params.row.id_vivero}/`}
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
                    {params.row.en_funcionamiento ?
                      <LockIcon
                        sx={{ color: 'primary.main', width: '18px', height: '18px' }}
                      /> :
                      <LockOpenIcon
                        sx={{ color: 'primary.main', width: '18px', height: '18px' }}
                      />
                    }

                  </Avatar>
                </IconButton>
                
              </Tooltip>
              {((params.row.fecha_ultima_apertura !== null || params.row.fecha_ultima_apertura !== "") && params.row.en_funcionamiento === true ) ?

              <Tooltip title={params.row.vivero_en_cuarentena ? "Finalizar cuarentena" : "Iniciar cuarentena"}>
                <IconButton
                // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                  href= {`#/app/conservacion/gestor_vivero/cuarentena/${params.row.id_vivero}/`}
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
                    {params.row.vivero_en_cuarentena ?
                      <BusinessIcon
                        sx={{ color: 'primary.main', width: '18px', height: '18px' }}
                      /> :
                      <DomainDisabledIcon
                        sx={{ color: 'primary.main', width: '18px', height: '18px' }}
                      />
                    }

                  </Avatar>
                </IconButton>
              </Tooltip>
              :null}
            </>
            : null
          }
          {(params.row.fecha_ultima_apertura === null || params.row.fecha_ultima_apertura === "") ?
            <Tooltip title="Eliminar">
              <IconButton
                onClick={() => {
                  dispatch(delete_nursery_service(params.row.id_vivero));
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
            : null
          }
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
          <Title title="Viveros"></Title>
          <Stack direction="row" spacing={2} sx={{ m: '20px 0' }}>
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={() => {
                dispatch(current_nursery(initial_state_current_nursery));
                set_action("create")
                set_add_nursery_is_active(true);
              }}
            >
              Crear vivero
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
            action = {action}
          />
        </Grid>
      </Grid>
    </>
  );
}
