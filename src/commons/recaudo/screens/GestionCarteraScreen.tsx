import { type SyntheticEvent, useState, useEffect } from 'react';
import { Avatar, Box, Grid, IconButton, type SelectChangeEvent, Tab, Tooltip } from "@mui/material"
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Title } from "../../../components"
import { EditarCartera } from '../components/GestionCartera/EditarCartera';
import { CobroCoactivo } from '../components/GestionCartera/CobroCoactivo';
import axios from 'axios';
import { DataGrid, GridToolbar, type GridColDef } from '@mui/x-data-grid';
import type { AtributoEtapa, EtapaProceso, Proceso } from '../interfaces/proceso';
import EditIcon from '@mui/icons-material/Edit';
import type { FlujoProceso } from '../interfaces/flujoProceso';
import { control_error, control_success } from '../../../helpers';
// import { TablaGeneral } from '../../../components/TablaGeneral';

interface RowProceso {
  id: number;
  fecha_facturacion: string;
  numero_factura: string;
  codigo_contable: string;
  monto_inicial: string;
  dias_mora: number;
  valor_intereses: string;
  valor_sancion: string;
  etapa: EtapaProceso;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const GestionCarteraScreen: React.FC = () => {
  const [procesos, set_procesos] = useState<Proceso[]>([]);
  const [position_tab, set_position_tab_organigrama] = useState('1');
  const [rows_procesos, set_rows_procesos] = useState<RowProceso[]>([]);
  const [selected_proceso, set_selected_proceso] = useState({
    fecha_facturacion: '',
    numero_factura: '',
    codigo_contable: '',
    monto_inicial: '',
    dias_mora: '',
    valor_intereses: '',
    valor_sancion: '',
    etapa: '',
  });
  const [id_proceso, set_id_proceso] = useState('');
  const [id_etapa, set_id_etapa] = useState<number | null>(null);
  const [flujos_proceso, set_flujos_proceso] = useState<FlujoProceso[]>([]);
  const [etapas_destino, set_etapas_destino] = useState<EtapaProceso[]>([]);
  const [etapa_destino, set_etapa_destino] = useState('');
  const [atributos_etapa, set_atributos_etapa] = useState<AtributoEtapa[]>([]);
  const [input_values, set_input_values] = useState<Record<string, string>>({});
  const [input_files, set_input_files] = useState<Record<string, File>>({});

  const columns_procesos: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID Proceso',
      minWidth: 90,
      flex: 1,
    },
    {
      field: 'fecha_facturacion',
      headerName: 'Fecha facturación',
      minWidth: 130,
      flex: 1,
    },
    {
      field: 'numero_factura',
      headerName: 'Factura',
      minWidth: 70,
      flex: 1,
    },
    {
      field: 'codigo_contable',
      headerName: 'Código contable',
      minWidth: 120,
      flex: 1,
    },
    {
      field: 'monto_inicial',
      headerName: 'Monto inicial',
      minWidth: 120,
      flex: 1,
    },
    {
      field: 'dias_mora',
      headerName: 'Días de mora',
      minWidth: 70,
      flex: 1,
    },
    {
      field: 'valor_intereses',
      headerName: 'Valor intereses',
      minWidth: 110,
      flex: 1,
    },
    {
      field: 'valor_sancion',
      headerName: 'Valor sanción',
      minWidth: 110,
      flex: 1,
    },
    {
      field: 'etapa',
      headerName: 'Estado actual',
      minWidth: 200,
      flex: 1,
      valueGetter: (params) => {
        return params.value.etapa;
      }
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
                  set_selected_proceso({
                    fecha_facturacion: params.row.fecha_facturacion,
                    numero_factura: params.row.numero_factura,
                    codigo_contable: params.row.codigo_contable,
                    monto_inicial: params.row.monto_inicial,
                    dias_mora: params.row.dias_mora,
                    valor_intereses: params.row.valor_intereses,
                    valor_sancion: params.row.valor_sancion,
                    etapa: params.row.etapa.etapa,
                  });
                  set_id_proceso(params.row.id);
                  set_id_etapa(params.row.etapa.id);
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
        )
      }
    }
  ];

  useEffect(() => {
    axios.get('http://macarenia.bitpointer.co/api/recaudo/procesos/procesos-sin-finalizar')
      .then((response) => {
        set_procesos(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const new_rows_procesos: RowProceso[] = procesos.map((proceso) => ({
      id: proceso.id,
      fecha_facturacion: proceso.id_cartera.fecha_facturacion,
      numero_factura: proceso.id_cartera.numero_factura,
      codigo_contable: proceso.id_cartera.codigo_contable,
      monto_inicial: proceso.id_cartera.monto_inicial,
      dias_mora: proceso.id_cartera.dias_mora,
      valor_intereses: proceso.id_cartera.valor_intereses,
      valor_sancion: proceso.id_cartera.valor_sancion,
      etapa: proceso.id_etapa,
    }));
    set_rows_procesos(new_rows_procesos);
  }, [procesos]);

  useEffect(() => {
    axios.get('http://macarenia.bitpointer.co/api/recaudo/procesos/flujos')
      .then((response) => {
        set_flujos_proceso(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const new_flujos_proceso = flujos_proceso.filter(flujo => flujo.id_etapa_origen.id === id_etapa);
    const new_etapas_destino = new_flujos_proceso.map(flujo => ({
      ...flujo.id_etapa_destino
    }));
    set_etapas_destino(new_etapas_destino);
  }, [id_etapa]);

  const handle_tablist_change = (event: SyntheticEvent, newValue: string): void => {
    set_position_tab_organigrama(newValue)
  };

  const handle_select_change: (event: SelectChangeEvent) => void = (event: SelectChangeEvent) => {
    set_etapa_destino(event.target.value);
  };

  const handle_input_change = (event: React.ChangeEvent<HTMLInputElement>, name: string): void => {
    const { value } = event.target;
    set_input_values((prevInputValues) => ({
      ...prevInputValues,
      [name]: value,
    }));
  };

  const mover_estado_actual = (): void => {
    if (etapa_destino) {
      axios.get(`http://macarenia.bitpointer.co/api/recaudo/procesos/atributos/${etapa_destino}`)
        .then((response) => {
          set_atributos_etapa(response.data.data);
          set_input_values({});
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handle_post_valores_sin_archivo = (id_atributo: string, value: string): void => {
    axios.post('http://macarenia.bitpointer.co/api/recaudo/procesos/valores-proceso/', {
      id_proceso: Number(id_proceso),
      id_atributo: Number(id_atributo),
      valor: value,
    })
      .then((response) => {
        console.log(response);
        control_success(response.statusText);
      })
      .catch((error) => {
        console.log(error);
        control_error(error);
      });
  };

  const handle_post_valores_con_archivo = (id_atributo: string, value: File): void => {
    axios.postForm('http://macarenia.bitpointer.co/api/recaudo/procesos/valores-proceso/', {
      id_proceso: Number(id_proceso),
      id_atributo: Number(id_atributo),
      documento: value,
    })
      .then((response) => {
        console.log(response);
        control_success(response.statusText);
      })
      .catch((error) => {
        console.log(error);
        control_error(error);
      });
  };

  const handle_post_valores_proceso = (): void => {
    if (input_values) {
      for (const [key, value] of Object.entries(input_values)) {
        handle_post_valores_sin_archivo(key.split('-')[0], value);
      }
    }
    if (input_files) {
      for (const [key, value] of Object.entries(input_files)) {
        handle_post_valores_con_archivo(key.split('-')[0], value);
      }
    }
  };

  const handle_file_change = (event: React.ChangeEvent<HTMLInputElement>, name: string): void => {
    if (event.target.files) {
      const file = event.target.files[0];
      set_input_files((prevState) => ({
        ...prevState,
        [name]: file,
      }));
    }
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
          <Title title="Proceso de Liquidación"></Title>
          <Box
            component='form'
            sx={{ mt: '20px' }}
            noValidate
            autoComplete="off"
          >
            <TabContext value={position_tab}>

              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handle_tablist_change}>
                  <Tab label="Gestion Cartera" value="1" />
                  <Tab label="Editar Cartera" value="2" />
                </TabList>
              </Box>

              <TabPanel value="1" sx={{ p: '20px 0' }}>
                {/* <TablaGeneral
                  showButtonExport
                  columns={columns}
                  rowsData={rows}
                  tittle='Liquidaciones'
                  staticscroll
                  stylescroll='780px'
                /> */}
                <DataGrid
                  density='compact'
                  autoHeight
                  rows={rows_procesos}
                  columns={columns_procesos}
                  pageSize={10}
                  rowsPerPageOptions={[10]}
                  experimentalFeatures={{ newEditingApi: true }}
                  getRowId={(row) => row.id}
                  components={{ Toolbar: GridToolbar }}
                />
              </TabPanel>

              <TabPanel value="2" sx={{ p: '20px 0' }}>
                <EditarCartera
                  etapas_destino={etapas_destino}
                  etapa_destino={etapa_destino}
                  handle_select_change={handle_select_change}
                  mover_estado_actual={mover_estado_actual}
                  selected_proceso={selected_proceso}
                />
              </TabPanel>
            </TabContext>
          </Box>
        </Grid>
      </Grid>

      <TabContext value={position_tab}>
        <TabPanel value="2" sx={{ p: '20px 0' }}>
          <CobroCoactivo
            rows_atributos={atributos_etapa}
            handle_input_change={handle_input_change}
            handle_file_change={handle_file_change}
            handle_post_valores_proceso={handle_post_valores_proceso}
          />
        </TabPanel>
      </TabContext>
    </>
  )
}