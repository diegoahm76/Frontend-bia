import { type Dispatch } from 'react';
import { type NavigateFunction } from 'react-router-dom';
import { toast, type ToastContent } from 'react-toastify';
import Swal from 'sweetalert2'; // , { type SweetAlertResult }
import {
  type AxiosError
  // type AxiosResponse
} from 'axios';
// Slices
import {
  get_nurseries,
  current_nursery
} from '../slice/viveroSlice';
// Interfaces
 //import {
//   // type IObjOrganigram,
 //  type IObjCreateOrganigram
//   // type FormValuesUnitys,
//   //  type IObjLevels,
//   //  type IObjUnitys
 //} from '../../interfaces/vivero';
import { api } from '../../../../../api/axios';

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


// Obtener Organigrama
export const get_nurseries_service = (): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get('conservacion/viveros/get-by-nombre-municipio/apertura-cierre');
      console.log(data)
      dispatch(get_nurseries(data.Organigramas));
      return data;
    } catch (error: any) {
      console.log('get_organigrams_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};


