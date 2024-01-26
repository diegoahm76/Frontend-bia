/* eslint-disable @typescript-eslint/naming-convention */
import { api } from "../../../../../../../../api/axios";
import { control_success } from "../../../../../../../../helpers";
import { showAlert } from "../../../../../../../../utils/showAlert/ShowAlert";
import { control_warning } from "../../../../../../../almacen/configuracion/store/thunks/BodegaThunks";

export const getAsignacionesOtros = async (
  id: string,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    setLoading(true);
    const url = `gestor/panel_ventanilla/asignar-otros/get/${id}/`;
    const { data } = await api.get(url);

    if (data?.data?.length === 0) {
      control_warning('No se encontraron asignaciones de otros');
      return [];
    } else {
      control_success('Asignaciones de otros obtenidas');
      return data?.data;
    }
  } catch (error) {
    showAlert(
      'Atención',
      'Sin asignaciones realizadas para esta solicitud de otros',
      'info'
    )
    return [];
  } finally {
    setLoading(false);
  }
};
