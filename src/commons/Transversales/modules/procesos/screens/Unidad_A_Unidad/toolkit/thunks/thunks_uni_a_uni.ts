/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
// ! -------- SERVICIOS RELACIONADOS CON ORG ANTERIOR ---------

'transversal/organigrama/get/';

import { api } from '../../../../../../../../api/axios';

// ? ------------------ UNIDADES OPERATIONS -----------------

// ! get unidades del aorganigrama anterior
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

// ! get unidades del aorganigrama ACTUAL
export const getUnidadesOrgActual = async (): Promise<any[]> => {
  const url = 'transversal/organigrama/unidades/get-list/organigrama-actual/';
  try {
    const { data } = await api.get(url);
    return data.data;
  } catch (error) {
    console.error('Error fetching unidades:', error);
    throw error;
  }
};


// ! get personas by id unidadorgnizacional - listado de personas de la unidad del organigrama actual seleccionada

export const getListPersonasUnidades = (id_unidad: number) => async (): Promise<any[]> => {
  const url = `transversal/organigrama/get-unidad-organizacional-desactualizada`;
  try {
    const { data } = await api.get(url);

    const dataToReturn =  data.data.filter((data: any) => data.id_unidad_organizacional_actual === id_unidad);
    if (dataToReturn.length > 0) {
      console.log('dataToReturn', dataToReturn);
      return dataToReturn;
    } else {
      // throw new Error(`Unidad with id ${id_unidad} not found`);
      console.error(`Unidad with id ${id_unidad} not found`);
      return [];
    }
  } catch (error) {
    console.error('Error fetching personas:', error);
    throw error;
  }
};




// ? ------------------ ORGANIGRAMA OPERATIONS -----------------

// ! get organigrama anterior
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
