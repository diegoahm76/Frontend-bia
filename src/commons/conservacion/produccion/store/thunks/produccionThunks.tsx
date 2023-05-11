import { type Dispatch } from 'react';
import { toast, type ToastContent } from 'react-toastify';
// import Swal from 'sweetalert2'; // , { type SweetAlertResult }
import {
  type AxiosError
  // type AxiosResponse
} from 'axios';
// Slices
import {
  set_nurseries, set_vegetal_materials, set_stage_changes, set_changing_person, set_persons
} from '../slice/produccionSlice';
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

// Obtener material vegetal filtro
export const get_vegetal_materials_service = (
  id: number,
  code_bien: string,
  name: string,
  cod_etapa: string,
  anio: number,
): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get(`conservacion/etapas/filtro-material-vegetal/${id}/?codigo_bien=${code_bien}&nombre=${name}&cod_etapa_lote=${cod_etapa??""}&agno_lote=${anio??""}`);
      dispatch(set_vegetal_materials(data.data));
      console.log(data)
      if ("data" in data){
        if (data.data.length>0){
          control_success("Se encontraron materiales vegetales")
        } else {
          control_error("No se encontraron materiales vegetales")
        }
      }
      return data;
    } catch (error: any) {
      console.log('get_vegetal_materials_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};


// obtener siembras
export const get_stage_changes_service = (
  id: number,
  code_bien: string,
  name: string,
  cod_etapa: string,
  anio: number,
): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get(`conservacion/etapas/filtro-cambio-etapa/${id}/?codigo_bien=${code_bien}&nombre=${name}&cod_etapa_lote_origen=${cod_etapa??""}&agno_lote=${anio??""}`);
      console.log(data)
      dispatch(set_stage_changes(data.data));
      if (data.data.length > 0) {
        control_success("Se encontraron cambios de etapa")
      } else {
        control_error("No se encontraron cambios de etapa")
      }
      return data;
    } catch (error: any) {
      console.log('set_stage_changes_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};


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
          dispatch(set_changing_person(data.data))
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
        dispatch (set_changing_person({id_persona: data.data.id_persona, tipo_documento: data.data.tipo_documento, numero_documento: data.data.numero_documento, 
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

// crear cambio de etapa
export const add_stage_change_service = (
  cambio: any,
): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.post('conservacion/etapas/guardar-cambio-etapa/', cambio);
      console.log(data)
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
      console.log(siembra, id)
      const { data } = await api.put(`conservacion/camas-siembras/siembra/update/${id}/`, siembra);
      console.log(data)
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
