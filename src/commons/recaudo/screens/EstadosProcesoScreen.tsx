/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Avatar, Box, Button, Grid, IconButton, Stack, Tab, Tooltip, Typography } from "@mui/material"
import { Title } from '../../../components/Title';
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useState, type SyntheticEvent, useEffect } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { CrearAtributoModal } from "../components/estadosProceso/CrearAtributoModal";
import type { AtributoEtapa, CategoriaAtributo, EtapaProceso, FormDataCategoria } from "../interfaces/proceso";
import { DataGrid, GridToolbar, type GridColDef } from "@mui/x-data-grid";
import { api } from "../../../api/axios";
import { CrearEtapaModal } from "../components/estadosProceso/CrearEtapaModal";
import { NotificationModal } from "../components/NotificationModal";
import { CrearCategoriaModal } from "../components/estadosProceso/CrearCategoriaModal";
import { CollapsibleButton } from "../components/CollapsibleButton";
// import type { GridRenderCellParams } from "@mui/x-data-grid";

// eslint-disable-next-line @typescript-eslint/naming-convention
export const EstadosProcesoScreen: React.FC = () => {
  const [rows_etapas, set_rows_etapas] = useState<EtapaProceso[]>([]);
  const [rows_atributos_etapa, set_rows_atributos_etapa] = useState<AtributoEtapa[][]>([]);
  const [rows_categorias_atributos, set_rows_categorias_atributos] = useState<CategoriaAtributo[]>([]);
  const [open_atributo_modal, set_open_atributo_modal] = useState<boolean>(false);
  const [open_etapa_modal, set_open_etapa_modal] = useState<boolean>(false);
  const [open_categoria_modal, set_open_categoria_modal] = useState<boolean>(false);
  const [position_tab, set_position_tab_organigrama] = useState('1');
  const [id_etapa, set_id_etapa] = useState<number | null>(null);
  const [descripcion_etapa, set_descripcion_etapa] = useState('');
  const [notification_info, set_notification_info] = useState({ type: '', message: '' });
  const [open_notification_modal, set_open_notification_modal] = useState<boolean>(false);
  const [form_data_categoria, set_form_data_categoria] = useState<FormDataCategoria>({
    categoria: '',
    orden: '',
  });
  const [id_update_categoria, set_id_update_categoria] = useState('');
  const [actualizar_categoria, set_actualizar_categoria] = useState<boolean>(false);

  const columns_etapas: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID etapa',
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
            <Tooltip title='Editar'>
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
                      height: '18px'
                    }}
                  />
                </Avatar>
              </IconButton>
            </Tooltip>
          </>
        );
      }
    }
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
      }
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
      }
    },
    {
      field: 'id_categoria',
      headerName: 'Categoría',
      minWidth: 100,
      flex: 1,
      valueGetter: (params) => {
        if (!params.value) {
          return params.value;
        }
        return params.value.categoria;
      }
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
            <Tooltip title='Editar'>
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
                      height: '18px'
                    }}
                  />
                </Avatar>
              </IconButton>
            </Tooltip>
          </>
        );
      }
    }
  ];

  useEffect(() => {
    api.get('recaudo/procesos/etapas')
      .then((response) => {
        set_rows_etapas(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }, []); // rows_etapas

  useEffect(() => {
    api.get('recaudo/procesos/categoria-atributos')
      .then((response) => {
        set_rows_categorias_atributos(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }, []); // rows_categorias_atributos

  useEffect(() => {
    if (id_etapa !== null) {
      api.get(`recaudo/procesos/atributos/${id_etapa}`)
        .then((response) => {
          group_atributos(response.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [id_etapa]);

  const handle_change = (event: SyntheticEvent, new_value: string): void => {
    set_position_tab_organigrama(new_value);
  };

  const group_atributos = (atributos: AtributoEtapa[]): void => {
    const atributos_sorted_by_order: AtributoEtapa[] = atributos.sort((atributo1, atributo2) => {
      if (atributo1.id_categoria.orden < atributo2.id_categoria.orden) {
        return -1;
      }
      if (atributo1.id_categoria.orden > atributo2.id_categoria.orden) {
        return 1;
      }
      return 0;
    });

    const categorias_agrupadas: Record<string, AtributoEtapa[]> = {};

    atributos_sorted_by_order.forEach(objeto => {
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
    api.get('recaudo/procesos/etapas')
      .then((response) => {
        set_rows_etapas(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const update_categorias = (): void => {
    api.get('recaudo/procesos/categoria-atributos')
      .then((response) => {
        set_rows_categorias_atributos(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      })
  };

  const update_atributos_etapa = (): void => {
    if (id_etapa !== null) {
      api.get(`recaudo/procesos/atributos/${id_etapa}`)
        .then((response) => {
          group_atributos(response.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const delete_categoria_atributos = (categoria: CategoriaAtributo): void => {
    if (id_etapa !== null) {
      const id_etapa_actual: number = id_etapa;
      api.get(`recaudo/procesos/eliminar-atributos-etapa/${id_etapa}/${categoria.id}/`)
        .then((response) => {
          set_id_etapa(id_etapa_actual);
          update_atributos_etapa();
          set_notification_info({ type: 'success', message: `Se eliminó correctamente la subetapa "${categoria.categoria}".` });
          set_open_notification_modal(true);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const submit_new_etapa = (etapa: string, descripcion: string): void => {
    api.post('recaudo/procesos/etapas/', {
      etapa,
      descripcion
    })
      .then((response) => {
        update_etapas();
        set_notification_info({ type: 'success', message: `Se creó correctamente la etapa "${response.data.etapa as string}".` });
        set_open_notification_modal(true);
      })
      .catch((error) => {
        console.log(error);
        set_notification_info({ type: 'error', message: 'Hubo un error.' });
        set_open_notification_modal(true);
      });
  };

  const submit_new_atributo = (descripcion: string, obligatorio: number, id_tipo: number, id_categoria: number): void => {
    api.post('recaudo/procesos/atributos/', {
      descripcion,
      obligatorio,
      id_tipo,
      id_etapa,
      id_categoria
    })
      .then((response) => {
        set_notification_info({ type: 'success', message: `Se creó correctamente el atributo "${descripcion}" para la etapa "${descripcion_etapa}".` });
        set_open_notification_modal(true);
      })
      .catch((error) => {
        console.log(error);
        set_notification_info({ type: 'error', message: 'Hubo un error.' });
        set_open_notification_modal(true);
      })
      .finally(() => {
        set_id_etapa(null);
      });
  };

  const submit_new_categoria = (): void => {
    api.post('recaudo/procesos/categoria-atributos/', form_data_categoria)
      .then((response) => {
        update_categorias();
        set_form_data_categoria({ categoria: '', orden: '' });
        set_notification_info({ type: 'success', message: `Se creó correctamente la categoría "${response.data.categoria as string}".` });
        set_open_notification_modal(true);
      })
      .catch((error) => {
        console.log(error);
        set_notification_info({ type: 'error', message: 'Hubo un error.' });
        set_open_notification_modal(true);
      });
  };

  const submit_updated_categoria = (): void => {
    api.put(`recaudo/procesos/categoria-atributos/${id_update_categoria}`, form_data_categoria)
      .then((response) => {
        update_categorias();
        set_form_data_categoria({ categoria: '', orden: '' });
        set_notification_info({ type: 'success', message: `Se actualizó correctamente la categoría "${response.data.categoria as string}".` });
        set_open_notification_modal(true);
      })
      .catch((error) => {
        console.log(error);
        set_notification_info({ type: 'error', message: 'Hubo un error.' });
        set_open_notification_modal(true);
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
          boxShadow: '0px 3px 6px #042F4A26'
        }}
      >
        <Grid item xs={12}>
          <Title title="Estados Proceso"></Title>
          <Box
            component='form'
            sx={{ mt: '20px' }}
            noValidate
            autoComplete="off"
          >
            <TabContext value={position_tab}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handle_change}>
                  <Tab label="Etapas de Proceso" value="1" />
                  <Tab label="Atributos de Etapa" value="2" />
                  <Tab label="Subetapas de Proceso" value="3" />
                </TabList>
              </Box>

              <TabPanel value="1" sx={{ p: '20px 0' }}>
                <Stack direction='row' spacing={2} sx={{ mb: '20px' }}>
                  <Button
                    variant="outlined"
                    startIcon={<AddIcon />}
                    onClick={() => {
                      set_open_etapa_modal(true);
                    }}
                  >
                    Crear nueva etapa
                  </Button>
                </Stack>
                <Box sx={{ width: '100%' }}>
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
                </Box>
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
                        set_open_atributo_modal(true)
                      }}
                    >
                      Crear nuevo atributo
                    </Button>
                  </Grid>
                </Stack>
                <Box sx={{ width: '100%' }}>
                  {/* <DataGrid
                    density="compact"
                    autoHeight
                    rows={rows_atributos_etapa}
                    columns={columns_atributos_etapa}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    experimentalFeatures={{ newEditingApi: true }}
                    getRowId={(row) => row.id}
                    components={{ Toolbar: GridToolbar }}
                  /> */}
                  {rows_atributos_etapa.map((arreglo_atributos, index) => (
                    <Stack
                      key={index}
                      direction={'row'}
                      alignItems={'flex-start'}
                    >
                      <CollapsibleButton texto_boton={arreglo_atributos[0].id_categoria.categoria}>
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
                      <Tooltip title='Eliminar' sx={{ mt: '18px' }}>
                        <IconButton
                          onClick={() => {
                            delete_categoria_atributos(arreglo_atributos[0].id_categoria);
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
                <Stack direction='row' spacing={2} sx={{ mb: '20px' }}>
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
        is_modal_active={open_atributo_modal}
        set_is_modal_active={set_open_atributo_modal}
        submit_new_atributo={submit_new_atributo}
        set_position_tab_organigrama={set_position_tab_organigrama}
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
        submit_new_categoria={submit_new_categoria}
        submit_updated_categoria={submit_updated_categoria}
      />
      <NotificationModal
        open_notification_modal={open_notification_modal}
        set_open_notification_modal={set_open_notification_modal}
        notification_info={notification_info}
      />
    </>
  )
}
