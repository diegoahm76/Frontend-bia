/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { api } from '../../../../../../../../../api/axios';
import {
  control_error,
  control_success
} from '../../../../../../../../../helpers';
import { control_warning } from '../../../../../../../../almacen/configuracion/store/thunks/BodegaThunks';

export const getHistoricoTrasladosU_U = async (): Promise<any> => {
  try {
    const url = 'transversal/organigrama/historico-unidad-unidad/';
    const { data } = await api.get(url);

    if (data?.data?.length === 0) {
      control_warning('No se encontró histórico de traslados de unidad a unidad');
      return data.data;
    }

    control_success(data?.detail || 'Se encontró el siguiente histórico');
    return data?.data;
  } catch (error: any) {
    control_error(
      `${error?.response?.data?.detail}` ||
        'Ha ocurrido un error, no se han encontrado data'
    );
    //  console.log('')(error);
  }
};
