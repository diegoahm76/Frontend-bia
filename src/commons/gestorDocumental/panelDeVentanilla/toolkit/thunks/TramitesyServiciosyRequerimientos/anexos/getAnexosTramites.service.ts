/* eslint-disable @typescript-eslint/naming-convention */

import { api } from "../../../../../../../api/axios";
import { control_error, control_success } from "../../../../../../../helpers";
import { showAlert } from "../../../../../../../utils/showAlert/ShowAlert";

export const getAnexosTramite = async (idTramite: any) => {
  if(!idTramite) return control_error('Debe seleccionar un trámite para obtener los anexos.');
  try {
    // 
    const url = `gestor/panel_ventanilla/tramites/anexo/get/${idTramite}/`;
    const { data } = await api.get(url);

    if (data && Array.isArray(data.data) && data.data.length > 0) {
      control_success(
        data?.detail || 'Se obtuvieron los anexos del trámite correctamente.'
      );
      return data.data;
    } else {
      control_error('No se encontraron anexos para el trámite.');
      return [];
    }
  } catch (err: any) {
    showAlert(
      'Opps...',
      err?.response?.data.detail || err.message || 'No se encontraron anexos para el trámite.',
      'error'
    );
    return [];
  }
};

export const getAnexosComplementosTramite = async (idTramite: any) => {
  if(!idTramite) return control_error('Debe seleccionar un trámite para obtener los anexos.');
  try {
    const url = `gestor/panel_ventanilla/complementos/anexos/get/${idTramite}/`;
    const { data } = await api.get(url);

    if (data && Array.isArray(data.data) && data.data.length > 0) {
      control_success(
        data?.detail || 'Se obtuvieron los anexos del complemento correctamente.'
      );
      return data.data;
    } else {
      control_error('No se encontraron anexos para el complemento.');
      return [];
    }
  } catch (err: any) {
    showAlert(
      'Opps...',
      err?.response?.data.detail || err.message || 'No se encontraron anexos para el trámite.',
      'error'
    );
    return [];
  }
};