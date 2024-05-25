/* eslint-disable @typescript-eslint/naming-convention */

import { formatDate } from '../../../../../../../../../../../utils/functions/formatDate';
import moment from 'moment';
/*
{
            "tipo_tarea": "RESPONDER OTRO",
            "asignado_por": "SeguridadNombre  SeguridadApellido ",
            "asignado_para": "SeguridadNombre  SeguridadApellido ",
            "fecha_asignacion": "2024-02-08T19:44:16.873361",
            "comentario_asignacion": null,
            "radicado": "UNICO-2024-00019",
            "fecha_radicado": "2024-01-17T14:46:30.064887",
            "estado_tarea": "En proceso de respuesta",
            "estado_asignacion_tarea": "Rechazado",
            "unidad_org_destino": null,
            "estado_reasignacion_tarea": null,
            "tarea_reasignada_a": null,
        },
*/
export const columnsTareaasOtros = [
  {
    headerName: 'Tipo de tarea',
    field: 'tipo_tarea',
    minWidth: 250,
  },
  {
    headerName: 'Asignado por',
    field: 'asignado_por',
    minWidth: 400,
    renderCell: (params: any) => params.value || 'Sin asignar',
  },
  {
    headerName: 'Asignado para',
    field: 'asignado_para',
    minWidth: 400,
    renderCell: (params: any) => params.value || 'Sin asignar',
  },
  {
    headerName: 'Fecha de asignación',
    field: 'fecha_asignacion',
    minWidth: 300,
    renderCell: (params: any) => {
      return formatDate(params?.value) ?? 'N/A';
    },
  },
  {
    headerName: 'Comentario de asignación',
    field: 'comentario_asignacion',
    minWidth: 550,
    renderCell: (params: any) => params.value || 'Sin comentario de asignación',
  },
  {
    headerName: 'Radicado',
    field: 'radicado',
    minWidth: 250,
    renderCell: (params: any) => params.value || 'N/A',
  },
  {
    headerName: 'Fecha de radicado',
    field: 'fecha_radicado',
    minWidth: 300,
    renderCell: (params: any) => {
      return formatDate(params?.value) ?? 'N/A';
    },
  },
  {
    headerName: 'Estado de la tarea',
    field: 'estado_tarea',
    minWidth: 300,
    renderCell: (params: any) => params.value || 'N/A',
  },
  {
    headerName: 'Unidad org destino',
    field: 'unidad_org_destino',
    minWidth: 300,
    renderCell: (params: any) => params.value || 'Sin asignar',
  },
  {
    headerName: 'Estado de reasignación de la tarea',
    field: 'estado_reasignacion_tarea',
    minWidth: 300,
    renderCell: (params: any) => params.value || 'Sin asignar',
  },
  {
    headerName: 'Tarea reasignada a',
    field: 'tarea_reasignada_a',
    minWidth: 550,
    renderCell: (params: any) => params.value || 'Sin re-asignar',
  },
];
