/* eslint-disable @typescript-eslint/naming-convention */
import { api } from "../../../../../../api/axios";
import { showAlert } from "../../../../../../utils/showAlert/ShowAlert";

export const putRechazarTareaOtros = async (
  id_tarea_asignada: number,
  justificacion_rechazo: string,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
): Promise<any> => {
  try {
    setLoading(true);
    const url = `gestor/bandeja-tareas/tareas-asignadas/otros/rechazar/update/${id_tarea_asignada}/`;
    const response = await api.put(url, {
      justificacion_rechazo,
    });
    console.log('responseeeee', response);
    return response;
  } catch (error) {
    showAlert('Opss..', 'No se pudo rechazar la tarea, ocurrió un error, por favor intenta de nuevo', 'error');
  } finally {
    setLoading(false);
  }
};
