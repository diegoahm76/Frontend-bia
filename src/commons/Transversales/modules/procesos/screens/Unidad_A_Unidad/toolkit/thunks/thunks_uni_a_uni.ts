/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
// ! -------- SERVICIOS RELACIONADOS CON ORG ANTERIOR ---------

'transversal/organigrama/get/';

import { api } from '../../../../../../../../api/axios';

export const getUnidadesOrgAnterior = async (): Promise<any[]> => {
  const url =
    'transversal/organigrama/unidades/get-list/organigrama-retirado-reciente/';
  try {
    const { data } = await api.get(url);
    return data.data;
  } catch (error) {
    console.error('Error fetching unidades:', error);
    throw error;
  }
};

export const getOrganigramaAnterior = async (id_org: number): Promise<any> => {
  const url = 'transversal/organigrama/get/';
  try {
    const { data } = await api.get(url);
    const organigramaNecesario = data.Organigramas.find(
      (el: any) => el.id_organigrama === id_org
    );
    if (organigramaNecesario) {
      return organigramaNecesario;
    } else {
      // throw new Error(`Organigrama with id ${id_org} not found`);
      console.error(`Organigrama with id ${id_org} not found`);
    }
  } catch (error) {
    console.error('Error fetching organigrama:', error);
    throw error;
  }
};
