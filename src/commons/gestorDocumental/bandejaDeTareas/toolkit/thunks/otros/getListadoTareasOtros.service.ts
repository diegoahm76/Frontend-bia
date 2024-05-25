/* eslint-disable @typescript-eslint/naming-convention */

import { api } from '../../../../../../api/axios';
import { control_success } from '../../../../../../helpers';
import { showAlert } from '../../../../../../utils/showAlert/ShowAlert';
import { formatDateUse } from '../../../../panelDeVentanilla/toolkit/thunks/PqrsdfyComplementos/getPqrsdfPanVen.service';

export const getListadoTareaasOtrosByPerson = async (
  idPersona: number,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  tipo_de_tarea: string = '',
  estado_asignacion_de_tarea: string = '',
  estado_de_la_tarea: string = '',
  fecha_inicio: string = '',
  fecha_fin: string = '',
  radicado: string = ''
) => {
  try {
    setLoading(true);
    const formattedFechaInicio = fecha_inicio
      ? encodeURIComponent(formatDateUse(new Date(fecha_inicio)))
      : '';
    const formattedFechaFin = fecha_fin
      ? encodeURIComponent(formatDateUse(new Date(fecha_fin)))
      : '';
    const url = `gestor/bandeja-tareas/tareas-asignadas/get-otros-by-persona/${idPersona}/?tipo_tarea=${encodeURIComponent(
      tipo_de_tarea
    )}&estado_asignacion=${encodeURIComponent(
      estado_asignacion_de_tarea
    )}&estado_tarea=${encodeURIComponent(
      estado_de_la_tarea
    )}&fecha_inicio=${formattedFechaInicio}&fecha_fin=${formattedFechaFin}&radicado=${encodeURIComponent(
      radicado
    )}`;

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
      'error'
    );
    return [];
  } finally {
    setLoading(false);
  }
};
