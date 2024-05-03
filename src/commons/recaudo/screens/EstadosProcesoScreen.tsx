/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import {
  Avatar,
  Box,
  Button,
  Grid,
  IconButton,
  Stack,
  Tab,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { SearchOutlined } from '@mui/icons-material';
import CleanIcon from '@mui/icons-material/CleaningServices';
import { Title } from '../../../components/Title';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { useState, type SyntheticEvent, useEffect } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { CrearAtributoModal } from '../components/estadosProceso/CrearAtributoModal';
import type {
  AtributoEtapa,
  CategoriaAtributo,
  EtapaProceso,
  FormDataAtributo,
  FormDataCategoria,
} from '../interfaces/proceso';
import { DataGrid, GridToolbar, type GridColDef } from '@mui/x-data-grid';
import { api } from '../../../api/axios';
import { CrearEtapaModal } from '../components/estadosProceso/CrearEtapaModal';
import { NotificationModal } from '../components/NotificationModal';
import { CrearCategoriaModal } from '../components/estadosProceso/CrearCategoriaModal';
import { CollapsibleButton } from '../components/CollapsibleButton';
import { toast } from 'react-toastify';
import { RenderDataGrid } from '../../gestorDocumental/tca/Atom/RenderDataGrid/RenderDataGrid';
// import type { GridRenderCellParams } from "@mui/x-data-grid";

// eslint-disable-next-line @typescript-eslint/naming-convention
export const EstadosProcesoScreen: React.FC = () => {
  const [rows_etapas, set_rows_etapas] = useState<EtapaProceso[]>([]);
  const [rows_atributos_etapa, set_rows_atributos_etapa] = useState<
    AtributoEtapa[][]
  >([]);
  const [rows_categorias_atributos, set_rows_categorias_atributos] = useState<
    CategoriaAtributo[]
  >([]);
  const [open_atributo_modal, set_open_atributo_modal] =
    useState<boolean>(false);
  const [open_etapa_modal, set_open_etapa_modal] = useState<boolean>(false);
  const [open_categoria_modal, set_open_categoria_modal] =
    useState<boolean>(false);
  const [position_tab, set_position_tab_organigrama] = useState('1');
  const [id_etapa, set_id_etapa] = useState<number | null>(null);
  const [descripcion_etapa, set_descripcion_etapa] = useState('');
  const [notification_info, set_notification_info] = useState({
    type: '',
    message: '',
  });
  const [open_notification_modal, set_open_notification_modal] =
    useState<boolean>(false);
  const [form_data_categoria, set_form_data_categoria] =
    useState<FormDataCategoria>({
      categoria: '',
      orden: '',
    });
  const [form_data_atributo, set_form_data_atributo] =
    useState<FormDataAtributo>({
      descripcion: '',
      obligatorio: false,
      id_tipo: '',
      id_categoria: '',
    });
  const [id_update_categoria, set_id_update_categoria] = useState('');
  const [id_update_atributo, set_id_update_atributo] = useState('');
  const [actualizar_categoria, set_actualizar_categoria] =
    useState<boolean>(false);
  const [actualizar_atributo, set_actualizar_atributo] =
    useState<boolean>(false);

  const columns_etapas: GridColDef[] = [
    {
      field: 'id',
      headerName: 'Numero de etapa',
      minWidth: 90,
      flex: 1,
    },
    {
      field: 'etapa',
      headerName: 'Etapa de Proceso',
      minWidth: 200,
      flex: 1,
    },
    {
      field: 'descripcion',
      headerName: 'Descripción',
      minWidth: 300,
      flex: 1,
    },
    {
      field: 'acciones',
      headerName: 'Acciones',
      minWidth: 100,
      flex: 1,
      renderCell: (params) => {
        return (
          <>
            <Tooltip title="Editar">
              <IconButton
                onClick={() => {
                  set_id_etapa(params.row.id);
                  set_descripcion_etapa(params.row.etapa);
                  set_position_tab_organigrama('2');
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
                    sx={{
                      color: 'primary.main',
                      width: '18px',
                      height: '18px',
                    }}
                  />
                </Avatar>
              </IconButton>
            </Tooltip>
            <Tooltip title="Eliminar">
              <IconButton
                onClick={() => {
                  delete_etapa_proceso(params.row.id, params.row.etapa);
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
          </>
        );
      },
    },
  ];

  const columns_atributos_etapa: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID atributo',
      minWidth: 90,
      flex: 1,
    },
    {
      field: 'descripcion',
      headerName: 'Descripción',
      minWidth: 200,
      flex: 1,
    },
    {
      field: 'id_tipo',
      headerName: 'Tipo de Atributo',
      minWidth: 110,
      flex: 1,
      valueGetter: (params) => {
        if (!params.value) {
          return params.value;
        }
        return params.value.tipo;
      },
    },
    {
      field: 'obligatorio',
      headerName: 'Obligatorio',
      minWidth: 100,
      flex: 1,
      valueFormatter: (params) => {
        if (params.value) {
          return 'Si';
        }
        return 'No';
      },
    },
    {
      field: 'id_categoria',
      headerName: 'Subetapa',
      minWidth: 100,
      flex: 1,
      valueGetter: (params) => {
        if (!params.value) {
          return params.value;
        }
        return params.value.categoria;
      },
    },
    {
      field: 'acciones',
      headerName: 'Acciones',
      minWidth: 100,
      flex: 1,
      renderCell: (params) => {
        return (
          <>
            <Tooltip title="Editar">
              <IconButton
                onClick={() => {
                  const {
                    id,
                    descripcion,
                    obligatorio,
                    id_tipo,
                    id_categoria,
                  } = params.row;
                  set_id_update_atributo(id);
                  set_form_data_atributo({
                    descripcion,
                    obligatorio,
                    id_tipo: id_tipo.id,
                    id_categoria: id_categoria.id,
                  });
                  set_actualizar_atributo(true);
                  set_open_atributo_modal(true);
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
                    sx={{
                      color: 'primary.main',
                      width: '18px',
                      height: '18px',
                    }}
                  />
                </Avatar>
              </IconButton>
            </Tooltip>
            <Tooltip title="Eliminar">
              <IconButton
                onClick={() => {
                  delete_atributo_etapa_by_id(
                    params.row.id,
                    params.row.descripcion
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
          </>
        );
      },
    },
  ];

  const columns_categorias_atributos: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID Subetapa',
      minWidth: 90,
      flex: 0.3,
    },
    {
      field: 'categoria',
      headerName: 'Subetapa',
      minWidth: 110,
      flex: 1,
    },
    {
      field: 'orden',
      headerName: 'Orden',
      minWidth: 90,
      flex: 0.3,
    },
    {
      field: 'acciones',
      headerName: 'Acciones',
      minWidth: 100,
      flex: 1,
      renderCell: (params) => {
        return (
          <>
            <Tooltip title="Editar">
              <IconButton
                onClick={() => {
                  const { id, categoria, orden } = params.row;
                  set_id_update_categoria(id);
                  set_form_data_categoria({ categoria, orden });
                  set_actualizar_categoria(true);
                  set_open_categoria_modal(true);
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
                    sx={{
                      color: 'primary.main',
                      width: '18px',
                      height: '18px',
                    }}
                  />
                </Avatar>
              </IconButton>
            </Tooltip>
            <Tooltip title="Eliminar">
              <IconButton
                onClick={() => {
                  delete_categoria_by_id(params.row.id, params.row.categoria);
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
          </>
        );
      },
    },
  ];

  useEffect(() => {
    api
      .get('recaudo/procesos/etapas')
      .then((response) => {
        set_rows_etapas(response.data.data);
      })
      .catch((error) => {
        //  console.log('')(error);
      });
  }, []); // rows_etapas

  useEffect(() => {
    api
      .get('recaudo/procesos/categoria-atributos')
      .then((response) => {
        group_categorias(response.data.data);
      })
      .catch((error) => {
        //  console.log('')(error);
      });
  }, []); // rows_categorias_atributos

  useEffect(() => {
    if (id_etapa !== null) {
      api
        .get(`recaudo/procesos/atributos/${id_etapa}`)
        .then((response) => {
          group_atributos(response.data.data);
        })
        .catch((error) => {
          //  console.log('')(error);
        });
    }
  }, [id_etapa]);

  const handle_change = (event: SyntheticEvent, new_value: string): void => {
    set_position_tab_organigrama(new_value);
  };

  const group_categorias = (categorias: CategoriaAtributo[]): void => {
    const categorias_sorted_by_order: CategoriaAtributo[] = categorias.sort(
      (categoria1, categoria2) => {
        if (categoria1.orden < categoria2.orden) {
          return -1;
        }
        if (categoria1.orden > categoria2.orden) {
          return 1;
        }
        return 0;
      }
    );
    set_rows_categorias_atributos(categorias_sorted_by_order);
  };

  const group_atributos = (atributos: AtributoEtapa[]): void => {
    const atributos_sorted_by_order: AtributoEtapa[] = atributos.sort(
      (atributo1, atributo2) => {
        if (atributo1.id_categoria.orden < atributo2.id_categoria.orden) {
          return -1;
        }
        if (atributo1.id_categoria.orden > atributo2.id_categoria.orden) {
          return 1;
        }
        return 0;
      }
    );

    const categorias_agrupadas: Record<string, AtributoEtapa[]> = {};

    atributos_sorted_by_order.forEach((objeto) => {
      const categoria = objeto.id_categoria.categoria;
      if (categorias_agrupadas[categoria]) {
        categorias_agrupadas[categoria].push(objeto);
      } else {
        categorias_agrupadas[categoria] = [objeto];
      }
    });

    const nuevo_arreglo = Object.values(categorias_agrupadas);
    set_rows_atributos_etapa(nuevo_arreglo);
  };

  const update_etapas = (): void => {
    api
      .get('recaudo/procesos/etapas')
      .then((response) => {
        set_rows_etapas(response.data.data);
      })
      .catch((error) => {
        //  console.log('')(error);
      });
  };

  const update_categorias = (): void => {
    api
      .get('recaudo/procesos/categoria-atributos')
      .then((response) => {
        group_categorias(response.data.data);
      })
      .catch((error) => {
        //  console.log('')(error);
      });
  };

  const update_atributos_etapa = (): void => {
    if (id_etapa !== null) {
      api
        .get(`recaudo/procesos/atributos/${id_etapa}`)
        .then((response) => {
          group_atributos(response.data.data);
        })
        .catch((error) => {
          //  console.log('')(error);
        });
    }
  };

  const go_up = (categoria: CategoriaAtributo): void => {
    if (categoria.orden > 1) {
      api
        .put(`recaudo/procesos/categoria-atributos/${categoria.id}/`, {
          orden: categoria.orden - 1,
        })
        .then((response) => {
          update_atributos_etapa();
          update_categorias();
          toast.success(
            `Se actualizó el orden de la subetapa "${
              response.data.categoria as string
            }".`,
            {
              position: toast.POSITION.BOTTOM_RIGHT,
            }
          );
        })
        .catch((error) => {
          console.log(error);
          toast.error('Hubo un error', {
            position: toast.POSITION.BOTTOM_RIGHT,
          });
        });
    }
  };

  const go_down = (categoria: CategoriaAtributo): void => {
    api
      .put(`recaudo/procesos/categoria-atributos/${categoria.id}/`, {
        orden: categoria.orden + 1,
      })
      .then((response) => {
        update_atributos_etapa();
        update_categorias();
        toast.success(
          `Se actualizó el orden de la subetapa "${
            response.data.categoria as string
          }".`,
          {
            position: toast.POSITION.BOTTOM_RIGHT,
          }
        );
      })
      .catch((error) => {
        console.log(error);
        toast.error('Hubo un error', {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
      });
  };

  const delete_etapa_proceso = (id_etapa: number, etapa: string): void => {
    api
      .get(`recaudo/procesos/eliminar-etapa/${id_etapa}/`)
      .then((response) => {
        update_etapas();
        set_notification_info({
          type: 'success',
          message: `Se eliminó correctamente la etapa "${etapa}".`,
        });
        set_open_notification_modal(true);
      })
      .catch((error) => {
        //  console.log('')(error);
        set_notification_info({ type: 'error', message: 'Hubo un error.' });
        set_open_notification_modal(true);
      });
  };

  const delete_atributos_etapa_by_categoria = (
    categoria: CategoriaAtributo
  ): void => {
    if (id_etapa !== null) {
      const id_etapa_actual: number = id_etapa;
      api
        .get(
          `recaudo/procesos/eliminar-atributos-etapa/${id_etapa}/${categoria.id}/`
        )
        .then((response) => {
          set_id_etapa(id_etapa_actual);
          update_atributos_etapa();
          set_notification_info({
            type: 'success',
            message: `Se eliminó correctamente la subetapa "${categoria.categoria}".`,
          });
          set_open_notification_modal(true);
        })
        .catch((error) => {
          console.log(error);
          set_notification_info({ type: 'error', message: 'Hubo un error.' });
          set_open_notification_modal(true);
        });
    }
  };

  const delete_atributo_etapa_by_id = (
    id_atributo: number,
    atributo: string
  ): void => {
    api
      .get(`recaudo/procesos/eliminar-atributo/${id_atributo}/`)
      .then((response) => {
        update_atributos_etapa();
        set_notification_info({
          type: 'success',
          message: `Se eliminó correctamente el atributo "${atributo}".`,
        });
        set_open_notification_modal(true);
      })
      .catch((error) => {
        console.log(error);
        set_notification_info({ type: 'error', message: 'Hubo un error.' });
        set_open_notification_modal(true);
      });
  };

  const delete_categoria_by_id = (
    id_categoria: number,
    categoria: string
  ): void => {
    api
      .get(`recaudo/procesos/eliminar-categoria/${id_categoria}/`)
      .then((response) => {
        console.log(response);
        update_categorias();
        set_notification_info({
          type: 'success',
          message: `Se eliminó correctamente la categoría "${categoria}".`,
        });
        set_open_notification_modal(true);
      })
      .catch((error) => {
        console.log(error);
        set_notification_info({ type: 'error', message: 'Hubo un error.' });
        set_open_notification_modal(true);
      });
  };

  const submit_new_etapa = (etapa: string, descripcion: string): void => {
    api
      .post('recaudo/procesos/etapas/', {
        etapa,
        descripcion,
      })
      .then((response) => {
        update_etapas();
        set_notification_info({
          type: 'success',
          message: `Se creó correctamente la etapa "${
            response.data.etapa as string
          }".`,
        });
        set_open_notification_modal(true);
      })
      .catch((error) => {
        set_notification_info({
          type: 'error',
          message: error.response.data?.etapa[0] ?? 'Hubo un error',
        });
        set_open_notification_modal(true);
      });
  };

  const submit_new_atributo = (): void => {
    api
      .post('recaudo/procesos/atributos/', {
        ...form_data_atributo,
        obligatorio: form_data_atributo.obligatorio ? 1 : 0,
        id_tipo: Number(form_data_atributo.id_tipo),
        id_categoria: Number(form_data_atributo.id_categoria),
        id_etapa,
      })
      .then((response) => {
        update_atributos_etapa();
        set_form_data_atributo({
          descripcion: '',
          obligatorio: false,
          id_tipo: '',
          id_categoria: '',
        });
        set_notification_info({
          type: 'success',
          message: `Se creó correctamente el atributo "${
            response.data.descripcion as string
          }" para la etapa "${descripcion_etapa}".`,
        });
        set_open_notification_modal(true);
      })
      .catch((error) => {
        //  console.log('')(error);
        set_notification_info({ type: 'error', message: 'Hubo un error.' });
        set_open_notification_modal(true);
      })
      .finally(() => {
        set_id_etapa(null);
      });
  };

  const submit_updated_atributo = (): void => {
    api
      .put(`recaudo/procesos/atributos/${id_update_atributo}/`, {
        ...form_data_atributo,
        obligatorio: form_data_atributo.obligatorio ? 1 : 0,
        id_tipo: Number(form_data_atributo.id_tipo),
        id_categoria: Number(form_data_atributo.id_categoria),
      })
      .then((response) => {
        update_atributos_etapa();
        set_form_data_atributo({
          descripcion: '',
          obligatorio: false,
          id_tipo: '',
          id_categoria: '',
        });
        set_notification_info({
          type: 'success',
          message: `Se actualizó correctamente el atributo "${
            response.data.descripcion as string
          }" para la etapa "${descripcion_etapa}".`,
        });
        set_open_notification_modal(true);
      })
      .catch((error) => {
        console.log(error);
        set_notification_info({ type: 'error', message: 'Hubo un error.' });
        set_open_notification_modal(true);
      });
  };

  const submit_create_update_atributo = (): void => {
    if (actualizar_atributo) {
      submit_updated_atributo();
    } else {
      submit_new_atributo();
    }
  };

  const submit_new_categoria = (): void => {
    api
      .post('recaudo/procesos/categoria-atributos/', form_data_categoria)
      .then((response) => {
        update_categorias();
        set_form_data_categoria({ categoria: '', orden: '' });
        set_notification_info({
          type: 'success',
          message: `Se creó correctamente la subetapa "${
            response.data.categoria as string
          }".`,
        });
        set_open_notification_modal(true);
      })
      .catch((error) => {
        //  console.log('')(error);
        set_notification_info({ type: 'error', message: 'Hubo un error.' });
        set_open_notification_modal(true);
      });
  };

  const submit_updated_categoria = (): void => {
    api
      .put(
        `recaudo/procesos/categoria-atributos/${id_update_categoria}/`,
        form_data_categoria
      )
      .then((response) => {
        update_categorias();
        set_form_data_categoria({ categoria: '', orden: '' });
        set_notification_info({
          type: 'success',
          message: `Se actualizó correctamente la subetapa "${
            response.data.categoria as string
          }".`,
        });
        set_open_notification_modal(true);
      })
      .catch((error) => {
        //  console.log('')(error);
        set_notification_info({ type: 'error', message: 'Hubo un error.' });
        set_open_notification_modal(true);
      });
  };

  const submit_create_update_categoria = (): void => {
    if (actualizar_categoria) {
      submit_updated_categoria();
    } else {
      submit_new_categoria();
    }
  };
  const [filtroId, setFiltroId] = useState('');
  const [filtroEtapa, setFiltroEtapa] = useState('');

  const handleFilter = () => {
    const id = parseInt(filtroId, 10);
    const filteredData = rows_etapas.filter((etapa) => {
      return (
        etapa.id === id &&
        etapa.etapa.toLowerCase().includes(filtroEtapa.toLowerCase())
      );
    });
    set_rows_etapas(filteredData);
  };

  const limpiar = () => {
    api
      .get('recaudo/procesos/etapas')
      .then((response) => {
        set_rows_etapas(response.data.data);
      })
      .catch((error) => {
        //  console.log('')(error);
      });
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
        }}
      >
        <Grid item xs={12}>
          <Title title="Estados Proceso"></Title>
          <Box
            component="form"
            sx={{ mt: '20px' }}
            noValidate
            autoComplete="off"
          >
            <TabContext value={position_tab}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handle_change}>
                  <Tab label="Etapas de Proceso" value="1" />
                  <Tab label="Atributos de Etapa" value="2" />
                  {/* <Tab label="Subetapas de Proceso" value="3" /> */}
                </TabList>
              </Box>

              <TabPanel value="1" sx={{ p: '20px 0' }}>
                <Stack direction="row" spacing={2} sx={{ mb: '20px' }}>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      label="Numero de etapa"
                      variant="outlined"
                      size="small"
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      value={filtroId}
                      onChange={(e) => setFiltroId(e.target.value)}
                    />
                  </Grid>

                  <Grid item xs={12} sm={3}>
                    <TextField
                      label="Etapa"
                      variant="outlined"
                      size="small"
                      fullWidth
                      value={filtroEtapa}
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => setFiltroEtapa(e.target.value)}
                    />
                  </Grid>
                  <Grid item>
                    <Button
                      startIcon={<SearchOutlined />}
                      variant="contained"
                      fullWidth
                      onClick={handleFilter}
                    >
                      Buscar
                    </Button>
                  </Grid>

                  <Grid item>
                    <Button
                      onClick={limpiar}
                      color="primary"
                      variant="outlined"
                      fullWidth
                      startIcon={<CleanIcon />}
                    >
                      Limpiar campos
                    </Button>
                  </Grid>

                  <Grid
                    item
                    xs={12}
                    sm={3}
                    container
                    direction="row"
                    justifyContent="flex-end"
                    alignItems="center"
                  >
                    <Button
                      variant="outlined"
                      startIcon={<AddIcon />}
                      onClick={() => {
                        set_open_etapa_modal(true);
                      }}
                    >
                      Crear nueva etapa
                    </Button>
                  </Grid>
                </Stack>


                <RenderDataGrid
        title="Listado de Estados Proceso"
        columns={columns_etapas ?? []}
        rows={rows_etapas ?? []}
      />
                {/* <Box sx={{ width: '100%' }}>
                  <DataGrid
                    density="compact"
                    autoHeight
                    rows={rows_etapas}
                    columns={columns_etapas}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    experimentalFeatures={{ newEditingApi: true }}
                    getRowId={(row) => row.id}
                    components={{ Toolbar: GridToolbar }}
                  />
                </Box> */}
              </TabPanel>

              <TabPanel value="2" sx={{ p: '20px 0' }}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  spacing={2}
                  sx={{ mb: '20px' }}
                >
                  <Grid item xs={12} sm={3}>
                    <Typography variant="h5">{descripcion_etapa}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <Button
                      color="primary"
                      variant="contained"
                      disabled={id_etapa === null}
                      startIcon={<AddIcon />}
                      fullWidth
                      onClick={() => {
                        set_form_data_atributo({
                          descripcion: '',
                          obligatorio: false,
                          id_tipo: '',
                          id_categoria: '',
                        });
                        set_actualizar_atributo(false);
                        set_open_atributo_modal(true);
                      }}
                    >
                      Crear nuevo atributo
                    </Button>
                  </Grid>
                </Stack>
                <Box sx={{ width: '100%' }}>
                  {rows_atributos_etapa.map((arreglo_atributos, index) => (
                    <Stack
                      key={index}
                      direction={'row'}
                      alignItems={'flex-start'}
                    >
                      <CollapsibleButton
                        texto_boton={`(${arreglo_atributos[0].id_categoria.orden}) ${arreglo_atributos[0].id_categoria.categoria}`}
                      >
                        <DataGrid
                          density="compact"
                          autoHeight
                          rows={arreglo_atributos}
                          columns={columns_atributos_etapa}
                          pageSize={10}
                          rowsPerPageOptions={[10]}
                          experimentalFeatures={{ newEditingApi: true }}
                          getRowId={(row) => row.id}
                          components={{ Toolbar: GridToolbar }}
                        />
                      </CollapsibleButton>
                      <Tooltip title="Subir Orden" sx={{ mt: '18px' }}>
                        <IconButton
                          onClick={() => {
                            go_up(arreglo_atributos[0].id_categoria);
                          }}
                        >
                          <ArrowUpwardIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Bajar Orden" sx={{ mt: '18px' }}>
                        <IconButton
                          onClick={() => {
                            go_down(arreglo_atributos[0].id_categoria);
                          }}
                        >
                          <ArrowDownwardIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Eliminar" sx={{ mt: '18px' }}>
                        <IconButton
                          onClick={() => {
                            delete_atributos_etapa_by_categoria(
                              arreglo_atributos[0].id_categoria
                            );
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  ))}
                </Box>
              </TabPanel>

              <TabPanel value="3" sx={{ p: '20px 0' }}>
                <Stack direction="row" spacing={2} sx={{ mb: '20px' }}>
                  <Button
                    variant="outlined"
                    startIcon={<AddIcon />}
                    onClick={() => {
                      set_form_data_categoria({ categoria: '', orden: '' });
                      set_actualizar_categoria(false);
                      set_open_categoria_modal(true);
                    }}
                  >
                    Crear nueva subetapa
                  </Button>
                </Stack>
                <Box sx={{ width: '100%' }}>
                  <DataGrid
                    density="compact"
                    autoHeight
                    rows={rows_categorias_atributos}
                    columns={columns_categorias_atributos}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    experimentalFeatures={{ newEditingApi: true }}
                    getRowId={(row) => row.id}
                    components={{ Toolbar: GridToolbar }}
                  />
                </Box>
              </TabPanel>
            </TabContext>
          </Box>
        </Grid>
      </Grid>
      <CrearAtributoModal
        id_etapa={id_etapa}
        form_data_atributo={form_data_atributo}
        actualizar_atributo={actualizar_atributo}
        is_modal_active={open_atributo_modal}
        set_form_data_atributo={set_form_data_atributo}
        set_is_modal_active={set_open_atributo_modal}
        submit_create_update_atributo={submit_create_update_atributo}
      />
      <CrearEtapaModal
        open_etapa_modal={open_etapa_modal}
        set_open_etapa_modal={set_open_etapa_modal}
        submit_new_etapa={submit_new_etapa}
      />
      <CrearCategoriaModal
        form_data_categoria={form_data_categoria}
        open_categoria_modal={open_categoria_modal}
        actualizar_categoria={actualizar_categoria}
        set_form_data_categoria={set_form_data_categoria}
        set_open_categoria_modal={set_open_categoria_modal}
        submit_create_update_categoria={submit_create_update_categoria}
      />
      <NotificationModal
        open_notification_modal={open_notification_modal}
        set_open_notification_modal={set_open_notification_modal}
        notification_info={notification_info}
      />
    </>
  );
};
