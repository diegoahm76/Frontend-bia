/* eslint-disable @typescript-eslint/naming-convention */
import { api } from "../../../../../../api/axios";
import { handleApiError } from "../../../../../../utils/functions/errorManage";

export const getCodigosTramites = async () => {
  try {
    const { data } = await api.get('tramites/listas/cod-tipo-permiso-ambiental/');
    return data;
  } catch (error) {
    handleApiError(error)
  }
}