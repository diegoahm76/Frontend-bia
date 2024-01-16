import { api } from '../../../../../../../../api/axios';
import { showAlert } from '../../../../../../../../utils/showAlert/ShowAlert';

/* eslint-disable @typescript-eslint/naming-convention */
export const getEstadoAsignacionTarea = async () => {
  try {
    const url = `gestor/choices/estado-asignacion-tarea/`;
    const { data: { data: choicesData } = {} } = await api.get(url);
    if (!choicesData) {
      throw new Error('No data received from API');
    }
    return choicesData.map(([value, label]: [string, string]) => ({ label, value }));
  } catch (err) {
    showAlert(
      'Oppss',
      'Error al cargar los estados de asignación de tarea',
      'error'
    );
    throw err;
  }
};
