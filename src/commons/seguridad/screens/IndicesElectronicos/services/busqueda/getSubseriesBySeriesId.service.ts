/* eslint-disable @typescript-eslint/naming-convention */
import { api } from '../../../../../../api/axios';
import { showAlert } from '../../../../../../utils/showAlert/ShowAlert';

export const getSubseriesBySeriesId = async (idSerie: string) => {
  try {
    const url = `gestor/ccd/subseries/get-by-id-serie-doc/${idSerie}/`;
    const { data } = await api.get(url);
    if (data?.data?.length > 0) {
      return data.data;
    }
    return [];
  } catch (error) {
    showAlert(
      'Ops...',
      'Error al obtener las "Subseries o no hay subseries disponibles" ',
      'error'
    );
    return [];
  }
};
