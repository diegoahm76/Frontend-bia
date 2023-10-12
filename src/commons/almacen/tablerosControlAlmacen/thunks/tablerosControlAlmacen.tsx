
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
export const obtener_consumo_bienes_und: any = (filtros: { seleccion_tipo_despacho: boolean | string, seleccion_bien: string,seleccion_unidad_org: string, discriminar: boolean | string,  fecha_desde: string,fecha_hasta: string }) => {
  return async () => {
    try {
      const { data } = await api.get(`almacen/inventario/control/despachos/get-list/?es_despacho_conservacion=${filtros.seleccion_tipo_despacho === 'Todos' ? '' : filtros.seleccion_tipo_despacho}&id_bien=${filtros.seleccion_bien}&id_unidad_para_la_que_solicita=${filtros.seleccion_unidad_org === 'Todos' ? '' : filtros.seleccion_unidad_org}&fecha_desde=${filtros.fecha_desde}&fecha_hasta=${filtros.fecha_hasta}&no_discriminar=${filtros.discriminar}`);
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};
// Obtiene entradas a inventarios
export const obtener_entradas_inventario: any = (filtros: { seleccion_bodega: string, seleccion_tipo_bien: string,fecha_desde: string,fecha_hasta: string }) => {
  return async () => {
    try {
      
      const { data } = await api.get(`almacen/reportes/entradas-inventario/get-list/?id_bodega=${filtros.seleccion_bodega === 'Todos' ? '' : filtros.seleccion_bodega}&cod_tipo_bien=${filtros.seleccion_tipo_bien}&fecha_desde=${filtros.fecha_desde}&fecha_hasta=${filtros.fecha_hasta}`);
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};
// control de stock
export const obtener_control_stock: any = (solicitable_vivero: boolean) => {
  return async () => {
    try {
      const { data } = await api.get(`almacen/inventario/control/stock/get-list/?solicitable_vivero=${solicitable_vivero}`);
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};
// Consumo Bienes por Unidad
export const obtener_movimientos_incautados: any = (filtros: { fecha_desde: string,fecha_hasta: string }) => {
  return async () => {
    try {
      const { data } = await api.get(`almacen/reportes/movimientos-incautados/get-list/?fecha_desde=${filtros.fecha_desde}&fecha_hasta=${filtros.fecha_hasta}`);
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};
// Mantenimientos realizados
export const obtener_mantenimientos_realizados: any = (filtros: { seleccion_tipo_mtto: string, realizado: string,seleccion_unidad_org: string, discriminar: boolean | string,  fecha_desde: string,fecha_hasta: string }) => {
  return async () => {
    try {
      const { data } = await api.get(`almacen/reportes/mantenimientos-realizados/get-list/?cod_tipo_mantenimiento=${filtros.seleccion_tipo_mtto === 'Todos' ? '' : filtros.seleccion_tipo_mtto}&id_persona_realiza=${filtros.realizado === undefined ? '' : filtros.realizado}&fecha_desde=${filtros.fecha_desde}&fecha_hasta=${filtros.fecha_hasta}`);
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};
// Consumo Mantenimientos Programados
export const obtener_mtto_programados: any = () => {
  return async () => {
    try {
      const { data } = await api.get(`almacen/mantenimientos/programados/control/get-list/`);
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
