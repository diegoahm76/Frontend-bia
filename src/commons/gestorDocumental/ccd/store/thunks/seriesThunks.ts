/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { type Dispatch } from 'react';
// Axios
import { api } from '../../../../../api/axios';
// Types
import { type AxiosError, type AxiosResponse } from 'axios';
// Reducers
import { get_series_ccd } from '../slices/seriesSlice';
import { control_error, control_success } from '../utils/success_errors';


// Interfaces
// import { type ISeriesObject } from '../../interfaces/ccd';


// ! get action for series
export const get_series_service: any = (id_ccd: string) => {
  return async (
    dispatch: Dispatch<any>
  ): Promise<AxiosResponse | AxiosError> => {
    try {
      const { data } = await api.get(
        `gestor/ccd/series/get-by-id-ccd/${id_ccd}/`
      );
      // //  console.log('')('🚀 file: seriesThunks.ts ~ get_series_service', data);
      dispatch(get_series_ccd(data.data));
      //  ? control_success(data.detail);
      return data;
    } catch (error: any) {
      // ? await notification_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

//! post action for create series
export const create_series_service: any = (body: any, clean: () => void) => {
  return async (
    dispatch: Dispatch<any>
  ): Promise<AxiosResponse | AxiosError> => {
    try {
      const { data } = await api.post(`gestor/ccd/series/create/`, body);
      dispatch(get_series_service(body.id_ccd));
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

// ! delete action for series
export const delete_series_service: any = (
  params_ccd_info: any,
  clean: () => void
) => {
  return async (
    dispatch: Dispatch<any>
  ): Promise<AxiosResponse | AxiosError> => {
    try {
      const response = await api.delete(
        `gestor/ccd/series/delete/${params_ccd_info.row.id_serie_doc}/`
      );
      dispatch(get_series_service(params_ccd_info.row.id_ccd));
      clean();
    /*  //  console.log('')(
        '🚀 ~ file: seriesThunks.ts ~ line 78 ~ return ~ data',
        response.data
      ); */

      control_success(response.data.detail);
      return response.data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

//! update action for series
export const update_series_data = (
  updatedData: any,
  ccd_current: any,
  clean: () => void
) => {
  return async (
    dispatch: Dispatch<any>
  ): Promise<AxiosResponse | AxiosError> => {
    try {
      const id_ser_doc = updatedData.id_serie_doc;
      const { data } = await api.put(
        `gestor/ccd/series/update/${id_ser_doc}/`,
        updatedData
      );
      dispatch(get_series_service(ccd_current?.id_ccd));
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

export const create_indepent_series_service: any = (
  body: any,
  // clean: () => void
) => {
  return async (
    dispatch: Dispatch<any>
  ): Promise<AxiosResponse | AxiosError> => {
    try {
      // //  console.log('')(body)
      const { data } = await api.post(
        `gestor/ccd/catalogo/serie-subserie/create/`,
        {
          id_serie_doc: body,
        }
      );
      // dispatch(get_series_service(body.id_ccd));
      // clean();
      // //  console.log('')('🚀 ~', data);
      control_success(data.detail);
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};
