import { type Dispatch } from 'react';
import Swal from 'sweetalert2';
import { api } from '../../../../../api/axios';
// Types
import { type AxiosError, type AxiosResponse } from 'axios';
// Reducers
import { get_series_ccd } from '../slices/seriesSlice';
// Interfaces
import { type ISeriesObject } from '../../interfaces/ccd';

// Consulta series documentales
export const get_series_service: any = () => {
  return async (
    dispatch: Dispatch<any>,
    getState: any
  ): Promise<AxiosResponse | AxiosError> => {
    const { ccd_current } = getState().ccd;
    const id_ccd: number = ccd_current.id_ccd;
    try {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      const { data } = await api.get(`gestor/ccd/series/get/${id_ccd}/`);
      dispatch(get_series_ccd(data.data));
      // notificationSuccess(data.detail);
      return data;
    } catch (error: any) {
      // notificationError(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// Crear, actualizar y/o eliminar series
export const create_series_service:any = (
  newSeries: ISeriesObject[],
  clean: () => void
) => {
  return async (
    dispatch: Dispatch<any>,
    getState: any
  ): Promise<AxiosResponse | AxiosError> => {
    const { ccd_current } = getState().ccd;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const element_modal_id = document.getElementById(
      'modal-serie-subserie-id'
    )!;
    try {
      const id_ccd: number = ccd_current.id_ccd;
      const { data } = await api.put(
        `gestor/ccd/series/update/${id_ccd}/`,
        newSeries
      );
      dispatch(get_series_service());
      clean();
      void Swal.fire({
        target: element_modal_id,
        position: 'center',
        icon: 'success',
        title: data.detail,
        showConfirmButton: true,
        confirmButtonText: 'Aceptar',
        timer: 2000
      });
      return data;
    } catch (error: any) {
      void Swal.fire({
        target: element_modal_id,
        position: 'center',
        icon: 'error',
        title: error.response.data.detail,
        showConfirmButton: true,
        confirmButtonText: 'Aceptar',
        timer: 2000
      });
      return error as AxiosError;
    }
  };
};
