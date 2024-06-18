import { api } from '../../../../../../../api/axios';
import { control_success } from '../../../../../../../helpers';
import { handleApiError } from '../../../../../../../utils/functions/errorManage';
import { control_warning } from '../../../../../../almacen/configuracion/store/thunks/BodegaThunks';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const getExpedienteRelacionado = async (
  id_solicitud_tramite: number,
  handleGeneralLoading: any
) => {
  try {
    handleGeneralLoading(true);

    const url = `gestor/panel_ventanilla/tramites/expediente/get/${id_solicitud_tramite}`;
    const { data } = await api.get(url);

    if (data?.data?.length === 0) {
      control_warning('No se encontraron expedientes relacionados a este trámite');
      return [];
    } else {
      control_success('Expediente obtenido');
      console.log('data?.data', data?.data);
      return data?.data;
    }
  } catch (e) {
    handleApiError(e);
  } finally {
    handleGeneralLoading(false);
  }
};
