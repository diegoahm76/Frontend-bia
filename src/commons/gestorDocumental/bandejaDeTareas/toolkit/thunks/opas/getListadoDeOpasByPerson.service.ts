import { api } from "../../../../../../api/axios";
import { control_success } from "../../../../../../helpers";
import { showAlert } from "../../../../../../utils/showAlert/ShowAlert";
import { formatDateUse } from "../../../../panelDeVentanilla/toolkit/thunks/PqrsdfyComplementos/getPqrsdfPanVen.service";

/* eslint-disable @typescript-eslint/naming-convention */
export const getListadoTareasOpasByPerson = async (
  idPersona: number,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  estado_asignacion_de_tarea: string = '',
  estado_de_la_tarea: string = '',
  fecha_inicio: string = '',
  fecha_fin: string = '',
  mostrar_respuesta_con_req_pendientes: string = '',
  radicado: string = ''
) => {
  console.log('soy los requerimiento pendientes por respuesta', mostrar_respuesta_con_req_pendientes)
  try {
    setLoading(true);
    const formattedFechaInicio = fecha_inicio
      ? encodeURIComponent(formatDateUse(new Date(fecha_inicio)))
      : '';
    const formattedFechaFin = fecha_fin
      ? encodeURIComponent(formatDateUse(new Date(fecha_fin)))
      : '';

      // gestor/bandeja-tareas/tareas-asignadas/opas/get-by-persona/215/?radicado=&estado_asignacion=&estado_tarea&fecha_inicio&fecha_fin&requerimiento
    const url = `gestor/bandeja-tareas/tareas-asignadas/opas/get-by-persona/${idPersona}/?radicado=${radicado}&estado_asignacion=${estado_asignacion_de_tarea}&estado_tarea=${estado_de_la_tarea}&fecha_inicio=${formattedFechaInicio}&fecha_fin=${formattedFechaFin}&requerimiento=${mostrar_respuesta_con_req_pendientes === 'True' ? 'True' : mostrar_respuesta_con_req_pendientes === '' ? '' : 'False'}`;
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


export const getListadoDocumentosByPerson = async (
  idPersona: number,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  try {
    setLoading(true);

      // /api/gestor/bandeja-tareas/tareas-asignadas/docs/get-by-persona/215/
    const url = `gestor/bandeja-tareas/tareas-asignadas/docs/get-by-persona/${idPersona}/?radicado=&estado_asignacion=&estado_tarea&fecha_inicio&fecha_fin&requerimiento`;
    const { data } = await api.get(url);

    if (data && data?.data?.length) {
      control_success(`${data?.detail}`);
      return data.data;
    }

    showAlert(
      'Atención...',
      'No se encontraron documentos para este usuario',
      'warning'
    );

    return [];
  } catch (error) {
    showAlert(
      'Opps...',
      'Ha ocurrido un error al buscar los documentos y/o no hay documentos asignados a este usuario',
      'warning'
    );
    return [];
  } finally {
    setLoading(false);
  }
};
