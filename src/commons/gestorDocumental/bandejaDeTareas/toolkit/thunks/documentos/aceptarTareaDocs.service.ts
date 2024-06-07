import { api } from '../../../../../../api/axios';
import { showAlert } from '../../../../../../utils/showAlert/ShowAlert';

/* eslint-disable @typescript-eslint/naming-convention */
export const aceptarTareaDocs = async (idTarea: number) => {
  try {
    const url = `gestor/bandeja-tareas/aceptar/tarea/docs/${idTarea}/`;
    const bodyPut = {};
    const response = await api.put(url, bodyPut);

    if (response.data.success) {
      showAlert(
        'Atención...',
        'La tarea se ha aceptado correctamente',
        'success'
      );
    }
  } catch (error) {
    showAlert('Opps...', 'Ha ocurrido un error al aceptar la tarea', 'error');
  }
};
