/* eslint-disable @typescript-eslint/restrict-template-expressions */

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

// Obtiene los bienes para tabla de resultados viveros
export const reporte_mortalidad: any = (filtros: { seleccion_vivero: number | string, seleccion_planta: any, fecha_desde: string, fecha_hasta: string, reporte_consolidado: boolean }) => {
  return async () => {
    try {
      //  console.log('')(filtros.seleccion_planta)
      const { data } = await api.get(`conservacion/analitica/reporte-mortalidad/get/?id_vivero=${filtros.seleccion_vivero === 'Todos' ? '' : filtros.seleccion_vivero}&id_bien=${filtros.seleccion_planta.id_bien.toString()}&fecha_desde=${filtros.fecha_desde}&fecha_hasta=${filtros.fecha_hasta}&reporte_consolidado=${filtros.reporte_consolidado}`);
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};
export const reporte_plantas_sd: any = (filtros: { seleccion_vivero: number | string, seleccion_planta: any, fecha_desde: string, fecha_hasta: string, reporte_consolidado: boolean }) => {
  return async () => {
    try {
      const { data } = await api.get(`conservacion/analitica/reporte-solicitudes-despachos/get/?id_vivero=${filtros.seleccion_vivero === 'Todos' ? '' : filtros.seleccion_vivero}&id_bien=${filtros.seleccion_planta.id_bien.toString()}&fecha_desde=${filtros.fecha_desde}&fecha_hasta=${filtros.fecha_hasta}&reporte_consolidado=${filtros.reporte_consolidado}`);
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};
export const reporte_estado_actividad: any = (filtros: { seleccion_vivero: number | string, seleccion_planta: any, fecha_desde: string, fecha_hasta: string, reporte_consolidado: boolean }) => {
  return async () => {
    try {
      const { data } = await api.get(`conservacion/analitica/reporte-estado-actividad/get/?id_vivero=${filtros.seleccion_vivero === 'Todos' ? '' : filtros.seleccion_vivero}&id_bien=${filtros.seleccion_planta.id_bien.toString()}&fecha_desde=${filtros.fecha_desde}&fecha_hasta=${filtros.fecha_hasta}&reporte_consolidado=${filtros.reporte_consolidado}`);
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};
export const reporte_evolucion_lote: any = (filtros: { seleccion_vivero: number, seleccion_planta: any, fecha_desde: string, fecha_hasta: string, numero_lote: string, año_lote: string }) => {
  return async () => {
    try {
      const { data } = await api.get(`conservacion/analitica/reporte-actividad-lote/get/?id_vivero=${filtros.seleccion_vivero}&id_bien=${filtros.seleccion_planta.id_bien.toString()}&fecha_desde=${filtros.fecha_desde}&fecha_hasta=${filtros.fecha_hasta}&nro_lote=${filtros.numero_lote}&agno_lote=${filtros.año_lote}`);
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

