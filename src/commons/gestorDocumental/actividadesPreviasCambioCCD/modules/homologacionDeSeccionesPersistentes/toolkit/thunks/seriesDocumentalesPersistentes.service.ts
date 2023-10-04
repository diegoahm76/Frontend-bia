/* eslint-disable @typescript-eslint/naming-convention */
//! --- DOCUMENTO DE THUNKS DE LA PARTE DE SERIES DOCUMENTALES PERSISTENTES DE LA HOMOLOGACIÓN DE CCD'S ---

import { api } from '../../../../../../../api/axios';

interface IGetAgrupacionesCoincidetesCcd {
  id_ccd_actual: number;
  id_ccd_nuevo: number;
  id_unidad_actual: number;
  id_unidad_nueva: number;
}

export const fnGetAgrupacionesCoincidetesCcd = async ({
  id_ccd_actual,
  id_ccd_nuevo,
  id_unidad_actual,
  id_unidad_nueva,
}: IGetAgrupacionesCoincidetesCcd): Promise<any> => {
  try {
    //* url de la api
    const url = `gestor/ccd/get-homologacion-cat-serie-ccd/?id_ccd_actual=${id_ccd_actual}&id_ccd_nuevo=${id_ccd_nuevo}&id_unidad_actual=${id_unidad_actual}&id_unidad_nueva=${id_unidad_nueva}`;
    const {
      data: { data },
    } = await api.get(url);
    // ? la data devuelve el array de las conincidencias y tambien el elemento del id_ccd_actual y id_ccd_nuevo
    console.log('data agrupaciones coincidentes ccd', data?.coincdencias);
  } catch (error: any) {
    throw error;
  }
};
