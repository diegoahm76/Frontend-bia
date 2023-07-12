/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// Componentes de download_xlsterial UI
import { download_pdf } from '../../../../documentos-descargar/PDF_descargar';
import { download_xls } from '../../../../documentos-descargar/XLS_descargar';
import ButtonGroup from '@mui/material/ButtonGroup';
// import 'jspdf-autotable';
// import JsPDF from 'jspdf';
// import * as XLSX from 'xlsx';

import {
  Grid,
  Box,
  // Stack,
  // Button,
  IconButton,
  Avatar,
  Chip,
  Tooltip,
  Divider,
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
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
// Componentes personalizados
import { Title } from '../../../../components/Title';
// // Hooks
import { useAppDispatch, useAppSelector } from '../../../../hooks';
// Thunks
import {
  activate_deactivate_nursery_service,
  delete_nursery_service,
  get_nurseries_service,
} from '../store/thunks/gestorViveroThunks';
import CrearViveroDialogForm from '../componentes/CrearViveroDialogForm';
// // Slices
import { current_nursery, get_nurseries } from '../store/slice/viveroSlice';

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
  const dispatch: any = useAppDispatch();
  const [action, set_action] = useState<string>('create');
  const { nurseries } = useAppSelector((state) => state.nursery);
  const [add_nursery_is_active, set_add_nursery_is_active] =
    useState<boolean>(false);
  const [searchtext, setsearchtext] = useState('');
  // const [filterednurseries, setfilterednurseries] = useState<any[]>(nurseries);

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
          <Chip
            size="small"
            label="Activo"
            color="success"
            variant="outlined"
          />
        ) : (
          <Chip
            size="small"
            label="Inactivo"
            color="error"
            variant="outlined"
          />
        );
      },
    },
    {
      field: 'direccion',
      headerName: 'Dirección',
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
          <Chip
            size="small"
            label="Abierto"
            color="success"
            variant="outlined"
          />
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
          <Chip
            size="small"
            label="En Cuarentena"
            color="error"
            variant="outlined"
          />
        ) : (
          <Chip
            size="small"
            label="Sin Cuarentena"
            color="success"
            variant="outlined"
          />
        );
      },
    },
    {
      field: 'area_mt2',
      headerName: 'Área',
      width: 100,
      type: 'number',
    },
    {
      field: 'area_propagacion_mt2',
      headerName: 'Área de propagación',
      width: 100,
      type: 'number',
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
                set_action('detail');
                set_add_nursery_is_active(true);
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
                set_action('edit');
                set_add_nursery_is_active(true);
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
          <Tooltip title={params.row.activo ? 'Desactivar' : 'Activar'}>
            <IconButton
              onClick={() => {
                dispatch(
                  activate_deactivate_nursery_service(params.row.id_vivero)
                );
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
                {params.row.activo ? (
                  <BlockIcon // icon desactivar
                    sx={{
                      color: 'primary.main',
                      width: '18px',
                      height: '18px',
                    }}
                  />
                ) : (
                  <DoneOutlineIcon // icon activar
                    sx={{
                      color: 'primary.main',
                      width: '18px',
                      height: '18px',
                    }}
                  />
                )}
              </Avatar>
            </IconButton>
          </Tooltip>

          {params.row.activo === true && params.row.id_viverista_actual ? (
            <>
              {params.row.vivero_en_cuarentena !== true && (
                <Tooltip
                  title={params.row.en_funcionamiento ? 'Cerrar' : 'Abrir'}
                >
                  <IconButton
                    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                    href={`#/app/conservacion/gestor_vivero/apertura_cierre/${params.row.id_vivero}/`}
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
                      {params.row.en_funcionamiento ? (
                        <LockIcon
                          sx={{
                            color: 'primary.main',
                            width: '18px',
                            height: '18px',
                          }}
                        />
                      ) : (
                        <LockOpenIcon
                          sx={{
                            color: 'primary.main',
                            width: '18px',
                            height: '18px',
                          }}
                        />
                      )}
                    </Avatar>
                  </IconButton>
                </Tooltip>
              )}
              {(params.row.fecha_ultima_apertura !== null ||
                params.row.fecha_ultima_apertura !== '') &&
              (params.row.en_funcionamiento === true ||
                params.row.vivero_en_cuarentena === true) ? (
                <Tooltip
                  title={
                    params.row.vivero_en_cuarentena
                      ? 'Finalizar cuarentena'
                      : 'Iniciar cuarentena'
                  }
                >
                  <IconButton
                    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                    href={`#/app/conservacion/gestor_vivero/cuarentena/${params.row.id_vivero}/`}
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
                      {params.row.vivero_en_cuarentena ? (
                        <BusinessIcon
                          sx={{
                            color: 'primary.main',
                            width: '18px',
                            height: '18px',
                          }}
                        />
                      ) : (
                        <DomainDisabledIcon
                          sx={{
                            color: 'primary.main',
                            width: '18px',
                            height: '18px',
                          }}
                        />
                      )}
                    </Avatar>
                  </IconButton>
                </Tooltip>
              ) : null}
            </>
          ) : null}
          {params.row.fecha_ultima_apertura === null ||
          params.row.fecha_ultima_apertura === '' ? (
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
                    sx={{
                      color: 'primary.main',
                      width: '18px',
                      height: '18px',
                    }}
                  />
                </Avatar>
              </IconButton>
            </Tooltip>
          ) : null}
        </>
      ),
    },
  ];

  useEffect(() => {
    void dispatch(get_nurseries_service());
  }, []);

  // eslint-disable-next-line object-shorthand
  const handle_clickxls = (): void => {
    download_xls({ nurseries, columns });
  };
  // eslint-disable-next-line object-shorthand
  const handle_clickpdf = (): void => {
    download_pdf({ nurseries, columns });
  };

  const button_style = {
    color: 'white',
    backgroundColor: '#335B1E',
    // border: '3px solid black',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '10px',
  };

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
          marginTop: '20px',
        }}
        spacing={2}
      >
        <Grid item xs={12}>
          <Grid container spacing={2} sx={{ marginTop: '-30px' }}>
            <Grid item xs={12} spacing={2}>
              <Title title="Viveros"></Title>
            </Grid>
            <Grid
              item
              xs={12}
              spacing={2}
              style={{ display: 'flex', justifyContent: 'flex-end' }}
            >
              <Button
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={() => {
                  dispatch(current_nursery(initial_state_current_nursery));
                  set_action('create');
                  set_add_nursery_is_active(true);
                }}
                // style={{ width: '170px', height: '40px', marginLeft: '10px' }}
              >
                Crear vivero
              </Button>
            </Grid>
            <Divider
              style={{
                width: '98%',
                marginTop: '8px',
                marginBottom: '8px',
                marginLeft: 'auto',
              }}
            />
            <Grid container>
              <Grid item xs={6}>
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
                  style={{ marginLeft: '4px', top: '2px' }}
                  onClick={() => {
                    const filterednurseries = nurseries.filter(
                      (nursery: { nombre: string }) =>
                        nursery.nombre
                          .toLowerCase()
                          .includes(searchtext.toLowerCase())
                    );
                    dispatch(get_nurseries(filterednurseries));
                    // setfilterednurseries(filterednurseries);
                  }}
                >
                  <SearchIcon />
                </Button>
              </Grid>
              {/* <Divider /> */}
              <Grid
                item
                xs={6}
                sx={{ display: 'flex', justifyContent: 'flex-end' }}
              >
                <ButtonGroup>
                  <IconButton
                    style={{ ...button_style, backgroundColor: '#335B1E' }}
                    onClick={handle_clickxls}
                  >
                    <i className="pi pi-file-excel"></i>
                  </IconButton>
                  <IconButton
                    style={{ ...button_style, backgroundColor: 'red' }}
                    onClick={handle_clickpdf}
                  >
                    <i className="pi pi-file-pdf"></i>
                  </IconButton>
                </ButtonGroup>
              </Grid>
            </Grid>
          </Grid>

          <Divider />

          <Grid item sx={{ marginTop: '20px' }}>
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
            <CrearViveroDialogForm
              is_modal_active={add_nursery_is_active}
              set_is_modal_active={set_add_nursery_is_active}
              action={action}
            />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
