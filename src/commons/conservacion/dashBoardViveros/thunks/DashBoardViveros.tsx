
import { api } from '../../../../api/axios';
// Types
import { type AxiosResponse, type AxiosError, } from 'axios';
// Reducers
import { toast, type ToastContent } from 'react-toastify';
import { type ResponseServer } from '../../../../interfaces/globalModels';


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

// Obtiene viveros
export const obtener_viveros: any = () => {
  return async () => {
    try {
      const { data } = await api.get('conservacion/viveros/get-by-nombre-municipio/');
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};
// Obtiene tipos de bienes
export const obtener_tipos_bien: any = () => {
  return async () => {
    try {
      const { data } = await api.get('conservacion/choices/tipo-bien-tablero/');
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};
// Obtiene etapas de material vegetal
export const obtener_etapa_meterial_vegetal: any = () => {
  return async () => {
    try {
      const { data } = await api.get('conservacion/choices/cod-etapa-lote/');
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// Obtiene bienes para viveros
export const obtener_bienes_viveros: any = (filtros: {seleccion_vivero: number|string,seleccion_tipo_bien: string,seleccion_material_vegetal: string}) => {
  return async () => {
    try {
      const { data } = await api.get(`conservacion/analitica/busqueda-bienes-mezclas/get/?id_vivero=${filtros.seleccion_vivero === 'Todos' ? '': filtros.seleccion_vivero}&cod_tipo_elemento_vivero=${filtros.seleccion_tipo_bien === 'Todos' ? '': filtros.seleccion_tipo_bien}&cod_etapa_lote=${filtros.seleccion_material_vegetal === 'Todos' ? '': filtros.seleccion_material_vegetal}`);
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// Obtiene bienes para viveros
export const obtiene_analitica: any = (filtros: {seleccion_vivero: number|string,seleccion_tipo_bien: string,seleccion_material_vegetal: string, seleccion_bien_id: number|string, viveros_cuarentena: boolean, viveros_cerrados: boolean}) => {
  return async () => {
    try {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      const { data } = await api.get(`conservacion/analitica/tablero-control/get/?id_vivero=${filtros.seleccion_vivero === 'Todos' ? '': filtros.seleccion_vivero}&cod_tipo_elemento_vivero=${filtros.seleccion_tipo_bien === 'Todos' ? '': filtros.seleccion_tipo_bien}&cod_etapa_lote=${filtros.seleccion_material_vegetal === 'Todos' ? '': filtros.seleccion_material_vegetal}&id_bien=${filtros.seleccion_bien_id === undefined ? '': filtros.seleccion_bien_id}&viveros_cuarentena=${filtros.viveros_cuarentena}&viveros_cerrados=${filtros.viveros_cerrados}`);
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// Obtiene los tipos de entrada
export const obtener_tipos_entrada = async (): Promise<AxiosResponse<ResponseServer<any[]>>> => {
  return await api.get<ResponseServer<any[]>>('almacen/bienes/entradas/tipos-entradas/');
};
