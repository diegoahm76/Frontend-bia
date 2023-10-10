/* eslint-disable @typescript-eslint/naming-convention */
//! --- DOCUMENTO DE THUNKS DE LA PARTE DE SERIES DOCUMENTALES PERSISTENTES DE LA HOMOLOGACIÓN DE CCD'S ---

import { api } from '../../../../../../../api/axios';
import { control_error, control_success } from '../../../../../../../helpers';
import { control_warning } from '../../../../../../almacen/configuracion/store/thunks/BodegaThunks';
import type {
  IGetAgrupacionesCoincidetesCcd,
  IGetAgrupacionesCoincidetesCcdWithoutActual,
} from './types/thunks.types';

export const fnGetAgrupacionesCoincidetesCcd = async ({
  id_ccd_actual,
  id_ccd_nuevo,
  id_unidad_actual,
  id_unidad_nueva,
}: IGetAgrupacionesCoincidetesCcd): Promise<any> => {
  try {
    const url = `gestor/ccd/get-homologacion-cat-serie-ccd/?id_ccd_actual=${id_ccd_actual}&id_ccd_nuevo=${id_ccd_nuevo}&id_unidad_actual=${id_unidad_actual}&id_unidad_nueva=${id_unidad_nueva}`;
    const { data } = await api.get(url);

    console.log(data);
    const coincidencias = [...(data?.data?.coincidencias ?? [])];

    if (coincidencias.length > 0) {
      control_success('coincidencias documentales de CCD encontradas');
    } else {
      control_warning(
        'no se encontraron agrupaciones documentales coincidentes de CCD'
      );
    }

    return coincidencias;
  } catch (error: any) {
    throw error;
  }
};

// ? get persistencias confirmadas si ya se ha hecho la llamada el previo guardado en base de datos, por el contrario, debe manejarse toda la lógica desde la vista del cliente

// ! el servicio aúun no está listo para ser usado

// gestor/ccd/persistencia-agrupaciones-documental-ccd/get/?id_ccd_nuevo=176&id_unidad_actual=5383&id_unidad_nueva=5387

export const fnGetPersistenciasConfirmadas = async ({
  id_ccd_nuevo,
  id_unidad_actual,
  id_unidad_nueva,
}: IGetAgrupacionesCoincidetesCcdWithoutActual): Promise<any> => {
  try {
    const url = `gestor/ccd/persistencia-agrupaciones-documental-ccd/get/?id_ccd_nuevo=${id_ccd_nuevo}&id_unidad_actual=${id_unidad_actual}&id_unidad_nueva=${id_unidad_nueva}`;
    const res = await api.get(url);

    if (res?.status === 404) {
      control_warning('No se encontró el recurso solicitado');
      return [];
    }

  /*  const coincidencias = [
      ...(res?.data?.data?.agrupaciones_persistentes || []),
    ];
*/
    if (res?.data?.data?.agrupaciones_persistentes?.length > 0) {
      control_success('coincidencias documentales de CCD encontradas');
      return res?.data?.data?.agrupaciones_persistentes;
    } else {
      control_warning(
        'no se encontraron agrupaciones documentales coincidentes de CCD'
      );
      return [];
    }

  } catch (error: any) {
    console.log('un error ocurrió');
    control_warning(error?.response?.data?.detail);
    return [];
  }
};