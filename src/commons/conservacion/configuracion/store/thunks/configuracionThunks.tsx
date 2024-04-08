/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { type Dispatch } from 'react';
import { toast, type ToastContent } from 'react-toastify';
// import Swal from 'sweetalert2'; // , { type SweetAlertResult }
import {
  type AxiosError
  // type AxiosResponse
} from 'axios';
// Slices
import {
  current_nursery,
  get_bienes,
  get_germination_beds,
  get_mixtures,
  get_nurseries,
  get_unit_measurement
  // current_bien,
} from '../slice/configuracionSlice';
import { api } from '../../../../../api/axios';
import { type IObjGerminationBed } from '../../interfaces/configuracion';

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
    theme: 'light'
  });

  // Obtener viveros 
export const get_nurseries_service = (): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get('conservacion/viveros/get-by-nombre-municipio');
      // //  console.log('')(data)
      dispatch(get_nurseries(data.data));
      return data;
    } catch (error: any) {
      // //  console.log('')('get_nursery_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};
// Obtener vivero por id
export const get_nursery_service: any = (id: string | number)  => {
  return async (dispatch: Dispatch<any>) => {
    try {
      if(id !== undefined)
      {const { data } = await api.get(`conservacion/viveros/get-by-id/${id}/`);
      //  console.log('')(data)
      dispatch(current_nursery(data));
      return data;}
    } catch (error: any) {
      //  console.log('')('get_nursery_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

 // Obtener camas por vivero
 export const get_germination_beds_service = (id?: string|number|null): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      if(id !== null && id !== undefined)
      {const { data } = await api.get(`conservacion/camas-siembras/siembra/get-camas-germinacion-list/?id_vivero=${id}`);
    
      dispatch(get_germination_beds(data.data));
      return data;}
    } catch (error: any) {
      //  console.log('')('get_germination_beds_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// actualizar camas de germinacion por vivero
export const update_germination_beds_service: any = (id: string | number, beds: IObjGerminationBed[])  => {
  return async (dispatch: Dispatch<any>) => {
    try {
      if(id !== undefined)
      //  console.log('')(beds)
      {const { data } = await api.put(`conservacion/camas-siembras/camas-germinacion/${id}/`, beds);
      dispatch(get_germination_beds_service(id));
      control_success(data.detail);

      return data;}
    } catch (error: any) {
      //  console.log('')('update_germination_beds_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// Obtener bienes
export const get_bienes_service = (): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get('conservacion/viveros/get-bienes-consumo-filtro/');
      //  console.log('')(data.data)
      dispatch(get_bienes(data.data));
      return data;
    } catch (error: any) {
      //  console.log('')('get_bienes_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// Editar bien
export const edit_bien_service: any = (
  bien: any,
  id: string|number,

) => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.put(
        `conservacion/viveros/tipificacion/${id}/`,
        bien
      );
      dispatch(get_bienes_service());
      control_success('El bien se edito correctamente');
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      //  console.log('')(error.response.data);
      return error as AxiosError;
    }
  };
};

// Obtener mezclas
export const get_mixtures_service = (): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get('conservacion/mezclas/get-list-mezclas/');
      //  console.log('')(data)
      dispatch(get_mixtures(data.data));
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// Agregar Mezcla
export const add_mixture_service: any = (
  mixture: any,
) => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.post(
        'conservacion/mezclas/crear-mezcla/',
        mixture
      );
      dispatch(get_mixtures_service());
      control_success('La mezcla se agrego correctamente');
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      //  console.log('')(error.response.data);
      return error as AxiosError;
    }
  };
};

// Editar mezcla
export const edit_mixture_service: any = (
  mixture: any,
  id: string|number,

) => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.put(
        `conservacion/mezclas/actualizar-mezcla/${id}/`,
        mixture
      );
      dispatch(get_mixtures_service());
      control_success('La mezcla se edito correctamente');
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      //  console.log('')(error.response.data);
      return error as AxiosError;
    }
  };
};

// Borrar vivero
export const delete_mixture_service: any = (id: string | number) => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.delete(
        `conservacion/mezclas/eliminar-mezcla/${id}/`
      );
      dispatch(get_mixtures_service());
      control_success('Se elimino la mezcla');

      return data;
    } catch (error: any) {
      //  console.log('')('delete mixture service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// Desactivar - activar mezcla
export const activate_deactivate_mixture_service: any = (
  mixture: any,
  id: string | number

) => {
  const form_data = {
    nombre: mixture.nombre,
    id_unidad_medida: mixture.id_unidad_medida,
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    item_activo: !mixture.item_activo
  }
  return async (dispatch: Dispatch<any>) => {
    try {
      //  console.log('')(form_data)
      const { data } = await api.put(
        `conservacion/mezclas/actualizar-mezcla/${id}/`,
        form_data
      );
      dispatch(get_mixtures_service());
      form_data.item_activo ?
      control_success('La mezcla se activo correctamente'):
      control_success('La mezcla se desactivo correctamente');
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      //  console.log('')(error.response.data);
      return error as AxiosError;
    }
  };
};

// Obtener Medida
export const get_medida_service = (): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get('almacen/unidades-medida/get-list/');
      dispatch(get_unit_measurement(data));
      return data;
    } catch (error: any) {
      return error as AxiosError;
    }
  };
};

