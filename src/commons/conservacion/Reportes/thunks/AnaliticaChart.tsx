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

export const analitica_mortalidad: any = (filtros: {seleccion_vivero: string,seleccion_planta: any,fecha_desde: string,fecha_hasta: string}) => {
  return async () => {
    try {
      //  console.log('')(filtros.seleccion_vivero);
      const { data } = await api.get(`conservacion/analitica/analitica-mortalidad-tiempo/get/?id_bien=${filtros.seleccion_planta === 0 ? '' : filtros.seleccion_planta.id_bien.toString()}&id_vivero=${filtros.seleccion_vivero}&fecha_desde=${filtros.fecha_desde}&fecha_hasta=${filtros.fecha_hasta}`);
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};
export const analitica_bajas: any = (filtros: {seleccion_vivero: string,seleccion_tipo_elemento: any,fecha_desde: string,fecha_hasta: string}) => {
  return async () => {
    try {
      const { data } = await api.get(`conservacion/analitica/analitica-bajas-tiempo/get/??cod_tipo_elemento_vivero=${filtros.seleccion_tipo_elemento}&id_vivero=${filtros.seleccion_vivero}&fecha_desde=${filtros.fecha_desde}&fecha_hasta=${filtros.fecha_hasta}`);
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};
export const analitica_cuarentena: any = (filtros: {seleccion_vivero: string,seleccion_planta: any,fecha_desde: string,fecha_hasta: string}) => {
  return async () => {
    try {
      //  console.log('')(filtros.seleccion_planta)
      const { data } = await api.get(`conservacion/analitica/analitica-cuarentena-tiempo/get/?id_bien=${filtros.seleccion_planta === 0 ? '' : filtros.seleccion_planta.id_bien.toString()}&id_vivero=${filtros.seleccion_vivero}&fecha_desde=${filtros.fecha_desde}&fecha_hasta=${filtros.fecha_hasta}`);
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};
export const analitica_despachos: any = (filtros: {seleccion_vivero: string,seleccion_planta: any,fecha_desde: string,fecha_hasta: string, reporte_consolidado: boolean}) => {
  return async () => {
    try {
      //  console.log('')(filtros.seleccion_planta)
      const { data } = await api.get(`conservacion/analitica/analitica-despachos-tiempo/get/?id_bien=${filtros.seleccion_planta === 0 ? '' : filtros.seleccion_planta.id_bien.toString()}&id_vivero=${filtros.seleccion_vivero}&fecha_desde=${filtros.fecha_desde}&fecha_hasta=${filtros.fecha_hasta}`);
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};
export const analitica_solicitudes: any = (filtros: {seleccion_vivero: string,seleccion_planta: any,fecha_desde: string,fecha_hasta: string, reporte_consolidado: boolean}) => {
  return async () => {
    try {
      //  console.log('')(filtros.seleccion_planta)
      const { data } = await api.get(`conservacion/analitica/analitica-solicitudes-tiempo/get/?id_bien=${filtros.seleccion_planta === 0 ? '' : filtros.seleccion_planta.id_bien.toString()}&id_vivero=${filtros.seleccion_vivero}&fecha_desde=${filtros.fecha_desde}&fecha_hasta=${filtros.fecha_hasta}`);
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};


