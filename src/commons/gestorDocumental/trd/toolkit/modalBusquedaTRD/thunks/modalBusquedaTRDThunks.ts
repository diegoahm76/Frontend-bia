import type { AxiosError, AxiosResponse } from 'axios';
import { type Dispatch } from 'react';
import { control_error, control_success } from '../../../../../../helpers';
import { api } from '../../../../../../api/axios';
import { get_searched_list_trd } from '../slices/modalBusquedaTRDSlice';

export const get_searched_trd = (
  nombre: string,
  version: string
): ((dispatch: Dispatch<any>) => Promise<AxiosResponse<any> | AxiosError>) => {
  return async (
    dispatch: Dispatch<any>
  ): Promise<AxiosResponse<any> | AxiosError> => {
    try {
      const url = `gestor/trd/buscar/trd/nombre-version/?nombre=${nombre}&version=${version}`;
      const { data } = await api.get(url);
      console.log(
        '🚀 ~ file: modalBusquedaTRDThunks.ts ~ line 41 ~ return ~ data',
        data
      );
      dispatch(get_searched_list_trd(data.data));
      control_success(data.detail);
      return data.data;
    } catch (error: AxiosError | any) {
      console.log(error);
      control_error(error.response?.data?.detail);
      // dispatch(get_assignments_service(ccd_current));

      return error;
    }
  };
};
