import { api } from '../../../../../../../api/axios';
import { control_success } from '../../../../../../../helpers';
import { showAlert } from '../../../../../../../utils/showAlert/ShowAlert';

/* eslint-disable @typescript-eslint/naming-convention */
// 
export const getRespuestaTarea = async (
  idPqrsdf: string,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const url = `gestor/bandeja-tareas/seguimiento-tarea/respuesta/pqrsdf/get/${idPqrsdf}/`;
  setLoading?.(true);
  try {
    const { data } = await api.get(url);

    if (!data?.data || data?.data.length === 0) {
      showAlert(
        'Opss!',
        'No se encontró respuesta para esta tarea',
        'info'
      );
      return [];
    }

    control_success('Respuesta obtenida con éxito');
    return data?.data;
  } catch (err: any) {
    let errorMessage =
      'Ocurrió un error al obtener la respuesta de la tarea y/o no se encontró respuesta para esta tarea';
    if (err.response && err.response.data && err.response.data.message) {
      errorMessage = err.response.data.message;
    }
    showAlert('Opss!', errorMessage, 'error');
    return [];
  } finally {
    setLoading?.(false);
  }
};
