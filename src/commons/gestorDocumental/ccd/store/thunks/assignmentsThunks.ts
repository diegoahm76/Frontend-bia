// import { NavigateFunction } from 'react-router-dom';
import { api } from '../../../../../api/axios';
import { type AxiosError, type AxiosResponse } from 'axios';
import { toast, type ToastContent } from 'react-toastify';
// Types
// Reducers
// import { current_organigram, get_levels, get_mold_organigrams, get_organigrams, get_unitys } from "../../../organigrama/store/slices/organigramSlice";
// Interfaces
// import { FormValuesUnitys, IObjCreateOrganigram, IObjLevels } from '../../../organigrama/interfaces/organigrama';
import { get_assignments_ccd } from '../slices/assignmentsSlice';
import { type Dispatch } from 'react';

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

// Obtiene ccd tabla intermedia
export const get_assignments_service: any = () => {
  return async (
    dispatch: Dispatch<any>,
    getState: any
  ): Promise<AxiosResponse | AxiosError> => {
    const { ccd_current } = getState().CCD;
    try {
      const id_ccd: number = ccd_current.id_ccd;
      const { data } = await api.get(`gestor/ccd/asignar/get/${id_ccd}/`);
      const new_data = data.data.map((item: any, index: number) => {
        return { ...item, id: index + 1 };
      });
      dispatch(get_assignments_ccd(new_data));
      // control_success(data.detail);
      return data;
    } catch (error: any) {
      // control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// Asignar series y subseries a unidades documentales
export const create_assignments_service: any = (
  new_item: any,
  clean: () => void
) => {
  return async (
    dispatch: Dispatch<any>,
    getState: any
  ): Promise<AxiosResponse | AxiosError> => {
    const { ccd_current } = getState().CCD;
    try {
      const id_ccd: number = ccd_current.id_ccd;
      const { data } = await api.put(
        `gestor/ccd/asignar/create/${id_ccd}/`,
        new_item
      );
      dispatch(get_assignments_service());
      control_success(data.detail);
      clean();
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      dispatch(get_assignments_service());
      clean();
      return error as AxiosError;
    }
  };
};
