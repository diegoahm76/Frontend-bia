/* eslint-disable @typescript-eslint/naming-convention */

import { formatDate } from '../../../../../../../../../../../utils/functions/formatDate';

export const columnsTareasTramites = [
  {
    headerName: 'Tipo de tarea',
    field: 'tipo_tarea',
    minWidth: 220,
  },
  {
    headerName: 'Asignado por',
    field: 'asignado_por',
    minWidth: 280,
    renderCell: (params: any) => {
      return params.value ?? 'Sin asignar';
    },
  },
  {
    headerName: 'Asignado para',
    field: 'asignado_para',
    minWidth: 280,
    renderCell: (params: any) => {
      return params.value || 'Sin asignar';
    },
  },
  {
    headerName: 'Fecha de asignación',
    field: 'fecha_asignacion',
    minWidth: 220,
    renderCell: (params: any) => {
      return formatDate(params?.value) ?? 'Sin fecha';
    },
  },
  {
    headerName: 'Radicado',
    field: 'radicado',
    minWidth: 220,
    rencerCell: (params: any) => {
      return params.value || 'N/A';
    },
  },
  {
    headerName: 'Fecha de radicado',
    field: 'fecha_radicado',
    minWidth: 220,
    renderCell: (params: any) => {
      return formatDate(params?.value) ?? 'Sin fecha';
    },
  },
  {
    headerName: 'Tarea reasignada a',
    field: 'tarea_reasignada_a',
    minWidth: 450,
    renderCell: (params: any) => {
      return params.value ?? 'Sin reasignar';
    },
  },
  {
    headerName: 'Unidad organizacional de destino',
    field: 'unidad_org_destino',
    minWidth: 320,
    renderCell: (params: any) => {
      return params.value ?? 'Sin unidad organizacional de destino';
    },
  },
  {
    headerName: 'Estado de reasignación de tarea',
    field: 'estado_reasignacion_tarea',
    minWidth: 350,
    renderCell: (params: any) => {
      return params.value ?? 'Sin estado de reasignación';
    },
  },
  {
    headerName: 'Estado de la de tarea',
    field: 'estado_tarea',
    minWidth: 350,
    renderCell: (params: any) => {
      return params.value ?? 'N/A';
    },
  },
  {
    headerName: '¿Tiene requerimientos pendientes por respuesta?',
    field: 'requerimientos_pendientes_respuesta',
    minWidth: 350,
    renderCell: (params: any) => {
      return params.value ? 'Si' : 'No';
    },
  },
];
