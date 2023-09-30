
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
// Consumo Bienes por Unidad
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
