/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
import { api } from '../../../../../../../../api/axios';
import {
  control_error,
 //  control_success
} from '../../../../../../../../helpers';

export const getTRDsUsados = async (): Promise<any> => {
  try {
    const url = 'gestor/trd/get-terminados/';
    const { data } = await api.get(url);
   /* control_success(
      "Se encontraron los siguientes TRD's usados" || data.detail
    ); */
    return data.data;
  } catch (error: any) {
    control_error(
      `${error.response.data.detail}` ||
        'Ha ocurrido un error, no se han encontrado data'
    );
    //  console.log('')(error);
  }
};
