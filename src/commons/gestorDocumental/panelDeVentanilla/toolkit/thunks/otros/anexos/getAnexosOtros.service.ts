import { api } from "../../../../../../../api/axios";
import { control_error, control_success } from "../../../../../../../helpers";
import { showAlert } from "../../../../../../../utils/showAlert/ShowAlert";

/* eslint-disable @typescript-eslint/naming-convention */
export const getAnexosOtros = async (idOtros: any) => {
  try {
    // gestor/panel_ventanilla/otros/anexo/get/10/
    const url = `gestor/panel_ventanilla/otros/anexo/get/${idOtros}/`;
    const { data } = await api.get(url);

    if (data.data.length > 0) {
      control_success(
        data?.detail || 'Se obtuvieron los anexos de la solicitud de otros correctamente.'
      );
      return data.data;
    } else {
      control_error('No se encontraron anexos para la solicitud de otros.');
      return [];
    }
  } catch (err: any) {
    showAlert(
      'Opps...',
      err?.response?.data.detail || err.message || 'No se encontraron anexos para la solicitud de otros.',
      'error'
    );
    return [];
  }
};

