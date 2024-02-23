import { api } from '../../../../../../../../../api/axios';
import {
  control_error,
  control_success,
} from '../../../../../../../../../helpers';
import { showAlert } from '../../../../../../../../../utils/showAlert/ShowAlert';

/* eslint-disable @typescript-eslint/naming-convention */
export const getAnexosOtros = async (idOtros: any) => {
  try {
    const url = `gestor/bandeja-tareas/otros/anexo/get/${idOtros}/`;
    const { data } = await api.get(url);

    if (data.data.length > 0) {
      control_success(
        data?.detail || 'Se obtuvieron los anexos de la PQRSDF correctamente.'
      );
      return data.data;
    } else {
      control_error('No se encontraron anexos para la tarea seleccionada.');
      return [];
    }
  } catch (err: any) {
    showAlert(
      'Opps...',
      err?.response?.data.detail ||
        err.message ||
        'No se encontraron anexos para la PQRSDF.',
      'error'
    );
    return [];
  }
};
