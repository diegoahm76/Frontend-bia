/* eslint-disable @typescript-eslint/naming-convention */
import { api } from '../../../../../../../api/axios';
import { control_success } from '../../../../../../../helpers';
import { control_warning } from '../../../../../../almacen/configuracion/store/thunks/BodegaThunks';

// ! ----- GET SECCIONES PERSISTENTES CCD NUEVO ----- ! //
export const getSeccionesPersistentesCcdNuevo = async (
  id_ccd_nuevo: number
) => {
  try {
    const url = `gestor/ccd/persistencia-unidades-ccd/get/${id_ccd_nuevo}`;
    const { data } = await api.get(url);

    if (data?.data?.unidades_persistentes > 0) {
      control_success('Secciones persistentes CCD nuevo (seleccionado)');
      return data?.data;
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
  }
};
