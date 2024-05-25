/* eslint-disable @typescript-eslint/naming-convention */
import { api } from "../../../../../../../../../../api/axios";
import { showAlert } from "../../../../../../../../../../utils/showAlert/ShowAlert";

export const getDetalleComplementoTramite = async (idComplemento: string | number, navigate: any) => {
  try {
    const url = `gestor/bandeja-tareas/tareas-asignadas/tramites/respuesta/detalle/get/${idComplemento}/`;
    const { data } = await api.get(url);
    return data?.data;
  } catch (error) {
    showAlert(
      'Opss!',
      'Ocurrio un error al obtener el detalle del complemento, intenta nuevamente.',
      'error'
    );
    setTimeout(() => {
      navigate('/app/gestor_documental/bandeja_tareas/');
    }, 3000);
    throw {};
  }
};