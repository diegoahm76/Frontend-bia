/* eslint-disable @typescript-eslint/naming-convention */
import { api } from '../../../../../../../api/axios';
import { control_error } from '../../../../../../../helpers';

const PERSISTENCIA_CONFIRMADA_URL =
  'gestor/ccd/persistencia-confirmada-ccd/create/';
const ERROR_MESSAGE = 'Ha ocurrido un error al enviar los datos';

export const postPersistenciasConfirmadas = async ({
  setLoading,
  dataToPost,
}: {
  setLoading: Function;
  dataToPost: any;
}): Promise<any> => {
  try {
    setLoading(true);
    //  console.log('')(dataToPost);
    const response = await api.post(PERSISTENCIA_CONFIRMADA_URL, dataToPost);
    //  console.log('')(response);
    return response;
  } catch (err) {
    //  console.log('')(err);
    control_error(ERROR_MESSAGE);
  } finally {
    setLoading(false);
  }
};
