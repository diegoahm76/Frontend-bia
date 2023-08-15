/* eslint-disable @typescript-eslint/naming-convention */
// ! -------- SERVICIOS RELACIONADOS CON ORG ANTERIOR ---------

'transversal/organigrama/get/';

import { api } from '../../../../../../../../api/axios';

export const getUnidadesOrgAnterior = async (): Promise<any> => {
  try {
    const url =
      'transversal/organigrama/unidades/get-list/organigrama-retirado-reciente/';
    const { data } = await api.get(url);
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};
