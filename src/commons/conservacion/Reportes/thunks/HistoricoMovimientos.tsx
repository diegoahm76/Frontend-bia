
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

export const historico_bajas: any = (filtros: {seleccion_vivero: number|string,seleccion_planta: number,fecha_desde: string,fecha_hasta: string}) => {
  return async () => {
    try {
      const { data } = await api.get(`conservacion/analitica/historico-bajas/get/?id_vivero=${filtros.seleccion_vivero === 'Todos' ? '': filtros.seleccion_vivero}&id_bien=${filtros.seleccion_planta}&fecha_desde=${filtros.fecha_desde}&fecha_hasta=${filtros.fecha_hasta}`);
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

export const historico_distribuciones: any = (filtros: {seleccion_vivero: number|string,seleccion_planta: number|string,fecha_desde: string,fecha_hasta: string}) => {
  return async () => {
    try {
      const { data } = await api.get(`conservacion/analitica/historico-distribuciones/get/?id_vivero=${filtros.seleccion_vivero === 'Todos' ? '': filtros.seleccion_vivero}&id_bien=${filtros.seleccion_planta}&fecha_desde=${filtros.fecha_desde}&fecha_hasta=${filtros.fecha_hasta}`);
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

export const historico_siembras: any = (filtros: {seleccion_vivero: number|string,seleccion_planta: number,fecha_desde: string,fecha_hasta: string}) => {
  return async () => {
    try {
      const { data } = await api.get(`conservacion/analitica/historico-siembras/get/?id_vivero=${filtros.seleccion_vivero === 'Todos' ? '': filtros.seleccion_vivero}&id_bien=${filtros.seleccion_planta}&fecha_desde=${filtros.fecha_desde}&fecha_hasta=${filtros.fecha_hasta}`);
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

export const historico_cambios_etapa: any = (filtros: {seleccion_vivero: number|string,seleccion_planta: number,fecha_desde: string,fecha_hasta: string}) => {
  return async () => {
    try {
      const { data } = await api.get(`conservacion/analitica/historico-cambios-etapa/get/?id_vivero=${filtros.seleccion_vivero === 'Todos' ? '': filtros.seleccion_vivero}&id_bien=${filtros.seleccion_planta}&fecha_desde=${filtros.fecha_desde}&fecha_hasta=${filtros.fecha_hasta}`);
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

export const historico_ingreso_cuarentena: any = (filtros: {seleccion_vivero: number|string,seleccion_planta: number,fecha_desde: string,fecha_hasta: string}) => {
  return async () => {
    try {
      const { data } = await api.get(`conservacion/analitica/historico-ingreso-cuarentena/get/?id_vivero=${filtros.seleccion_vivero === 'Todos' ? '': filtros.seleccion_vivero}&id_bien=${filtros.seleccion_planta}&fecha_desde=${filtros.fecha_desde}&fecha_hasta=${filtros.fecha_hasta}`);
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

export const historico_levantamiento_cuarentena: any = (filtros: {seleccion_vivero: number|string,seleccion_planta: number,fecha_desde: string,fecha_hasta: string}) => {
  return async () => {
    try {
      const { data } = await api.get(`conservacion/analitica/historico-levantamiento-cuarentena/get/?id_vivero=${filtros.seleccion_vivero === 'Todos' ? '': filtros.seleccion_vivero}&id_bien=${filtros.seleccion_planta}&fecha_desde=${filtros.fecha_desde}&fecha_hasta=${filtros.fecha_hasta}`);
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

export const historico_traslados: any = (filtros: {seleccion_vivero: number|string,seleccion_planta: number,fecha_desde: string,fecha_hasta: string}) => {
  return async () => {
    try {
      const { data } = await api.get(`conservacion/analitica/historico-traslados/get/?id_vivero=${filtros.seleccion_vivero === 'Todos' ? '': filtros.seleccion_vivero}&id_bien=${filtros.seleccion_planta}&fecha_desde=${filtros.fecha_desde}&fecha_hasta=${filtros.fecha_hasta}`);
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

export const obtiene_plantas_por_vivero: any = (seleccion_vivero: number) => {
  return async () => {
    try {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      const { data } = await api.get(`conservacion/analitica/busqueda-bienes-inventario/get/?id_vivero=${seleccion_vivero}`);
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

