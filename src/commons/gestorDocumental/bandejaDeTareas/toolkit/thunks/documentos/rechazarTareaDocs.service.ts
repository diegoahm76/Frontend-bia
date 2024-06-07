/* eslint-disable @typescript-eslint/naming-convention */
import { api } from "../../../../../../api/axios";
import { showAlert } from "../../../../../../utils/showAlert/ShowAlert";

export const rejectTaskDocs = async (idTask: number, justificacion_rechazo: string, setLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
  try {
    setLoading(true);
    const url = `gestor/bandeja-tareas/rechazar/tarea/docs/${idTask}/`;
    const response = await api.put(url, {
      justificacion_rechazo,
    });
    return response;
  } catch (error) {
    showAlert('Opps...', 'Ha ocurrido un error al rechazar la tarea', 'error');
  } finally{
    setLoading(false);
  }
}