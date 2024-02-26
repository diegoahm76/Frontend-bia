/* eslint-disable @typescript-eslint/naming-convention */
import { formatDate } from '../../../../../../../../../../../utils/functions/formatDate';

// ? se deben modificar según las necesidades de la tabla

/*{
  "tipo_tarea": "Responder PQRSDF",
  "asignado_por": "SeguridadNombre  SeguridadApellido ",
  "asignado_para": "SeguridadNombre  SeguridadApellido ",
  "fecha_asignacion": "2023-12-26T16:09:11.806016",
  "comentario_asignacion": null,
  "radicado": "DEF456-2023-R24680",
  "fecha_radicado": "2023-11-21T10:47:46.869582",
  "dias_para_respuesta": -37,
  "requerimientos_pendientes_respuesta": false,
  "estado_tarea": null,
  "fecha_respondido": null,
  "respondida_por": null,
  "tarea_reasignada_a": null,
  "unidad_org_destino": null,
  "estado_reasignacion_tarea": null
}*/

export const columnsPqrsdf = [
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
      return params.value ?? 'Sin asignar';
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
      return params.value ?? 'Sin radicado';
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
    headerName: 'Fecha de respuesta',
    field: 'fecha_respondido',
    minWidth: 220,
    renderCell: (params: any) => {
      return formatDate(params?.value);
    },
  },
  {
    headerName: 'Respondida por',
    field: 'respondida_por',
    minWidth: 280,
    renderCell: (params: any) => {
      return params.value ?? 'Sin responder';
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
];
