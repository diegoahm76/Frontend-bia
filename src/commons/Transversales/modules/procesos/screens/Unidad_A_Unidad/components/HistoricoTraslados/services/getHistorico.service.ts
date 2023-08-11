/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { api } from '../../../../../../../../../api/axios';
import {
  control_error,
  control_success
} from '../../../../../../../../../helpers';

export const getHistoricoTrasladosU_U = async (): Promise<any> => {
  try {
    const url = 'transversal/organigrama/historico-unidad-unidad/';
    const { data } = await api.get(url);
    control_success(data.detail || 'Se encontró el siguiente histórico');
    return data.data;
  } catch (error: any) {
    control_error(
      `${error.response.data.detail}` ||
        'Ha ocurrido un error, no se han encontrado data'
    );
    console.log(error);
  }
};
