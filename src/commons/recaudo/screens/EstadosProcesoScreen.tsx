import { Avatar, Box, Button, Grid, IconButton, Stack, Tab, Tooltip, Typography } from "@mui/material"
import { Title } from '../../../components/Title';
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useState, type SyntheticEvent, useEffect } from 'react';
// import { TablaGeneral } from "../../../components/TablaGeneral/TablaGeneral";
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { EstadosProcesoModal } from "../components/estadosProceso/EstadosProcesoModal";
import type { AtributoEtapa, EtapaProceso } from "../interfaces/proceso";
import { DataGrid, GridToolbar, type GridColDef } from "@mui/x-data-grid";
import { control_error, control_success } from "../../../helpers";
import { api } from "../../../api/axios";
// import type { GridRenderCellParams } from "@mui/x-data-grid";

interface RowAtributosEtapa {
  id: string;
  descripcion: string;
  tipo_atributo: string;
  obligatorio: string;
  opciones: string;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const EstadosProcesoScreen: React.FC = () => {
  const [modal_detalle, set_modal_detalle] = useState<boolean>(false);
  const [position_tab, set_position_tab_organigrama] = useState('1');
  const [rows_etapas, set_rows_etapas] = useState<EtapaProceso[]>([]);
  const [rows_atributos_etapa, set_rows_atributos_etapa] = useState<RowAtributosEtapa[]>([]);
  const [id_etapa, set_id_etapa] = useState<number | null>(null);
  const [descripcion_etapa, set_descripcion_etapa] = useState('');

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
                  get_atributos_etapa(params.row.id);
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
      field: 'tipo_atributo',
      headerName: 'Tipo de Atributo',
      minWidth: 110,
      flex: 1,
    },
    {
      field: 'obligatorio',
      headerName: 'Obligatorio',
      minWidth: 100,
      flex: 1,
    },
    {
      field: 'opciones',
      headerName: 'Opciones',
      minWidth: 100,
      flex: 1,
    },
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

  const handle_change = (event: SyntheticEvent, new_value: string): void => {
    set_position_tab_organigrama(new_value);
  };

  const set_atributos = (atributos: AtributoEtapa[]): void => {
    const new_rows_atributos: RowAtributosEtapa[] = atributos.map((atributo) => ({
      id: atributo.id.toString(),
      descripcion: atributo.descripcion,
      tipo_atributo: atributo.id_tipo.tipo,
      obligatorio: atributo.obligatorio ? 'Si' : 'No',
      opciones: ''
    }));
    set_rows_atributos_etapa(new_rows_atributos);
  }

  const get_atributos_etapa = (id: number): void => {
    api.get(`recaudo/procesos/atributos/${id}`)
      .then((response) => {
        set_atributos(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      })
  };

  const submit_new_atributo = (descripcion: string, obligatorio: number, id_tipo: number): void => {
    api.post('recaudo/procesos/atributos/', {
      descripcion,
      obligatorio,
      id_tipo,
      id_etapa
    })
      .then((response) => {
        console.log(response);
        control_success(response.statusText);
      })
      .catch((error) => {
        console.log(error);
        control_error(error);
      })
      .finally(() => {
        set_id_etapa(null);
      })
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
                </TabList>
              </Box>

              <TabPanel value="1" sx={{ p: '20px 0' }}>
                {/* <TablaGeneral
                  showButtonExport
                  tittle={'Estados'}
                  columns={columns}
                  rowsData={rows}
                  staticscroll={true}
                  stylescroll={"780px"}
                /> */}
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
                      onClick={() => {
                        set_modal_detalle(true)
                      }}
                      fullWidth
                    >
                      Crear nuevo atributo
                    </Button>
                  </Grid>
                </Stack>
                {/* <TablaGeneral
                  showButtonExport
                  tittle={'Editar'}
                  columns={columns_atributos_etapa}
                  rowsData={rows_atributos_etapa}
                  staticscroll={true}
                  stylescroll={"780px"}
                /> */}
                <DataGrid
                  density="compact"
                  autoHeight
                  rows={rows_atributos_etapa}
                  columns={columns_atributos_etapa}
                  pageSize={10}
                  rowsPerPageOptions={[10]}
                  experimentalFeatures={{ newEditingApi: true }}
                  getRowId={(row) => row.id}
                  components={{ Toolbar: GridToolbar }}
                />
              </TabPanel>
            </TabContext>
          </Box>
        </Grid>
      </Grid>
      <EstadosProcesoModal
        is_modal_active={modal_detalle}
        set_is_modal_active={set_modal_detalle}
        submit_new_atributo={submit_new_atributo}
        set_position_tab_organigrama={set_position_tab_organigrama}
      />
    </>
  )
}
