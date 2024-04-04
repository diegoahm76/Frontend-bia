/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { type Dispatch } from 'react';
import { type NavigateFunction } from 'react-router-dom';
import { toast, type ToastContent } from 'react-toastify';
// import Swal from 'sweetalert2'; // , { type SweetAlertResult }
import {
  type AxiosError,
  // type AxiosResponse
} from 'axios';
// Slices
import {
  current_nursery,
  get_items_despacho,
  get_items_distribuidos,
  get_nurseries,
  get_nurseries_closing,
  get_nurseries_quarantine,
  initial_state_current_nursery,
  initial_state_current_viverista_actual,
  set_bienes_bajas,
  set_current_genera_baja,
  set_current_insumo,
  set_current_nuevo_viverista,
  set_current_nursery,
  set_current_viverista,
  set_genera_bajas,
  set_historicos_viveristas,
  set_insumos,
  set_insumos_aux,
  set_nuevos_viveristas,
  set_persona,
  // current_nursery
} from '../slice/viveroSlice';
import { api } from '../../../../../api/axios';

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
        'conservacion/viveros/get-by-nombre-municipio'
      );
      //  console.log('')(data);
      dispatch(get_nurseries(data.data));
      return data;
    } catch (error: any) {
      //  console.log('')('get_nursery_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// Agregar Vivero
export const add_nursery_service: any = (
  nursery: any,
  navigate: NavigateFunction
) => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.post('conservacion/viveros/create/', nursery);
      dispatch(get_nurseries_service());
      dispatch(current_nursery(initial_state_current_nursery as any));
      control_success('El vivero se agrego correctamente');
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      //  console.log('')(error.response.data);
      return error as AxiosError;
    }
  };
};

// Editar Vivero
export const edit_nursery_service: any = (
  nursery: any,
  id: string | number,

  navigate: NavigateFunction
) => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.put(
        `conservacion/viveros/update/${id}/`,
        nursery
      );
      dispatch(get_nurseries_service());
      dispatch(current_nursery(initial_state_current_nursery as any));
      control_success('El vivero se edito correctamente');
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      //  console.log('')(error.response.data);
      return error as AxiosError;
    }
  };
};

// Borrar vivero
export const delete_nursery_service: any = (id: string | number) => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.delete(`conservacion/viveros/delete/${id}/`);
      dispatch(get_nurseries_service());
      control_success('Se elimino el vivero');

      return data;
    } catch (error: any) {
      //  console.log('')('delete nursery service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// Desactivar - activar vivero
export const activate_deactivate_nursery_service: any = (
  id: string | number
) => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.put(`conservacion/viveros/desactivar/${id}/`);
      dispatch(get_nurseries_service());
      control_success(data.detail);

      return data;
    } catch (error: any) {
      //  console.log('')('activate-deactivate nursery service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// Obtener vivero por id
export const get_nursery_service: any = (id: string | number) => {
  return async (dispatch: Dispatch<any>) => {
    try {
      if (id !== undefined) {
        const { data } = await api.get(`conservacion/viveros/get-by-id/${id}/`);
        dispatch(set_current_nursery(data));
        return data;
      }
    } catch (error: any) {
      //  console.log('')('get_nursery_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};
// Obtener vivero por id
export const get_historico_viverista_service: any = (id: string | number) => {
  return async (dispatch: Dispatch<any>) => {
    try {
      if (id !== undefined) {
        const { data } = await api.get(
          `conservacion/viveros/historial-viverista-by-vivero/${id}/`
        );
        if ('data' in data) {
          dispatch(set_historicos_viveristas(data.data));
        } else {
          dispatch(set_historicos_viveristas([]));
        }
        return data;
      }
    } catch (error: any) {
      //  console.log('')('get_historico_viverista_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// Obtener viveros cierre
export const get_nurseries_closing_service = (): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get(
        'conservacion/viveros/get-by-nombre-municipio'
      );
      dispatch(get_nurseries_closing(data.data));
      return data;
    } catch (error: any) {
      //  console.log('')('get_nursery_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// Obtener viveros cuarentena
export const get_nurseries_quarantine_service = (): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get(
        '/api/conservacion/viveros/get-by-nombre-municipio/cuarentena'
      );

      dispatch(get_nurseries_quarantine(data.data));
      return data;
    } catch (error: any) {
      //  console.log('')('get_nursery_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// abrir-cerrar vivero
export const closing_nursery_service: any = (
  nursery: any,
  id: string | number,

  navigate: NavigateFunction
) => {
  return async (dispatch: Dispatch<any>) => {
    try {
      //  console.log('')(nursery);
      const { data } = await api.put(
        `conservacion/viveros/abrir-cerrar/${id}/`,
        nursery
      );
      dispatch(get_nurseries_closing_service());

      dispatch(get_nursery_service(id));
      if (nursery.accion === 'Abrir') {
        control_success('Se realizo la apertura del vivero');
      } else {
        control_success('Se realizo el cierre del vivero');
      }
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      //  console.log('')(error);
      return error as AxiosError;
    }
  };
};

// cuarentena vivero
export const quarantine_nursery_service: any = (
  nursery: any,
  id: string | number,

  navigate: NavigateFunction
) => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.put(
        `conservacion/viveros/cuarentena/${id}/`,
        nursery
      );
      dispatch(get_nurseries_closing_service());

      dispatch(get_nursery_service(id));
      if (nursery.accion === 'Abrir') {
        control_success('Se realizo el registro de salida de cuarentena');
      } else {
        control_success('Se realizo el registro de ingreso a cuarentena');
      }
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      //  console.log('')(error);
      return error as AxiosError;
    }
  };
};

// Obtener items despacho
export const get_items_despacho_service = (id: string | number): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get(
        `conservacion/despachos/items-despacho/get-by-id/${id ?? ''}/`
      );
      // //  console.log('')(data);
      if (data.data.length > 0) {
        dispatch(get_items_despacho(data.data));
      } else {
        dispatch(get_items_despacho([]));
      }
      return data;
    } catch (error: any) {
      // //  console.log('')('get_items_despacho_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// Obtener items predistribuidos
export const get_items_distribuidos_service = (id: string | number): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get(
        `conservacion/despachos/get-obtener-items-predistribuidos/${id ?? ''}/`
      );
      if (data.data.length > 0) {
        dispatch(get_items_distribuidos(data.data));
      } else {
        dispatch(get_items_distribuidos([]));
      }

      return data;
    } catch (error: any) {
      // //  console.log('')('get_items_despacho_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// guardar items predistribuidos
export const save_items_distribuidos_service = (
  id: string | number,
  observacion: string | null,
  items: any
): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.put(
        `conservacion/despachos/guardar/${
          id ?? ''
        }/?observaciones_distribucion=${observacion ?? ''}`,
        items
      );
      if (data.success) {
        dispatch(get_items_distribuidos_service(id));
        control_success(data.detail);
      } else {
        control_success(data.detail);
      }
      return data;
    } catch (error: any) {
      //  console.log('')('save_items_despacho_service');
      //  console.log('')(error);
      control_error(error);
      return error as AxiosError;
    }
  };
};

// confirmar items predistribuidos
export const confirmar_items_distribuidos_service = (
  id: string | number,
  observacion: string,
  items: any
): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.put(
        `conservacion/despachos/confirmar-distribucion/${
          id ?? ''
        }/?observaciones_distribucion=${observacion}`,
        items
      );

      if (data.success) {
        dispatch(get_items_distribuidos_service(id));
        control_success(data.detail);
      } else {
        control_success(data.detail);
      }
      return data;
    } catch (error: any) {
      // //  console.log('')('save_items_despacho_service');
      //  console.log('')(error);
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// obtener personas filtro
export const get_nuevos_viveristas_service = (
  type: string | null,
  document: string | null,
  primer_nombre: string | null,
  primer_apellido: string | null,
  segundo_nombre: string | null,
  segundo_apellido: string | null
): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get(
        `conservacion/viveros/get-persona-viverista-nuevo-lupa/?tipo_documento=${
          type ?? ''
        }&numero_documento=${document ?? ''}&primer_nombre=${
          primer_nombre ?? ''
        }&primer_apellido=${primer_apellido ?? ''}&segundo_nombre=${
          segundo_nombre ?? ''
        }&segundo_apellido=${segundo_apellido ?? ''}`
      );
      dispatch(set_nuevos_viveristas(data.data));
      if (data.data.length > 0) {
        control_success('Se encontraron viveristas');
      } else {
        control_error('No se encontraron viveristas');
      }
      return data;
    } catch (error: any) {
      //  console.log('')('get_nuevos_viveristas_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// obtener persona por documento
export const get_viverista_document_service = (
  type: string,
  document: string
): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get(
        `conservacion/viveros/get-persona-viverista-nuevo-by-numero-documento/?tipo_documento=${type}&numero_documento=${document}`
      );
      //  console.log('')(data);
      if ('data' in data) {
        if (data.data.length > 0) {
          dispatch(set_current_nuevo_viverista(data.data[0]));
          control_success('Se selecciono el viverista');
        } else {
          control_error('No se encontro el viverista');
        }
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

// obtener persona por iddocumento
export const get_viverista_id_service = (id: number): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get(
        `conservacion/viveros/viverista-actual-by-id-vivero/${id}/`
      );
      //  console.log('')(data);
      if ('data' in data) {
        dispatch(set_current_viverista(data.data));
      } else {
        control_error(data.detail);
      }
      return data;
    } catch (error: any) {
      dispatch(set_current_viverista(initial_state_current_viverista_actual));
      //  console.log('')('get_viverista_id_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// Obtener viveros viverista
export const get_viveros_viverista_service = (): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get('conservacion/viveros/listado-viveros/');

      dispatch(get_nurseries(data.data));
      return data;
    } catch (error: any) {
      //  console.log('')('get_viveros_viverista_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// asignar viverista
export const asignar_viverista_service: any = (
  id_vivero: string | number,
  datos: any,

  navigate: NavigateFunction
) => {
  return async (dispatch: Dispatch<any>) => {
    try {
      //  console.log('')(datos);
      const { data } = await api.post(
        `conservacion/viveros/asignacion-viverista/${id_vivero}/`,
        datos
      );
      dispatch(get_nursery_service(id_vivero));
      control_success('Se asigno el viverista');
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// remover viverista
export const remover_viverista_service: any = (
  id_vivero: string | number,
  datos: any,

  navigate: NavigateFunction
) => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.put(
        `conservacion/viveros/remover-viverista/${id_vivero}/`,
        datos
      );
      dispatch(get_nursery_service(id_vivero));
      control_success('Se removio el viverista');
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// Obtener viveros bajas
export const get_nurseries_baja_service = (): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get('conservacion/bajas/get-viveros/');

      dispatch(get_nurseries(data.data));
      return data;
    } catch (error: any) {
      //  console.log('')('get_nurseries_baja_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// Obtener bajas filtro
export const get_bajas_service = (nro: number): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get(
        `conservacion/bajas/get-bajas-by-filter/?nro_baja=${nro ?? ''}`
      );
      //  console.log('')(data);
      dispatch(set_genera_bajas(data.data));
      if ('data' in data) {
        if (data.data.length > 0) {
          control_success('Se encontraron bajas');
        } else {
          control_error('No se encontraron bajas');
        }
      }
      return data;
    } catch (error: any) {
      //  console.log('')('get_bajas_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// get baja nro
export const get_bajas_nro_service = (nro: number): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get(
        `conservacion/bajas/get-baja-by-numero-baja/${nro}`
      );
      //  console.log('')(data);
      if ('data' in data) {
        dispatch(set_current_genera_baja(data.data));
        control_success('Se selecciono baja');
      } else {
        control_error('No se encontro baja');
      }
      return data;
    } catch (error: any) {
      //  console.log('')('get_bajas_nro_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// crear cambio de etapa
export const add_baja_service = (baja: any): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.put(
        'conservacion/bajas/crear-bajas-vivero/',
        baja
      );
      //  console.log('')(data);
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      if (data.succes) {
        control_success(data.detail);
      } else {
        control_error(data.detail);
      }
      return data;
    } catch (error: any) {
      //  console.log('')('add_baja_service');
      //  console.log('')(error);
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// editar siembra
export const edit_baja_service = (baja: any): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.put(
        'conservacion/bajas/actualizar-bajas-vivero/',
        baja
      );
      //  console.log('')(data);
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      if (data.succes) {
        control_success(data.detail);
      } else {
        control_error(data.detail);
      }
      return data;
    } catch (error: any) {
      //  console.log('')('edit_baja_service');
      //  console.log('')(error);
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// anular baja
export const annul_baja_service = (id: number, baja: any): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.put(
        `conservacion/bajas/anualar-bajas-vivero/${id}/`,
        baja
      );

      if (data.succes === true) {
        control_success(data.detail);
      } else {
        control_error(data.detail);
      }
      return data;
    } catch (error: any) {
      //  console.log('')('annul_baja_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// Obtener bienes baja
export const get_bienes_service = (
  id_vivero: string | number,
  tipo_elemento: string | null,
  codigo_bien: string | null,
  nombre: string | null
): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      // const { data } = await api.get(`conservacion/camas-siembras/siembra/get-bienes-por-consumir-lupa/${id_vivero}/?codigo_bien=${codigo_bien ?? ""}&nombre=${nombre??""}&cod_tipo_elemento_vivero=`);

      const { data } = await api.get(
        `conservacion/bajas/busqueda-avanzada-bienes-bajas/${id_vivero}/?codigo_bien=${
          codigo_bien ?? ''
        }&nombre=${nombre ?? ''}&cod_tipo_elemento_vivero=${
          tipo_elemento ?? ''
        }`
      );
      //  console.log('')(data);
      dispatch(set_insumos(data.data));
      if (data.data.length > 0) {
        control_success('Se encontrarón bienes');
      } else {
        control_error('No se encontrarón bienes');
      }
      return data;
    } catch (error: any) {
      //  console.log('')('get_bienes_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};
// Obtener bienes baja
export const get_bienes_aux_service = (id_vivero: string | number): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      // const { data } = await api.get(`conservacion/camas-siembras/siembra/get-bienes-por-consumir-lupa/${id_vivero}/?codigo_bien=${codigo_bien ?? ""}&nombre=${nombre??""}&cod_tipo_elemento_vivero=`);

      const { data } = await api.get(
        `conservacion/bajas/busqueda-avanzada-bienes-bajas/${id_vivero}/`
      );
      dispatch(set_insumos_aux(data.data));
      if (data.data.length > 0) {
        control_success('Se encontrarón bienes');
      } else {
        control_error('No se encontrarón bienes');
      }
      return data;
    } catch (error: any) {
      //  console.log('')('get_bienes_aux_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// obtener bien codigo bien
export const get_bien_code_service = (id_vivero: number, code: string): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get(
        `conservacion/bajas/get-bienes-bajas/${code}/${id_vivero}/`
      );
      //  console.log('')(data);
      if ('data' in data) {
        dispatch(set_current_insumo(data.data));
      } else {
        control_error(data.detail);
      }
      return data;
    } catch (error: any) {
      //  console.log('')('get_bien_code_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// obtener bienes preparacion
export const get_bien_baja_id_service = (id: number): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get(
        `conservacion/bajas/get-items-by-baja/${id}`
      );
      //  console.log('')(data);
      if ('data' in data) {
        dispatch(set_bienes_bajas(data.data));
      } else {
        control_error(data.detail);
      }
      return data;
    } catch (error: any) {
      //  console.log('')('get_bien_baja_id_service');
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
          set_persona({
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

// Obtener bien actual
export const get_good_code_baja_service = (
  id_vivero: string | number,
  code: string | number
): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get(
        `conservacion/bajas/get-bienes-bajas/${code}/${id_vivero}/`
      );

      // //  console.log('')(data);
      if ('data' in data) {
        dispatch(set_current_insumo(data.data));
        control_success('Se selecciono el bien');
      } else {
        control_error('no sé encontrarion bienes');
      }

      return data;
    } catch (error: any) {
      //  console.log('')('get_good_code_baja_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};
