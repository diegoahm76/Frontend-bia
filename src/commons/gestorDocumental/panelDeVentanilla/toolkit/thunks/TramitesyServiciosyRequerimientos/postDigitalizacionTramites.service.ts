import { api } from '../../../../../../api/axios';
import { showAlert } from '../../../../../../utils/showAlert/ShowAlert';
import { control_warning } from '../../../../../almacen/configuracion/store/thunks/BodegaThunks';

/* eslint-disable @typescript-eslint/naming-convention */
export const postDigitalizacionTramites = async (idTramite: string | number): Promise<any> => {
  if (!idTramite) {
    control_warning('No se ha seleccionado ninguna OPA para digitalizar');
    return;
  }

  const url = `gestor/panel_ventanilla/tramites/solicitud_digitalizacion/create/`;

  try {
    const response = await api.post(url, {
      id_solicitud_tramite: idTramite,
    });

    if (!response.data) {
      showAlert(
        'Oppss!',
        'No se recibieron datos, al enviar la solicitud de digitalización de trámite, ha ocurrido un error',
        'error'
      );
      return;
    }

    if (response.data.succes) {
      showAlert(
        'Solicitud de digitalización de trámite exitosa',
        'Se ha enviado correctamente la solicitud de digitalización de trámite',
        'success'
      );
    }

    return response;
  } catch (err: any) {
    showAlert('Opps...', `${err?.response?.data?.detail ?? 'Ocurrió un error al enviar la solicitud de digitalización de trámite.'}`, 'error');
  }
};


export const postDigitalizacionComplementosTramites = async (data: any) => {
  try {
    if (!data) {
      control_warning(
        'No se ha seleccionado ningún complemento para digitalizar'
      );
    }
    const url = `gestor/panel_ventanilla/tramites/complementos/digitalizacion/create/`;
    const response = await api.post(url, {
      id_complemento_usu_pqr: data,
    });

    if (response.data.succes) {
      showAlert(
        'Solicitud de digitalización exitosa',
        'Se ha enviado correctamente la solicitud de digitalización',
        'success'
      );
    }
  } catch (err: any) {
    showAlert('Opps...', `${err.response.data.detail}`, 'error');
  }
};
