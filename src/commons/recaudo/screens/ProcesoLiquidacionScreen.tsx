/* eslint no-new-func: 0 */
import { type SyntheticEvent, useState, useEffect } from 'react';
import { Box, Grid, type SelectChangeEvent, Tab, Tooltip, IconButton, Avatar } from "@mui/material"
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { GenerarLiquidacion, DetalleLiquidacion } from "../components/procesoLiquidacion";
import { Title } from "../../../components"
import type { DetallesLiquidacion, Deudor, Expediente, FormDetalleLiquidacion, FormLiquidacion, Liquidacion, OpcionLiquidacion, RowDetalles } from '../interfaces/liquidacion';
import { DataGrid, type GridColDef, GridToolbar } from '@mui/x-data-grid';
import { api } from '../../../api/axios';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import { NotificationModal } from '../components/NotificationModal';
import dayjs, { type Dayjs } from 'dayjs';
import type { DetallePeriodo, DetallesPeriodos } from '../interfaces/proceso';

const detalles_ciclos: string[] = [
  'diario',
  'mensual',
  'trimestral',
  'semestral',
  'anual',
];

const detalles_periodos: DetallesPeriodos = {
  diario: {
    tamano: 1,
    periodos: ['pago unico'],
  },
  mensual: {
    tamano: 1,
    periodos: [
      'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
      'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
    ],
  },
  trimestral: {
    tamano: 3,
    periodos: [
      'enero a marzo',
      'abril a julio',
      'junio a septiembre',
      'octubre a diciembre',
    ],
  },
  semestral: {
    tamano: 6,
    periodos: [
      'enero a junio',
      'julio a diciembre'
    ],
  },
  anual: {
    tamano: 12,
    periodos: [
      'enero a diciembre'
    ],
  },
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ProcesoLiquidacionScreen: React.FC = () => {
  const [deudores, set_deudores] = useState<Deudor[]>([]);
  const [nombre_deudor, set_nombre_deudor] = useState('');
  const [form_liquidacion, set_form_liquidacion] = useState<FormLiquidacion>({
    id_deudor: '',
    id_expediente: '',
    ciclo_liquidacion: '',
    periodo_liquidacion: '',
    valor: 0,
  });
  const [form_detalle_liquidacion, set_form_detalle_liquidacion] = useState<FormDetalleLiquidacion[]>([]);
  const [position_tab, set_position_tab] = useState('1');
  const [open_notification_modal, set_open_notification_modal] = useState<boolean>(false);
  const [notification_info, set_notification_info] = useState({ type: '', message: '' });
  const [loading, set_loading] = useState(true);
  const [expedientes_deudor, set_expedientes_deudor] = useState<Expediente[]>([]);
  const [expediente_liquidado, set_expediente_liquidado] = useState<boolean>(false);
  const [fecha_liquidacion, set_fecha_liquidacion] = useState<Dayjs>(dayjs());
  const [fecha_vencimiento, set_fecha_vencimiento] = useState<Dayjs>(dayjs());
  const [rows_detalles, set_rows_detalles] = useState<RowDetalles[]>([]);
  const [id_liquidacion_pdf, set_id_liquidacion_pdf] = useState('');
  const [periodo_actual, set_periodo_actual] = useState<DetallePeriodo>({
    tamano: 0,
    periodos: [],
  });
  const [tamano_detalles, set_tamano_detalles] = useState<boolean>(true);
  const [periodos, set_periodos] = useState<string[]>([]);

  useEffect(() => {
    api.get('recaudo/liquidaciones/deudores')
      .then((response) => {
        set_deudores(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      }).finally(() => {
        set_loading(false);
      });
  }, []);

  useEffect(() => {
    if (form_liquidacion.id_deudor !== '') {
      api.get(`recaudo/liquidaciones/expedientes-deudor/get/${form_liquidacion.id_deudor}/`)
        .then((response) => {
          set_expedientes_deudor(response.data.data);
        })
        .catch((error) => {
          console.log(error.response.data.detail);
        });
    }
  }, [form_liquidacion.id_deudor]);

  useEffect(() => {
    if (form_liquidacion.id_expediente !== '') {
      api.get(`recaudo/liquidaciones/expedientes/${form_liquidacion.id_expediente}`)
        .then((response) => {
          set_expediente_liquidado(response.data.data.liquidado);
          get_liquidacion_por_expediente(response.data.data.liquidado);
        })
        .catch((error) => {
          console.log(error);
        })
    }
  }, [form_liquidacion.id_expediente]);

  useEffect(() => {
    const ciclo = form_liquidacion.ciclo_liquidacion;
    if (ciclo) {
      set_periodos(detalles_periodos[ciclo].periodos);
      set_periodo_actual(detalles_periodos[ciclo]);
    }
  }, [form_liquidacion.ciclo_liquidacion]);

  useEffect(() => {
    if (rows_detalles.length > 0 && rows_detalles.length === periodo_actual.tamano) {
      set_tamano_detalles(false);
    } else {
      set_tamano_detalles(true);
    }
  }, [rows_detalles.length]);

  useEffect(() => {
    if (rows_detalles.length > 0 && expediente_liquidado === false) {
      const subtotales = rows_detalles.map((detalle) => Number(detalle.valor_liquidado));
      const suma = subtotales.reduce((total, value) => total + value);
      set_form_liquidacion((previousData) => ({ ...previousData, valor: suma }));
      const form_detalles: FormDetalleLiquidacion[] = rows_detalles.map((detalle) => ({
        variables: detalle.variables,
        id_opcion_liq: detalle.id_opcion_liquidacion,
        valor: Number(detalle.valor_liquidado),
        estado: 1,
        concepto: detalle.concepto,
      }));
      set_form_detalle_liquidacion(form_detalles);
    }
  }, [rows_detalles]);

  const get_liquidacion_por_expediente = (liquidado: boolean): void => {
    if (liquidado) {
      api.get(`recaudo/liquidaciones/liquidacion-base-por-expediente/${form_liquidacion.id_expediente}`)
        .then((response) => {
          agregar_datos_inputs(response.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      set_periodos([]);
      set_form_liquidacion((previousState) => ({ ...previousState, ciclo_liquidacion: '', periodo_liquidacion: '', valor: 0 }));
      set_fecha_liquidacion(dayjs(new Date()));
      set_fecha_vencimiento(dayjs(new Date()));
      set_rows_detalles([]);
    }
  };

  const agregar_datos_inputs = (liquidacion_base: Liquidacion): void => {
    const { id, fecha_liquidacion, vencimiento, ciclo_liquidacion, periodo_liquidacion, valor, detalles } = liquidacion_base;
    set_id_liquidacion_pdf(id.toString());
    set_periodos(detalles_periodos[ciclo_liquidacion].periodos);
    set_form_liquidacion((previousState) => ({
      ...previousState,
      ciclo_liquidacion,
      periodo_liquidacion,
      valor,
    }));
    set_fecha_liquidacion(dayjs(fecha_liquidacion));
    set_fecha_vencimiento(dayjs(vencimiento));
    agregar_detalles(detalles);
  };

  const agregar_detalles = (detalles: DetallesLiquidacion[]): void => {
    const new_detalles: RowDetalles[] = detalles.map((detalle) => ({
      id: detalle.id,
      nombre_opcion: detalle.id_opcion_liq.nombre,
      concepto: detalle.concepto,
      formula_aplicada: detalle.id_opcion_liq.funcion,
      variables: detalle.variables,
      valor_liquidado: detalle.valor.toString(),
      id_opcion_liquidacion: detalle.id_opcion_liq.id.toString(),
    }));
    set_rows_detalles(new_detalles);
  };

  const add_new_row_detalles = (valor_liquidado: string, nuevas_variables: Record<string, string>, opcion_liquidacion: OpcionLiquidacion, id_opcion_liquidacion: string, concepto: string): void => {
    const new_row = {
      nombre_opcion: opcion_liquidacion.nombre,
      concepto,
      formula_aplicada: opcion_liquidacion.funcion,
      variables: nuevas_variables,
      valor_liquidado,
      id_opcion_liquidacion,
    };
    const new_row_detalles: RowDetalles[] = [];
    for (let i = 0; i < periodo_actual.tamano; i++) {
      new_row_detalles.push({ ...new_row, id: i });
    }
    set_rows_detalles(new_row_detalles);
  };

  const check_ciclo_and_periodo = (next: Function): void => {
    if (form_liquidacion.ciclo_liquidacion === '' || form_liquidacion.periodo_liquidacion === '') {
      set_notification_info({ type: 'warning', message: `Seleccione un ciclo y un periodo.` });
      set_open_notification_modal(true);
    } else {
      next();
    }
  };

  const save_calculos = (id_liquidacion: number): void => {
    api.post('recaudo/liquidaciones/calculos/', {
      id_liquidacion,
      calculos: {
        nombre_fuente: 'pozo profundo',
        predio: 'estadio macal municipio de villavicencio',
        municipio: 'villavicencio meta',
        caudal_consecionado: 2.62,
        uso: 'domestico',
        factor_regional: 0.08,
        tarifa_tasa: 1.1,
        factor_costo_oportunidad: 1,
      }
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.error(error);
    });
  };

  const handle_position_tab_change = (event: SyntheticEvent, newValue: string): void => {
    set_position_tab(newValue);
    if (newValue === '1') {
      set_form_liquidacion(previousState => ({ ...previousState, id_expediente: '' }));
    }
  }

  const handle_input_form_liquidacion_change = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    set_form_liquidacion((prevDetalles) => ({ ...prevDetalles, [name]: value }));
  }

  const handle_select_form_liquidacion_change: (event: SelectChangeEvent) => void = (event: SelectChangeEvent) => {
    const { name, value } = event.target;
    set_form_liquidacion((prevDetalles) => ({ ...prevDetalles, [name]: value }));
    if (name === 'ciclo_liquidacion') {
      set_form_liquidacion((previousState) => ({ ...previousState, periodo_liquidacion: '' }));
    }
  }

  const handle_submit_detalles_liquidacion = (id_liquidacion: number): void => {
    form_detalle_liquidacion.forEach((form) => {
      const new_objeto = {
        ...form,
        id_opcion_liq: Number(form.id_opcion_liq),
        id_liquidacion,
        valor: Math.round(form.valor),
      };
      api.post('recaudo/liquidaciones/detalles-liquidacion-base/', new_objeto)
        .then((response) => {
          console.log(response);
          set_form_liquidacion({
            id_deudor: '',
            id_expediente: '',
            ciclo_liquidacion: '',
            periodo_liquidacion: '',
            valor: 0,
          });
          set_fecha_liquidacion(dayjs(new Date()));
          set_fecha_vencimiento(dayjs(new Date()));
          set_form_detalle_liquidacion([]);
          set_rows_detalles([]);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };

  const handle_submit_liquidacion = (): void => {
    api.post('recaudo/liquidaciones/liquidacion-base/', {
      ...form_liquidacion,
      fecha_liquidacion: fecha_liquidacion.format('YYYY-MM-DDTHH:mm:ss'),
      vencimiento: fecha_vencimiento.format('YYYY-MM-DDTHH:mm:ss'),
      id_deudor: Number(form_liquidacion.id_deudor),
      id_expediente: Number(form_liquidacion.id_expediente),
      valor: Math.round(form_liquidacion.valor ?? 0),
    })
      .then((response) => {
        console.log(response);
        handle_submit_detalles_liquidacion(response.data.id);
        save_calculos(response.data.id);
        set_notification_info({ type: 'success', message: `Se ha guardado correctamente la liquidacion.` });
        set_open_notification_modal(true);
      })
      .catch((error) => {
        console.log(error);
        set_notification_info({ type: 'error', message: 'Hubo un error.' });
        set_open_notification_modal(true);
      });
  };

  const columns_deudores: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID',
      minWidth: 110,
      flex: 0.1,
    },
    {
      field: 'identificacion',
      headerName: 'Identificación',
      minWidth: 150,
      flex: 0.3,
    },
    {
      field: 'nombres',
      headerName: 'Nombres',
      minWidth: 110,
      flex: 0.1,
    },
    {
      field: 'apellidos',
      headerName: 'Apellidos',
      minWidth: 110,
      flex: 0.1,
    },
    {
      field: 'deudor',
      headerName: 'Deudor',
      minWidth: 160,
      flex: 1,
      valueGetter: (params) => {
        return `${params.row.nombres as string ?? ''} ${params.row.apellidos as string ?? ''}`;
      }
    },
    {
      field: 'acciones',
      headerName: 'Acciones',
      minWidth: 100,
      flex: 0.2,
      renderCell: (params) => {
        return (
          <Tooltip title='Liquidar'>
            <IconButton
              onClick={() => {
                set_form_liquidacion((previousData) => ({ ...previousData, id_deudor: params.row.id }));
                set_nombre_deudor(`${params.row.nombres as string ?? ''} ${params.row.apellidos as string ?? ''}`);
                set_position_tab('2');
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
                <RequestQuoteIcon
                  sx={{
                    color: 'primary.main',
                    width: '18px',
                    height: '18px'
                  }}
                />
              </Avatar>
            </IconButton>
          </Tooltip>
        );
      }
    }
  ];

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
                <TabList onChange={handle_position_tab_change}>
                  <Tab label="Deudores" value="1" />
                  <Tab label="Generar Liquidación" value="2" />
                </TabList>
              </Box>

              <TabPanel value="1" sx={{ p: '20px 0' }}>
                {/* DATAGRID LIQUIDACION */}
                <DataGrid
                  density='compact'
                  autoHeight
                  rows={deudores}
                  columns={columns_deudores}
                  pageSize={100}
                  rowsPerPageOptions={[100]}
                  experimentalFeatures={{ newEditingApi: true }}
                  getRowId={(row) => row.id}
                  components={{ Toolbar: GridToolbar }}
                  loading={loading}
                  initialState={{
                    columns: {
                      columnVisibilityModel: {
                        nombres: false,
                        apellidos: false,
                      }
                    }
                  }}
                />
              </TabPanel>

              <TabPanel value="2" sx={{ p: '20px 0' }}>
                {/* INPUTS EDITAR LIQUIDACION */}
                <GenerarLiquidacion
                  form_liquidacion={form_liquidacion}
                  nombre_deudor={nombre_deudor}
                  rows_detalles={rows_detalles}
                  expedientes_deudor={expedientes_deudor}
                  expediente_liquidado={expediente_liquidado}
                  fecha_liquidacion={fecha_liquidacion}
                  fecha_vencimiento={fecha_vencimiento}
                  id_liquidacion_pdf={id_liquidacion_pdf}
                  detalles_ciclos={detalles_ciclos}
                  periodos={periodos}
                  tamano_detalles={tamano_detalles}
                  handle_input_form_liquidacion_change={handle_input_form_liquidacion_change}
                  handle_select_form_liquidacion_change={handle_select_form_liquidacion_change}
                  handle_submit_liquidacion={handle_submit_liquidacion}
                  set_fecha_liquidacion={set_fecha_liquidacion}
                  set_fecha_vencimiento={set_fecha_vencimiento}
                />
              </TabPanel>
            </TabContext>
          </Box>
        </Grid>
      </Grid>

      <TabContext value={position_tab}>
        <TabPanel value="2" sx={{ p: '20px 0' }}>
          {/* GRID DETALLE LIQUIDACION */}
          <DetalleLiquidacion
            rows_detalles={rows_detalles}
            expediente_liquidado={expediente_liquidado}
            set_rows_detalles={set_rows_detalles}
            add_new_row_detalles={add_new_row_detalles}
            check_ciclo_and_periodo={check_ciclo_and_periodo}
          />
        </TabPanel>
      </TabContext>
      <NotificationModal
        open_notification_modal={open_notification_modal}
        set_open_notification_modal={set_open_notification_modal}
        notification_info={notification_info}
      />
    </>
  )
}