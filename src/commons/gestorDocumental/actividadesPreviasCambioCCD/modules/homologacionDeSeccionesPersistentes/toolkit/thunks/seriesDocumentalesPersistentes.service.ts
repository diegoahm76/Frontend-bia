/* eslint-disable @typescript-eslint/naming-convention */
//! --- DOCUMENTO DE THUNKS DE LA PARTE DE SERIES DOCUMENTALES PERSISTENTES DE LA HOMOLOGACIÓN DE CCD'S ---

import { api } from '../../../../../../../api/axios';
import { control_success } from '../../../../../../../helpers';
import { control_warning } from '../../../../../../almacen/configuracion/store/thunks/BodegaThunks';
import { IGetAgrupacionesCoincidetesCcd } from './types/thunks.types';

export const fnGetAgrupacionesCoincidetesCcd = async ({
  id_ccd_actual,
  id_ccd_nuevo,
  id_unidad_actual,
  id_unidad_nueva,
}: IGetAgrupacionesCoincidetesCcd): Promise<any> => {
  try {
    const url = `gestor/ccd/get-homologacion-cat-serie-ccd/?id_ccd_actual=${id_ccd_actual}&id_ccd_nuevo=${id_ccd_nuevo}&id_unidad_actual=${id_unidad_actual}&id_unidad_nueva=${id_unidad_nueva}`;
    const { data } = await api.get(url);

    const coincidencias = [...(data?.coincidencias ?? [])];

    if (coincidencias.length > 0) {
      control_success('coincidencias encontradas');
    } else {
      control_warning('no se encontraron coincidencias');
    }

    return coincidencias;
  } catch (error: any) {
    throw error;
  }
};
