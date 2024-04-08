/* eslint-disable @typescript-eslint/naming-convention */
import { api } from '../../../../../../../api/axios';
import { control_error, control_success } from '../../../../../../../helpers';

export const postDelegaciones = async ({
  delegaciones,
  setLoading,
}: {
  delegaciones: any;
  setLoading?: (loading: boolean) => void;
}): Promise<any> => {
  setLoading?.(true);
  try {
    const url = `gestor/ccd/oficinas-delegadas-ccd/create/`;
    const response = await api.post(url, delegaciones);

    // //  console.log('')('response', response);

    //* revisar estos errores con el backend
    control_success('Se delegaron las oficinas correctamente');

    // return [];
  } catch (error) {
    control_error('Ha ocurrido un error al delegar las oficinas');
    throw error;
  } finally {
    setLoading?.(false);
  }
};
