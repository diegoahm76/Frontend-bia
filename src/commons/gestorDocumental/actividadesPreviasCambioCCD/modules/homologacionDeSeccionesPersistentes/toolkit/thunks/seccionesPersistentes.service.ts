/* eslint-disable @typescript-eslint/naming-convention */
//! --- DOCUMENTO DE THUNKS DE LA PARTE DE SECCIONES PERSISTENTES DE LA HOMOLOGACIÓN ---

import { api } from '../../../../../../../api/axios';
import { control_error, control_success } from '../../../../../../../helpers';

export const fnGetHomologacionUnidades = async (idCcdNuevo: number) => {
  try {
    const url = `gestor/ccd/get-homologacion-ccd/${idCcdNuevo}`;
    const { data } = await api.get(url);
    if (data.success) {
      control_success(data.detail);
      return data?.data;
    }

    control_error('Error al obtener las unidades persistentes');
    return {
      coincidencias: [],
      //* mirar si se debe retornar algo más al error
    };
  } catch (error: any) {
    control_error(error?.response?.data?.detail);
  }
};

export const fnGetUnidadesPersistentes = async (idCcdNuevo: number) => {
  try {
    const url = `gestor/ccd/persistencia-unidades-ccd/get/${idCcdNuevo}`;
    const { data } = await api.get(url);
    console.log(data);

    if (data.success) {
      control_success(data.detail);
      return data?.data;
    }

    control_error('Error al obtener las unidades persistentes');
    return {
      coincidencias: [],
      //* mirar si se debe retornar algo más al error
    };
  } catch (error: any) {
    control_error(error?.response?.data?.detail);
  }
};
