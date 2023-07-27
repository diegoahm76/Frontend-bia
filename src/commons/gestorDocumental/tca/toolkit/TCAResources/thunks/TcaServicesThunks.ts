/* eslint-disable @typescript-eslint/strict-boolean-expressions */
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

// ! --------- | FINISH AND RESUME TCA SERVICES | --------- ! //
// ? finish TCA and resume TCA
export const finish_resume_tca_service: any = async (
  id_tca: number,
  flag: boolean,
  setFlag: React.Dispatch<React.SetStateAction<boolean>>
): Promise<any> => {
  try {
 /*   if (!id_tca) throw new Error('No se ha podido realizar la acción'); */
/*
    const url = flag
      ? `gestor/tca/finish/${id_tca}/`
      : `gestor/tca/resume/${id_tca}/`;
*/
    // const { data } = await api.put(url);
    // control_success(data.detail);
    setFlag(!flag);
    console.log('flag', flag);
    // return data;
  } catch (error: AxiosError | any) {
    control_error(error.response?.data?.detail || error.message);
    throw error;
  }
};
