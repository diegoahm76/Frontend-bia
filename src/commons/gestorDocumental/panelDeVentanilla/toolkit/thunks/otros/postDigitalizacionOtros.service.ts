/* eslint-disable @typescript-eslint/naming-convention */
import { api } from "../../../../../../api/axios";
import { showAlert } from "../../../../../../utils/showAlert/ShowAlert";
import { control_warning } from "../../../../../almacen/configuracion/store/thunks/BodegaThunks";

export const postDigitalizacionOtros = async (idOtros: any
  ) => {
  try {
    if (!idOtros) {
      control_warning('No se ha seleccionado ninguna solicitud de otros para digitalizar');
    }
    const url = `gestor/panel_ventanilla/otros/solicitudd_digitalizacion/create/`;
    const response = await api.post(url, {
      id_otros: idOtros,
    })

    if (response.data.success) {
      showAlert(
        'Solicitud de digitalización exitosa',
        'Se ha enviado correctamente la solicitud de digitalización de otros',
        'success'
      );
    }

    return response;
  } catch (err: any) {
    showAlert('Opps...', `${err?.response?.data?.detail}`, 'error');
  }
};