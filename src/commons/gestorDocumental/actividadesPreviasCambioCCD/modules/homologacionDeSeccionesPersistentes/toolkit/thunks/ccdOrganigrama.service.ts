import { AxiosResponse } from 'axios';
import { api } from '../../../../../../../api/axios';
import { control_error, control_success } from '../../../../../../../helpers';

/* eslint-disable @typescript-eslint/naming-convention */
export const functionGetCcdHomologacionSeries = async (
  SetLoadingRequest: any
): Promise<any> => {
  try {
    SetLoadingRequest(true);
    const url = 'gestor/ccd/get-homologacion-busqueda/';
    const {
      data,
    }: AxiosResponse<{ data: any[]; detail?: string; message?: string }> =
      await api.get(url);
    if (data?.data.length > 0) {
      control_success(data?.detail ?? 'Se han encontrado los siguientes datos');
      return data?.data;
    } else {
      control_error('No se han encontrado datos que coincidan');
      return [];
    }
  } catch (err) {
    control_error('No se han encontrado datos que coincidan');
    return [];
  } finally {
    SetLoadingRequest(false);
  }
};
