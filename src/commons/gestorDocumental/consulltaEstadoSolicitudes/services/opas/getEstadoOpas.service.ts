/* eslint-disable @typescript-eslint/naming-convention */
import { api } from "../../../../../api/axios";
import { showAlert } from "../../../../../utils/showAlert/ShowAlert";

export const getEstadoOpas = async (
  setEstado: React.Dispatch<React.SetStateAction<any[]>>,
) => {
  const url = 'tramites/choices/estado-solicitud-tramite/';

  try {
    const response = await api.get(url);

    if (response?.data && response.data.length > 0) {
      const dataToReturn = response.data.map((item: [string, string]) => ({
        value: item[0],
        label: item[1],
      }));

      setEstado(dataToReturn);
      return dataToReturn;
    } else {
      showAlert('Opss!', 'No se recibieron datos de la API', 'error');
      return []
    }
  } catch (error: any) {
    console.error('Error al cargar las estado', error);
    showAlert('Opss!', 'Ha ocurrido un error en la consulta de los estados de OPA', 'error');
  }
}