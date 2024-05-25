import { api } from "../../../../../../../../../api/axios";
import { showAlert } from "../../../../../../../../../utils/showAlert/ShowAlert";

// eslint-disable-next-line @typescript-eslint/naming-convention
export const putRechazarTareaTramite = async (
  id_tarea_asignada: number,
  justificacion_rechazo: string,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
): Promise<any> => {
  try {
    setLoading(true);
    const url = `gestor/bandeja-tareas/tareas-asignadas/tramites/rechazar/update/${id_tarea_asignada}/`;
    const response = await api.put(url, {
      justificacion_rechazo,
    });
    return response;
  } catch (error) {
    showAlert('Opss..', 'No se pudo rechazar la tarea, ocurrió un error, por favor intenta de nuevo', 'error');
  } finally {
    setLoading(false);
  }
};
