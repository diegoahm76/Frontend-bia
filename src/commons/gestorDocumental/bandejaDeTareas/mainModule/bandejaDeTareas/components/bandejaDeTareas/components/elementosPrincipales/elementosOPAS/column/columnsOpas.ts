/* eslint-disable @typescript-eslint/naming-convention */
/*{
  // "tiempo_respuesta": -60,
  // "requerimientos_pendientes_respuesta": false,
  // "estado_asignacion_tarea": null,
},*/

import { formatDate } from "../../../../../../../../../../../utils/functions/formatDate";
export const columnsOpas = [
  {
    headerName: "Tipo de tarea",
    field: "tipo_tarea",
    minWidth: 250,
  },
  {
    headerName: "Asignado por",
    field: "asignado_por",
    minWidth: 450,
    renderCell: (params: any) => {
      return params.value ? params.value : "Sin asignar";
    }
  },
  {
    headerName: "Asignado para",
    field: "asignado_para",
    minWidth: 450,
    renderCell: (params: any) => {
      return params.value ? params.value : "Sin asignar";
    }
  },
  { 
    headerName: "Fecha de asignación",
    field: "fecha_asignacion",
    minWidth: 250,
    renderCell: (params: any) => {
      return params.value ? formatDate(params.value) : "Sin asignar";
    }

  },
  {
    headerName: "Comentario de asignación",
    field: "comentario_asignacion",
    minWidth: 500,
    renderCell: (params: any) => {
      return params.value ? params.value : "N/A";
    }
  },
  {
    headerName: "radicado",
    field: "radicado",
    minWidth: 200,
    renderCell: (params: any) => {
      return params.value ? params.value : "N/A";
    }
  },
  {
    headerName: "Fecha de radicado",
    field: "fecha_radicado",
    minWidth: 250,
    renderCell: (params: any) => {
      return params.value ? formatDate(params.value) : "N/A";
    }
  },
  {
    headerName: "Estado de la tarea",
    field: "estado_tarea",
    minWidth: 400,
    renderCell: (params: any) => {
      return params.value ? params.value : "N/A";
    }
  },
  {
    headerName: "Tarea reasignada a",
    field: "tarea_reasignada_a",
    minWidth: 450,
    renderCell: (params: any) => {
      return params.value ? params.value : "N/A";
    }
  },
  {
    headerName: "Unidad org destino",
    field: "unidad_org_destino",
    minWidth: 350,
    renderCell: (params: any) => {
      return params.value ? params.value : "N/A";
    }
  },
  {
    headerName: "Estado reasignación tarea",
    field: "estado_reasignacion_tarea",
    minWidth: 450,
    renderCell: (params: any) => {
      return params.value ? params.value : "N/A";
    }
  },
  {
    headerName: "Respondida por",
    field: "respondida_por",
    minWidth: 350,
    renderCell: (params: any) => {
      return params.value ? params.value : "N/A";
    }
  }
]