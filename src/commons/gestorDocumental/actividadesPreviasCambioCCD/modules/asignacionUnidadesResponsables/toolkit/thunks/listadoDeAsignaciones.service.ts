/* eslint-disable @typescript-eslint/naming-convention */
//* servicio de traer las asignaciones correspondientes que ya han sido creadas dentro del módulo en relación con un CCD seleccionado

import { api } from '../../../../../../../api/axios';

export const GET_LISTADO_ASIGNACIONES = async (idCcdNuevo: number) => {
  try {
    const url = `gestor/ccd/unidades-responsables-ccd/get/${idCcdNuevo}`;
    const { data } = await api.get(url);
    //  console.log('')('data GET_LISTADO_ASIGNACIONES', data?.data?.unidades_responsables);
    return data?.data?.unidades_responsables;
  } catch (error) {
    return [];
  } finally {
    //* establecer el loader
  }
};
