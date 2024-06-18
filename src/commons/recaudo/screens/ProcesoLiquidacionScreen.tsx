/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-unused-vars */
/* eslint no-new-func: 0 */
import { type SyntheticEvent, useState, useEffect } from 'react';
import CleanIcon from '@mui/icons-material/CleaningServices';

import {
  Box,
  Grid,
  type SelectChangeEvent,
  Tab,
  Tooltip,
  IconButton,
  Avatar,
  Button,
  TextField,
} from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import {
  GenerarLiquidacion,
  DetalleLiquidacion,
} from '../components/procesoLiquidacion';
import { Title } from '../../../components';
import type {
  DetallesLiquidacion,
  Deudor,
  EstadoExpediente,
  Expediente,
  FormDetalleLiquidacion,
  FormLiquidacion,
  Liquidacion,
  OpcionLiquidacion,
  RowDetalles,
} from '../interfaces/liquidacion';
import { DataGrid, type GridColDef, GridToolbar } from '@mui/x-data-grid';
import { api } from '../../../api/axios';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import { NotificationModal } from '../components/NotificationModal';
import dayjs, { type Dayjs } from 'dayjs';
import type { DetallePeriodo, DetallesPeriodos } from '../interfaces/proceso';
import { FacturacionVisor } from './FacturacionVisor';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { control_error } from '../../../helpers';
import { get_obligaciones_id } from '../facilidadPago/slices/ObligacionesSlice';
import { type ThunkDispatch } from '@reduxjs/toolkit';
import { useSelector, useDispatch } from 'react-redux';
import { TablaObligacionesUsuarioConsulta } from '../facilidadPago/componentes/TablaObligacionesUsuarioConsulta';
import { Article, SearchOutlined } from '@mui/icons-material';
import { DocumentoPagoPersuasivo } from '../components/GestionCartera/DocumentoPagoPersuasivo';
import { ProcesoPagoCoactivo } from '../components/GestionCartera/ProcesoPagoCoactivo';
import { SeccionEnvio_MSM_CORREO_F } from '../components/GestionCartera/secciones-etapas/SeccionEnvio_MSM_CORREO';

const detalles_ciclos: string[] = [
  'diario',
  'mensual',
  'trimestral',
  'semestral',
  'anual',
];
export interface Obligacion {
  id: number;
  nombre: string;
  inicio: string;
  nro_expediente: number;
  nro_resolucion: string;
  monto_inicial: string;
  valor_intereses: string;
  dias_mora: number;
  valor_capital_intereses: number;
}
export interface ObligacionesUsuario {
  id_deudor: number;
  nombre_completo: string;
  numero_identificacion: string;
  email: string;
  obligaciones: Obligacion[];
  tiene_facilidad: boolean;
}

interface RootStateObligaciones {
  obligaciones: {
    obligaciones: ObligacionesUsuario[];
  };
}
const detalles_periodos: DetallesPeriodos = {
  diario: {
    tamano: 1,
    periodos: ['pago unico'],
  },
  mensual: {
    tamano: 1,
    periodos: [
      'enero',
      'febrero',
      'marzo',
      'abril',
      'mayo',
      'junio',
      'julio',
      'agosto',
      'septiembre',
      'octubre',
      'noviembre',
      'diciembre',
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
    periodos: ['enero a junio', 'julio a diciembre'],
  },
  anual: {
    tamano: 12,
    periodos: ['enero a diciembre'],
  },
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ProcesoLiquidacionScreen: React.FC = () => {
  const [deudores, set_deudores] = useState<Deudor[]>([]);
  const [selectedIds, set_selectedIds] = useState<readonly string[]>([]);

  const [nombre_deudor, set_nombre_deudor] = useState('');
  const [form_liquidacion, set_form_liquidacion] = useState<FormLiquidacion>({
    id_deudor: '',
    id_expediente: '', // Pre-selecciona el primer ID
    ciclo_liquidacion: '',
    periodo_liquidacion: '',
    valor: 0,
  });
  const [form_detalle_liquidacion, set_form_detalle_liquidacion] = useState<
    FormDetalleLiquidacion[]
  >([]);
  const [position_tab, set_position_tab] = useState('1');
  const [open_notification_modal, set_open_notification_modal] =
    useState<boolean>(false);
  const [notification_info, set_notification_info] = useState({
    type: '',
    message: '',
  });
  const [loading, set_loading] = useState(true);
  const [expedientes_deudor, set_expedientes_deudor] = useState<Expediente[]>(
    []
  );
  const [estado_expediente, set_estado_expediente] =
    useState<EstadoExpediente>(null);
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

  //New States
  const [cobro_persuasivo_active, set_cobro_persuasivo_active] = useState<boolean>(false);
  const [cobro_coactivo_active, set_cobro_coactivo_active] = useState<boolean>(false);

  useEffect(() => {
    api
      .get('recaudo/liquidaciones/deudores')
      .then((response) => {
        set_deudores(response.data.data);
      })
      .catch((error) => {
        //  console.log('')(error);
      })
      .finally(() => {
        set_loading(false);
      });
  }, []);

  useEffect(() => {
    if (form_liquidacion.id_deudor !== '') {
      api
        .get(
          `recaudo/liquidaciones/expedientes-deudor/get/${form_liquidacion.id_deudor}/`
        )
        .then((response) => {
          set_expedientes_deudor(response.data.data);
        })
        .catch((error) => {
          //  console.log('')(error.response.data.detail);
        });
    }
  }, [form_liquidacion.id_deudor]);

  useEffect(() => {
    if (form_liquidacion.id_expediente !== '') {
      api
        .get(
          `recaudo/liquidaciones/expedientes/${form_liquidacion.id_expediente}`
        )
        .then((response) => {
          set_estado_expediente(response.data.data.estado);
          get_liquidacion_por_expediente(response.data.data.estado);
        })
        .catch((error) => {
          //  console.log('')(error);
        });
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
    if (
      rows_detalles.length > 0 &&
      rows_detalles.length === periodo_actual.tamano
    ) {
      set_tamano_detalles(false);
    } else {
      set_tamano_detalles(true);
    }
  }, [rows_detalles.length]);

  useEffect(() => {
    if (rows_detalles.length > 0) {
      const subtotales = rows_detalles.map((detalle) =>
        Number(detalle.valor_liquidado)
      );
      const suma = subtotales.reduce((total, value) => total + value);
      set_form_liquidacion((previousData) => ({
        ...previousData,
        valor: suma,
      }));
      const form_detalles: FormDetalleLiquidacion[] = rows_detalles.map(
        (detalle) => ({
          variables: detalle.variables,
          id_opcion_liq: detalle.id_opcion_liquidacion,
          valor: Number(detalle.valor_liquidado),
          estado: 1,
          concepto: detalle.concepto,
        })
      );
      set_form_detalle_liquidacion(form_detalles);
    }
  }, [rows_detalles]);

  const get_liquidacion_por_expediente = (
    estado_expediente: EstadoExpediente
  ): void => {
    if (estado_expediente?.toLowerCase() === 'guardado') {
      api
        .get(
          `recaudo/liquidaciones/liquidacion-base-por-expediente/${form_liquidacion.id_expediente}`
        )
        .then((response) => {
          agregar_datos_inputs(response.data.data);
        })
        .catch((error) => {
          //  console.log('')(error);
        });
    } else {
      set_periodos([]);
      set_form_liquidacion((previousState) => ({
        ...previousState,
        ciclo_liquidacion: '',
        periodo_liquidacion: '',
        valor: 0,
      }));
      set_fecha_liquidacion(dayjs(new Date()));
      set_fecha_vencimiento(dayjs(new Date()));
      set_rows_detalles([]);
    }
  };

  const agregar_datos_inputs = (liquidacion_base: Liquidacion): void => {
    const {
      id,
      fecha_liquidacion,
      vencimiento,
      ciclo_liquidacion,
      periodo_liquidacion,
      valor,
      detalles,
    } = liquidacion_base;
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

  const add_new_row_detalles = (
    valor_liquidado: string,
    nuevas_variables: Record<string, string>,
    opcion_liquidacion: OpcionLiquidacion,
    id_opcion_liquidacion: string,
    concepto: string
  ): void => {
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
    if (
      form_liquidacion.ciclo_liquidacion === '' ||
      form_liquidacion.periodo_liquidacion === ''
    ) {
      set_notification_info({
        type: 'warning',
        message: `Seleccione un ciclo y un periodo.`,
      });
      set_open_notification_modal(true);
    } else {
      next();
    }
  };

  const save_calculos = (id_liquidacion: number): void => {
    api
      .post('recaudo/liquidaciones/calculos/', {
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
        },
      })
      .then((response) => {
        //  console.log('')(response);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const update_liquidacion = (): void => {
    api
      .get(
        `recaudo/liquidaciones/liquidacion-base-por-expediente/${form_liquidacion.id_expediente}`
      )
      .then((response) => {
        agregar_datos_inputs(response.data.data);
      })
      .catch((error) => {
        //  console.log('')(error);
      });
  };

  const submit_updated_detalle = (
    id_detalle_liquidacion: number,
    variables: Record<string, string>,
    valor: string
  ): void => {
    api
      .put(
        `recaudo/liquidaciones/detalles-liquidacion-base/${id_detalle_liquidacion}/`,
        {
          variables,
          valor,
        }
      )
      .then((response) => {
        // console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const edit_liquidacion = (): void => {
    api
      .put(`recaudo/liquidaciones/liquidacion-base/${id_liquidacion_pdf}/`, {
        valor: form_liquidacion.valor,
      })
      .then((response) => {
        // console.log(response);
        set_notification_info({
          type: 'success',
          message: 'Se ha actualizado correctamente la liquidación.',
        });
        set_open_notification_modal(true);
      })
      .catch((error) => {
        console.log(error);
        set_notification_info({ type: 'success', message: 'Hubo un error' });
        set_open_notification_modal(true);
      });
  };

  const edit_detalles_liquidacion = (): void => {
    rows_detalles.forEach((detalle) => {
      submit_updated_detalle(
        detalle.id,
        detalle.variables,
        detalle.valor_liquidado
      );
    });
    edit_liquidacion();
    update_liquidacion();
  };

  const handle_position_tab_change = (
    event: SyntheticEvent,
    newValue: string
  ): void => {
    set_position_tab(newValue);
    if (newValue === '1') {
      set_form_liquidacion((previousState) => ({
        ...previousState,
        id_expediente: '',
      }));
      set_selectedIds([]);
    }
  };

  const handle_input_form_liquidacion_change = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { name, value } = event.target;
    set_form_liquidacion((prevDetalles) => ({
      ...prevDetalles,
      [name]: value,
    }));
  };

  const handle_select_form_liquidacion_change: (
    event: SelectChangeEvent
  ) => void = (event: SelectChangeEvent) => {
    const { name, value } = event.target;
    set_form_liquidacion((prevDetalles) => ({
      ...prevDetalles,
      [name]: value,
    }));
    if (name === 'ciclo_liquidacion') {
      set_form_liquidacion((previousState) => ({
        ...previousState,
        periodo_liquidacion: '',
      }));
    }
  };

  const handle_submit_detalles_liquidacion = (id_liquidacion: number): void => {
    form_detalle_liquidacion.forEach((form) => {
      const new_objeto = {
        ...form,
        id_opcion_liq: Number(form.id_opcion_liq),
        id_liquidacion,
        valor: form.valor.toFixed(4),
      };
      api
        .post('recaudo/liquidaciones/detalles-liquidacion-base/', new_objeto)
        .then((response) => {
          //  console.log('')(response);
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
          set_id_liquidacion_pdf('');
        })
        .catch((error) => {
          //  console.log('')(error);
        });
    });
  };

  const handle_submit_liquidacion = (): void => {
    api
      .post('recaudo/liquidaciones/liquidacion-base/', {
        ...form_liquidacion,
        fecha_liquidacion: fecha_liquidacion.format('YYYY-MM-DDTHH:mm:ss'),
        vencimiento: fecha_vencimiento.format('YYYY-MM-DDTHH:mm:ss'),
        id_deudor: Number(form_liquidacion.id_deudor),
        id_expediente: Number(form_liquidacion.id_expediente),
        valor: form_liquidacion.valor?.toFixed(4),
      })
      .then((response) => {
        //  console.log('')(response);
        handle_submit_detalles_liquidacion(response.data.id);
        save_calculos(response.data.id);
        set_notification_info({
          type: 'success',
          message: `Se ha guardado correctamente la liquidacion.`,
        });
        set_open_notification_modal(true);
      })
      .catch((error) => {
        //  console.log('')(error);
        set_notification_info({ type: 'error', message: 'Hubo un error.' });
        set_open_notification_modal(true);
      });
  };

  const handle_submit_liquidacionma = (): void => {
    api
      .post('/recaudo/liquidaciones/liquidacion-masivo/', {
        ...form_liquidacion,
        fecha_liquidacion: fecha_liquidacion.format('YYYY-MM-DDTHH:mm:ss'),
        vencimiento: fecha_vencimiento.format('YYYY-MM-DDTHH:mm:ss'),
        id_deudor: Number(form_liquidacion.id_deudor),
        id_expediente: selectedIds,
        valor: form_liquidacion.valor?.toFixed(4),
      })
      .then((response) => {
        //  console.log('')(response);
        handle_submit_detalles_liquidacion(response.data.id);
        save_calculos(response.data.id);
        set_notification_info({
          type: 'success',
          message: `Se ha guardado correctamente la liquidacion.`,
        });
        set_open_notification_modal(true);
      })
      .catch((error) => {
        //  console.log('')(error);
        set_notification_info({ type: 'error', message: 'Hubo un error.' });
        set_open_notification_modal(true);
      });
  };

  const [obligaciones_module, set_obligaciones_module] = useState(false);
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const { obligaciones } = useSelector(
    (state: RootStateObligaciones) => state.obligaciones
  );

  const columns_deudores: GridColDef[] = [
    // {
    //   field: 'id',
    //   headerName: 'ID',
    //   minWidth: 110,
    //   flex: 0.1,
    // },
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
        return `${(params.row.nombres as string) ?? ''} ${
          (params.row.apellidos as string) ?? ''
        }`;
      },
    },
    {
      field: 'Estado',
      headerName: 'Estado',
      minWidth: 210,
      flex: 0.1,
      valueGetter: (params) => {
        return params.value ?? 'Sin tipo estaddo';
      },
    },
    {
      field: 'Periodo',
      headerName: 'Periodo',
      minWidth: 210,
      flex: 0.1,
      valueGetter: (params) => {
        return params.value ?? 'Sin Periodo  ';
      },
    },
    {
      field: 'Tipo de cobro',
      headerName: 'Tipo de cobro',
      minWidth: 210,
      flex: 0.1,
      valueGetter: (params) => {
        return params.value ?? 'Sin Tipo de cobro  ';
      },
    },
    {
      field: 'Tipo de renta',
      headerName: 'Tipo de renta',
      minWidth: 210,
      flex: 0.1,
      valueGetter: (params) => {
        return params.value ?? 'Sin Tipo de renta  ';
      },
    },

    {
      field: 'acciones',
      headerName: 'Acciones',
      minWidth: 100,
      flex: 0.2,
      renderCell: (params) => {
        return (
          <>
            <Tooltip title="Ver">
              <IconButton
                onClick={() => {
                  set_form_liquidacion((previousData) => ({
                    ...previousData,
                    id_deudor: params.row.id,
                  }));
                  set_nombre_deudor(
                    `${(params.row.nombres as string) ?? ''} ${
                      (params.row.apellidos as string) ?? ''
                    }`
                  );
                  try {
                    void dispatch(
                      get_obligaciones_id(params.row.identificacion)
                    );
                    set_obligaciones_module(true);
                    handle_open_buscarr();
                  } catch (error: any) {
                    // Manejo del error
                    control_error(error.response.data.detail);
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
            {/* <Tooltip title='Liquidar'>
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
          </Tooltip> */}
            <IconButton
              onClick={() => {
                set_form_liquidacion((previousData) => ({
                  ...previousData,
                  id_deudor: params.row.id,
                }));
                set_nombre_deudor(
                  `${(params.row.nombres as string) ?? ''} ${
                    (params.row.apellidos as string) ?? ''
                  }`
                );
                // set_position_tab('2');
                handle_open_buscar();
              }}
            >
              <VisibilityIcon sx={{ color: 'primary.main' }} />{' '}
              {/* Ícono del ojo */}
            </IconButton>
          </>
        );
      },
    },
  ];
  const [is_modal_active, set_is_buscar] = useState<boolean>(false);
  const handle_open_buscar = (): void => {
    set_is_buscar(true);
  };

  const [is_modal_activee, set_is_buscarr] = useState<boolean>(false);
  const handle_open_buscarr = (): void => {
    set_is_buscarr(true);
  };

  const [filtroIdentificacion, setFiltroIdentificacion] = useState('');
  const [filtroNombres, setFiltroNombres] = useState('');

  const handleBuscar = () => {


    const deudoresFiltrados = deudores.filter(
      (deudor) =>
        deudor.identificacion.includes(filtroIdentificacion) &&
        deudor.nombres.toLowerCase().includes(filtroNombres.toLowerCase())
    );
    set_deudores(deudoresFiltrados);
  };





  const handleClear = () => {
    setFiltroNombres('');
    setFiltroIdentificacion('');

    api
      .get('recaudo/liquidaciones/deudores')
      .then((response) => {
        set_deudores(response.data.data);
      })
      .catch((error) => {
        //  console.log('')(error);
      })
      .finally(() => {
        set_loading(false);
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
        {/* <Button onClick={handle_open_buscar} fullWidth variant="outlined"    >
          Crear
        </Button> */}

        <FacturacionVisor
          rows_detalles={rows_detalles}
          is_modal_active={is_modal_active}
          set_is_modal_active={set_is_buscar}
          form_liquidacion={form_liquidacion}
          expedientes_deudor={expedientes_deudor}
          id_liquidacion_pdf={id_liquidacion_pdf}
          handle_select_form_liquidacion_change={
            handle_select_form_liquidacion_change
          }
        />
        <Grid item xs={12}>
          <Title title="Proceso de Liquidación"></Title>
          <Box
            component="form"
            sx={{ mt: '20px' }}
            noValidate
            autoComplete="off"
          >
            <TabContext value={position_tab}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handle_position_tab_change}>
                  <Tab label="Deudores" value="1" />
                  <Tab label="Generar Liquidación" disabled value="2" />
                  {cobro_persuasivo_active && <Tab label="Proceso cobro Persuasivo" value="3"/>}
                  {cobro_coactivo_active && <Tab label="Proceso Cobro Coactivo" value="4"/>}
                </TabList>
              </Box>

              <TabPanel value="1" sx={{ p: '20px 0' }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      label="Identificación"
                      variant="outlined"
                      size="small"
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                      value={filtroIdentificacion}
                      onChange={(e) => setFiltroIdentificacion(e.target.value)}
                    />
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <TextField
                      label="Deudor"
                      variant="outlined"
                      size="small"
                      fullWidth
                      value={filtroNombres}
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => setFiltroNombres(e.target.value)}
                    />
                  </Grid>
                  <Grid item>
                    <Button
                      startIcon={<SearchOutlined />}
                      variant="contained"
                      fullWidth
                      onClick={handleBuscar}
                    >
                      Buscar
                    </Button>
                  </Grid>

                  <Grid item>
                    <Button
                      onClick={handleClear}
                      color="primary"
                      variant="outlined"
                      fullWidth
                      startIcon={<CleanIcon />}
                    >
                      Limpiar campos
                    </Button>
                  </Grid>
                </Grid>

                {/* DATAGRID LIQUIDACION */}

                <Grid item marginTop={2} >
                  <DataGrid
                    density="compact"
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
                        },
                      },
                    }}
                  />
                </Grid>

                {obligaciones_module ? (
                  <Grid
                    container
                    sx={{
                      position: 'relative',
                      // background: '#FAFAFA',
                      borderRadius: '15px',
                      mb: '20px',
                      mt: '20px',
                      p: '20px',
                      // boxShadow: '0px 3px 6px #042F4A26',
                    }}
                  >
                    <Grid item xs={12}>
                      <Box component="form" noValidate autoComplete="off">
                        {obligaciones.length !== 0 ? (
                          <>
                            <TablaObligacionesUsuarioConsulta
                              set_position_tab={set_position_tab}
                              set_cobro_persuasivo_active={set_cobro_persuasivo_active}
                              is_modal_active={is_modal_activee}
                              set_is_modal_active={set_is_buscarr}
                              set_selectedIds={set_selectedIds}
                              selectedIds={selectedIds}
                            />
                          </>
                        ) : (
                          <p>.</p>
                        )}
                      </Box>
                    </Grid>
                  </Grid>
                ) : null}
              </TabPanel>

              <TabPanel value="2" sx={{ p: '20px 0' }}>
                {/* INPUTS EDITAR LIQUIDACION */}
                <GenerarLiquidacion
                  set_form_liquidacion={set_form_liquidacion}
                  form_liquidacion={form_liquidacion}
                  nombre_deudor={nombre_deudor}
                  rows_detalles={rows_detalles}
                  expedientes_deudor={expedientes_deudor}
                  estado_expediente={estado_expediente}
                  fecha_liquidacion={fecha_liquidacion}
                  fecha_vencimiento={fecha_vencimiento}
                  id_liquidacion_pdf={id_liquidacion_pdf}
                  detalles_ciclos={detalles_ciclos}
                  periodos={periodos}
                  tamano_detalles={tamano_detalles}
                  handle_input_form_liquidacion_change={
                    handle_input_form_liquidacion_change
                  }
                  handle_select_form_liquidacion_change={
                    handle_select_form_liquidacion_change
                  }
                  handle_submit_liquidacion={handle_submit_liquidacion}
                  handle_submit_liquidacionma={handle_submit_liquidacionma}
                  set_fecha_liquidacion={set_fecha_liquidacion}
                  set_fecha_vencimiento={set_fecha_vencimiento}
                  set_selectedIds={set_selectedIds}
                  selectedIds={selectedIds}
                />
              </TabPanel>

              {cobro_persuasivo_active && <TabPanel value="3" sx={{ p: '20px 0' }}>
                  <DocumentoPagoPersuasivo
                    set_cobro_coactivo_active={set_cobro_coactivo_active}
                    set_position_tab_up={set_position_tab}
                    // datos={datos}
                  ></DocumentoPagoPersuasivo>
              </TabPanel>}
              {cobro_coactivo_active && <TabPanel value="4" sx={{ p: '20px 0' }}>
                  <ProcesoPagoCoactivo
                    // datos={datos}
                  ></ProcesoPagoCoactivo>
              </TabPanel>}
            </TabContext>
          </Box>
        </Grid>
      </Grid>

      {/* {position_tab !== '1'&& position_tab !== '2' && <SeccionEnvio_MSM_CORREO_F

      />} */}

      <TabContext value={position_tab}>
        <TabPanel value="2" sx={{ p: '20px 0' }}>
          {/* GRID DETALLE LIQUIDACION */}
          <DetalleLiquidacion
            form_liquidacion={form_liquidacion}
            rows_detalles={rows_detalles}
            estado_expediente={estado_expediente}
            set_rows_detalles={set_rows_detalles}
            add_new_row_detalles={add_new_row_detalles}
            check_ciclo_and_periodo={check_ciclo_and_periodo}
            edit_detalles_liquidacion={edit_detalles_liquidacion}
          />
        </TabPanel>
      </TabContext>
      <NotificationModal
        open_notification_modal={open_notification_modal}
        set_open_notification_modal={set_open_notification_modal}
        notification_info={notification_info}
      />
    </>
  );
};
