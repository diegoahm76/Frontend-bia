/* eslint-disable @typescript-eslint/naming-convention */
import { api } from '../../../../../../../api/axios';
import { control_error, control_success } from '../../../../../../../helpers';

const HOMOLOGACION_UNIDADES_URL = (idCcdNuevo: number) =>
  `gestor/ccd/get-homologacion-ccd/${idCcdNuevo}`;
const ERROR_MESSAGE = 'Ha ocurrido un error al obtener los datos';

export const fnGetHomologacionUnidades = async (
  idCcdNuevo: number
): Promise<any> => {
  try {
    const url = HOMOLOGACION_UNIDADES_URL(idCcdNuevo);
    const { data } = await api.get(url);

    if (data?.success) {
      control_success(data?.detail);
      console.log(data.data);
      return data?.data;
    }

    control_error(ERROR_MESSAGE);
    return {
      coincidencias: [],
      // Agrega aquí cualquier otro campo que devuelva la función
    };
  } catch (error: any) {
    control_error(error?.response?.data?.detail || ERROR_MESSAGE);
    return {
      coincidencias: [],
      // Agrega aquí cualquier otro campo que devuelva la función
    };
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
      unidades_persistentes: [],
      // Agrega aquí cualquier otro campo que devuelva la función
    };
  } catch (error: any) {
    control_error(error?.response?.data?.detail || ERROR_MESSAGE);
    return {
      unidades_persistentes: [],
      // Agrega aquí cualquier otro campo que devuelva la función
    };
  }
};
