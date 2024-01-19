/* eslint-disable @typescript-eslint/naming-convention */

import { formatDate } from "../../../../../../../../utils/functions/formatDate";

export const columnsTarea = [
  {
    headerName: "Persona que reasignó",
    field: "persona_reasigno",
    minWidth: 320,
  },
  {
    headerName: "Fecha de reasignación",
    field: "fecha_reasignacion",
    minWidth: 280,
    renderCell: (params: any) => {
      return formatDate(params?.value);
    },
  },
  {
    headerName: "Persona reasignada",
    field: "persona_reasignada",
    minWidth: 370,
  },
  {
    headerName: "Cargo",
    field: "cargo",
    minWidth: 280,
  },
  {
    headerName: "Unidad organizacional",
    field: "unidad_organizacional",
    minWidth: 370,
    renderCell: (params: any) => {
      return params?.value?.nombre ?? "Sin unidad organizacional";
    },
  },
  {
    headerName: "Comentario de reasignación",
    field: "comentario_reasignacion",
    minWidth: 370,
  },
  {
    headerName: "Estado de asignación",
    field: "estado_asignacion",
    minWidth: 270,
  },
  {
    headerName: "Justificación de reasignación rechazada",
    field: "justificacion_reasignacion_rechazada",
    minWidth: 380,
  }
]