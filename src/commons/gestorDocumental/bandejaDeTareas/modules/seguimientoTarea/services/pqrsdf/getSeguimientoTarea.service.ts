import { api } from '../../../../../../../api/axios';
import { control_success } from '../../../../../../../helpers';
import { showAlert } from '../../../../../../../utils/showAlert/ShowAlert';

/* eslint-disable @typescript-eslint/naming-convention */
export const getSeguimientoTarea = async (
  idTarea: string,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const url = `gestor/bandeja-tareas/seguimiento-tarea/tareas/get/${idTarea}/`;
  setLoading?.(true);
  try {
    const { data } = await api.get(url);

    if (!data?.data || data?.data.length === 0) {
      showAlert(
        'Opss!',
        'No se encontraron seguimientos para esta tarea',
        'info'
      );
      return [];
    }

    control_success('Seguimientos obtenidos con éxito');
    return data?.data;
  } catch (err: any) {
    let errorMessage =
      'Ocurrió un error al obtener los seguimientos de la tarea y/o no se encontraron seguimientos para esta tarea';
    if (err.response && err.response.data && err.response.data.message) {
      errorMessage = err.response.data.message;
    }
    showAlert('Opss!', errorMessage, 'error');
    return [];
  } finally {
    setLoading?.(false);
  }
};
