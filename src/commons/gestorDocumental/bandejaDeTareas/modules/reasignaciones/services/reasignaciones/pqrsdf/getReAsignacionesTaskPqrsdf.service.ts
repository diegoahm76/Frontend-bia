import { api } from '../../../../../../../../api/axios';
import { control_success } from '../../../../../../../../helpers';
import { showAlert } from '../../../../../../../../utils/showAlert/ShowAlert';
import { control_warning } from '../../../../../../../almacen/configuracion/store/thunks/BodegaThunks';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const getReAsignacionesTareasPqrsdf = async (
  idTarea: string,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    setLoading(true);
    const url = `gestor/bandeja-tareas/reasignaciones/tareas/get/${idTarea}/`;
    const { data } = await api.get(url);

    if (data?.data?.length === 0) {
      control_warning('No se encontraron Re-asignaciones para esta tarea');
      return [];
    } else {
      control_success('Re-asignaciones obtenidas');
      return data?.data;
    }
  } catch (error) {
    showAlert(
      'Atención',
      'Sin re-asignaciones realizadas para este elemento',
      'info'
    )
    return [];
  } finally {
    setLoading(false);
  }
};
