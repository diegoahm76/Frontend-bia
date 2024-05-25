import { api } from '../../../../../../../../api/axios';
import { control_success } from '../../../../../../../../helpers';
import { showAlert } from '../../../../../../../../utils/showAlert/ShowAlert';
import { control_warning } from '../../../../../../../almacen/configuracion/store/thunks/BodegaThunks';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const getReAsignacionesTareasOpas = async (
  idTarea: string,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    setLoading(true);
    /*showAlert('Atención', 'Sin servicio aún para cargar las reasignaciones, implementarrr', 'info')
    return [];*/
    //gestor/bandeja-tareas/reasignaciones/tramites/tareas/get/85/
    const url = `gestor/bandeja-tareas/reasignaciones/tramites/tareas/get/${idTarea}/`;
    const { data } = await api.get(url);

    if (data?.data?.length === 0) {
      control_warning('No se encontraron re-asignaciones para esta tarea');
      return [];
    } else {
      control_success('re-asignaciones obtenidas');
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
