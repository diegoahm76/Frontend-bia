/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { api } from '../../../../../../../../api/axios';
import {
  control_error,
  control_success
} from '../../../../../../../../helpers';
import { control_warning } from '../../../../../../../almacen/configuracion/store/thunks/BodegaThunks';

// ! ---------- GET HISTORIAL DE CAMBIOS TCA ACTUAL SERVICE ---------- ! //

export const get_historial_cambios_tca_service = async (
  id_tca: number
): Promise<any> => {
  if (!id_tca) {
    control_error('Error: id tca es requerido');
    return;
  }
  try {
    const url = `gestor/tca/historico/?id_tca=${id_tca}`;
    const { data } = await api.get(url);
    control_success(`Se encontró el siguiente historial de cambios TCA`);
    //  console.log('')('data TCA historial', data.data);
    return data.data;
  } catch (error: any) {
    control_warning(`Error: No se encontró historial de cambios TCA`);
    return error;
  }
};
