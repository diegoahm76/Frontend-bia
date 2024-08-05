import { api } from '../../../../../../api/axios';
import { control_success } from '../../../../../../helpers';
import { showAlert } from '../../../../../../utils/showAlert/ShowAlert';
import { formatDateUse } from '../../../../panelDeVentanilla/toolkit/thunks/PqrsdfyComplementos/getPqrsdfPanVen.service';

/* eslint-disable @typescript-eslint/naming-convention */
export const getListadoDocsByPerson = async (
  idPersona: number,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  try {
    setLoading(true);
    const url = `gestor/bandeja-tareas/tareas-asignadas/docs/get-by-persona/${idPersona}/?radicado=&estado_asignacion=&estado_tarea&fecha_inicio&fecha_fin&requerimiento`;
    const { data } = await api.get(url);

    if (data && data?.data?.length) {
      control_success(`${data?.detail} de tareas asignadas`);
      return data.data;
    }

    showAlert(
      'Atención...',
      'No se encontraron tareas asignadas para este usuario',
      'warning'
    );

    return [];
  } catch (error) {
    showAlert(
      'Opps...',
      'Ha ocurrido un error al buscar las tareas y/o no hay tareas asignadas a este usuario',
      'warning'
    );
    return [];
  } finally {
    setLoading(false);
  }
};
