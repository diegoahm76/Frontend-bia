/* eslint-disable @typescript-eslint/naming-convention */

import { api } from "../../../../../../api/axios";
import { showAlert } from "../../../../../../utils/showAlert/ShowAlert";
import { control_warning } from "../../../../../almacen/configuracion/store/thunks/BodegaThunks";

export const postDigitalizacionOpas = async (idOpa: any
  ) => {
  try {
    if (!idOpa) {
      control_warning('No se ha seleccionado ninguna OPA para digitalizar');
    }
    const url = `gestor/panel_ventanilla/opas/solicitud_digitalizacion/create/`;
    const response = await api.post(url, {
      id_solicitud_tramite: idOpa,
    })

    if (response?.data.success) {
      showAlert(
        'Solicitud de digitalización de OPA exitosa',
        'Se ha enviado correctamente la solicitud de digitalización de otros',
        'success'
      );
    }

    return response;
  } catch (err: any) {
    showAlert('Opps...', `${err?.response?.data?.detail}`, 'error');
  }
};