/* eslint-disable @typescript-eslint/naming-convention */
import { api } from "../../../../../../../api/axios";
import { control_error, control_success } from "../../../../../../../helpers";
import { showAlert } from "../../../../../../../utils/showAlert/ShowAlert";

export const getAnexosOpa = async (idOpa: any) => {
  try {
    // gestor/panel_ventanilla/opas/anexo/get/34/
    const url = `gestor/panel_ventanilla/opas/anexo/get/${idOpa}/`;
    const { data } = await api.get(url);
    console.log('data', data);
    if (data.data.length > 0) {
      control_success(
        data?.detail || 'Se obtuvieron los anexos de la OPA correctamente.'
      );
      return data.data;
    } else {
      control_error('No se encontraron anexos para la OPA.');
      return [];
    }
  } catch (err: any) {
    showAlert(
      'Opps...',
      err?.response?.data.detail || err.message || 'No se encontraron anexos para la OPA.',
      'error'
    );
    return [];
  }
};
