/* eslint-disable @typescript-eslint/naming-convention */
// gestor/bandeja-tareas/tareas-asignadas/tramites/get-by-persona/215/?radicado=&estado_asignacion=&estado_tarea&fecha_inicio&fecha_fin

import { api } from '../../../../../../api/axios';
import { control_success } from '../../../../../../helpers';
import { showAlert } from '../../../../../../utils/showAlert/ShowAlert';
import { formatDateUse } from '../../../../panelDeVentanilla/toolkit/thunks/PqrsdfyComplementos/getPqrsdfPanVen.service';

// gestor/bandeja-tareas/tareas-asignadas/tramites/get-by-persona/215/?radicado=&estado_asignacion=&estado_tarea&fecha_inicio&fecha_fin
export const getListadoTramitesByPerson = async (
  idPersona: number,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  estado_de_la_tarea: string = '',
  fecha_inicio: string = '',
  fecha_fin: string = '',
  radicado: string = '',
  estado_asignacion_de_tarea: string = '',
  mostrar_respuesta_con_req_pendientes: string = '',
) => {
  try {
    setLoading(true);
    const formattedFechaInicio = fecha_inicio
      ? encodeURIComponent(formatDateUse(new Date(fecha_inicio)))
      : '';
    const formattedFechaFin = fecha_fin
      ? encodeURIComponent(formatDateUse(new Date(fecha_fin)))
      : '';
    const url = `gestor/bandeja-tareas/tareas-asignadas/tramites/get-by-persona/${idPersona}/?estado_tarea=${encodeURIComponent(
      estado_de_la_tarea
    )}&fecha_inicio=${formattedFechaInicio}&fecha_fin=${formattedFechaFin}&radicado=${encodeURIComponent(
      radicado
    )}&estado_asignacion=${encodeURIComponent(estado_asignacion_de_tarea)}&mostrar_respuesta_con_req_pendientes=${mostrar_respuesta_con_req_pendientes === 'True' ? 'True' : mostrar_respuesta_con_req_pendientes === '' ? '' : 'False'}`;
    const { data } = await api.get(url);

    if (data && data?.data?.length) {
      control_success(` Se encontró la siguiente lista de tareas asignadas`);
      return data.data;
    }

    showAlert(
      'Atención...',
      'No se encontraron tareas asignadas de trámites para este usuario, con los filtros seleccionados.',
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
