/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { type Dispatch } from 'react';
// Axios
import { api } from '../../../../../api/axios';
// Types
import { type AxiosError, type AxiosResponse } from 'axios';
// Reducers
import { get_series_ccd } from '../slices/seriesSlice';
import { control_error, control_success } from './ccdThunks';
// Interfaces
// import { type ISeriesObject } from '../../interfaces/ccd';

// Consulta series documentales
export const get_series_service: any = (id_ccd: any) => {
  return async (
    dispatch: Dispatch<any>,
    getState: any
  ): Promise<AxiosResponse | AxiosError> => {
    /* const { ccd } = getState((state: any) => state.ccd.ccd_current);
    const { id} = ccd.ccd_current;
    console.log(id) */
    try {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      const response = await api.get(`gestor/ccd/series/get-by-id-ccd/${id_ccd}/`);
      console.log(
        '🚀 ~ file: seriesThunks.ts ~ line 37 ~ return ~ data',
        response
      )

      dispatch(get_series_ccd(response.data.data));
      // notificationSuccess(data.detail);
      return response.data;
    } catch (error: any) {
      // notificationError(error.response.data.detail);
      return error as AxiosError;
    }
  };
};


//! se debe revisar el servicio porque las peticiones http deben ir por separado no dentro de una misma peticion el post, put and delete


// Crear, actualizar y/o eliminar series
export const delete_series_service:any = (
  newSeries: any,
  params_ccd_info: any,
  clean: () => void,
) => {
  return async (
    dispatch: Dispatch<any>,
    getState: any
  ): Promise<AxiosResponse | AxiosError> => {
    try {
      const { data } = await api.delete(
        `gestor/ccd/series/delete/${params_ccd_info.row.id_serie_doc}/`
      );
      dispatch(get_series_service(
        params_ccd_info.id
      ));
      clean();
      console.log(
        '🚀 ~ file: seriesThunks.ts ~ line 78 ~ return ~ data',
        data
      );

      control_success(data.detail);
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

//! post action for create series
export const create_series_service:any = (
  body: any,
  clean: () => void,
) => {
  return async (
    dispatch: Dispatch<any>,
    getState: any
  ): Promise<AxiosResponse | AxiosError> => {
    try {
      const { data } = await api.post(
        `gestor/ccd/series/create/`,
        body
      );
      dispatch(get_series_service(
        body.id_ccd
      ));
      clean();
      console.log(
        '🚀 ~ file: seriesThunks.ts ~ line 78 ~ return ~ data',
        data
      );

      control_success(data.detail);
      return data;
    } catch (error: any) {
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};