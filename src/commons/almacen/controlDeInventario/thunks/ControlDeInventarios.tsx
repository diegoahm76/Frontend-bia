
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
// Obtiene estados
export const obtener_inventario_af: any = (filtros: {seleccion_bodega: string, seleccion_estado: string, seleccion_ubicacion: string, seleccion_propiedad: string, seleccion_categoria: string, bienes_baja: boolean, bienes_salida: boolean}) => {
  return async () => {
    try {
      const { data } = await api.get(`almacen/inventario/control/activos-fijos/get-list/?id_bodega=${filtros.seleccion_bodega === 'Todos' ? '': filtros.seleccion_bodega}&cod_estado_activo=${filtros.seleccion_estado === 'Todos' ? '': filtros.seleccion_estado}&ubicacion=${filtros.seleccion_ubicacion === 'Todos' ? '': filtros.seleccion_ubicacion}&propiedad=${filtros.seleccion_propiedad === 'Todos' ? '': filtros.seleccion_propiedad}&cod_tipo_activo=${filtros.seleccion_categoria === 'Todos' ? '': filtros.seleccion_categoria}&realizo_baja=${filtros.bienes_baja}&realizo_salida=${filtros.bienes_salida}`);
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};