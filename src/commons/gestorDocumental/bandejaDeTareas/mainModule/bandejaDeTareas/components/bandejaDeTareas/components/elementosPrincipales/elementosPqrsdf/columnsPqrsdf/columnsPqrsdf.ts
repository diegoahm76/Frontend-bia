/* eslint-disable @typescript-eslint/naming-convention */
import { formatDate } from '../../../../../../../../../../../utils/functions/formatDate';

// ? se deben modificar según las necesidades de la tabla

/*
{
    "tipo_tarea": "Responder PQRSDF",
    "asignado_por": "SeguridadNombre  SeguridadApellido ",
    "asignado_para": "SeguridadNombre  SeguridadApellido ",
    "fecha_asignacion": "2023-12-26T16:08:57.680384",
    "radicado": "ABC123-2023-R12345",
    "fecha_radicado": "2023-11-05T10:47:46.869582",
    "dias_para_respuesta": -42,
    "requerimientos_pendientes_respuesta": false,
    "estado_asignacion": null
}
*/

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
  },
  {
    headerName: 'Asignado para',
    field: 'asignado_para',
    minWidth: 280,
  },
  {
    headerName: 'Fecha de asignación',
    field: 'fecha_asignacion',
    minWidth: 220,
    renderCell: (params: any) => {
      return formatDate(params?.value)
    }
  },
  {
    headerName: 'Radicado',
    field: 'radicado',
    minWidth: 220,
  },
  {
    headerName: 'Fecha de radicado',
    field: 'fecha_radicado',
    minWidth: 220,
    renderCell: (params: any) => {
      return formatDate(params?.value)
    }
  },
  {
    headerName: 'Requerimientos pendientes de respuesta',
    field: 'requerimientos_pendientes_respuesta',
    minWidth: 280,
    renderCell: (params: any) => {
      return params.value ? 'SI': 'NO';
    },
  },

];
