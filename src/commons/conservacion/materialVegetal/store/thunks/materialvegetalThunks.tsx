import { type Dispatch } from 'react';
import { toast, type ToastContent } from 'react-toastify';
// import Swal from 'sweetalert2'; // , { type SweetAlertResult }
import {
  type AxiosError
  // type AxiosResponse
} from 'axios';
// Slices
import {
  initial_state_planting,
  set_goods, set_nurseries, set_vegetal_materials, set_germination_beds, set_planting_goods, set_plantings, set_current_planting, set_planting_person, set_persons, set_current_germination_beds
} from '../slice/materialvegetalSlice';
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

// Obtener material vegetal
export const get_vegetal_materials_service = (): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get('conservacion/camas-siembras/siembra/get-material-vegetal/');
      dispatch(set_vegetal_materials(data.data));
      return data;
    } catch (error: any) {
      console.log('get_vegetal_materials_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// Obtener camas germinacion
export const get_germination_beds_service = (id: string | number): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get(`conservacion/camas-siembras/siembra/get-camas-germinacion-siembra/${id}/`);
      dispatch(set_germination_beds(data.data));
      console.log(data.data)
      return data;
    } catch (error: any) {
      console.log('get_germination_beds_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// Obtener camas germinacion
export const get_germination_beds_id_service = (camas:number[]): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const camas_gemination_id: any = {"camas_list": camas}
      const { data } = await api.post("conservacion/camas-siembras/siembra/get-camas-germinacion-by-id-list/", camas_gemination_id);
      dispatch(set_current_germination_beds(data.data));
      return data;
    } catch (error: any) {
      console.log('get_germination_beds_id_service');
      console.log(error)
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// Obtener bienes siembra
export const get_planting_goods_service = (id: string | number): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get(`conservacion/camas-siembras/siembra/get-bienes-consumidos/${id}/`);
      dispatch(set_planting_goods(data.data));
      return data;
    } catch (error: any) {
      console.log('get_planting_goods_service');
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
      // const { data } = await api.get(`conservacion/camas-siembras/siembra/get-bienes-por-consumir-lupa/${id_vivero}/?codigo_bien=${codigo_bien ?? ""}&nombre=${nombre??""}&cod_tipo_elemento_vivero=${cod_elemento??""}`);
      const { data } = await api.get(`conservacion/camas-siembras/siembra/get-bienes-por-consumir-lupa/${id_vivero}/`);

      dispatch(set_goods(data.data));
      return data;
    } catch (error: any) {
      console.log('get_planting_goods_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};
// obtener siembras
export const get_plantings_service = (): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get('conservacion/camas-siembras/siembra/get/');
      dispatch(set_plantings(data.data));
      return data;
    } catch (error: any) {
      console.log('get_plantings_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// Obtener siembra actual
export const get_current_planting_service = (id: string | number): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get(`conservacion/camas-siembras/siembra/get/${id}/`);
      dispatch(set_current_planting(data.data));
      return data;
    } catch (error: any) {
      console.log('get_current_planting_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
}

// obtener personas filtro
export const get_persons_service = (
  type: string|null,
  document: string|null,
  primer_nombre: string|null,
  primer_apellido: string|null,
  razon_social: string|null,
  comercial_name: string|null,

): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get(
        `personas/get-personas-filters/?tipo_documento=${type??""}&numero_documento=${document??""}&primer_nombre=${primer_nombre??""}&primer_apellido=${primer_apellido??""}&razon_social=${razon_social??""}&nombre_comercial=${comercial_name??""}`
      );
      dispatch(set_persons(data.data));
      if (data.data.length > 0) {
        control_success("Se selecciono persona")
      } else {
        control_error("No se encontro persona")
      }
      return data;
    } catch (error: any) {
      console.log('get_persons_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// obtener persona por documento
export const get_person_document_service = (
  type: string,
  document: string
): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get(`personas/get-personas-by-document/${type}/${document}/`);
      if ("data" in data) {
        if (data.data.length > 0) {
          dispatch(set_planting_person(data.data))
          control_success("Se selecciono la persona ")
        } else {
          control_error("No se encontro la persona")
        }
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

// obtener persona por iddocumento
export const get_person_id_service = (
  id: number,
): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get(`personas/get-by-id/${id}/`);
 
      if ("data" in data) {
        dispatch (set_planting_person({id_persona: data.data.id_persona, tipo_documento: data.data.tipo_documento, numero_documento: data.data.numero_documento, 
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

// crear siembra
export const add_siembra_service = (
  siembra: any,
): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.post('conservacion/camas-siembras/siembra/create/', siembra);
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      if (data.success) {
        control_success(data.detail)      
      } else {
        control_error(data.detail)
      }
      return data;
    } catch (error: any) {
      console.log('add_siembra_service');
      console.log(error)
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// editar siembra
export const edit_siembra_service = (
  siembra: any,
  id: number
): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.put(`conservacion/camas-siembras/siembra/update/${id}/`, siembra);
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      if (data.success) {
        control_success(data.detail)      
      } else {
        control_error(data.detail)
      }
      return data;
    } catch (error: any) {
      console.log('add_siembra_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// borrar siembra
export const delete_siembra_service = (
  id: number
): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.delete(`conservacion/camas-siembras/siembra/delete/${id}/`);
      console.log(data)
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      if (data.success) {
        control_success(data.detail)   
        dispatch(set_current_planting(initial_state_planting))   
        dispatch(set_planting_goods([]))   
      } else {
        control_error(data.detail)
      }
      return data;
    } catch (error: any) {
      console.log('add_siembra_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};
