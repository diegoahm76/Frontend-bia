/* eslint-disable @typescript-eslint/naming-convention */
import { api } from "../../../../../../api/axios";
import { showAlert } from "../../../../../../utils/showAlert/ShowAlert";

export const putRejectTask = async (idTask: number, justificacionRechazo: string) => {
  try {
    // gestor/bandeja-tareas/tareas-asignada-rechazar/update/6/
    const url = `gestor/bandeja-tareas/tareas-asignada-rechazar/update/${idTask}/`;
    const bodyPut = {
      justificacion_rechazo: justificacionRechazo
    };
    const response = await api.put(url, bodyPut);
    if (response.data.success) {
      showAlert('Atención...', 'La tarea se ha rechazado correctamente', 'success');
    }
  } catch (error) {
    showAlert('Opps...', 'Ha ocurrido un error al rechazar la tarea', 'error');
  }
}