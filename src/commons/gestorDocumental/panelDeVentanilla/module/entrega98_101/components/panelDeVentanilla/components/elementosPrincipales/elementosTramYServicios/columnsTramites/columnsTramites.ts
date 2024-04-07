/* eslint-disable @typescript-eslint/naming-convention */

import { formatDate } from "../../../../../../../../../../../utils/functions/formatDate";



function createColumn(headerName: string, field: string, minWidth: number, isDate: boolean = false, isNumber: boolean = false) {
  return {
    headerName,
    field,
    minWidth,
    renderCell: (params: any) => {
      if (params.value) {
        if (isDate && !isNaN(new Date(params.value).getTime())) {
          return formatDate(params.value);
        } else if (isNumber) {
          return params.value;
        } else {
          return params.value;
        }
      } else {
        return isNumber ? 0 : 'N/A';
      }
    }
  };
}

export const columnsTramites = [
  createColumn("Código operación trámite", "nombre_cod_tipo_operacion_tramite", 200),
  createColumn("Relación con el titular", "nombre_cod_relacion_con_el_titular", 200),
  createColumn("Nombre completo del titular", "nombre_completo_titular", 350),
  createColumn("Radicado", "radicado", 220),
  createColumn("Tipo de solicitud", "tipo_solicitud", 200),
  createColumn("Nombre del proyecto", "nombre_proyecto", 530),
  createColumn("Fecha de registro", "fecha_registro", 200, true),
  createColumn("Fecha de envío solicitud", "fecha_envio_solicitud", 200, true),
  createColumn("Fecha de solicitud finalizada", "fecha_finalizada_solicitud", 200, true),
  createColumn("Cantidad de predios", "cantidad_predios", 200, false, true),
  createColumn("Fecha de radicado", "fecha_radicado", 200, true),
  createColumn("Fecha del expediente", "fecha_expediente", 200, true),
  createColumn("Fecha de inicio", "fecha_inicio", 200, true),
  createColumn("Fecha envío definitivo a digitalización", "fecha_envio_definitivo_a_digitalizacion", 300, true),
  createColumn("Fecha digitalización completada", "fecha_digitalizacion_completada", 300, true),
  createColumn("Fecha de respuesta final de gestión", "fecha_rta_final_gestion", 300, true),
  createColumn("Fecha de inicio estado actual", "fecha_ini_estado_actual", 250, true),
  createColumn("Nombre del trámite", 'nombre_tramite', 400, true),
];
