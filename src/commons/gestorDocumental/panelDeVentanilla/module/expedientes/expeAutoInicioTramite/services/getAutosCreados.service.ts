import { api } from '../../../../../../../api/axios';
import { control_success } from '../../../../../../../helpers';
import { handleApiError } from '../../../../../../../utils/functions/errorManage';
import { control_warning } from '../../../../../../almacen/configuracion/store/thunks/BodegaThunks';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const getAutosDeInicioCreados = async (
  id_solicitud_tramite: number,
  handleGeneralLoading: any
) => {
  try {
    handleGeneralLoading(true);

    const url = `gestor/panel_ventanilla/listar-auto/${id_solicitud_tramite}`;
    //const url = `gestor/panel_ventanilla/listar-auto/${id_solicitud_tramite}/`
    const { data } = await api.get(url);

    if (data?.data?.length === 0) {
      control_warning('No se encontraron auto de inicio creados para este expediente');
      return [];
    } else {
      control_success('Auto de inicio obtenidos');
      console.log('data?.data', data?.data);
      return data?.data;
    }
  } catch (e) {
    handleApiError(e);
  } finally {
    handleGeneralLoading(false);
  }
};
