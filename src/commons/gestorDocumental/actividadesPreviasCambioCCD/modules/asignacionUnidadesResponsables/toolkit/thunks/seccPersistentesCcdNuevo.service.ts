/* eslint-disable @typescript-eslint/naming-convention */
import React from 'react';
import { api } from '../../../../../../../api/axios';
import { control_success } from '../../../../../../../helpers';
import { control_warning } from '../../../../../../almacen/configuracion/store/thunks/BodegaThunks';

// ! ----- GET SECCIONES PERSISTENTES CCD NUEVO ----- ! //
export const getSeccionesPersistentesCcdNuevo = async (
  id_ccd_nuevo: number,
  setLoadingRequest: any,
) => {
  try {
    setLoadingRequest(true);
    const url = `gestor/ccd/persistencia-unidades-ccd/get/${id_ccd_nuevo}`;
    const { data } = await api.get(url);

    //  console.log('')('data', data);

    if (data?.data?.unidades_persistentes.length > 0) {
      control_success(
        'Secciones persistentes encontradas de CCD nuevo (seleccionado)'
      );
      return data?.data?.unidades_persistentes;
    }

    control_warning(
      'No se encontraron secciones persistentes CCD nuevo (seleccionado)'
    );
    return [];
  } catch (error) {
    control_warning(
      'No se encontraron secciones persistentes CCD nuevo (seleccionado)'
    );
    return [];
  } finally {
    setLoadingRequest(false);
  }
};
