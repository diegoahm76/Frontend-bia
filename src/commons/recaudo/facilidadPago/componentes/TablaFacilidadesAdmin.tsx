/* eslint-disable @typescript-eslint/naming-convention */
import {
  Grid,
  Box,
  IconButton,
  Avatar,
  Tooltip,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Stack,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
} from '@mui/material';
import {
  SearchOutlined,
  FilterAltOffOutlined,
  Close,
  ManageAccounts,
  Help,
  Save,
  Article,
  Info,
} from '@mui/icons-material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  type event,
  type FacilidadPago,
  type Funcionario,
} from '../interfaces/interfaces';
import { useSelector, useDispatch } from 'react-redux';
import { type ThunkDispatch } from '@reduxjs/toolkit';
import { get_facilidad_solicitud } from '../slices/SolicitudSlice';
import { get_validacion_plan_pagos } from '../slices/PlanPagosSlice';
import { get_validacion_resolucion } from '../slices/ResolucionSlice';
import {
  get_filtro_fac_pago_ingresadas,
  get_facilidades_ingresadas,
} from '../slices/FacilidadesSlice';
import {
  put_asignacion_funcionario,
  get_funcionarios,
} from '../requests/requests';
import { faker } from '@faker-js/faker';
import dayjs from 'dayjs';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { PlanPago } from './PlanPago';
import { Documento } from './Documento';
import DescriptionIcon from '@mui/icons-material/Description';

interface RootStateFacilidades {
  facilidades: {
    facilidades: FacilidadPago[];
  };
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const TablaFacilidadesAdmin: React.FC = () => {
  const [visible_rows, set_visible_rows] = useState(Array<FacilidadPago>);
  const [filter, set_filter] = useState('');
  const [search, set_search] = useState('');
  const [modal, set_modal] = useState(false);
  const [sub_modal, set_sub_modal] = useState(false);
  const [modal_option, set_modal_option] = useState('no');
  const [modal_asignacion, set_modal_asignacion] = useState(false);
  const [asignacion, set_asignacion] = useState(true);
  const [funcionarios_options, set_funcionarios_options] = useState<
    Funcionario[]
  >([]);
  const [funcionario_selected, set_funcionario_selected] = useState(0);
  const [facilidad_selected, set_facilidad_selected] = useState(0);
  const { facilidades } = useSelector(
    (state: RootStateFacilidades) => state.facilidades
  );
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const navigate = useNavigate();
  const [idFacilidadSeleccionada, setIdFacilidadSeleccionada] = useState('');
  const [idFacilidades, setIdFacilidades] = useState('');
  const [personaid, setpersonaid] = useState('');

  const [is_modal_active, set_is_buscar] = useState<boolean>(false);
  const handle_open_buscar = (): void => {
    set_is_buscar(true);
  };

  const [is_modal_active_doc, set_doc] = useState<boolean>(false);

  const handle_open_documento = (): void => {
    set_doc(true);
  };
  const handle_open = (): void => {
    set_modal(true);
  };
  const handle_close = (): void => {
    set_modal(false);
  };

  const handle_open_sub = (): void => {
    set_sub_modal(true);
  };
  const handle_close_sub = (): void => {
    set_sub_modal(false);
  };

  const get_lista_funcionarios = async (): Promise<void> => {
    try {
      const {
        data: { data: res_funcionarios },
      } = await get_funcionarios();
      set_funcionarios_options(res_funcionarios ?? []);
    } catch (error: any) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    void get_lista_funcionarios();
  }, []);

  const columns: GridColDef[] = [
    {
      field: 'nombre_de_usuario',
      headerName: 'Nombre Usuario',
      flex: 1,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'identificacion',
      headerName: 'Identificación',
      flex: 1,

      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'numero_radicacion',
      headerName: 'Número Radicación F.P.',
      flex: 1,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'fecha_generacion',
      headerName: 'Fecha Radicación',
      flex: 1,
      renderCell: (params) => (
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          {dayjs(params.value.slice(0, 10)).format('DD/MM/YYYY')}
        </div>
      ),
    },
    {
      field: 'acciones',
      headerName: 'Acción',
      flex: 1,
      renderCell: (params) => {
        return (
          <>
            <Tooltip title="Ver">
              <IconButton
                onClick={() => {
                  try {
                    void dispatch(
                      get_facilidad_solicitud(params.row.id_facilidad)
                    );
                    void dispatch(
                      get_validacion_plan_pagos(params.row.id_facilidad)
                    );
                    void dispatch(
                      get_validacion_resolucion(params.row.id_facilidad)
                    );
                    navigate('../solicitud');
                  } catch (error: any) {
                    // throw new Error(error)
                  }
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
                  <Article
                    sx={{
                      color: 'primary.main',
                      width: '18px',
                      height: '18px',
                    }}
                  />
                </Avatar>
              </IconButton>
            </Tooltip>

            {params.row.tiene_plan_pago && (
              <IconButton
                onClick={() => {
                  setIdFacilidadSeleccionada(params.row.id_facilidad);
                  handle_open_buscar();
                }}
              >
                <VisibilityIcon />
              </IconButton>
            )}
            {/* {params.row.tiene_plan_pago && (
              <IconButton
                onClick={() => {
                  handle_open_documento();
                  setIdFacilidadSeleccionada(params.row.id_facilidad);
                  setIdFacilidades(params.row);
                }}
              >
                <DescriptionIcon />
              </IconButton>
            )} */}
          </>
        );
      },
    },
    {
      field: 'nombre_funcionario',
      headerName: 'Asignación',
      flex: 1,
      renderCell: (params) => {
        return modal_asignacion ? (
          <FormControl fullWidth sx={{ minWidth: 110 }}>
            <InputLabel>Seleccionar</InputLabel>
            <Select
              size="small"
              label="Seleccionar"
              defaultValue={params.value}
              onChange={(event: event) => {
                const { value } = event.target;
                for (let i = 0; i < funcionarios_options.length; i++) {
                  if (funcionarios_options[i].nombre_funcionario === value) {
                    set_funcionario_selected(
                      funcionarios_options[i].id_persona
                    );
                    set_facilidad_selected(params.row.id_facilidad);
                    handle_open();
                  }
                }
              }}
            >
              {funcionarios_options.map((funcionario) => (
                <MenuItem
                  key={funcionario.id_persona}
                  value={funcionario.nombre_funcionario}
                >
                  {funcionario.nombre_funcionario}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        ) : (
          <>
            <Tooltip
              title={(params.row.asignar as boolean) ? 'Asignar' : 'Reasignar'}
            >
              <IconButton
                onClick={() => {
                  set_modal_asignacion(true);
                  set_asignacion(params.row.asignar);
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
                  <ManageAccounts
                    sx={{
                      color: 'primary.main',
                      width: '18px',
                      height: '18px',
                    }}
                  />
                </Avatar>
              </IconButton>
            </Tooltip>
            <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
              {params.value}
            </div>
          </>
        );
      },
    },
  ];

  useEffect(() => {
    set_visible_rows(facilidades);
  }, [facilidades]);
  const [searchId, setSearchId] = useState('');

  const handleSearch = () => {
    let filteredData = [...facilidades];
    if (search) {
      filteredData = filteredData.filter((facilidad) =>
        facilidad.nombre_de_usuario.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (searchId) {
      filteredData = filteredData.filter((facilidad) =>
        facilidad.identificacion.toLowerCase().includes(searchId.toLowerCase())
      );
    }
    set_visible_rows(filteredData);
  };

  return (
    <>
      <Documento
        // idFacilidadSeleccionada={idFacilidadSeleccionada}
        is_modal_active_doc={is_modal_active_doc}
        set_doc={set_doc}
        // idFacilidades={idFacilidades}
      />
      <Box sx={{ width: '100%' }}>
        <Stack
          direction="row"
          justifyContent="left"
          spacing={2}
          sx={{ mb: '20px' }}
        >
          <PlanPago
            idFacilidadSeleccionada={idFacilidadSeleccionada}
            is_modal_active={is_modal_active}
            set_is_modal_active={set_is_buscar}
          />

          <Grid item xs={12} sm={3}>
            <TextField
              value={search}
              onChange={(e) => set_search(e.target.value)}
              label="Buscar por nombre de usuario"
              variant="outlined"
              fullWidth
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              label="Buscar por identificación"
              variant="outlined"
              fullWidth
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              startIcon={<SearchOutlined />}
              onClick={handleSearch}
            >
              Buscar
            </Button>
          </Grid>

          {/* <Button variant="contained" color="secondary" onClick={() => { set_filter(''), set_search('') }}>
        Limpiar búsqueda
      </Button> */}
          {/* <FormControl sx={{ minWidth: 130 }}>
          <InputLabel>Filtrar por: </InputLabel>
            <Select
              label="Filtrar por: "
              defaultValue={''}
              onChange={(event: event)=>{
                const { value } = event.target
                set_filter(value)
              }}
            >
              <MenuItem value='nombre_de_usuario'>Nombre Usuario</MenuItem>
              <MenuItem value='identificacion'>Identificación</MenuItem>
            </Select>
        </FormControl> */}
          {/* <TextField
          required
          label="Búsqueda"
          size="medium"
          onChange={(event: event)=>{
            const { value } = event.target
            set_search(value)
          }}
        /> */}
          {/* <Button
          color='primary'
          variant='contained'
          startIcon={<SearchOutlined />}
          onClick={() => {
            try {
              void dispatch(get_filtro_fac_pago_ingresadas({parametro: filter, valor: search}));
            } catch (error: any) {
              throw new Error(error);
            }
          }}
        >
          Buscar
        </Button> */}
          <Grid item xs={12} sm={2}>
            <Button
              color="primary"
              fullWidth
              variant="outlined"
              startIcon={<FilterAltOffOutlined />}
              onClick={() => {
                try {
                  void dispatch(get_facilidades_ingresadas());
                } catch (error: any) {
                  throw new Error(error);
                }
              }}
            >
              Mostrar Todo
            </Button>
          </Grid>
        </Stack>
        {visible_rows.length !== 0 ? (
          <Grid container>
            <Grid item xs={12}>
              <Grid item>
                <Box sx={{ width: '100%' }}>
                  <DataGrid
                    autoHeight
                    disableSelectionOnClick
                    rows={visible_rows}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    experimentalFeatures={{ newEditingApi: true }}
                    getRowId={(row) => faker.database.mongodbObjectId()}
                  />
                </Box>
              </Grid>
            </Grid>
          </Grid>
        ) : null}
        <Dialog open={modal} onClose={handle_close}>
          <DialogContent>
            <DialogContentText>
              <Grid container>
                <Grid item textAlign="center" xs={12}>
                  <Help style={{ color: '#009BFF', fontSize: '60px' }} />
                </Grid>
                <Grid item textAlign="center" xs={12}>
                  <strong>
                    {asignacion
                      ? '¿Está seguro de realizar la asignación de usuario?'
                      : '¿Está seguro de realizar la reasignación de usuario?'}
                  </strong>
                </Grid>
              </Grid>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              variant="outlined"
              color="primary"
              autoFocus
              startIcon={<Close />}
              onClick={() => {
                try {
                  handle_open_sub();
                  set_modal_option('no');
                  handle_close();
                } catch (error: any) {
                  throw new Error(error);
                }
              }}
            >
              Cancelar
            </Button>
            <Button
              variant="contained"
              color="primary"
              startIcon={<Save />}
              onClick={() => {
                try {
                  void put_asignacion_funcionario(facilidad_selected, {
                    id_funcionario: funcionario_selected,
                  });
                  handle_open_sub();
                  set_modal_option('si');
                  handle_close();
                } catch (error: any) {
                  throw new Error(error);
                }
              }}
            >
              Aceptar
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog open={sub_modal} onClose={handle_close_sub}>
          <DialogContent>
            <DialogContentText>
              <Grid container>
                <Grid item textAlign="center" xs={12}>
                  <Info style={{ color: '#009BFF', fontSize: '60px' }} />
                </Grid>
                <Grid item textAlign="center" xs={12}>
                  <strong>
                    {modal_option === 'si' && asignacion ? (
                      <DialogTitle>Asignación ejecutada con éxito</DialogTitle>
                    ) : modal_option === 'no' && asignacion ? (
                      <DialogTitle>Asignación cancelada</DialogTitle>
                    ) : modal_option === 'si' && !asignacion ? (
                      <DialogTitle>
                        Reasignación ejecutada con éxito
                      </DialogTitle>
                    ) : modal_option === 'no' && !asignacion ? (
                      <DialogTitle>Reasignación cancelada</DialogTitle>
                    ) : null}
                  </strong>
                </Grid>
              </Grid>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              variant="outlined"
              color="primary"
              autoFocus
              startIcon={<Close />}
              onClick={() => {
                try {
                  void dispatch(get_facilidades_ingresadas());
                  set_modal_asignacion(false);
                  handle_close_sub();
                } catch (error: any) {
                  throw new Error(error);
                }
              }}
            >
              Cerrar
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
};
