import { api } from '../../../../../../../../api/axios';
import { control_success } from '../../../../../../../../helpers';
import { showAlert } from '../../../../../../../../utils/showAlert/ShowAlert';
import { control_warning } from '../../../../../../../almacen/configuracion/store/thunks/BodegaThunks';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const getAsignacionesOpas = async (
  id: string,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    setLoading(true);
    const url = `gestor/panel_ventanilla/asignacion-opas/get/${id}/`;
    const { data } = await api.get(url);

    if (data?.data?.length === 0) {
      control_warning('No se encontraron asignaciones');
      return [];
    } else {
      control_success('Asignaciones obtenidas');
      return data?.data;
    }
  } catch (error) {
    showAlert(
      'Atención',
      'Sin asignaciones realizadas para este elemento',
      'info'
    )
    return [];
  } finally {
    setLoading(false);
  }
};
