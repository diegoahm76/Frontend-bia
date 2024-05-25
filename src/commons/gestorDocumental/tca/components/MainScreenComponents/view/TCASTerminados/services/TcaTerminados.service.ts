/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { api } from '../../../../../../../../api/axios';
import {
  control_error,
  control_success
} from '../../../../../../../../helpers';
import { control_warning } from '../../../../../../../almacen/configuracion/store/thunks/BodegaThunks';
import { type TcaTerminados } from '../types/modalTcaTerminados.types';

export const getTcaTerminados = async (): Promise<any> => {
  try {
    const url = 'gestor/tca/tca-list/get/';
    const { data } = await api.get(url, {
      params: {
        limit: 1000,
        offset: 0
      }
    });
    const res = data?.filter(
      (item: TcaTerminados) => item.fecha_terminado
    );
    res.length === 0
      ? control_warning(
          'No hay TCA terminados, por favor cree o finalice uno para continuar'
        )
      : control_success(
          data.detail || 'proceso exitoso, se encontró la siguiente data'
        );
    return res;
  } catch (error: any) {
    control_error(
      `${error.response.data.detail}` ||
        'Ha ocurrido un error, no se han encontrado data'
    );
    //  console.log('')(error);
  }
};
