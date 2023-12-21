import { api } from '../../../../../../api/axios';
import { control_error, control_success } from '../../../../../../helpers';
import { control_warning } from '../../../../../almacen/configuracion/store/thunks/BodegaThunks';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const getAsignaciones = async (
  id: string,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    setLoading(true);
    const url = `gestor/panel_ventanilla/asignar-pqrsdf/get/${id}/`;
    const { data } = await api.get(url);

    if (data?.data?.length === 0) {
      control_warning('No se encontraron asignaciones');
      return [];
    } else {
      control_success('Asignaciones obtenidas');
      return data?.data;
    }
  } catch (error) {
    control_error('No existen asignaciones actualmente');
    return [];
  } finally {
    setLoading(false);
  }
};
