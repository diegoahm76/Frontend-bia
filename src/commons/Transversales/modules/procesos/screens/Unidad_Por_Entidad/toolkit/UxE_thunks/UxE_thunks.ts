/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
import { api } from '../../../../../../../../api/axios';
import { control_warning } from '../../../../../../../almacen/configuracion/store/thunks/BodegaThunks';

export const consultarTablaTemporal = async (setLoading: any): Promise<any> => {
  try {
    setLoading(true);
    const url = `transversal/organigrama/listado-registro-temporal/`;
    const { data } = await api.get(url);
    if (!data?.success) control_warning(data?.detail);
    console.log(data);
    //* revisar ese data.data luego, ya que cuando si existen registros retorna una lista y otros valores muy útiles, pero cuando no, retorna un objeto con un mensaje
    return {
      data: data?.data,
      success: data?.success,
      detail: data?.detail
    };
  } catch (error: any) {
    // control_warning('No hay datos para mostrar');
    return {
      data: [],
      success: false,
      detail: error?.response?.data?.detail
    };
  } finally {
    setLoading(false);
  }
};
