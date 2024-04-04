import { type Dispatch } from 'react';
import type { AxiosError, AxiosResponse } from 'axios';
import { api } from '../../../../../../api/axios';
import { control_error } from '../../../../../../helpers';
import { get_finished_ccds } from '../slices/CCDResourcesSlice';

export const get_finished_ccd_service = (): ((
  dispatch: Dispatch<any>
) => Promise<AxiosResponse<any> | AxiosError>) => {
  return async (
    dispatch: Dispatch<any>
  ): Promise<AxiosResponse<any> | AxiosError> => {
    try {
      const { data } = await api.get('gestor/ccd/get-terminados/', {
        params: {
          limit: 10000,
          offset: 0
        }
      });
      /* //  console.log('')(
        '🚀 ~ file: getFinishedCcdThunks.ts ~ line 31 ~ return ~ data ccd terminados',
        data
      ); */
      dispatch(get_finished_ccds(data));
      return data;
    } catch (error: AxiosError | any) {
      control_error(error.response?.data?.detail);
      return error;
    }
  };
};
