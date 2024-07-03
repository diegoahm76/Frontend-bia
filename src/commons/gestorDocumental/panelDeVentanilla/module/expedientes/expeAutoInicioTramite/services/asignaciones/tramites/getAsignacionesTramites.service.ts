import { api } from "../../../../../../../../../api/axios";
import { control_success } from "../../../../../../../../../helpers";
import { showAlert } from "../../../../../../../../../utils/showAlert/ShowAlert";
import { control_warning } from "../../../../../../../../almacen/configuracion/store/thunks/BodegaThunks";

// eslint-disable-next-line @typescript-eslint/naming-convention
export const getAsignacionesTramites = async (
  id: string,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    setLoading(true);
    //{{url}}/api/gestor/panel_ventanilla/asignar-tramites/historico-asignacion/get/5/
    const url = `gestor/panel_ventanilla/asignar-tramites/historico-asignacion/get/${id}/`;
    const { data } = await api.get(url);

    if (data?.data?.length === 0) {
      control_warning('No se expedientes asignados para este elemento');
      return [];
    } else {
      control_success('Expedientes asignados obtenidos');
      return data?.data;
    }
  } catch (error) {
    showAlert(
      'Atención',
      'Sin asignaciones realizadas para este elemento',
      'info'
    );
    return [];
  } finally {
    setLoading(false);
  }
};
