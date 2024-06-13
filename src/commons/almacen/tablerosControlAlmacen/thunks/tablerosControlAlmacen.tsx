
import { api } from '../../../../api/axios';
// Types
import { type AxiosError, } from 'axios';
// Reducers
import { toast, type ToastContent } from 'react-toastify';


// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const control_error = (message: ToastContent = 'Algo pasó, intente de nuevo') =>
  toast.error(message, {
    position: 'bottom-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light'
  });

// Obtener todas las unidades organizacionales
export const obtener_unidades_organizacionales: any = () => {
  return async () => {
    try {
      const { data } = await api.get('transversal/organigrama/unidades/get-list/');
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};
// Obtiene bien especifico
export const obtener_bien_especifico_af: any = (seleccion_bien: string) => {
  return async () => {
    try {
      const { data } = await api.get(`almacen/inventario/control/activos-fijos/get-by-id-bien/${seleccion_bien}`);
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};
// Bienes por Unidad
export const obtener_consumo_bienes_und: any = (filtros: { seleccion_tipo_despacho: boolean | string, seleccion_bien: string,seleccion_unidad_org: string, discriminar: boolean | string,  fecha_desde: string,fecha_hasta: string, id_responsable: string, id_solicita: string, id_despacha: string, id_anula: string, id_bodega_reporte: string }) => {
  return async () => {
    try {
      const { data } = await api.get(`almacen/inventario/control/despachos/get-list/?es_despacho_conservacion=${filtros.seleccion_tipo_despacho === 'Todos' ? '' : filtros.seleccion_tipo_despacho}&id_bien=${filtros.seleccion_bien}&id_unidad_para_la_que_solicita=${filtros.seleccion_unidad_org === 'Todos' ? '' : filtros.seleccion_unidad_org}&fecha_desde=${filtros.fecha_desde}&fecha_hasta=${filtros.fecha_hasta}&no_discriminar=${filtros.discriminar}&id_funcionario_responsable=${filtros.id_responsable}&id_persona_solicita=${filtros.id_solicita}&id_persona_despacha=${filtros.id_despacha}&id_persona_anula=${filtros.id_anula}&id_bodega_reporte=${filtros.id_bodega_reporte}`);
      if(!data?.data?.length){
        control_error('No se encontraron registros con los filtros seleccionados');
      }
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};
// Obtiene entradas a inventarios
export const obtener_entradas_inventario: any = (filtros: { seleccion_bodega: string, seleccion_tipo_bien: string,fecha_desde: string,fecha_hasta: string, codigo_bien: string, nombre_bien: string, placa_serial: string, consecutivo: string, id_responsable: string, id_proveedor: string, cod_tipo_activo: string }) => {
  return async () => {
    try {

      const { data } = await api.get(`almacen/reportes/entradas-inventario/get-list/?id_bodega=${filtros.seleccion_bodega === 'Todos' ? '' : filtros.seleccion_bodega}&cod_tipo_bien=${filtros.seleccion_tipo_bien}&fecha_desde=${filtros.fecha_desde}&fecha_hasta=${filtros.fecha_hasta}&codigo_bien=${filtros.codigo_bien}&nombre_bien=${filtros.nombre_bien}&placa_serial=${filtros.placa_serial}&consecutivo=${filtros.consecutivo}&id_responsable=${filtros.id_responsable}&id_proveedor=${filtros.id_proveedor}&cod_tipo_activo=${filtros.cod_tipo_activo}`);
      if(!data?.data?.length){
        control_error('No se encontraron registros con los filtros seleccionados');
      }
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};
// control de stock
export const obtener_control_stock: any = (solicitable_vivero: string, codigo_bien: string, nombre_bien: string, cod_tipo_entrada: string, id_bodega: string, id_persona_responsable: string, id_persona_origen: string) => {
  return async () => {
    try {
      const { data } = await api.get(`almacen/inventario/control/stock/get-list/?solicitable_vivero=${solicitable_vivero}&codigo_bien=${codigo_bien}&nombre_bien=${nombre_bien}&cod_tipo_entrada=${cod_tipo_entrada}&id_bodega=${id_bodega}&id_persona_responsable=${id_persona_responsable}&id_persona_origen=${id_persona_origen}`);
      if(!data?.data?.length){
        control_error('No se encontraron registros con los filtros seleccionados');
      }
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};
// Consumo Bienes por Unidad
export const obtener_movimientos_incautados: any = (filtros: {
  categoria: string,
  fecha_desde: string,
  fecha_hasta: string,
  id_responsable: string,
  id_proveedor: string,
  cod_tipo_activo: string,
}) => {
  return async () => {
    try {
      const { data } = await api.get(`almacen/reportes/movimientos-incautados/get-list/?categoria=${filtros.categoria}&fecha_desde=${filtros.fecha_desde}&fecha_hasta=${filtros.fecha_hasta}&id_responsable=${filtros.id_responsable}&id_proveedor=${filtros.id_proveedor}&cod_tipo_activo=${filtros.cod_tipo_activo}`);
      // if(!data?.data?.length){
      //   control_error('No se encontraron registros con los filtros seleccionados');
      // }
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};
// Mantenimientos realizados
export const obtener_mantenimientos_realizados: any = (filtros: { seleccion_tipo_mtto: string, realizado: string,seleccion_unidad_org: string, discriminar: boolean | string,  fecha_desde: string,fecha_hasta: string, cod_tipo_activo: string }) => {
  return async () => {
    try {
      const { data } = await api.get(`almacen/reportes/mantenimientos-realizados/get-list/?cod_tipo_mantenimiento=${filtros.seleccion_tipo_mtto === 'Todos' ? '' : filtros.seleccion_tipo_mtto}&id_persona_realiza=${filtros.realizado === undefined ? '' : filtros.realizado}&fecha_desde=${filtros.fecha_desde}&fecha_hasta=${filtros.fecha_hasta}&cod_tipo_activo=${filtros.cod_tipo_activo}`);
      if(!data?.data?.length){
        control_error('No se encontraron registros con los filtros seleccionados');
      }
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};
// Consumo Mantenimientos Programados
export const obtener_mtto_programados: any = (id_persona_solicita: string, id_persona_anula: string, fecha_desde: string, fecha_hasta: string, cod_tipo_activo: string, serial_placa: string, consecutivo: string) => {
  return async () => {
    try {
      const url = `almacen/mantenimientos/programados/control/get-list/?id_persona_solicita=${id_persona_solicita}&id_persona_anula=${id_persona_anula}&fecha_desde=${fecha_desde}&fecha_hasta=${fecha_hasta}&cod_tipo_activo=${cod_tipo_activo}&serial_placa=${serial_placa}&consecutivo=${consecutivo}`;
      const { data } = await api.get(url);
      if(!data?.data?.length){
        control_error('No se encontraron registros con los filtros seleccionados');
      }
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};
// Obtiene listado de tipos de mantenimiento
export const obtener_tipos_mantenimiento: any = () => {
  return async () => {
    try {
      const { data } = await api.get(`almacen/choices/tipo-mantenimiento/`);
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};
// Obtiene listado de tipos de mantenimiento
export const obtener_tipos_bien: any = () => {
  return async () => {
    try {
      const { data } = await api.get(`almacen/choices/tipo-bien/`);
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// Obtiene listado de tipos de movimientos
export const get_tipos_movimientos: any = () => {
  return async () => {
    try {
      const { data } = await api.get(`/almacen/choices/tipo-doc-ultimo/`);
      return data;
    } catch (error: any) {
      return error as AxiosError;
    }
  };
};

export const get_movimientos_inventario: any = (
  tipo_movimiento: string,
  fecha_desde: string,
  fecha_hasta: string,
  cod_tipo_activo: string,
  id_persona_responsable: string,
  id_persona_origen: string
  ) => {
  return async () => {
    try {
      const { data } = await api.get(`/almacen/reportes/reporte-movimientos-inventario/get-list/?tipo_movimiento=${
        tipo_movimiento
      }&fecha_desde=${
        fecha_desde
      }&fecha_hasta=${
        fecha_hasta
      }&cod_tipo_activo=${
        cod_tipo_activo
      }&id_persona_responsable=${
        id_persona_responsable
      }&id_persona_origen=${
        id_persona_origen
      }`);
      //   &cod_tipo_activo=${
      //   cod_tipo_activo
      // }`);
      // if(!data?.data?.length){
      //   control_error('No se encontraron registros con los filtros seleccionados');
      // }
      return data;
    } catch (error: any) {
      return error as AxiosError;
    }
  };
};

// Obtiene listado de tipos de movimientos
export const get_tipos_categorias: any = () => {
  return async () => {
    try {
      const { data } = await api.get(`/almacen/choices/tipo-activo/`);
      return data;
    } catch (error: any) {
      return error as AxiosError;
    }
  };
};

export const get_bienes_activos: any = (
  cod_tipo_activo: string,
  fecha_desde: string,
  fecha_hasta: string,
  id_persona_responsable: string,
  id_persona_origen: string,
  ) => {
  return async () => {
    try {
      const { data } = await api.get(`/almacen/reportes/reporte-bienes-activos/get-list/?cod_tipo_activo=${
        cod_tipo_activo
      }&fecha_desde=${
        fecha_desde
      }&fecha_hasta=${
        fecha_hasta
      }&id_persona_responsable=${
        id_persona_responsable
      }&id_persona_origen=${
        id_persona_origen
      }`);
      // if(!data?.data?.length){
      //   control_error('No se encontraron registros con los filtros seleccionados');
      // }
      return data;
    } catch (error: any) {
      return error as AxiosError;
    }
  };
};

export const get_bienes_consumo_entregados: any = (
  fecha_desde: string,
  fecha_hasta: string,
  cod_tipo_activo: string,
  id_persona_responsable: string,
  id_persona_solicita: string,
  id_persona_despacha: string,
  id_persona_anula: string,
  ) => {
  return async () => {
    try {
      const { data } = await api.get(`/almacen/reportes/reporte-bienes-consumo/get-list/?fecha_desde=${fecha_desde}&fecha_hasta=${fecha_hasta}&cod_tipo_activo=${cod_tipo_activo}&id_persona_responsable=${id_persona_responsable}&id_persona_solicita=${id_persona_solicita}&id_persona_despacha=${id_persona_despacha}&id_persona_anula=${id_persona_anula}`);
      if(!data?.data?.length){
        control_error('No se encontraron registros con los filtros seleccionados');
      }
      return data;
    } catch (error: any) {
      return error as AxiosError;
    }
  };
};

export const get_busqueda_vehiculos: any = (
  tipo_vehiculo: string,
  marca: string,
  placa: string,
  contratista: string,
  nombre_vehiculo: string,
  ) => {
  return async () => {
    try {
      const { data } = await api.get(`almacen/reportes/busqueda-vehiculos-reporte/get-list/?tipo_vehiculo=${
        tipo_vehiculo
      }&marca=${
        marca
      }&placa=${
        placa
      }&contratista=${
        contratista
      }&nombre=${
        nombre_vehiculo
      }`);
      return data;
    } catch (error: any) {
      return error as AxiosError;
    }
  };
};

// Obtiene listado de tipos de vehiculos
export const get_tipos_vehiculos: any = () => {
  return async () => {
    try {
      const { data } = await api.get(`/almacen/choices/tipo-vehiculo/`);
      return data;
    } catch (error: any) {
      return error as AxiosError;
    }
  };
};

// Obtiene listado de tipos de vehiculos
export const get_tipos_bienes: any = () => {
  return async () => {
    try {
      const { data } = await api.get(`/almacen/choices/tipo-bien/`);
      return data;
    } catch (error: any) {
      return error as AxiosError;
    }
  };
};

// Obtiene el historico de uso de vehiculos por id_hoja_de_vida
export const get_historico_vehiculo: any = (id_hoja_de_vida: string) => {
  return async () => {
    try {
      const { data } = await api.get(`/almacen/reportes/busqueda-viajes-agendados/${id_hoja_de_vida}/`);
      // if(!data?.data?.length){
      //   control_error('No se encontraron registros con los filtros seleccionados');
      // }
      return data;
    } catch (error: any) {
      return error as AxiosError;
    }
  };
};

// Obtiene el historico de uso de vehiculos por id_hoja_de_vida
export const get_historico_todos_vehiculos: any = (
  tipo_vehiculo: string,
  fecha_desde: string,
  fecha_hasta: string,
  es_arrendado: string,
  id_responsable: string,
) => {
  return async () => {
    try {
      const { data } = await api.get(`/almacen/reportes/historico-viajes-agendados/get-list/?tipo_vehiculo=${
          tipo_vehiculo
        }&fecha_desde=${
          fecha_desde
        }&fecha_hasta=${
          fecha_hasta
        }&es_arrendado=${
          es_arrendado
        }&id_responsable=${
          id_responsable
        }`);
        // if(!data?.data?.length){
        //   control_error('No se encontraron registros con los filtros seleccionados');
        // }
      return data;
    } catch (error: any) {
      return error as AxiosError;
    }
  };
};