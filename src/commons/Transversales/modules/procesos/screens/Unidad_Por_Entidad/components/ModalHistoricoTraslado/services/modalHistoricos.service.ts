/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
import { type AxiosResponse } from 'axios';
import { control_warning } from '../../../../../../../../almacen/configuracion/store/thunks/BodegaThunks';
import { api } from '../../../../../../../../../api/axios';
import {
  control_error,
  control_success
} from '../../../../../../../../../helpers';

const HISTORICO_NO_ENCONTRADO =
  'No se encontró histórico de traslados de unidad a entidad';
const HISTORICO_ENCONTRADO = 'Se encontró el siguiente histórico';
const ERROR_DEFAULT = 'Ha ocurrido un error, no se han encontrado datos';

export const getHistoricosTraslados = async (): Promise<any> => {
  try {
    const url = 'transversal/organigrama/historico-unidad-entidad/';
    const { data }: AxiosResponse<any> = await api.get(url);

    if (data?.data?.length === 0) {
      control_warning(HISTORICO_NO_ENCONTRADO);
      return data.data;
    }

    control_success(data?.detail || HISTORICO_ENCONTRADO);
    return data?.data;
  } catch (error) {
    const errorMessage = `${ERROR_DEFAULT}`;
    control_error(errorMessage);
    //  console.log('')(error);
    throw new Error(errorMessage);
  }
};
