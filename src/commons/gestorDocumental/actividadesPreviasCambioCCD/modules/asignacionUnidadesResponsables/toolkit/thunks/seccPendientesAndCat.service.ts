/* eslint-disable @typescript-eslint/naming-convention */
// ? get seccion - subseccion que no aplicaba para la homologación

import { api } from '../../../../../../../api/axios';

export const GET_UNIDADES_NO_RESPONSABLE_PERSISTENTE = async (
  idCcdNuevo: number
) => {
  try {
    const url = `gestor/ccd/unidades-ccd-actual/get/${idCcdNuevo}`;
    const { data } = await api.get(url);
    console.log('data GET_UNIDADES_NO_RESPONSABLE_PERSISTENTE', data);
  } catch (error) {
    return [];
  } finally {
    //* establecer el loader
  }
};

// ? get series - subseries asociadas a la seccion - subseccion que no aplicaba para la homologación

export const GET_SERIES_ASOCIADA_UNIDAD_SIN_RESPONSABLE = async ({
  idCcdActual,
  idCcdNuevo,
  idUnidadActual,
}: {
  idCcdActual: number;
  idCcdNuevo: number;
  idUnidadActual: number;
}) => {
  try {
    const url = `gestor/ccd/series-ccd-actual/get/${idCcdActual}/${idCcdNuevo}/${idUnidadActual}`;
    const { data } = await api.get(url);
    console.log('data', data);
  } catch (error) {
    return [];
  } finally {
    //* establecer el loader
  }
};
