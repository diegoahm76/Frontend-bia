/* eslint-disable @typescript-eslint/strict-boolean-expressions */
// import type { Dispatch } from 'react';
import { control_error, /* control_success */ } from '../../../../../../../../helpers';
import type { AxiosError } from 'axios';
import { api } from '../../../../../../../../api/axios';

export const get_organigrama_actual_lideres_screen_service: any = async () => {
    try {
      const url = 'transversal/organigrama/get-organigrama-actual/';

      const { data } = await api.get(url);

      console.log(data, 'data');

      console.log('get_organigrama_actual_lideres_screen_service');
      // control_success(data.detail || 'Se obtuvo el organigrama actual con éxito')
      return data.data;
    } catch (error: any) {
      console.log(error.response.data, 'error');
      control_error(error.response.data.detail);
      return error as AxiosError;
    } finally {
      // setCreateTRDLoadingButton(false);
    }
};
