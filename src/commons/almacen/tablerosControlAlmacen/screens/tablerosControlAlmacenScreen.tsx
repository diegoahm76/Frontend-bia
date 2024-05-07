/* eslint-disable @typescript-eslint/restrict-plus-operands */
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  type SelectChangeEvent,
  TextField,
  Box,
  Button,
  Stack,
  Switch,
  FormHelperText,
  CircularProgress,
} from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { Title } from '../../../../components';
import SearchIcon from '@mui/icons-material/Search';
import { useAppDispatch } from '../../../../hooks';
import { useNavigate } from 'react-router-dom';
import { ResultadosBusqueda } from './ResultadosBusqueda';
import dayjs from 'dayjs';
import ClearIcon from '@mui/icons-material/Clear';
import CleanIcon from '@mui/icons-material/CleaningServices';
import BuscarBienConsumo from '../../controlDeInventario/screens/BuscarBienConsumo';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import {
  get_bienes_activos,
  get_bienes_consumo_entregados,
  get_historico_todos_vehiculos,
  get_historico_vehiculo,
  get_movimientos_inventario,
  get_tipos_bienes,
  get_tipos_categorias,
  obtener_consumo_bienes_und,
  obtener_control_stock,
  obtener_entradas_inventario,
  obtener_mantenimientos_realizados,
  obtener_movimientos_incautados,
  obtener_mtto_programados,
  obtener_tipos_bien,
  obtener_tipos_mantenimiento,
  obtener_unidades_organizacionales,
} from '../thunks/tablerosControlAlmacen';
import { BuscadorPersonaDialog } from '../../gestionDeInventario/gestionHojaDeVida/mantenimiento/components/RegistroMantenimiento/RegistroMantenimientoGeneral/BuscadorPersonaDialog';
import { obtener_bodegas } from '../../controlDeInventario/thunks/ControlDeInventarios';
import { ResultadosBusquedaTable } from './ResultadosBusquedaTable';
import MovimientosActivosFijosInventario from '../components_reports/MovimientosActivosFijosInventario';
import {
  interface_bienes_consumo_entregado,
  interface_busqueda_vehiculos,
  interface_historico_vehiculo,
  interface_inputs_bce,
  interface_inputs_huv,
  interface_inputs_mafi,
  interface_inputs_msi,
  interface_inputs_rabp,
  interface_movimientos_inventario,
  response_bienes_consumo_entregado,
  response_historico_vehiculo,
  response_movimientos_inventario,
} from '../interfaces/types';
import { control_error } from '../../../../helpers';
import TablaMovimientosInventario from '../tables/TablaMovimientosInventario';
import ReportesAlmacenBienesPrestamo from '../components_reports/ReportesAlmacenBienesPrestamo';
import TablaReportesAlmacenBienesPrestamo from '../tables/TablaReportesAlmacenBienesPrestamo';
import BienesConsumoEntregados from '../components_reports/BienesConsumoEntregados';
import TablaBienesConsumoEntregados from '../tables/TablaBienesConsumoEntregados';
import HistoricoUsoVehiculos from '../components_reports/HistoricoUsoVehiculos';
import TablaHistoricoUsoVehiculos from '../tables/TablaHistoricoUsoVehiculos';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const TablerosControlAlmacenScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const estilo_seccion = {
    position: 'relative',
    background: '#FAFAFA',
    borderRadius: '15px',
    p: '20px',
    mb: '20px',
    boxShadow: '0px 3px 6px #042F4A26',
  };

  // estado para loadding para el boton de consultar
  const [loadding_consultar, set_loadding_consultar] = useState<boolean>(false);

  // Estados para MAFI - Movimientos sobre los bienes (activos fijos) del inventario
  //se guardar un objeto con los valores de los inputs de la busqueda
  const [inputs_mafi, set_inputs_mafi] = useState<interface_inputs_mafi>(Object);
  // data de los movimientos de inventario traidos por la busqueda
  const [data_mafi, set_data_mafi] = useState<interface_movimientos_inventario[]>([]);

  // Estados para RABP - Reportes Almacén – Bienes (activos fijos) en préstamo
  //se guardar un objeto con los valores de los inputs de la busqueda
  const [inputs_rabp, set_inputs_rabp] = useState<interface_inputs_rabp>(Object);
  // data de los movimientos de inventario traidos por la busqueda
  const [data_rabp, set_data_rabp] = useState<any[]>([]);

  // Estados para BCE - Bienes de consumo entregados
  //se guardar un objeto con los valores de los inputs de la busqueda
  const [inputs_bce, set_inputs_bce] = useState<interface_inputs_bce>(Object);
  // data de bienes de consumo entregados traidos por la busqueda
  const [data_bce, set_data_bce] = useState<interface_bienes_consumo_entregado[]>([]);

  // Estados para HUV - Histórico de Uso de Vehículos
  //se guardar un objeto con los valores de los inputs de la busqueda
  const [inputs_huv, set_inputs_huv] = useState<interface_inputs_huv>(Object);
  // vehciulo seleccionado en caso de que el tipo de busqueda sea por vehiculo
  const [data_vehiculo_seleccionado, set_data_vehiculo_seleccionado] = useState<interface_busqueda_vehiculos>(Object);
  // data de historico de uso de vehiculos
  const [data_huv, set_data_huv] = useState<interface_historico_vehiculo[]>([]);
  
  // Actualizacion a MSI
  // tipos de castegorias de bienes [carro, computador, etc]
  const [tipos_categoria, set_tipos_categoria] = useState<any[]>([]);
  // tipos de bienes [activo fijo, consumo]
  const [tipos_bienes, set_tipos_bienes] = useState<any[]>([]);
  // input agregados a la actualizacion de MSI
  const [inputs_msi, set_inputs_msi] = useState<interface_inputs_msi>(Object)


  const get_tipos_categoria_fc = async () => {
    dispatch(get_tipos_categorias()).then((response: any) => {
      if (Object.keys(response).length !== 0) {
        set_tipos_categoria(response);
      } else {
        control_error('Hubo un error al obtener los tipos de categorias');
        set_tipos_categoria([]);
      }
    });
  };

  const get_tipos_bienes_fc = async () => {
    dispatch(get_tipos_bienes()).then((response: any) => {
      if (Object.keys(response).length !== 0) {
        set_tipos_bienes(response);
      } else {
        control_error('Hubo un error al obtener los tipos de bien');
        set_tipos_bienes([]);
      }
    });
  };

  const servicios_obtenidos = useRef(false);
  useEffect(() => {
    if (!servicios_obtenidos.current) {
      get_tipos_categoria_fc();
      get_tipos_bienes_fc();
      servicios_obtenidos.current = true;
    }
  }, [servicios_obtenidos]);


  useEffect(() => {
    if (Object.keys(data_vehiculo_seleccionado).length !== 0) {
      set_inputs_huv((prev) => {
        return {
          ...prev,
          nombre_vehiculo: data_vehiculo_seleccionado.nombre
        }
      })
    }
  }, [data_vehiculo_seleccionado])

  useEffect(() => {
    obtener_unidades_organizacionales_fc();
    obtener_tipos_mantenimiento_fc();
    obtener_bodegas_fc();
    obtener_tipos_bien_fc();
  }, []);

  const obtener_unidades_organizacionales_fc: () => void = () => {
    dispatch(obtener_unidades_organizacionales()).then((response: any) => {
      const unidades = response.Unidades.filter((und: any) => und.activo);
      set_lt_unidades_org(unidades);
    });
  };
  const obtener_tipos_mantenimiento_fc: () => void = () => {
    dispatch(obtener_tipos_mantenimiento()).then((response: any) => {
      set_lt_tipo_mantenimiento(response);
    });
  };
  const obtener_tipos_bien_fc: () => void = () => {
    dispatch(obtener_tipos_bien()).then((response: any) => {
      set_lt_tipo_bien(response);
    });
  };
  const obtener_bodegas_fc: () => void = () => {
    dispatch(obtener_bodegas()).then((response: any) => {
      const bodegas_activas = response.filter(
        (resp: { activo: boolean }) => resp.activo
      );
      //  console.log('')('filtrado activo: ', bodegas_activas)
      set_lt_bodegas(bodegas_activas);
    });
  };
  // Listas
  const lt_tablero_control = [
    { id: 'CBU', value: 'Consumo de bienes por unidad' },
    { id: 'MP', value: 'Mantenimientos programados' },
    { id: 'CS', value: 'Control de stock' },
    { id: 'EI', value: 'Entradas a inventario' },
    { id: 'MSI', value: 'Movimientos sobre incautados' },
    { id: 'MR', value: 'Mantenimientos realizados' },
    { id: 'MAFI', value: 'Movimientos sobre los bienes (activos fijos) del inventario' },
    { id: 'RABP', value: 'Reportes Almacén – Bienes (activos fijos) en préstamo' },
    { id: 'BCE', value: 'Bienes de consumo entregados' },
    { id: 'HUV', value: 'Histórico de Uso de Vehículos' },
  ];

  const lt_tipo_despacho = [{ id: 'DG', value: 'Despacho general' }, { id: 'DV', value: 'Despacho a vivero' }];
  const lt_presentacion = [{ id: "UND", value: "Unidad" }, { id: "BN", value: "Bien" }];
  const lt_presentacion_b = [{ id: "BD", value: "Bodega" }, { id: "BN", value: "Bien" }];
  // Variables globales
  const [resultado_busqueda, set_resultado_busqueda] = useState<any[]>([]);
  const [lt_unidades_org, set_lt_unidades_org] = useState<any[]>([]);
  const [lt_bodegas, set_lt_bodegas] = useState<any[]>([]);
  const [lt_tipo_bien, set_lt_tipo_bien] = useState<any[]>([]);
  const [lt_tipo_mantenimiento, set_lt_tipo_mantenimiento] = useState<any[]>([]);
  const [seleccion_tablero_control, set_seleccion_tablero_control] = useState<string>("");
  const [seleccion_tipo_despacho, set_seleccion_tipo_despacho] = useState<string>("");
  const [seleccion_unidad_org, set_seleccion_unidad_org] = useState<string>("");
  const [seleccion_presentacion, set_seleccion_presentacion] = useState<string>("BN");
  const [seleccion_tipo_mtto, set_seleccion_tipo_mtto] = useState<string>("");
  const [seleccion_tipo_bien, set_seleccion_tipo_bien] = useState<string>("");
  const [seleccion_bodega, set_seleccion_bodega] = useState<string>("");
  const [nombre_archivo, set_nombre_archivo] = useState<string>("");
  const [realizado, set_realizado] = useState<any | null>({ nombre_completo: "" });
  const [seleccion_bien, set_seleccion_bien] = useState<any>("");
  const [filtros, set_filtros] = useState<any[]>([]);
  const [filtros_pdf, set_filtros_pdf] = useState<any[]>([]);
  const [fecha_desde, set_fecha_desde] = useState<Date | null>(null);
  const [fecha_hasta, set_fecha_hasta] = useState<Date | null>(null);
  const [discriminar, set_discriminar] = useState<boolean>(false);
  const [abrir_modal_bien, set_abrir_modal_bien] = useState<boolean>(false);
  const [error_fecha_desde, set_error_fecha_desde] = useState<boolean>(false);
  const [error_fecha_hasta, set_error_fecha_hasta] = useState<boolean>(false);
  const [abrir_modal_persona, set_abrir_modal_persona] =
    useState<boolean>(false);

  const cambio_tablero_control: (event: SelectChangeEvent) => void = (
    e: SelectChangeEvent
  ) => {
    set_seleccion_tablero_control(e.target.value);
    limpiar_filtros();
  }
  const cambio_tipo_despacho: (event: SelectChangeEvent) => void = (e: SelectChangeEvent) => {
    set_seleccion_tipo_despacho(e.target.value);
  }
  const cambio_unidad_org: (event: SelectChangeEvent) => void = (e: SelectChangeEvent) => {
    set_seleccion_unidad_org(e.target.value);
  }
  const cambio_presentacion: (event: SelectChangeEvent) => void = (e: SelectChangeEvent) => {
    set_seleccion_presentacion(e.target.value);
  }
  const cambio_tipo_bien: (event: SelectChangeEvent) => void = (e: SelectChangeEvent) => {
    set_seleccion_tipo_bien(e.target.value);
  }
  const cambio_tipo_mtto: (event: SelectChangeEvent) => void = (e: SelectChangeEvent) => {
    set_seleccion_tipo_mtto(e.target.value);
  }
  const cambio_bodega: (event: SelectChangeEvent) => void = (e: SelectChangeEvent) => {
    set_seleccion_bodega(e.target.value);
  }
  const handle_change_fecha_desde = (date: Date | null): void => {
    set_fecha_desde(date);
    set_error_fecha_desde(date === null);
  };
  const handle_change_fecha_hasta = (date: Date | null): void => {
    set_fecha_hasta(date);
    set_error_fecha_hasta(date === null);
  };

  const limpiar_filtros: () => void = () => {
    set_seleccion_unidad_org('');
    set_seleccion_tipo_despacho('');
    set_seleccion_presentacion('BN');
    set_seleccion_bien('');
    set_realizado({ nombre_completo: "" });
    set_seleccion_tipo_bien('');
    set_seleccion_tipo_mtto('');
    set_fecha_desde(null);
    set_fecha_hasta(null);
    set_error_fecha_desde(false);
    set_error_fecha_hasta(false);
    set_discriminar(false);
    set_resultado_busqueda([]);
    set_inputs_mafi({} as interface_inputs_mafi);
    set_data_mafi([]);
    set_inputs_rabp({} as interface_inputs_rabp);
    set_data_rabp([]);
    set_inputs_bce({} as interface_inputs_bce);
    set_data_bce([]);
    set_data_vehiculo_seleccionado({} as interface_busqueda_vehiculos)
    set_data_huv([]);
    set_inputs_huv({} as interface_inputs_huv);
  };

  const limpiar_todo: () => void = () => {
    set_seleccion_tablero_control('');
    limpiar_filtros();
  }

  const salir_entrada: () => void = () => {
    navigate('/home');
  }

  const crear_objeto_filtro: () => void = () => {
    const tipo_despacho = (seleccion_tipo_despacho === 'Todos' || seleccion_tipo_despacho === '') ? 'Todos' : seleccion_tipo_despacho === 'DV' ? 'Despacho a vivero' : 'Despacho general';
    const nombre_unidad_org = (seleccion_unidad_org === 'Todos' || seleccion_unidad_org === '') ? 'Todos' : lt_unidades_org.find(lt => lt.id === seleccion_unidad_org)?.value;
    const nombre_bien = seleccion_bien !== undefined && seleccion_bien !== '' ? seleccion_bien.nombre_bien : '';
    const nombre = lt_tablero_control.find(lt => lt.id === seleccion_tablero_control)?.value;
    if (nombre !== undefined)
      set_nombre_archivo(nombre)
    switch (seleccion_tablero_control) {
      case 'CBU':
        set_filtros([{ 'Tipo de despacho': tipo_despacho, Bien: nombre_bien, 'Unidad organizacional que recibe': nombre_unidad_org, discriminar: discriminar ? 'Si' : 'No', 'Fecha desde': dayjs(fecha_desde).format('YYYY-MM-DD'), 'Fecha hasta': dayjs(fecha_hasta).format('YYYY-MM-DD') }])
        set_filtros_pdf([{ tipo_despacho: tipo_despacho, nombre_bien: nombre_bien, nombre_unidad_org: nombre_unidad_org, discriminar: discriminar ? 'Si' : 'No', fecha_desde: dayjs(fecha_desde).format('YYYY-MM-DD'), fecha_hasta: dayjs(fecha_hasta).format('YYYY-MM-DD') }])
        break;
      default:
        set_filtros([]);
        set_filtros_pdf([]);
        break;
    }
  };

  const busqueda_control: () => void = () => {
    crear_objeto_filtro();
    switch (seleccion_tablero_control) {
      case 'CBU':
        if (fecha_desde === null || fecha_hasta === null) {
          set_error_fecha_desde(fecha_desde === null);
          set_error_fecha_hasta(fecha_hasta === null);
          return
        }
        const tipo_despacho = (seleccion_tipo_despacho === 'Todos' || seleccion_tipo_despacho === '') ? seleccion_tipo_despacho : seleccion_tipo_despacho === 'DV';
        const id_bien = seleccion_bien !== undefined && seleccion_bien !== '' ? seleccion_bien.id_bien : '';
        dispatch(obtener_consumo_bienes_und({ seleccion_tipo_despacho: tipo_despacho, seleccion_bien: id_bien, seleccion_unidad_org, discriminar, fecha_desde: dayjs(fecha_desde).format('YYYY-MM-DD'), fecha_hasta: dayjs(fecha_hasta).format('YYYY-MM-DD') })).then((response: any) => {
          set_resultado_busqueda(response.data);
        });
        break;
      case 'MP':
        dispatch(obtener_mtto_programados()).then((response: any) => {
          let resultado: any[] = [];
          let data = ordenar_fechas(response.data, 'fecha_programada', 'desc');
          let data_programada_v = data.filter((d: any) => (d.fecha_programada !== null && d.dias_kilometros_vencidos !== null));
          let data_programada_nv = data.filter((d: any) => (d.fecha_programada !== null && d.dias_kilometros_vencidos === null));
          let data_kilometros_v = data.filter((d: any) => d.kilometraje_programado !== null && d.dias_kilometros_vencidos !== null);
          let data_kilometros_nv = ordenar(data.filter((d: any) => d.kilometraje_programado !== null && d.dias_kilometros_vencidos === null), 'dias_kilometros_vencidos', 'asc');

          ordenar(
            data_kilometros_v,
            'dias_kilometros_vencidos',
            'desc'
          ).forEach((data_o: any) => {
            resultado.push(data_o);
          });
          ordenar(
            data_programada_v,
            'dias_kilometros_vencidos',
            'desc'
          ).forEach((data_o: any) => {
            resultado.push(data_o);
          });
          data_kilometros_nv.forEach((data_o: any) => {
            resultado.push(data_o);
          });
          data_programada_nv.forEach((data_o: any) => {
            resultado.push(data_o);
          });
          set_resultado_busqueda(set_campos(resultado));
        });
        break;
      case 'CS':
        const solictiable = seleccion_tipo_bien === 'SV';
        dispatch(obtener_control_stock(solictiable)).then((response: any) => {
          set_resultado_busqueda(response.data);
        });
        break;
      case 'MSI':
        set_loadding_consultar(true);
        // MSI - Movimientos sobre incautados
        if(inputs_msi?.tipo_bien === '' || inputs_msi?.tipo_bien === undefined){
          control_error('Debe seleccionar un tipo de bien para realizar la consulta');
          set_loadding_consultar(false);
          return;
        } else {
            if (fecha_desde === null || fecha_hasta === null) {
              control_error('Debe seleccionar un rango de fechas para realizar la consulta');
              set_loadding_consultar(false);
              return;
            }
            dispatch(
              obtener_movimientos_incautados({
                categoria: inputs_msi?.tipo_bien === 'A' ? inputs_msi?.tipo_categoria : '',
                fecha_desde: dayjs(fecha_desde).format('YYYY-MM-DD'), 
                fecha_hasta: dayjs(fecha_hasta).format('YYYY-MM-DD')
              }))
                .then((response: any) => {
                  if(Object.keys(response).length === 0){
                    set_loadding_consultar(false);
                    control_error('Hubo un error al obtener los movimientos de incautados');
                  } else {
                    if(response.data.length === 0){
                      set_loadding_consultar(false);
                      control_error('No se encontraron resultados');
                    } else {
                      set_resultado_busqueda(response.data);
                      set_loadding_consultar(false);
                    }
                  }
            });
        }

        break;
      case 'MR':
        if (fecha_desde === null || fecha_hasta === null) {
          set_error_fecha_desde(fecha_desde === null);
          set_error_fecha_hasta(fecha_hasta === null);
          return;
        }
        dispatch(obtener_mantenimientos_realizados({ seleccion_tipo_mtto, realizado: realizado.id_persona, fecha_desde: dayjs(fecha_desde).format('YYYY-MM-DD'), fecha_hasta: dayjs(fecha_hasta).format('YYYY-MM-DD') })).then((response: any) => {
          set_resultado_busqueda(response.data);
        });
        break;
      case 'EI':
        if (fecha_desde === null || fecha_hasta === null) {
          set_error_fecha_desde(fecha_desde === null);
          set_error_fecha_hasta(fecha_hasta === null);
          return;
        }
        dispatch(obtener_entradas_inventario({ seleccion_bodega, seleccion_tipo_bien, fecha_desde: dayjs(fecha_desde).format('YYYY-MM-DD'), fecha_hasta: dayjs(fecha_hasta).format('YYYY-MM-DD') })).then((response: any) => {
          set_resultado_busqueda(response.data);
        });
        break;
      case 'MAFI':
        // MAFI - Movimientos sobre los bienes (activos fijos) del inventario
        set_loadding_consultar(true);
        dispatch(
          get_movimientos_inventario(
            inputs_mafi.tipo_activo ?? '',
            inputs_mafi.fecha_desde ?? '',
            inputs_mafi.fecha_hasta ?? ''
          )
        ).then((response: response_movimientos_inventario) => {
          if (Object.keys(response)?.length !== 0) {
            if (response.data?.length > 0) {
              set_data_mafi(response.data);
              set_loadding_consultar(false);
            } else {
              set_data_mafi([]);
              control_error('No se encontraron movimientos de inventario');
              set_loadding_consultar(false);
            }
          } else {
            set_loadding_consultar(false);
            control_error('Hubo un error al obtener los movimientos de inventario. Intente de nuevo.');
          }
        });
        break;
      case 'RABP':
        // RABP - Reportes Almacén – Bienes (activos fijos) en préstamo
        set_loadding_consultar(true);
        dispatch(
          get_bienes_activos(
            inputs_rabp.tipo_categoria ?? '',
            inputs_rabp.fecha_desde ?? '',
            inputs_rabp.fecha_hasta ?? ''
          )
        ).then((response: any) => {
          if (Object.keys(response)?.length !== 0) {
            if (response.data?.length > 0) {
              set_data_rabp(response.data);
              set_loadding_consultar(false);
            } else {
              set_data_rabp([]);
              control_error('No se encontraron resultados');
              set_loadding_consultar(false);
            }
          } else {
            set_loadding_consultar(false);
            control_error('Hubo un error al obtener la informacion del servicio');
          }
        });
        break;
      case 'BCE':
        // Bienes de consumo entregados
        set_loadding_consultar(true);
        dispatch(
          get_bienes_consumo_entregados(
            inputs_rabp.fecha_desde ?? '',
            inputs_rabp.fecha_hasta ?? ''
          )
        ).then((response: response_bienes_consumo_entregado) => {
          if (Object.keys(response)?.length !== 0) {
            if (response.data?.length > 0) {
              set_data_bce(response.data);
              set_loadding_consultar(false);
            } else {
              set_data_bce([]);
              control_error('No se encontraron resultados');
              set_loadding_consultar(false);
            }
          } else {
            set_loadding_consultar(false);
            control_error('Hubo un error al obtener la informacion del servicio');
          }
        });
        break;
      case 'HUV':
        // Histórico de Uso de Vehículos
        if (inputs_huv.tipo_consulta === 'vehiculo_especifico') {
          // En caso que el tipo de consulta del input de seleccion sea por vehiculo especifico
          if (Object.keys(data_vehiculo_seleccionado).length === 0) {
            control_error('Debe seleccionar un vehículo para realizar la consulta');
            return;
          } else {
            set_loadding_consultar(true);
            dispatch(
              get_historico_vehiculo(data_vehiculo_seleccionado.id_hoja_de_vida ?? '',)
            ).then((response: response_historico_vehiculo) => {
              if (Object.keys(response)?.length !== 0) {
                if (response.data?.length > 0) {
                  set_data_huv(response.data);
                  set_loadding_consultar(false);
                } else {
                  set_data_huv([]);
                  control_error('No se encontraron resultados');
                  set_loadding_consultar(false);
                }
              } else {
                set_loadding_consultar(false);
                control_error('Hubo un error al obtener la informacion del servicio');
              }
            });
          }
        } else if (inputs_huv.tipo_consulta === 'todos_vehiculos') {
          // En caso que el tipo de consulta del input de seleccion sea por todos los vehiculos
          set_loadding_consultar(true);
          dispatch(
            get_historico_todos_vehiculos(
              inputs_huv.tipo_vehiculo ?? '',
              inputs_huv.fecha_desde ?? '',
              inputs_huv.fecha_hasta ?? '',
              inputs_huv.propiedad === 'true' ? 'True' : inputs_huv.propiedad === 'false' ? 'False' : '',
            )
          ).then((response: response_historico_vehiculo) => {
            if (Object.keys(response)?.length !== 0) {
              if (response.data?.length > 0) {
                set_data_huv(response.data);
                set_loadding_consultar(false);
              } else {
                set_data_huv([]);
                control_error('No se encontraron resultados');
                set_loadding_consultar(false);
              }
            } else {
              set_loadding_consultar(false);
              control_error('Hubo un error al obtener la informacion del servicio');
            }
          });
        }
        break;
      default:
        break;
    }
  };

  const set_campos: (data: any) => any = (data: any) => {
    data.forEach((mtto: any) => {
      mtto.fecha_programada =
        mtto.fecha_programada !== null
          ? dayjs(mtto.fecha_programada).format('DD/MM/YYYY')
          : (mtto.fecha_programada = 'N/A');
      if (mtto.kilometraje_programado === null)
        mtto.kilometraje_programado = 'N/A';
      if (mtto.kilometraje_actual === null) mtto.kilometraje_actual = 'N/A';
      if (mtto.dias_kilometros_vencidos === null)
        mtto.dias_kilometros_vencidos = 0;
    });
    return data;
  };

  const ordenar: (data: any, parametro: string, tipo: string) => any = (
    data: any,
    parametro: string,
    tipo: string
  ) => {
    if (data.length > 0) {
      data.sort(function (a: any, b: any) {
        if (tipo === 'desc') {
          if (a[parametro] < b[parametro]) return 1;
          if (a[parametro] > b[parametro]) return -1;
          return 0;
        } else {
          if (a[parametro] > b[parametro]) return 1;
          if (a[parametro] < b[parametro]) return -1;
          return 0;
        }
      });
    }
    return data;
  };

  const ordenar_fechas: (data: any, parametro: string, tipo: string) => any = (
    data: any,
    parametro: string,
    tipo: string
  ) => {
    if (data.length > 0) {
      data.sort(function (a: any, b: any) {
        if (tipo === 'desc') {
          if (dayjs(a[parametro]).isBefore(dayjs(b[parametro]))) return 1;
          if (dayjs(a[parametro]).isAfter(dayjs(b[parametro]))) return -1;
          return 0;
        } else {
          if (dayjs(a[parametro]).isAfter(dayjs(b[parametro]))) return 1;
          if (dayjs(a[parametro]).isBefore(dayjs(b[parametro]))) return -1;
          return 0;
        }
      });
    }
    return data;
  };

  useEffect(()=>{
    console.log(inputs_msi)
  },[inputs_msi])

  return (
    <>
      <Grid container sx={estilo_seccion}>
        <Grid item md={12} xs={12}>
          <Title title="Tablero de control - Almacen" />
          <Box
            component="form"
            sx={{ mt: '20px' }}
            noValidate
            autoComplete="off"
          >
            <Grid item container spacing={2}>
              <Grid item xs={12} sm={12}>
                <Stack direction="row" justifyContent="center" spacing={2}>
                  <Grid item xs={12} sm={7}>
                    <FormControl size="small" fullWidth>
                      <InputLabel>Tablero de control</InputLabel>
                      <Select
                        value={seleccion_tablero_control}
                        label="Tablero de control"
                        onChange={cambio_tablero_control}
                      >
                        {lt_tablero_control.map((lt: any) => (
                          <MenuItem key={lt.id} value={lt.id}>
                            {lt.value}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Stack>
              </Grid>
              {seleccion_tablero_control == 'MP' && (
                <Grid item xs={12} sm={12} sx={{ p: '10px' }}>
                  <Stack direction="row" justifyContent="center" spacing={2}>
                    <Button
                      color="primary"
                      variant="contained"
                      onClick={busqueda_control}
                    >
                      Consultar
                    </Button>
                  </Stack>
                </Grid>
              )}
            </Grid>
          </Box>
        </Grid>
      </Grid>
      {seleccion_tablero_control !== '' &&
        seleccion_tablero_control !== 'MP' && (
          <Grid container sx={estilo_seccion}>
            <Grid item md={12} xs={12}>
              <Title title="Filtros de búsqueda" />
              <Box
                component="form"
                sx={{ mt: '20px' }}
                noValidate
                autoComplete="off"
              >
                {seleccion_tablero_control === 'CBU' && (
                  <Grid item container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <FormControl size="small" fullWidth>
                        <InputLabel>Tipo de despacho</InputLabel>
                        <Select
                          value={seleccion_tipo_despacho}
                          label="Tipo de despacho"
                          onChange={cambio_tipo_despacho}
                        >
                          <MenuItem value={'Todos'}>Todos</MenuItem>
                          {lt_tipo_despacho.map((lt: any) => (
                            <MenuItem key={lt.id} value={lt.id}>
                              {lt.value}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        label="Bien"
                        type={'text'}
                        size="small"
                        fullWidth
                        value={seleccion_bien.nombre_bien ?? ''}
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <Stack direction="row" justifyContent="center">
                        <Button
                          color="primary"
                          variant="contained"
                          startIcon={<SearchIcon />}
                          onClick={() => {
                            set_abrir_modal_bien(true);
                          }}
                        >
                          Buscar bien
                        </Button>
                        {abrir_modal_bien && (
                          <BuscarBienConsumo
                            is_modal_active={abrir_modal_bien}
                            set_is_modal_active={set_abrir_modal_bien}
                            title={'Búsqueda de bienes de consumo'}
                            seleccion_bien={set_seleccion_bien}
                          />
                        )}
                      </Stack>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <Stack
                        direction="row"
                        justifyContent="center"
                        spacing={2}
                      >
                        <Grid item xs={12} sm={8}>
                          <FormControl size="small" fullWidth>
                            <InputLabel>
                              Unidad organizacional que recibe
                            </InputLabel>
                            <Select
                              value={seleccion_unidad_org}
                              label="Unidad organizacional que recibe"
                              onChange={cambio_unidad_org}
                            >
                              <MenuItem value={'Todos'}>Todos</MenuItem>
                              {lt_unidades_org.map((lt: any) => (
                                <MenuItem
                                  key={lt.id_unidad_organizacional}
                                  value={lt.id_unidad_organizacional}
                                >
                                  {lt.nombre}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Grid>
                      </Stack>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <Stack
                        direction="row"
                        justifyContent="center"
                        spacing={2}
                      >
                        <span style={{ margin: '7px' }}>
                          No discriminar por unidad{' '}
                        </span>
                        <Switch
                          color="primary"
                          onChange={() => {
                            set_discriminar(!discriminar);
                            set_resultado_busqueda([]);
                          }}
                        />
                      </Stack>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Stack
                        direction="row"
                        justifyContent="flex-end"
                        spacing={2}
                      >
                        <Grid item xs={12} sm={6}>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                              label="Fecha desde"
                              value={fecha_desde}
                              onChange={(newValue) => {
                                handle_change_fecha_desde(newValue);
                              }}
                              renderInput={(params) => (
                                <TextField
                                  required
                                  fullWidth
                                  size="small"
                                  {...params}
                                  error={error_fecha_desde}
                                />
                              )}
                              maxDate={fecha_hasta}
                            />
                          </LocalizationProvider>
                          {error_fecha_desde && (
                            <FormHelperText error>
                              {'El campo es obligatorio.'}
                            </FormHelperText>
                          )}
                        </Grid>
                      </Stack>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Stack
                        direction="row"
                        justifyContent="flex-start"
                        spacing={2}
                      >
                        <Grid item xs={12} sm={6}>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                              label="Fecha hasta"
                              value={fecha_hasta}
                              onChange={(newValue) => {
                                handle_change_fecha_hasta(newValue);
                              }}
                              renderInput={(params) => (
                                <TextField
                                  required
                                  fullWidth
                                  size="small"
                                  {...params}
                                  error={error_fecha_hasta}
                                />
                              )}
                              minDate={fecha_desde}
                              disabled={fecha_desde == null}
                            />
                          </LocalizationProvider>
                          {error_fecha_hasta && (
                            <FormHelperText error>
                              {'El campo es obligatorio.'}
                            </FormHelperText>
                          )}
                        </Grid>
                      </Stack>
                    </Grid>
                    {!discriminar && (
                      <Grid item xs={12} sm={12}>
                        <Stack
                          direction="row"
                          justifyContent="center"
                          spacing={2}
                        >
                          <Grid item xs={12} sm={4}>
                            <FormControl size="small" fullWidth>
                              <InputLabel>Presentación</InputLabel>
                              <Select
                                value={seleccion_presentacion}
                                label="Presentación"
                                onChange={cambio_presentacion}
                              >
                                {lt_presentacion.map((lt: any) => (
                                  <MenuItem key={lt.id} value={lt.id}>
                                    {lt.value}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </Grid>
                        </Stack>
                      </Grid>
                    )}
                  </Grid>
                )}
                {seleccion_tablero_control === 'CS' && (
                  <Grid item container spacing={2}>
                    <Grid item xs={12} sm={12}>
                      <Stack direction="row" justifyContent="center">
                        <Grid item xs={12} sm={7}>
                          <FormControl size="small" fullWidth>
                            <InputLabel>Tipo de bien</InputLabel>
                            <Select
                              value={seleccion_tipo_bien}
                              label="Tipo de bien"
                              onChange={cambio_tipo_bien}
                            >
                              <MenuItem value={'Todos'}>Todos</MenuItem>
                              <MenuItem value={'SV'}>
                                Solicitable por vivero
                              </MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>
                      </Stack>
                    </Grid>
                  </Grid>
                )}
                {seleccion_tablero_control === 'MSI' && (
                  <Grid item container spacing={2}>
                    <Grid item xs={12}>
                      <FormControl required size="small" fullWidth>
                        <InputLabel>Tipo bien: </InputLabel>
                        <Select
                          label="Tipo bien :"
                          value={inputs_msi.tipo_bien}
                          fullWidth
                          onChange={(e: SelectChangeEvent) => {
                            // limpiamos la data del resultado
                            set_resultado_busqueda([]);
                            // agregamos el valor seleccionado
                            set_inputs_msi({
                              ...inputs_msi,
                              tipo_bien: e.target.value,
                            });
                          }}
                        >
                          {tipos_bienes?.length !== 0 ? (
                            tipos_bienes?.map((tipo_bien) => (
                              <MenuItem key={tipo_bien[0]} value={tipo_bien[0]}>
                                {tipo_bien[1]}
                              </MenuItem>
                            ))
                          ) : (
                            <MenuItem value={''}>Cargando...</MenuItem>
                          )}
                        </Select>
                      </FormControl>
                    </Grid>

                    {inputs_msi?.tipo_bien === 'A' &&
                      <Grid item xs={12} lg={4}>
                        <FormControl required size="small" fullWidth>
                          <InputLabel>Categoria: </InputLabel>
                          <Select
                            label="Categoria :"
                            value={inputs_msi.tipo_categoria}
                            fullWidth
                            onChange={(e: SelectChangeEvent) => {
                              set_inputs_msi({
                                ...inputs_msi,
                                tipo_categoria: e.target.value,
                              });
                            }}
                          >
                            {tipos_categoria?.length !== 0 ? (
                              tipos_categoria?.map((tipo_movimiento) => (
                                <MenuItem key={tipo_movimiento[0]} value={tipo_movimiento[0]}>
                                  {tipo_movimiento[1]}
                                </MenuItem>
                              ))
                            ) : (
                              <MenuItem value={''}>Cargando...</MenuItem>
                            )}
                          </Select>
                        </FormControl>
                      </Grid>
                    }


                    <Grid item xs={12} sm={inputs_msi?.tipo_bien === 'A' ? 4 : 6}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          label="Fecha desde"
                          value={fecha_desde}
                          onChange={(newValue) => {
                            handle_change_fecha_desde(newValue);
                          }}
                          renderInput={(params) => (
                            <TextField
                              required
                              fullWidth
                              size="small"
                              {...params}
                              error={error_fecha_desde}
                            />
                          )}
                          maxDate={fecha_hasta}
                        />
                      </LocalizationProvider>
                    </Grid>

                    <Grid item xs={12} sm={inputs_msi?.tipo_bien === 'A' ? 4 : 6}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          label="Fecha hasta"
                          value={fecha_hasta}
                          onChange={(newValue) => {
                            handle_change_fecha_hasta(newValue);
                          }}
                          renderInput={(params) => (
                            <TextField
                              required
                              fullWidth
                              size="small"
                              {...params}
                              error={error_fecha_hasta}
                            />
                          )}
                          minDate={fecha_desde}
                          disabled={fecha_desde == null}
                        />
                      </LocalizationProvider>
                    </Grid>
                  </Grid>
                )}
                {seleccion_tablero_control === 'MR' && (
                  <Grid item container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <FormControl size="small" fullWidth>
                        <InputLabel>Tipo mantenimiento</InputLabel>
                        <Select
                          value={seleccion_tipo_mtto}
                          label="Tipo mantenimiento"
                          onChange={cambio_tipo_mtto}
                        >
                          <MenuItem value={'Todos'}>Todos</MenuItem>
                          {lt_tipo_mantenimiento.map((lt: any) => (
                            <MenuItem key={lt[0]} value={lt[0]}>
                              {lt[1]}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={5}>
                      <TextField
                        label="Realizado por"
                        size="small"
                        required
                        disabled
                        fullWidth
                        value={realizado.nombre_completo}
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={1} sx={{ mt: '10px' }}>
                      <SearchIcon
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                          set_abrir_modal_persona(true);
                        }}
                      />
                    </Grid>
                    {abrir_modal_persona && (
                      <BuscadorPersonaDialog
                        is_modal_active={abrir_modal_persona}
                        set_is_modal_active={set_abrir_modal_persona}
                        title={'Busqueda de persona'}
                        set_persona={set_realizado}
                      />
                    )}
                    <Grid item xs={12} sm={6}>
                      <Stack
                        direction="row"
                        justifyContent="flex-end"
                        spacing={2}
                      >
                        <Grid item xs={12} sm={6}>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                              label="Fecha desde"
                              value={fecha_desde}
                              onChange={(newValue) => {
                                handle_change_fecha_desde(newValue);
                              }}
                              renderInput={(params) => (
                                <TextField
                                  required
                                  fullWidth
                                  size="small"
                                  {...params}
                                  error={error_fecha_desde}
                                />
                              )}
                              maxDate={fecha_hasta}
                            />
                          </LocalizationProvider>
                          {error_fecha_desde && (
                            <FormHelperText error>
                              {'El campo es obligatorio.'}
                            </FormHelperText>
                          )}
                        </Grid>
                      </Stack>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Stack
                        direction="row"
                        justifyContent="flex-start"
                        spacing={2}
                      >
                        <Grid item xs={12} sm={6}>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                              label="Fecha hasta"
                              value={fecha_hasta}
                              onChange={(newValue) => {
                                handle_change_fecha_hasta(newValue);
                              }}
                              renderInput={(params) => (
                                <TextField
                                  required
                                  fullWidth
                                  size="small"
                                  {...params}
                                  error={error_fecha_hasta}
                                />
                              )}
                              minDate={fecha_desde}
                              disabled={fecha_desde == null}
                            />
                          </LocalizationProvider>
                          {error_fecha_hasta && (
                            <FormHelperText error>
                              {'El campo es obligatorio.'}
                            </FormHelperText>
                          )}
                        </Grid>
                      </Stack>
                    </Grid>
                  </Grid>
                )}
                {seleccion_tablero_control === 'EI' && (
                  <Grid item container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <FormControl size="small" fullWidth>
                        <InputLabel>Bodega</InputLabel>
                        <Select
                          value={seleccion_bodega}
                          label="Bodega"
                          onChange={cambio_bodega}
                        >
                          <MenuItem value={'Todos'}>Todos</MenuItem>
                          {lt_bodegas.map((lt: any) => (
                            <MenuItem key={lt.id_bodega} value={lt.id_bodega}>
                              {lt.nombre}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl size="small" fullWidth>
                        <InputLabel>Tipo de bien</InputLabel>
                        <Select
                          value={seleccion_tipo_bien}
                          label="Tipo de bien"
                          onChange={cambio_tipo_bien}
                        >
                          {lt_tipo_bien.map((lt: any) => (
                            <MenuItem key={lt[0]} value={lt[0]}>
                              {lt[1]}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Stack
                        direction="row"
                        justifyContent="flex-end"
                        spacing={2}
                      >
                        <Grid item xs={12} sm={6}>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                              label="Fecha desde"
                              value={fecha_desde}
                              onChange={(newValue) => {
                                handle_change_fecha_desde(newValue);
                              }}
                              renderInput={(params) => (
                                <TextField
                                  required
                                  fullWidth
                                  size="small"
                                  {...params}
                                  error={error_fecha_desde}
                                />
                              )}
                              maxDate={fecha_hasta}
                            />
                          </LocalizationProvider>
                          {error_fecha_desde && (
                            <FormHelperText error>
                              {'El campo es obligatorio.'}
                            </FormHelperText>
                          )}
                        </Grid>
                      </Stack>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Stack
                        direction="row"
                        justifyContent="flex-start"
                        spacing={2}
                      >
                        <Grid item xs={12} sm={6}>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                              label="Fecha hasta"
                              value={fecha_hasta}
                              onChange={(newValue) => {
                                handle_change_fecha_hasta(newValue);
                              }}
                              renderInput={(params) => (
                                <TextField
                                  required
                                  fullWidth
                                  size="small"
                                  {...params}
                                  error={error_fecha_hasta}
                                />
                              )}
                              minDate={fecha_desde}
                              disabled={fecha_desde == null}
                            />
                          </LocalizationProvider>
                          {error_fecha_hasta && (
                            <FormHelperText error>
                              {'El campo es obligatorio.'}
                            </FormHelperText>
                          )}
                        </Grid>
                      </Stack>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                      <Stack
                        direction="row"
                        justifyContent="center"
                        spacing={2}
                      >
                        <Grid item xs={12} sm={4}>
                          <FormControl size="small" fullWidth>
                            <InputLabel>Presentación</InputLabel>
                            <Select
                              value={seleccion_presentacion}
                              label="Presentación"
                              onChange={cambio_presentacion}
                            >
                              {lt_presentacion_b.map((lt: any) => (
                                <MenuItem key={lt.id} value={lt.id}>
                                  {lt.value}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Grid>
                      </Stack>
                    </Grid>
                  </Grid>
                )}

                {/* MAFI - Movimientos sobre los bienes (activos fijos) del inventario */}
                {seleccion_tablero_control === 'MAFI' && (
                  <MovimientosActivosFijosInventario
                    inputs_mafi={inputs_mafi}
                    set_inputs_mafi={set_inputs_mafi}
                  />
                )}
                {/* RABP - Reportes Almacén – Bienes (activos fijos) en préstamo */}
                {seleccion_tablero_control === 'RABP' && (
                  <ReportesAlmacenBienesPrestamo
                    inputs_rabp={inputs_rabp}
                    set_inputs_rabp={set_inputs_rabp}
                  />
                )}
                {/* BCE - Bienes de consumo entregados */}
                {seleccion_tablero_control === 'BCE' && (
                  <BienesConsumoEntregados
                    inputs_bce={inputs_bce}
                    set_inputs_bce={set_inputs_bce}
                  />
                )}

                {seleccion_tablero_control === 'HUV' &&
                  <HistoricoUsoVehiculos
                    inputs_huv={inputs_huv}
                    set_inputs_huv={set_inputs_huv}
                    set_data_huv={set_data_huv}
                    set_data_vehiculo_seleccionado={set_data_vehiculo_seleccionado}
                  />
                }


                <Grid
                  item
                  xs={12}
                  mt={2}
                  sx={{
                    display: 'flex',
                    justifyContent: 'end',
                  }}
                >
                  <Grid item xs={12} lg={3}>
                    <Button
                      fullWidth
                      color="primary"
                      variant="contained"
                      disabled={loadding_consultar}
                      startIcon={
                        loadding_consultar && <CircularProgress size={25} />
                      }
                      onClick={busqueda_control}
                    >
                      {loadding_consultar ? '' : 'Consultar'}
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        )}

      {data_mafi?.length > 0 && (
        <Grid container sx={estilo_seccion}>
          <Title title="Resultado: Movimientos sobre los bienes (activos fijos) del inventario" />
          <TablaMovimientosInventario data={data_mafi} />
        </Grid>
      )}

      {data_rabp?.length > 0 && (
        <Grid container sx={estilo_seccion}>
          <Title title="Resultado: Reportes Almacén – Bienes (activos fijos) en préstamo" />
          <TablaReportesAlmacenBienesPrestamo data={data_rabp} />
        </Grid>
      )}

      {data_bce?.length > 0 && (
        <Grid container sx={estilo_seccion}>
          <Title title="Resultado: Bienes de consumo entregados" />
          <TablaBienesConsumoEntregados data={data_bce} />
        </Grid>
      )}

      {data_huv?.length > 0 && (
        <Grid container sx={estilo_seccion}>
          <Title title="Resultado: Histórico de Uso de Vehículos" />
          <TablaHistoricoUsoVehiculos data={data_huv} />
        </Grid>
      )}

      {resultado_busqueda.length > 0 && (
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
          {seleccion_tablero_control !== 'EI' && (
            <Grid item md={12} xs={12}>
              <ResultadosBusqueda
                resultado_busqueda={resultado_busqueda}
                seleccion_presentacion={seleccion_presentacion}
                titulo={'Resultado de búsqueda'}
                seleccion_tablero_control={seleccion_tablero_control}
                discriminar={discriminar}
                filtros={filtros}
                nombre_archivo={nombre_archivo}
                filtros_pdf={filtros_pdf}
              ></ResultadosBusqueda>
            </Grid>
          )}
          {seleccion_tablero_control === 'EI' && (
            <Grid item md={12} xs={12}>
              <ResultadosBusquedaTable
                resultado_busqueda={resultado_busqueda}
                seleccion_presentacion={seleccion_presentacion}
                titulo={'Resultado de búsqueda'}
                seleccion_tablero_control={seleccion_tablero_control}
                discriminar={discriminar}
                filtros={filtros}
                nombre_archivo={nombre_archivo}
                filtros_pdf={filtros_pdf}
              ></ResultadosBusquedaTable>
            </Grid>
          )}
        </Grid>
      )}
      <Grid container justifyContent="flex-end">
        <Grid container spacing={2} item xs={12} sx={{
          display: 'flex',
          justifyContent: 'end',
        }}>
          <Grid item xs={12} lg={3}>
            <Button
              fullWidth
              color="inherit"
              variant="contained"
              startIcon={<CleanIcon />}
              onClick={limpiar_todo}
            >
              Limpiar
            </Button>
          </Grid>
          <Grid item xs={12} lg={3}>
            <Button
              fullWidth
              color="error"
              variant="contained"
              startIcon={<ClearIcon />}
              onClick={salir_entrada}
            >
              Salir
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
