/* eslint-disable @typescript-eslint/naming-convention */
import { api } from '../../../../../../../../../../../api/axios';

export const getTipoDocumento = async (): Promise<any> => {
  try {
    const url = `listas/tipo-documento/`;
    const response = await api.get(url);
    return response.data.data;
  } catch (error) {
    console.error(error);
  }
};
