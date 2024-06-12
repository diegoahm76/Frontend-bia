/* eslint-disable @typescript-eslint/naming-convention */

import { api } from "../../../../../../../../../api/axios";
import { control_error, control_success } from "../../../../../../../../../helpers";

export const postAsignacionTramiteGrupo = async (
  data: any,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    setLoading(true);
    const url = `gestor/panel_ventanilla/crear-expediente/`;
    const response = await api.post(url, data);
    control_success('Asignación realizada');
    console.log('response', response);
    return response;
  } catch (error: any) {
    control_error(error?.response?.data?.detail || 'Ha  ocurrido un error en la generación de la asignación');
    return null;
  } finally {
    setLoading(false);
  }
};
