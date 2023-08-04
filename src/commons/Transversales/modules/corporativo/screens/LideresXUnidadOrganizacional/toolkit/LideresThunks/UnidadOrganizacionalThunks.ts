/* eslint-disable @typescript-eslint/naming-convention */
import { api } from '../../../../../../../../api/axios';
import { control_error } from '../../../../../../../../helpers';

export const getPersonaByTipoDocumentoAndNumeroDocumento = async (
  tipoDocumento: string,
  numeroDocumento: string
): Promise<any> => {
  try {
    const url = `transversal/lideres/get-lider-by-documento/?numero_documento=${
      numeroDocumento ?? ''
    }&tipo_documento=${tipoDocumento ?? ''}`;
    const response = await api.get(url);
    console.log('response', response);
    return response.data;
  } catch (error: any) {
    console.error(error);
    control_error(error?.response?.data?.detail);
  }
};
