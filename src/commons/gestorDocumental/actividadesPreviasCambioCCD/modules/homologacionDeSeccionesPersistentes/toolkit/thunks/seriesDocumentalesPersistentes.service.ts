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
  setLoading,
}: IGetAgrupacionesCoincidetesCcd): Promise<any> => {
  try {
    setLoading(true);
    const url = `gestor/ccd/get-homologacion-cat-serie-ccd/?id_ccd_actual=${id_ccd_actual}&id_ccd_nuevo=${id_ccd_nuevo}&id_unidad_actual=${id_unidad_actual}&id_unidad_nueva=${id_unidad_nueva}`;
    const { data } = await api.get(url);
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
    // throw error;
    if (error?.response?.status === 500) {
      control_warning('Sin coincidencias documentales de CCD');
      return [];
    }
    return [];
  } finally {
    setLoading(false);
  }
};

// ? get persistencias confirmadas si ya se ha hecho la llamada el previo guardado en base de datos, por el contrario, debe manejarse toda la lógica desde la vista del cliente

// ! el servicio aúun no está listo para ser usado

// gestor/ccd/persistencia-agrupaciones-documental-ccd/get/?id_ccd_nuevo=176&id_unidad_actual=5383&id_unidad_nueva=5387

export const fnGetPersistenciasConfirmadas = async ({
  id_ccd_nuevo,
  id_unidad_actual,
  id_unidad_nueva,
  setLoading,
}: IGetAgrupacionesCoincidetesCcdWithoutActual): Promise<any> => {
  try {
    setLoading(true);
    const url = `gestor/ccd/persistencia-agrupaciones-documental-ccd/get/?id_ccd_nuevo=${id_ccd_nuevo}&id_unidad_actual=${id_unidad_actual}&id_unidad_nueva=${id_unidad_nueva}`;
    const res = await api.get(url);

    if (res?.status === 404) {
      control_warning('No se encontró el recurso solicitado');
      return [];
    }

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
    if (error?.response?.status === 500) {
      control_warning('Sin persistencias confirmadas');
      return [];
    }
    return [];
  } finally {
    setLoading(false);
  }
};

export const getAllElements = async (
  unidadesPersistentes: any,
  setLoading: any
): Promise<any> => {
  try {
    const coincidenciasAgrupaciones = [];
    const persistenciasAgrupaciones = [];
    for (let i = 0; i < unidadesPersistentes.length; i++) {
      setLoading(true);
      const objeto = unidadesPersistentes[i];
      const resultado1 = await api.get(
        `gestor/ccd/get-homologacion-cat-serie-ccd/?id_ccd_actual=${objeto.id_ccd_actual}&id_ccd_nuevo=${objeto.id_ccd_nuevo}&id_unidad_actual=${objeto.id_unidad_actual}&id_unidad_nueva=${objeto.id_unidad_nueva}`
      );

      const resultado2 = await api.get(
        `gestor/ccd/persistencia-agrupaciones-documental-ccd/get/?id_ccd_nuevo=${objeto.id_ccd_nuevo}&id_unidad_actual=${objeto.id_unidad_actual}&id_unidad_nueva=${objeto.id_unidad_nueva}`
      );

      coincidenciasAgrupaciones?.push(
        ...(resultado1?.data?.data?.coincidencias || [])
      ); // agregar el resultado al array

      persistenciasAgrupaciones?.push(
        ...(resultado2?.data?.data?.agrupaciones_persistentes || [])
      ); // a
    }

    //  console.log('')({ coincidenciasAgrupaciones, persistenciasAgrupaciones }); // imprimir los resultados en la consola
    return {
      coincidenciasAgrupaciones,
      persistenciasAgrupaciones,
    }; // devolver los resultados
  } catch (error: any) {
    throw error;
  } finally {
    setLoading(false);
  }
};
