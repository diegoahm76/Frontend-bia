/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Avatar, Box, Button, Grid, IconButton, Stack, Tab, Tooltip, Typography } from "@mui/material"
import { Title } from '../../../components/Title';
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useState, type SyntheticEvent, useEffect } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { CrearAtributoModal } from "../components/estadosProceso/CrearAtributoModal";
import type { AtributoEtapa, CategoriaAtributo, EtapaProceso } from "../interfaces/proceso";
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
                  set_atributos_etapa(params.row.id);
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
        if (!params.value){
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
      headerName: 'ID categoria',
      minWidth: 90,
      flex: 0.3,
    },
    {
      field: 'categoria',
      headerName: 'Categoría',
      minWidth: 110,
      flex: 1,
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
  }, []);

  useEffect(() => {
    api.get('recaudo/procesos/categoria-atributos')
      .then((response) => {
        set_rows_categorias_atributos(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }, []);

  const handle_change = (event: SyntheticEvent, new_value: string): void => {
    set_position_tab_organigrama(new_value);
  };

  const set_atributos_etapa = (id: number): void => {
    api.get(`recaudo/procesos/atributos/${id}`)
      .then((response) => {
        group_atributos(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const group_atributos = (atributos: AtributoEtapa[]): void => {
    const categorias_agrupadas: Record<string, AtributoEtapa[]> = {};

    atributos.forEach(objeto => {
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

  const submit_new_etapa = (etapa: string, descripcion: string): void => {
    api.post('recaudo/procesos/etapas/', {
      etapa,
      descripcion
    })
      .then((response) => {
        console.log(response);
        set_notification_info({ type: 'success', message: `Se creó correctamente la etapa "${etapa}".` });
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
        console.log(response);
        set_notification_info({ type: 'success', message: `Se creó correctamente el atributo "${descripcion}".` });
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

  const submit_new_categoria = (categoria: string): void => {
    api.post('recaudo/procesos/categoria-atributos/', {
      categoria,
    })
      .then((response) => {
        console.log(response);
        set_notification_info({ type: 'success', message: `Se creó correctamente la categoría "${categoria}".` });
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
                  <Tab label="Categorías de Etapa" value="3" />
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
                  {rows_atributos_etapa.map((arreglo_objetos, index) => (
                    <CollapsibleButton key={index} texto_boton={arreglo_objetos[0].id_categoria.categoria}>
                      <DataGrid
                        density="compact"
                        autoHeight
                        rows={arreglo_objetos}
                        columns={columns_atributos_etapa}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                        experimentalFeatures={{ newEditingApi: true }}
                        getRowId={(row) => row.id}
                        components={{ Toolbar: GridToolbar }}
                      />
                    </CollapsibleButton>
                  ))}
                </Box>
              </TabPanel>

              <TabPanel value="3" sx={{ p: '20px 0' }}>
                <Stack direction='row' spacing={2} sx={{ mb: '20px' }}>
                  <Button
                    variant="outlined"
                    startIcon={<AddIcon />}
                    onClick={() => {
                      set_open_categoria_modal(true);
                    }}
                  >
                    Crear nueva categoría
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
        open_categoria_modal={open_categoria_modal}
        set_open_categoria_modal={set_open_categoria_modal}
        submit_new_categoria={submit_new_categoria}
      />
      <NotificationModal
        open_notification_modal={open_notification_modal}
        set_open_notification_modal={set_open_notification_modal}
        notification_info={notification_info}
      />
    </>
  )
}
