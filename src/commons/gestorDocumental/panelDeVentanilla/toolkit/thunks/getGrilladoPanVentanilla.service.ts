import { api } from '../../../../../api/axios';

/* eslint-disable @typescript-eslint/naming-convention */
export const getGrilladoPanelVentanilla = async (
  estado_actual_solicitud: string,
  radicado: string,
  tipo_solicitud: string
) => {
  try {
    const url = `
    gestor/panel_ventanilla/pqrsf/get/?estado_actual_solicitud=${estado_actual_solicitud}&radicado=${radicado}&tipo_solicitud=${tipo_solicitud}`;
    const response = await api.get(url);
    console.log(response);
  } catch (e) {
  } finally {
  }
};
