/* eslint-disable @typescript-eslint/strict-boolean-expressions */
// import { NavigateFunction } from 'react-router-dom';
import { api } from '../../../../../api/axios';
import { type AxiosError, type AxiosResponse } from 'axios';
import { toast, type ToastContent } from 'react-toastify';
// Types
// Reducers
// import { current_organigram, get_levels, get_mold_organigrams, get_organigrams, get_unitys } from "../../../organigrama/store/slices/organigramSlice";
// Interfaces
// import { FormValuesUnitys, IObjCreateOrganigram, IObjLevels } from '../../../organigrama/interfaces/organigrama';
// import { get_assignments_ccd } from '../slices/assignmentsSlice';
import { type Dispatch } from 'react';
import { get_assignments_ccd } from '../slices/assignmentsSlice';
// import { ccd_slice } from './../slices/ccdSlice';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const control_error = (message: ToastContent = 'Algo pasó, intente de nuevo') =>
  toast.error(message, {
    position: 'bottom-left',
    autoClose: 2000,
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
    position: 'bottom-left',
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light'
  });

// Obtiene ccd tabla intermedia
export const get_assignments_service: any = (
  ccd_current: any,
  nombreUnidadActual?: any
) => {
  return async (
    dispatch: Dispatch<any>
    // getState: any
  ): Promise<AxiosResponse | AxiosError> => {
    try {
      const id_ccd: number = ccd_current.id_ccd;
      const { data } = await api.get(
        `gestor/ccd/catalogo/unidad/get-by-id-ccd/${id_ccd}/`
      );
      const new_data = data.data.map((item: any, index: number) => {
        return {
          ...item,
          id: index + 1,
          nombreUnidad: nombreUnidadActual.label ? nombreUnidadActual.label : ''
        };
      });
      console.log(
        '🚀 ~ file: assignmentsThunks.ts ~ line 59 ~ return ~ new_data',
        new_data
      );
      dispatch(get_assignments_ccd(new_data));
      // control_success(data.detail);
      return data;
    } catch (error: any) {
      // control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

export const create_or_delete_assignments_service: any = (
  new_items: any[],
  ccd_current: any
) => {
  return async (
    dispatch: Dispatch<any>
  ): Promise<AxiosResponse[] | AxiosError> => {
    try {
      const id_ccd: number = ccd_current.id_ccd;

      const { data } = await api.put(
        `gestor/ccd/catalogo/unidad/update/${id_ccd}/`,
        new_items
      );

      // const responses = await Promise.all(requests);

      dispatch(await get_assignments_service(ccd_current));
      control_success(data.detail);

      return data;
    } catch (error: any) {
      console.log(error);
      control_error(error.response?.data?.detail);
      dispatch(get_assignments_service(ccd_current));

      return error as AxiosError;
    }
  };
};
