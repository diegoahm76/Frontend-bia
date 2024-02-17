import { api } from "../../../../../../api/axios";
import { showAlert } from "../../../../../../utils/showAlert/ShowAlert";
import { control_warning } from "../../../../../almacen/configuracion/store/thunks/BodegaThunks";

/* eslint-disable @typescript-eslint/naming-convention */
export const postDigitalizacionTramites = async (idTramite: any) => {
  if (!idTramite) {
    console.error('Debe seleccionar una trámite para digitalizar');
    return;
  }

  if (!idTramite) {
    control_warning('No se ha seleccionado ninguna OPA para digitalizar');
    return;
  }

  try {
    const url = `gestor/panel_ventanilla/opas/solicitud_digitalizacion/create/`;
    const response = await api.post(url, {
      id_solicitud_tramite: idTramite,
    });

    if (!response.data) {
      console.error('No se recibieron datos');
      return;
    }

    if (response.data.success) {
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