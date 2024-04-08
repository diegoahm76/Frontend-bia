/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { type Dispatch } from 'react';
// import Swal from 'sweetalert2';
import { api } from '../../../../../api/axios';
// Types
import { type AxiosError, type AxiosResponse } from 'axios';
// Reducers
import { get_subseries_ccd } from '../slices/subseriesSlice';
import { control_error, control_success } from '../utils/success_errors';
// Interfaces
// import { type ISubSeriesObject } from '../../interfaces/ccd';

// Consulta subseries documentales
export const get_subseries_service: any = (id_serie_doc?: string | number) => {
  return async (
    dispatch: Dispatch<any>,
    getState: any
  ): Promise<AxiosResponse | AxiosError> => {
     const { ccd_current } = getState().ccd;
    try {
      const id_ccd_serie_doc: number = ccd_current.id_ccd;
      const { data } = await api.get(
        `gestor/ccd/subseries/get-by-id-serie-doc/${id_serie_doc ?? id_ccd_serie_doc}/`
        // gestor/ccd/subseries/get-by-id-serie-doc/65/
      );
      // //  console.log('')(data)
      dispatch(get_subseries_ccd(data.data));
      return data;
    } catch (error: any) {
      return error as AxiosError;
    }
  };
};

// Crear, actualizar y/o eliminar subseries

export const create_sub_series_service = (body: any, clean: () => void): any => {
  return async (
    dispatch: Dispatch<any>,
  ): Promise<AxiosResponse | AxiosError | any> => {
    try {
      const { data } = await api.post(`gestor/ccd/subseries/create/`, body);
      dispatch(get_subseries_service(body.id_serie_doc));
      clean();
      // //  console.log('')('🚀 ~ file: seriesThunks.ts ~ line 78 ~ return ~ data', data);
      control_success(data.detail);
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  }
}

//! update action for series
export const update_sub_series_service: any = (
  updatedData: any,
  dataForm: any,
  clean: () => void
) => {
  return async (
    dispatch: Dispatch<any>,
  ): Promise<AxiosResponse | AxiosError | any> => {
    try {
      const { data } = await api.put(
        `gestor/ccd/subseries/update/${dataForm.id_subserie_doc}/`,
        updatedData
      );
      dispatch(get_subseries_service(dataForm.id_serie_doc));
      clean();
      // //  console.log('')('🚀 ~ file: seriesThunks.ts ~ line 78 ~ return ~ data', data);
      control_success(data.detail);
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};


export const delete_sub_series_service: any = (
  params_ccd_info: any,
  clean: () => void
) => {
  return async (
    dispatch: Dispatch<any>,
  ): Promise<AxiosResponse | AxiosError> => {
    try {
      const {data} = await api.delete(
        `gestor/ccd/subseries/delete/${params_ccd_info.row.id_subserie_doc}/`
      );
      dispatch(get_subseries_service(params_ccd_info.row.id_serie_doc));
      clean();
      // //  console.log('')('🚀 ~ file: seriesThunks.ts ~ line 78 ~ return ~ data', data);

      control_success(data.detail);
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};


/* export const create_subseries_service:any = (
  newSubSeries: ISubSeriesObject[],
  clean: () => void
) => {
  return async (
    dispatch: Dispatch<any>,
    getState: any
  ): Promise<AxiosResponse | AxiosError> => {
    const { ccd_current } = getState().ccd;
    const element_modal_id = document.getElementById(
      'modal-serie-subserie-id'
    )!;
    try {
      const id_ccd: number = ccd_current.id_ccd;
      const { data } = await api.put(
        `gestor/ccd/subseries/update/${id_ccd}/`,
        newSubSeries
      );
      dispatch(get_subseries_service());
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
 */