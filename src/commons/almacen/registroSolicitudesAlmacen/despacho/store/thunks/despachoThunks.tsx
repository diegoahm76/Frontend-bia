import { toast, type ToastContent } from 'react-toastify';

import { api } from '../../../../../../api/axios';
// import { type AxiosError } from 'axios';

import { type Dispatch } from 'react';
import { type AxiosError } from 'axios';
import { get_bodega } from '../../../../configuracion/store/slice/BodegaSlice';
import {
  set_bienes,
  set_bienes_despacho,
  set_current_bien,
  set_despachos,
  set_nro_despacho,
  set_persona_despacha,
} from '../slices/indexDespacho';
import {
  set_bienes_solicitud,
  set_current_solicitud,
} from '../../../solicitudBienConsumo/store/slices/indexSolicitudBienesConsumo';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const control_error = (
  message: ToastContent = 'Algo pasó, intente de nuevo'
) =>
  toast.error(message, {
    position: 'bottom-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
  });

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const control_success = (message: ToastContent) =>
  toast.success(message, {
    position: 'bottom-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
  });

// obtener despachos
export const get_despachos_service = (
  numero_solicitud_por_tipo: string | number,
  id_unidad_para_la_que_solicita: string | number | null,
  fecha_despacho: string | null,
  es_despacho_conservacion: string | null
): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get(
        `almacen/despachos/filter-despacho-consumo/?fecha_despacho=${fecha_despacho ?? ''
        }&id_unidad_para_la_que_solicita=${id_unidad_para_la_que_solicita ?? ''
        }&numero_solicitud_por_tipo=${numero_solicitud_por_tipo ?? ''
        }&es_despacho_conservacion=${es_despacho_conservacion ?? ''}`
      );



      if (data.success === true) {
        dispatch(set_despachos(data.data));
        //  console.log('')(data);
        control_success(data.detail);
      } else {
        control_error(data.detail);
      }
      return data;
    } catch (error: any) {

      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// Obtener Bodega
export const get_bodega_service = (): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get('almacen/bodega/get-list/');
      //  console.log('')(data);
      dispatch(get_bodega(data));
      return data;
    } catch (error: any) {
      //  console.log('')('get_bodega_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

export const get_solicitud_by_id = (
  id_solicitud_consumibles: number | null
): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get(
        `almacen/solicitudes/get-solicitud-by-id/${id_solicitud_consumibles ?? ''
        }/`
      );
      dispatch(set_current_solicitud(data.detail.info_solicitud));
      dispatch(set_bienes_solicitud(data.detail.info_items));
      //  console.log('')(data);
      if (data.data.length > 0) {
        // control_success("Se encontrarón bienes")
      } else {
        // control_error("No se encontrarón bienes")
      }
      return data;
    } catch (error: any) {
      // control_error(error.response.detail.info_items);
      return error as AxiosError;
    }
  };
};

// obtener persona por iddocumento
export const get_person_id_despacho = (id: number): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get(`personas/get-by-id/${id}/`);

      if ('data' in data) {
        dispatch(
          set_persona_despacha({
            id_persona: data.data.id_persona,
            tipo_documento: data.data.tipo_documento,
            numero_documento: data.data.numero_documento,
            nombre_completo:
              String(data.data.primer_nombre) +
              ' ' +
              String(data.data.primer_apellido),
          })
        );
      } else {
        control_error(data.detail);
      }
      return data;
    } catch (error: any) {
      //  console.log('')('get_person_document_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// Obtener bienes por numero de despacho

export const get_bienes_despacho = (nro_despacho: number | null): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get(
        `almacen/despachos/get-despacho-consumo-by-numero-despacho/?numero_despacho_consumo=${nro_despacho ?? ''
        }`
      );
      dispatch(set_bienes_despacho(data.data.items_despacho_consumo));
      //  console.log('')(data);
      if (data.data.length > 0) {
        // control_success("Se encontrarón bienes")
      } else {
        // control_error("No se encontrarón bienes")
      }
      return data;
    } catch (error: any) {
      // //  console.log('')('get_planting_goods_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// obtener numero de despacho
export const get_num_despacho = (): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get(
        'almacen/despachos/obtener-numero-despacho/'
      );
      //  console.log('')(data);

      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      if (data.success) {
        dispatch(set_nro_despacho(data.detail));
      }
      return data;
    } catch (error: any) {
      return error as AxiosError;
    }
  };
};
// obtener bienes
export const get_bien_code_service = (
  code: string,
  fecha: string,
  es_conservacion: boolean | null
): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get(
        es_conservacion === true
          ? `almacen/despachos/agregar-bienes-consumo-conservacion-by-lupa/?codigo_bien_solicitado=${code}&fecha_despacho=${fecha}`
          : `almacen/despachos/search-bienes-inventario/?codigo_bien_solicitado=${code}&fecha_despacho=${fecha}`
      );
      //  console.log('')(data);
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions

      if (data.data.length > 0) {
        if (data.data.length === 1) {
          dispatch(set_current_bien(data.data[0]));
          control_success('Se selecciono el bien');
        } else {
          dispatch(set_bienes(data.data));
          control_success('Se encontraron bienes');
        }
      } else {
        control_error('No se encontró el bien');
      }

      return data;
    } catch (error: any) {
      //  console.log('')('get_bien_code_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};


// obtener bienes otros origenes
export const get_bien_code_service_origin = (
  id: string | number,
  fecha: string | number,

): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get(`almacen/despachos/get-items-otros-origenes/${id}/?fecha_despacho=${fecha}`);
      //  console.log('')(data);
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions

      if (data.data.length > 0) {
        if (data.data.length === 1) {
          dispatch(set_current_bien(data.data[0]));
          control_success('Se selecciono el bien');
        } else {
          dispatch(set_bienes(data.data));
          control_success('Se encontraron bienes');
        }
      } else {
        control_error('No se encontró el bien');
      }

      return data;
    } catch (error: any) {
      //  console.log('')('get_bien_code_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// obtener lotes filtro
export const get_bienes_service = (
  id_vivero: string | number,
  code: string | null,
  name: string | null,
  agno: string | number | null,
  nro: string | number | null
): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get(
        `conservacion/despachos/get-planta/?id_vivero=${id_vivero}&codigo_bien=${code ?? ''
        }&nombre=${name ?? ''}&agno_lote=${agno ?? ''}&nro_lote=${nro ?? ''}`
      );
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      //  console.log('')(data);
      if (data.success === true) {
        dispatch(set_bienes(data.data));
        control_success(data.detail);
      } else {
        control_error(data.detail);
      }
      return data;
    } catch (error: any) {
      //  console.log('')('get_bienes_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// CREAR SOLICITUD
export const crear_despacho: any = (
  despacho: any,
  es_conservacion: boolean | null
) => {
  return async (dispatch: Dispatch<any>) => {
    try {
      //  console.log('')(despacho);
      const { data } = await api.put(
        es_conservacion === true
          ? 'almacen/despachos-vivero/crear-despacho-bienes-de-consumo/'
          : 'almacen/despachos/crear-despacho-bienes-de-consumo/',
        despacho
      );
      //  dispatch(get_solicitud_consumo_id());
      //  console.log('')(data);
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      if (data.success) {
        control_success(data.detail);
      } else {
        control_error(data.detail);
      }
      // control_success(' se agrego correctamente');
      return data;
    } catch (error: any) {
      //  console.log('')(error);
      control_error(error.response.data.detail);

      return error as AxiosError;
    }
  };
};
// EDITAR despacho
export const editar_despacho: any = (
  id: number,
  despacho: any,
  es_conservacion: boolean | null
) => {
  return async (dispatch: Dispatch<any>) => {
    try {
      //  console.log('')(despacho);
      const { data } = await api.put(
        es_conservacion === true
          ? 'almacen/despachos-vivero/actualizar-despacho-bienes-de-consumo/'
          : 'almacen/despachos/actualizar-despacho-bienes-de-consumo/',
        despacho
      );
      // await api.patch(`conservacion/solicitudes/update-items-solicitud/${id}/`, bienes);
      //  dispatch(get_solicitud_consumo_id());
      //  console.log('')(data);
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      if (data.success) {
        control_success(data.detail);
      } else {
        control_error(data.detail);
      }
      // control_success(' se agrego correctamente');
      return data;
    } catch (error: any) {
      //  console.log('')(error);
      control_error(error.response.data.detail);

      return error as AxiosError;
    }
  };
};

// anular despacho
export const annul_despacho_service = (
  id: number,
  despacho: any,
  es_conservacion: boolean | null
): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.put(
        es_conservacion === true
          ? `almacen/despachos-vivero/anular-despacho-bienes-de-consumo/${id}/`
          : `almacen/despachos/anular-despacho-bienes-de-consumo/${id}/`,
        despacho
      );
      //  console.log('')(data);
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      if (data.success) {
        control_success(data.detail);
      } else {
        control_error(data.detail);
      }
      return data;
    } catch (error: any) {
      //  console.log('')('annul_despacho_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// cerrar solicitud
export const closed_solicitud_service = (id: number, solicitud: any): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.patch(
        `almacen/despachos/cerrar-solicitud-debido-inexistencia/${id}/`,
        solicitud
      );
      //  console.log('')(data);
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      if (data.success) {
        control_success(data.detail);
      } else {
        control_error(data.detail);
      }
      return data;
    } catch (error: any) {
      //  console.log('')('closed_solicitud_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};
