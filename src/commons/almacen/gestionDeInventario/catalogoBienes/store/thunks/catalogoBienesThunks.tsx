/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { type Dispatch } from 'react';
import { toast, type ToastContent } from 'react-toastify';
// import Swal from 'sweetalert2'; // , { type SweetAlertResult }
import {
  type AxiosError,
  // type AxiosResponse
} from 'axios';
// Slices
import {
  get_bienes,
  get_marks,
  get_unit_measurement,
  get_percentages,
  get_code_bien,
} from '../slices/indexCatalogodeBienes';
import { api } from '../../../../../../api/axios';

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

// Obtener bienes
export const get_bienes_service = (): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get('almacen/bienes/catalogo-bienes/get-list');
      dispatch(get_bienes(data.data));
      return data;
    } catch (error: any) {
      console.log('get_bienes_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// Agregar bien
export const add_bien_service: any = (bien: any) => {
  return async (dispatch: Dispatch<any>) => {
    try {
      console.log(bien);
      const { data } = await api.put(
        'almacen/bienes/catalogo-bienes/create/',
        bien
      );
      dispatch(get_bienes_service());
      control_success('El bien se agrego correctamente');
      return data;
    } catch (error: any) {
      console.log('add_bien_service');
      control_error(error.response.data.detail);
      console.log(error);
      return error as AxiosError;
    }
  };
};

// obtener marcas
export const get_marca_service = (): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get('almacen/marcas/get-list');
      dispatch(get_marks(data));
      return data;
    } catch (error: any) {
      return error as AxiosError;
    }
  };
};
// obtener porcentajes
export const get_porcentaje_service = (): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get('almacen/porcentajes/get-list');
      dispatch(get_percentages(data));
      return data;
    } catch (error: any) {
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

// eliminar

// Eliminar nodo
export const delete_nodo_service: any = (id: number) => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.delete(
        `almacen/bienes/catalogo-bienes/delete/${id}`
      );
      dispatch(get_bienes_service()); // actualizamos la lista de bienes
      control_success('Se elimino correctamente');
      return data;
    } catch (error: any) {
      console.log('eliminar_nodo_service');
      control_error(error.response.data.detail);
      console.log(error);
      return error as AxiosError;
    }
  };
};

// Eliminar nodo
export const get_code_bien_service: any = (code: string | null) => {
  return async (dispatch: Dispatch<any>) => {
   let codigo = 0;
    let nivel = 1;
    let limit = 9;
    if (code == null) {

      codigo = 1
      nivel = 1
      limit = 9
    } else {
      if (code.length === 1) {
        codigo = Number(code) * 10
        nivel = 2
        limit = codigo + 9
      } else if (code.length === 2) {
        codigo = (Number(code) * 100) + 1
        nivel = 3
        limit = codigo + 99
      } else if (code.length === 4) {
        codigo = (Number(code) * 1000) + 1
        nivel = 4
        limit = codigo + 999
      } else {
        codigo = (Number(code) * 100000) + 1
        nivel = 5
        limit = codigo + 99999
      }
    }
    for (let index = codigo; index <= limit; index++) {
      try {
        const { data } = await api.get(`almacen/bienes/catalogo-bienes/validar-codigo/${nivel}/${index}/`);
        if (data.success) {
          dispatch(get_code_bien(index.toString()))
        return data;
        } else {
          if (index === limit) {
            control_error('No se pueden crear mas nodos en este nivel');
          }
        }

      } catch (error: any) {

      }

    }

};
};

// Eliminar bien
// export const delete_bien_service = (id_bien: number): any => {
//   return async (dispatch: Dispatch<any>) => {
//     try {
//       const { data } = await api.delete(
//         `almacen/bienes/catalogo-bienes/delete/${id_bien}/`
//       );
//       dispatch(get_bienes_service());
//       control_success('El bien se eliminó correctamente');
//       return data;
//     } catch (error: any) {
//       console.log('eliminar_bien_service');
//       control_error(error.response.data.detail);
//       console.log(error);
//       return error as AxiosError;
//     }
//   };
// };

// export const delete_bien: any = (bien: any) => {
//   return async (dispatch: Dispatch<any>) => {
//    try {
//      await api.delete(`almacen/bienes/catalogo-bienes/delete/${nodo.data.id_nodo}`);
//     dispatch(add_bien_service());
//     control_success('se elimino bien');
//     return data;
//    } catch(error:any) {
//     console.log('delete');
//     control_error(error.response.data.detail);
//     return error as AxiosError;
//    }

//    }
//   }
