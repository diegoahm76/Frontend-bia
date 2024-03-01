/* eslint-disable @typescript-eslint/naming-convention */
import { api } from "../../../../../../../../../api/axios";
import { showAlert } from "../../../../../../../../../utils/showAlert/ShowAlert";

export const getDetalleDeTareaTramites = async (idTarea: string, navigate: any) => {
  try {
    // gestor/bandeja-tareas/detalle-tramites/get/23/
    const url = `gestor/bandeja-tareas/detalle-tramites/get/${idTarea}/`;
    const { data } = await api.get(url);
    return data?.data;
  } catch (error) {
    showAlert(
      'Opss!',
      'Ocurrio un error al obtener el detalle de la tarea, te redireccionaremos a la bandeja de tareas.',
      'error'
    );
    setTimeout(() => {
      navigate('/app/gestor_documental/bandeja_tareas/');
    }, 3000);
    return {};
  }
};
