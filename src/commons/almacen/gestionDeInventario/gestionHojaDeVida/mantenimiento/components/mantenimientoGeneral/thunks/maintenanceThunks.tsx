import { api } from '../../../../../../../../api/axios';
// Types
import { type AxiosError, } from 'axios';
// Reducers
import { toast, type ToastContent } from 'react-toastify';
import { type Dispatch } from 'react';
import { get_computers_all_service } from '../../../../hojaDeVidaComputo/store/thunks/cvComputoThunks';
import { get_vehicles_all_service } from '../../../../hojaDeVidaVehiculo/store/thunks/cvVehiclesThunks';


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

// Crear matenimiento
export const create_maintenance_service: any = (form_data: any) => {
  return async (dispatch: Dispatch<any>) => {
      try {
        const { data } = await api.post('almacen/mantenimientos/programados/create/', form_data);
        control_success('El mantenimiento se creo correctamente');
          dispatch(get_computers_all_service());
          dispatch(get_vehicles_all_service());
          return data;
      } catch (error: any) {
          control_error(error.response.data.detail);
          return error as AxiosError;
      }
  };
};