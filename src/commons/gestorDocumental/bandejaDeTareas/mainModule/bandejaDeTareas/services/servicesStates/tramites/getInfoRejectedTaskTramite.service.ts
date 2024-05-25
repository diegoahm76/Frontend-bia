/* eslint-disable @typescript-eslint/naming-convention */
import { api } from "../../../../../../../../api/axios";
import { showAlert } from "../../../../../../../../utils/showAlert/ShowAlert";

export const getInfoTareaRechazadaTramites = async (
  id_tarea_asignada: number,
  handleOpenModalNuevoNumero2: any,
): Promise<any> => {
  try {
    const url = `gestor/bandeja-tareas/tareas-asignadas/tramites/jus/tarea/get/${id_tarea_asignada}/`;
    const {data} = await api.get(url);
    console.log('response', data?.data);
    return data?.data?.justificacion_rechazo;
  } catch (error) {
    showAlert(
      'Opss..',
      'No se pudo encontrar la información de la justificación del rechazo, ha ocurrido un error, por favor intente de nuevo',
      'error'
    );
    handleOpenModalNuevoNumero2(false);
  }
};