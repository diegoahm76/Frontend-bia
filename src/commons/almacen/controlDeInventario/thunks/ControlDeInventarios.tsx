
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

// Obtiene bodegas
export const obtener_bodegas: any = () => {
  return async () => {
    try {
      const { data } = await api.get('almacen/bodega/get-list/');
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};
// Obtiene categorias
export const obtener_categorias: any = () => {
  return async () => {
    try {
      const { data } = await api.get('almacen/choices/tipo-activo/');
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};
// Obtiene estados
export const obtener_estados: any = () => {
  return async () => {
    try {
      const { data } = await api.get('almacen/choices/estados-articulo/');
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};
// Obtiene inventario activos fijos
export const obtener_inventario_af: any = (filtros: {seleccion_bodega: string, seleccion_estado: string, seleccion_ubicacion: string, seleccion_propiedad: string, seleccion_categoria: string, bienes_baja: boolean, bienes_salida: boolean, seleccion_origen: string}) => {
  return async () => {
    try {
      const { data } = await api.get(`almacen/inventario/control/activos-fijos/get-list/?id_bodega=${filtros.seleccion_bodega === 'Todos' ? '': filtros.seleccion_bodega}&cod_estado_activo=${filtros.seleccion_estado === 'Todos' ? '': filtros.seleccion_estado}&ubicacion=${filtros.seleccion_ubicacion === 'Todos' ? '': filtros.seleccion_ubicacion}&propiedad=${filtros.seleccion_propiedad === 'Todos' ? '': filtros.seleccion_propiedad}&cod_tipo_activo=${filtros.seleccion_categoria === 'Todos' ? '': filtros.seleccion_categoria}&realizo_baja=${filtros.bienes_baja}&realizo_salida=${filtros.bienes_salida}&cod_tipo_entrada=${filtros.seleccion_origen === 'Todos' ? '': filtros.seleccion_origen}`);
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
// Obtiene inventario según categoría
export const obtener_inventario_categoria: any = (filtros: {seleccion_bodega: string, seleccion_categoria: string}) => {
  return async () => {
    try {
      const { data } = await api.get(`almacen/inventario/control/activos-fijos/get-by-categoria/?id_bodega=${filtros.seleccion_bodega === 'Todos' ? '': filtros.seleccion_bodega}&cod_tipo_activo=${filtros.seleccion_categoria === 'Todos' ? '': filtros.seleccion_categoria}`);
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};
// Obtiene inventario propio
export const obtener_inventario_propio: any = (filtros: {seleccion_bodega: string, seleccion_categoria: string, agrupar: boolean}) => {
  return async () => {
    try {
      const { data } = await api.get(`almacen/inventario/control/activos-fijos/get-propio/?id_bodega=${filtros.seleccion_bodega === 'Todos' ? '': filtros.seleccion_bodega}&cod_tipo_activo=${filtros.seleccion_categoria === 'Todos' ? '': filtros.seleccion_categoria}&agrupado=${filtros.agrupar}`);
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};
// Obtiene inventario por tipo
export const obtener_inventario_tipo: any = (filtros: {seleccion_bodega: string, seleccion_categoria: string, mostrar: boolean}) => {
  return async () => {
    try {
      const { data } = await api.get(`almacen/inventario/control/activos-fijos/get-by-tipo/?id_bodega=${filtros.seleccion_bodega === 'Todos' ? '': filtros.seleccion_bodega}&resultados_entidad=${filtros.mostrar}`);
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};
// Obtiene bienes
export const obtener_bienes: any = () => {
  return async () => {
    try {
      const { data } = await api.get(`almacen/inventario/control/activos-fijos/get-bienes/`);
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};
// Obtiene listado de origenes
export const obtener_lista_origenes: any = () => {
  return async () => {
    try {
      const { data } = await api.get(`almacen/inventario/control/activos-fijos/get-list-origen/`);
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};