/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { api } from '../../../../../../../../api/axios';
import {
  control_error,
  control_success
} from '../../../../../../../../helpers';

export const getTcaTerminados = async (): Promise<any> => {
  try {
    const url = 'gestor/tca/tca-list/get/';
    const { data } = await api.get(url);
    control_success(
      data.detail || 'proceso exitoso, se encontró la siguiente data'
    );
    return data;
  } catch (error: any) {
    control_error(
      `${error.response.data.detail}` ||
        'Ha ocurrido un error, no se han encontrado data'
    );
    console.log(error);
  }
};