import { type Dispatch } from 'react';
import { toast, type ToastContent } from 'react-toastify';
// import Swal from 'sweetalert2'; // , { type SweetAlertResult }
import {
  type AxiosError
  // type AxiosResponse
} from 'axios';
// Slices
import {
    get_goods, get_nurseries, get_vegetal_materials, get_germination_beds, get_planting_goods, get_plantings, set_current_planting
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
      dispatch(get_nurseries(data.data));
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
        dispatch(get_vegetal_materials(data.data));
        return data;
      } catch (error: any) {
        console.log('get_vegetal_materials_service');
        control_error(error.response.data.detail);
        return error as AxiosError;
      }
    };
  };

  // Obtener camas germinacion
export const get_germination_beds_service = (id: string|number): any => {
    return async (dispatch: Dispatch<any>) => {
      try {
        const { data } = await api.get(`conservacion/camas-siembras/siembra/get-camas-germinacion-siembra/${id}/`);
        console.log(data)
        dispatch(get_germination_beds(data.data));
        return data;
      } catch (error: any) {
        console.log('get_germination_beds_service');
        control_error(error.response.data.detail);
        return error as AxiosError;
      }
    };
  };

    // Obtener bienes siembra
export const get_planting_goods_service = (id: string|number): any => {
    return async (dispatch: Dispatch<any>) => {
      try {
        const { data } = await api.get(`conservacion/camas-siembras/siembra/get-bienes-consumidos/${id}/`);
        dispatch(get_planting_goods(data.data));
        return data;
      } catch (error: any) {
        console.log('get_planting_goods_service');
        control_error(error.response.data.detail);
        return error as AxiosError;
      }
    };
  };
      // Obtener bienes vivero
export const get_goods_service = (id: string|number): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get(`conservacion/camas-siembras/siembra/get-bienes-por-consumir-lupa/${id}/`);
      console.log(data)
      dispatch(get_goods(data.data));
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
        dispatch(get_plantings(data.data));
        if (data.data.length>0) {
          control_success("Se encontraron siembras")
        } else {
          control_error("No se encontraron siembras")
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
export const get_current_planting_service = (id: string|number): any => {
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
