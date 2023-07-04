import { type Dispatch } from 'react';
import { api } from '../../../../../../api/axios';
import { control_error, control_success } from '../../../../../../helpers';
import { type AxiosResponse, type AxiosError } from 'axios';
import { get_trd_current, get_trds } from '../slice/TRDResourcesSlice';


// ? Obtener TRD's
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
      dispatch(get_trds(data.data));
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


// ? crear TRD
export const create_trd_service: any = (
  /* ccd: any,
  set_save_ccd: (arg0: boolean) => void,
  openModalBusquedaCreacionCCD: any,
  activateLoadingButton: any,
  desactivateLoadingButton: any */
  bodyPost: any
) => {
  return async (dispatch: Dispatch<any>) => {
    // activateLoadingButton();
    try {
      console.log(bodyPost, 'bodyPost');
      const { data } = await api.post('gestor/trd/create/', {
        id_ccd: bodyPost.id_ccd.item.id_ccd,
        nombre: bodyPost.nombre,
        version: bodyPost.version,
      });
      dispatch(get_trd_current(data.data));
      control_success(data.detail);
      /* set_save_ccd(true);
      openModalBusquedaCreacionCCD(); */
      return data.data;
    } catch (error: any) {
      console.log(error.response.data, 'error');
      control_error(error.response.data.detail);
      return error as AxiosError;
    } finally {
      // desactivateLoadingButton();
    }
  };
};
