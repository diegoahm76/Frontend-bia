/* eslint-disable @typescript-eslint/naming-convention */
import { api } from '../../../../../../../../api/axios';
import { showAlert } from '../../../../../../../../utils/showAlert/ShowAlert';

export const getEstadoSolicitudTarea = async () => {
  try {
    const url = `gestor/choices/estado-solicitud-tarea/`;
    const { data: { data: choicesData } = {} } = await api.get(url);
    if (!choicesData) {
      throw new Error('No data received from API');
    }
    return choicesData.map(([value, label]: [string, string]) => ({ label, value }));
  } catch (err) {
    showAlert(
      'Oppss',
      'Error al cargar los estados de solicitud de tarea',
      'error'
    );
    throw err;
  }
};