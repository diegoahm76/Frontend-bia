/* eslint-disable @typescript-eslint/naming-convention */
import { api } from "../../../../../../../../api/axios";
import { control_success } from "../../../../../../../../helpers";
import { showAlert } from "../../../../../../../../utils/showAlert/ShowAlert";

export const postReAsignacionTareaOpas = async (
  data: any,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
   setLoading(true);
    const url = `gestor/bandeja-tareas/reasignaciones/tramites/tareas/create/`;
    const response = await api.post(url, data);
    control_success('Se realizó la Reasignación correctamente');
    return response;
  } catch (error) {
    showAlert(
      'Atención',
      'No se pudo realizar la Reasignación, por favor intente nuevamente',
      'error'
    )
    return null;
  } finally {
    setLoading(false);
  }
};
