import { type Dispatch } from 'react';
import { toast, type ToastContent } from 'react-toastify';
// import Swal from 'sweetalert2'; // , { type SweetAlertResult }
import {
  type AxiosError,
  // type AxiosResponse
} from 'axios';
// Slices
import {
  initial_state_current_good,
  initial_state_transfer,
  set_goods,
  set_nurseries,
  set_transfer_goods,
  set_transfers_nurseries,
  set_current_transfer,
  set_transfer_person,
  set_current_good,
  set_nro_despacho,
  set_bienes_despacho,
  set_bienes,
  set_current_bien,
  set_despachos,
  set_current_despacho,
  initial_state_current_despacho,
  set_goods_aux,
} from '../slice/distribucionSlice';
import { api } from '../../../../../api/axios';

import {
  initial_state_current_funcionario,
  initial_state_current_solicitud,
  set_bienes_solicitud,
  set_current_funcionario,
  set_current_solicitud,
  set_solicitudes,
} from '../../../solicitudMaterial/store/slices/indexSolicitud';

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
export const control_success = (message: ToastContent) =>
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

// Obtener viveros
export const get_nurseries_service = (): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get(
        'conservacion/camas-siembras/siembra/get-viveros/'
      );
      dispatch(set_nurseries(data.data));
      return data;
    } catch (error: any) {
      //  console.log('')('get_nursery_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// Obtener bienes traslado
export const get_transfer_goods_service = (id: string | number): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get(
        `conservacion/traslados/get-items-traslado/${id}/`
      );
      dispatch(set_transfer_goods(data.data));
      //  console.log('')(data);
      return data;
    } catch (error: any) {
      //  console.log('')('get_transfer_goods_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// Obtener bienes vivero
export const get_goods_service = (
  id_vivero: string | number,
  codigo_bien: string | null,
  nombre: string | null,
  cod_elemento: string | null,
  semilla: boolean
): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get(
        `conservacion/traslados/filter-inventario-viveros/${id_vivero}/?codigo_bien=${
          codigo_bien ?? ''
        }&nombre=${nombre ?? ''}&cod_tipo_elemento_vivero=${
          (cod_elemento ?? '') === 'SE' ? 'MV' : cod_elemento ?? ''
        }&es_semilla_vivero=${
          (cod_elemento ?? '') === '' ? '' : semilla ?? false ? 'true' : 'false'
        }`
      );
      dispatch(set_goods(data.data));
      //  console.log('')(data);
      if (data.data.length > 0) {
        control_success('Se encontrarón bienes');
      } else {
        control_error('No se encontrarón bienes');
      }
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};
// Obtener bienes vivero
export const get_goods_aux_service = (id_vivero: string | number): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get(
        `conservacion/traslados/filter-inventario-viveros/${id_vivero}/`
      );
      dispatch(set_goods_aux(data.data));

      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// Obtener bien actual
export const get_good_code_service = (
  id_vivero: string | number,
  code: string | number
): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get(
        `conservacion/traslados/get-inventario-viveros/${code}/${id_vivero}/`
      );

      if (data.data.length > 0) {
        if (data.data.length === 1) {
          dispatch(set_current_good(data.data[0]));
          control_success('Se selecciono el traslado');
        } else {
          dispatch(set_goods(data.data));
          control_success('Se encontrarion bienes');
        }
      } else {
        control_error('No se encontró el traslado');
      }
      return data;
    } catch (error: any) {
      //  console.log('')('get_current_planting_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// obtener traslados
export const get_transfers_service = (
  id_vivero_origen: string | number,
  fecha_desde: string | null,
  fecha_hasta: string | null,
  id_vivero_destino: string | null
): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get(
        `conservacion/traslados/busqueda-avanzada-traslados/?id_vivero_origen=${
          id_vivero_origen ?? ''
        }&fecha_desde=${fecha_desde ?? ''}&fecha_hasta=${
          fecha_hasta ?? ''
        }&id_vivero_destino=${id_vivero_destino ?? ''}`
      );
      //  console.log('')(data);
      dispatch(set_transfers_nurseries(data.data));
      if (data.data.length > 0) {
        control_success('Se encontrarón traslados');
      } else {
        control_error('No se encontrarón traslados');
      }
      return data;
    } catch (error: any) {
      //  console.log('')('get_plantings_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// Obtener siembra actual
export const get_current_trasnfer_service = (id: string | number): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get(
        `conservacion/traslados/get-traslados-por-nro-traslado/${id}/`
      );

      dispatch(set_current_transfer(data.data.info_traslado));
      if ('success' in data) {
        control_success('Se selecciono el traslado');
      } else {
        control_error('No se encontró el traslado');
      }
      return data;
    } catch (error: any) {
      //  console.log('')('get_current_planting_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// obtener persona por iddocumento
export const get_person_id_service = (id: number): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get(`personas/get-by-id/${id}/`);

      if ('data' in data) {
        dispatch(
          set_transfer_person({
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

// obtener numero de solicitud
export const get_num_despacho = (): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get(
        'conservacion/despachos/get-ultimo-nro-despacho-viveros/'
      );

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

// crear traslado
export const add_transfer_service = (traslado: any): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.put(
        'conservacion/traslados/create-traslados/',
        traslado
      );
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      if (data.success) {
        dispatch(set_current_transfer(initial_state_transfer));
        dispatch(set_transfer_goods([]));
        dispatch(set_current_good(initial_state_current_good));
        dispatch(set_transfers_nurseries([]));
        control_success(data.detail);
      } else {
        control_error(data.detail);
      }
      return data;
    } catch (error: any) {
      //  console.log('')('add_trasladoa_service');
      //  console.log('')(error);
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// editar traslado
export const edit_traslado_service = (traslado: any): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.put(
        'conservacion/traslados/actualizar-traslados/',
        traslado
      );
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      if (data.success) {
        dispatch(set_transfers_nurseries([]));
        control_success(data.detail);
      } else {
        control_error(data.detail);
      }
      return data;
    } catch (error: any) {
      //  console.log('')('edit_traslado_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// crear cambio de etapa
export const annul_transfer_service = (id: number, transfer: any): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.put(
        `conservacion/traslados/anular-traslados/${id}/`,
        transfer
      );
      //  console.log('')(data);
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      if (data.success) {
        control_success(data.detail);
        dispatch(set_transfers_nurseries([]));
      } else {
        control_error(data.detail);
      }
      return data;
    } catch (error: any) {
      //  console.log('')('add_siembra_service');
      //  console.log('')(error);
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// Obtener bienes por numero de despacho

export const get_bienes_despacho = (
  id_solicitud_viveros: number | null
): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get(
        `conservacion/despachos/get-items-despacho/${
          id_solicitud_viveros ?? ''
        }/`
      );
      dispatch(set_bienes_despacho(data.data));
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

// obtener lotes pór codigo de material vegetal
export const get_bien_code_service = (
  id_vivero: number | string,
  code: string,
  name: string,
  tipo: string
): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      //  console.log('')(code, tipo);
      const { data } = await api.get(
        tipo === 'MV'
          ? `conservacion/despachos/get-planta/?id_vivero=${id_vivero}&codigo_bien=${
              code ?? ''
            }&nombre=${name ?? ''}&agno_lote&nro_lote`
          : `conservacion/despachos/get-insumo/${id_vivero}/${code ?? ''}/`
      );
      //  console.log('')(data);
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      if (tipo === 'MV') {
        if (data.data.length > 0) {
          if (data.data.length === 1) {
            dispatch(set_current_bien(data.data[0]));
            control_success('Se selecciono el lote');
          } else {
            dispatch(set_bienes(data.data));
            control_success('Se encontraron lotes');
          }
        } else {
          control_error('No se encontró el lote');
        }
      } else {
        dispatch(set_current_bien(data.data));
        if (data.success === true) {
          control_success('Se selecciono el bien');
        } else {
          control_error('No se encontró el bien');
        }
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
        `conservacion/despachos/get-planta/?id_vivero=${id_vivero}&codigo_bien=${
          code ?? ''
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
export const crear_despacho: any = (despacho: any) => {
  return async (dispatch: Dispatch<any>) => {
    try {
      //  console.log('')(despacho);
      const { data } = await api.put(
        'conservacion/despachos/registrar-despacho-viveros/',
        despacho
      );
      //  dispatch(get_solicitud_consumo_id());
      //  console.log('')(data);
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      if (data.success) {
        control_success(data.detail);
        dispatch(set_current_solicitud(initial_state_current_solicitud));
        dispatch(set_bienes_solicitud([]));
        dispatch(set_solicitudes([]));
        dispatch(set_current_funcionario(initial_state_current_funcionario));
        dispatch(set_current_despacho(initial_state_current_despacho));
        dispatch(set_bienes_despacho([]));
        dispatch(set_current_bien(initial_state_current_good));
        dispatch(set_despachos([]));
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
  despacho: any
  // bienes: any
) => {
  return async (dispatch: Dispatch<any>) => {
    try {
      //  console.log('')(despacho);
      const { data } = await api.put(
        'conservacion/despachos/update-despacho-viveros/',
        despacho
      );
      // await api.patch(`conservacion/solicitudes/update-items-solicitud/${id}/`, bienes);
      //  dispatch(get_solicitud_consumo_id());
      //  console.log('')(data);
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      if (data.success) {
        dispatch(set_despachos([]));
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
export const annul_despacho_service = (id: number, despacho: any): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.put(
        `conservacion/despachos/anular-despacho-viveros/${id}/`,
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
// anular despacho
export const closed_solicitud_service = (id: number, solicitud: any): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.patch(
        `conservacion/solicitudes/cerrar-solicitud/${id}/`,
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
// obtener despachos
export const get_despachos_service = (
  id_vivero: string | number,
  nro: string | number | null,
  fecha_desde: string | null,
  fecha_hasta: string | null
): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get(
        `conservacion/despachos/get-despachos/?fecha_desde=2023-02-01&fecha_hasta=2024-01-15&id_vivero=${
          id_vivero ?? ''
        }&nro_despachos_viveros=${nro ?? ''}`
      );
      // const { data } = await api.get(`conservacion/despachos/get-despachos/?fecha_desde=${fecha_desde}&fecha_hasta=${fecha_hasta}&id_vivero=${id_vivero}&nro_despachos_viveros=${nro}`);
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      //  console.log('')(data);
      if (data.success === true) {
        dispatch(set_despachos(data.data));
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
