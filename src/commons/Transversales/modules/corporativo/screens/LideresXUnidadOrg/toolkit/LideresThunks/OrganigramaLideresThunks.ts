/* eslint-disable @typescript-eslint/strict-boolean-expressions */
// import type { Dispatch } from 'react';
import {
  control_error /* control_success */,
  control_success
} from '../../../../../../../../helpers';
import type { AxiosError } from 'axios';
import { api } from '../../../../../../../../api/axios';

// ! ------ SERVICES ORGANIGRAMA ACTUAL ------ //

// ? --------- get organigrama actual --------- //
export const get_organigrama_actual_lideres_screen_service: any = async () => {
  try {

    const url = 'transversal/organigrama/get-organigrama-actual/';
    const { data } = await api.get(url);
    return data.data;
  } catch (error: any) {
    //  console.log('')(error.response.data, 'error');
    control_error(error.response.data.detail);
    return error as AxiosError;
  }
};

// ? --------- get ASIGNACIONES DE LIDERES organigrama actual --------- //
export const get_asignaciones_lideres_organigrama_actual_service: any =
  async () => {
    try {
      const url = 'transversal/lideres/get-list-actual/';
      const { data } = await api.get(url);
     //  console.log('')(data.data, 'data asignaciones lideres organigrama actual');
      return data.data;
    } catch (error: any) {
      //  console.log('')(error.response.data, 'error');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };

// ! ----------- SERVICES ORGANIGRAMAS ----------- //

// ? --------- get organigramas list --------- //
export const get_organigramas_list_lideres_screen_service = async ({
  nombre,
  version,
  actual,
  setLoadingButton
}: {
  nombre?: string;
  version?: string;
  actual?: string;
  setLoadingButton?: any;
}): Promise<any> => {
  try {
    setLoadingButton(true);
    const url = `transversal/lideres/busqueda-avanzada-organigramas/?nombre=${
      nombre ?? ''
    }&version=${version ?? ''}&actual=${actual ?? ''}`;
    const { data } = await api.get(url);
    control_success(data.detail || 'Proceso exitoso');
    return data.data;
  } catch (error: any) {
    console.error(error.response.data, 'error');
    control_error(error.response.data.detail);
  } finally {
    setLoadingButton(false);
  }
};

// ! --------- ASIGNACIONES LIDERES BY ORGANIGRAMA --------- //

export const get_asignaciones_lideres_by_id_organigrama_service: any = async (
  idOrganigrama: string
) => {
  try {
    const url = `transversal/lideres/get-list/${idOrganigrama}/`;
    const { data } = await api.get(url);
    //  console.log('')(data.data, 'data asignaciones lideres by organigrama');
    return data.data;
  } catch (error: any) {
    //  console.log('')(error.response.data, 'error');
    control_error(error.response.data.detail);
    return error as AxiosError;
  }
};


export const get_unidades_organizacionales_by_id_organigrama_service: any = async (
  idOrganigrama: string
) => {
  try {
    const url = `transversal/organigrama/unidades/get-by-organigrama/${idOrganigrama}/`;
    const { data } = await api.get(url);
    //  console.log('')(data.data, 'data unidades organizacionales by organigrama');
    return data.data;
  } catch (error: any) {
    //  console.log('')(error.response.data, 'error');
    control_error(error.response.data.detail);
    return error as AxiosError;
  }
}
