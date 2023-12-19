import Swal from 'sweetalert2';
import { api } from '../../../../../../../api/axios';
import { control_error, control_success } from '../../../../../../../helpers';

/* eslint-disable @typescript-eslint/naming-convention */
export const getAnexosPqrsdf = async (id_pqrsdf: any) => {
  try {
    const url = `gestor/panel_ventanilla/pqrsdf/anexo/get/${id_pqrsdf}/`;
    const { data } = await api.get(url);

    if (data.data.length > 0) {
      control_success(
        data?.detail || 'Se obtuvieron los anexos de la PQRSDF correctamente.'
      );
      return data.data;
    } else {
      control_error('No se encontraron anexos para la PQRSDF.');
      return [];
    }
  } catch (err: any) {
    control_error(err?.response?.data.detail || err.message);
    return [];
  }
};


