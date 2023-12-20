/* eslint-disable @typescript-eslint/naming-convention */
import { api } from "../../../../../../api/axios";
import { showAlert } from "../../../../../../utils/showAlert/ShowAlert";

export const getSeriesByCcd = async (idCcd: string) => {
  try {
    const url = `gestor/ccd/catalogo/serie-subserie/get-by-id-ccd/${idCcd}/`;
    const { data } = await api.get(url);
    if (data?.data?.length > 0) {
      return data.data;
    }
    return [];
  } catch (error) {
    showAlert('Ops...', 'Error al obtener las "Series o no hay series disponibles" ', 'error');
    return [];
  }
}