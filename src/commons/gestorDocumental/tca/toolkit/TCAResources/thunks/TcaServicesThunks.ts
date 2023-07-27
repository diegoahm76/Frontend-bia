import { type AxiosResponse, type AxiosError } from 'axios';
import { type Dispatch } from 'react';
import { api } from './../../../../../../api/axios';
import { control_error, control_success } from '../../../../../../helpers';
import { set_get_tcas_action } from '../slice/TcaSlice';

export const get_searched_tcas_service: any = (
  nombre: string = '',
  version: string = '',
  setLoadingButton: any
): ((dispatch: any) => Promise<AxiosResponse<any> | AxiosError>) => {
  return async (
    dispatch: Dispatch<any>
  ): Promise<AxiosResponse<any> | AxiosError<any>> => {
    setLoadingButton(true);
    try {
      const url = `gestor/tca/get-busqueda-tca/?nombre=${nombre}&version=${version}`;
      const { data } = await api.get(url);
      console.log(
        '🚀 ~ file: modalBusquedaTRDThunks.ts ~ line 41 ~ return ~ data',
        data
      );
      dispatch(set_get_tcas_action(data.data));

      data.data.length === 0
        ? control_error('No se encontró data relacionada')
        : control_success(data.detail);
      return data.data;
    } catch (error: AxiosError | any) {
      // console.log(error);
      control_error(error.response?.data?.detail);
      return error;
    } finally {
      setLoadingButton(false);
    }
  };
};
