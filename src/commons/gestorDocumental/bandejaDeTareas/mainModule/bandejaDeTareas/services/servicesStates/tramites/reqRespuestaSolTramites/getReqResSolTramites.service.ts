/* eslint-disable @typescript-eslint/naming-convention */
import { api } from '../../../../../../../../../api/axios';
import { showAlert } from '../../../../../../../../../utils/showAlert/ShowAlert';

export const getComplementosRequerimientosRespuestaSolicitudesTramites = async (
  idTarea: string | number
) => {
  if (!idTarea) {
    showAlert('Opps!', 'no se ha enviado el id de la tarea', 'error');
    return [];
  }

  try {
    const url = `gestor/bandeja-tareas/tareas-asignadas/tramites/respuesta/requerimientos/${idTarea}/`;
    const { data } = await api.get(url);
    if (data?.data && data?.data?.length > 0) return data.data;
    throw new Error('no se han encontrado datos relacionados a la búsqueda');
  } catch (error: any) {
    const errorMessage =
      error.response?.status === 404 || !error.message
        ? 'no se han encontrado datos relacionados a la búsqueda'
        : error.message;
    showAlert('Opps!', errorMessage, 'error');
    return [];
  }
};
