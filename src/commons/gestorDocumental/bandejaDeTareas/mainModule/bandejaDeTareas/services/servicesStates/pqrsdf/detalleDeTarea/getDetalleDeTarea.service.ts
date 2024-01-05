/* eslint-disable @typescript-eslint/naming-convention */
import { api } from '../../../../../../../../../api/axios';
import { showAlert } from '../../../../../../../../../utils/showAlert/ShowAlert';

export const getDetalleDeTarea = async (idTarea: string, navigate: any) => {
  try {
    const url = `gestor/bandeja-tareas/pqrsdf/detalle/get-by-id/${idTarea}/`;
    const { data } = await api.get(url);
    return data?.data;
  } catch (error) {
    showAlert(
      'Opss!',
      'Ocurrio un error al obtener el detalle de la tarea, te redigiremos a bandeja de tareas',
      'error'
    );
    navigate('/app/gestor_documental/bandeja_tareas/');
    throw {};
  }
};
