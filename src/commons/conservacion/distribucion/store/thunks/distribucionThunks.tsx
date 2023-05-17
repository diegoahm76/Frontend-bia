import { type Dispatch } from 'react';
import { toast, type ToastContent } from 'react-toastify';
// import Swal from 'sweetalert2'; // , { type SweetAlertResult }
import {
  type AxiosError
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
} from '../slice/distribucionSlice';
import { api } from '../../../../../api/axios';



// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const control_error = (message: ToastContent = 'Algo pasó, intente de nuevo') =>
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
    theme: 'light'
  });


// Obtener viveros
export const get_nurseries_service = (): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get('conservacion/camas-siembras/siembra/get-viveros/');
      dispatch(set_nurseries(data.data));
      return data;
    } catch (error: any) {
      console.log('get_nursery_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};


// Obtener bienes traslado
export const get_transfer_goods_service = (id: string | number): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get(`conservacion/traslados/get-items-traslado/${id}/`);
      dispatch(set_transfer_goods(data.data));
      console.log(data)
      return data;
    } catch (error: any) {
      console.log('get_transfer_goods_service');
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
  cod_elemento: string |null
  ): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      console.log(`conservacion/traslados/filter-inventario-viveros/${id_vivero}/?codigo_bien=${codigo_bien ?? ""}&nombre=${nombre??""}&cod_tipo_elemento_vivero=${cod_elemento??""}`)
      const { data } = await api.get(`conservacion/traslados/filter-inventario-viveros/${id_vivero}/?codigo_bien=${codigo_bien ?? ""}&nombre=${nombre??""}&cod_tipo_elemento_vivero=${cod_elemento??""}`);
      dispatch(set_goods(data.data));
      console.log(data)
      if (data.data.length > 0) {
        control_success("Se encontrarón bienes")
      } else {
        control_error("No se encontrarón bienes")
      }
      return data;
    } catch (error: any) {
      console.log('get_planting_goods_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// Obtener bien actual
export const get_good_code_service = (
  id_vivero: string | number,
  code: string | number,
  ): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get(`conservacion/traslados/get-inventario-viveros/${code}/${id_vivero}/`);
      
      if (data.data.length > 0) {
        if (data.data.length === 1){
          dispatch(set_current_good(data.data[0]));
          control_success("Se selecciono el traslado")
        }else{
          dispatch(set_goods(data.data));
          control_success("Se encontrarion bienes")
        }
      } else {
        control_error("No se encontró el traslado")
      }
      return data;
    } catch (error: any) {
      console.log('get_current_planting_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
}

// obtener traslados
export const get_transfers_service = (
  id_vivero_origen: string | number,
  fecha_desde: string | null,
  fecha_hasta: string | null,
  id_vivero_destino: string |null
  ): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get(`conservacion/traslados/busqueda-avanzada-traslados/?id_vivero_origen=${id_vivero_origen ?? ""}&fecha_desde=${fecha_desde ?? ""}&fecha_hasta=${fecha_hasta ?? ""}&id_vivero_destino=${id_vivero_destino ?? ""}`);
      console.log(data)
      dispatch(set_transfers_nurseries(data.data));
      if (data.data.length > 0) {
        control_success("Se encontrarón traslados")
      } else {
        control_error("No se encontrarón traslados")
      }
      return data;
    } catch (error: any) {
      console.log('get_plantings_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// Obtener siembra actual
export const get_current_trasnfer_service = (id: string | number): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get(`conservacion/traslados/get-traslados-por-nro-traslado/${id}/`);
    
      dispatch(set_current_transfer(data.data.info_traslado));
      if ('success' in data) {
        control_success("Se selecciono el traslado")
      } else {
        control_error("No se encontró el traslado")
      }
      return data;
    } catch (error: any) {
      console.log('get_current_planting_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
}



// obtener persona por iddocumento
export const get_person_id_service = (
  id: number,
): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get(`personas/get-by-id/${id}/`);
 
      if ("data" in data) {
        dispatch (set_transfer_person({id_persona: data.data.id_persona, tipo_documento: data.data.tipo_documento, numero_documento: data.data.numero_documento, 
          nombre_completo: String(data.data.primer_nombre) + " " + String(data.data.primer_apellido)}))
      } else {
        control_error(data.detail)
      }
      return data;
    } catch (error: any) {
      console.log('get_person_document_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};




// crear traslado
export const add_transfer_service = (
  traslado: any,
): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.put('conservacion/traslados/create-traslados/', traslado);
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      if (data.success) {
        dispatch(set_current_transfer(initial_state_transfer))
        dispatch(set_transfer_goods([]))
        dispatch(set_current_good(initial_state_current_good))
        control_success(data.detail)      
      } else {
        control_error(data.detail)
      }
      return data;
    } catch (error: any) {
      console.log('add_trasladoa_service');
      console.log(error)
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// editar traslado
export const edit_traslado_service = (
  traslado: any
): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.put('conservacion/traslados/actualizar-traslados/', traslado);
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      if (data.success) {
        control_success(data.detail)      
      } else {
        control_error(data.detail)
      }
      return data;
    } catch (error: any) {
      console.log('edit_traslado_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// // borrar siembra
// export const delete_siembra_service = (
//   id: number
// ): any => {
//   return async (dispatch: Dispatch<any>) => {
//     try {
//       const { data } = await api.delete(`conservacion/camas-siembras/siembra/delete/${id}/`);
//       console.log(data)
//       // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
//       if (data.success) {
//         control_success(data.detail)   
//         dispatch(set_current_planting(initial_state_planting))   
//         dispatch(set_planting_goods([]))   
//       } else {
//         control_error(data.detail)
//       }
//       return data;
//     } catch (error: any) {
//       console.log('add_siembra_service');
//       control_error(error.response.data.detail);
//       return error as AxiosError;
//     }
//   };
// };
