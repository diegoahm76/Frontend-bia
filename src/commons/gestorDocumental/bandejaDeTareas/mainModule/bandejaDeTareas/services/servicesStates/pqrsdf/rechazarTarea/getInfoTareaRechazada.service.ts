/* eslint-disable @typescript-eslint/naming-convention */
import { api } from '../../../../../../../../../api/axios';
import { showAlert } from '../../../../../../../../../utils/showAlert/ShowAlert';

/* eslint-disable @typescript-eslint/naming-convention */
export const getInfoTareaRechazada = async (
  id_tarea_asignada: number,
  handleOpenModalNuevoNumero2: any,
): Promise<any> => {
  try {
    const url = `gestor/bandeja-tareas/tareas-asignadas-jus-rechazo/get/${id_tarea_asignada}/`;
    const response = await api.get(url);
    console.log('response', response);
    return response;
  } catch (error) {
    showAlert(
      'Opss..',
      'No se pudo encontrar la información de la justificación del rechazo, ha ocurrido un error, por favor intente de nuevo',
      'error'
    );
    handleOpenModalNuevoNumero2(false);
  }
};

// gestor/bandeja-tareas/tareas-asignadas-jus-rechazo/get/24/
