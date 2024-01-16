import { formatDate } from '../../../../../../../../utils/functions/formatDate';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const columnsAsignaciones = [
  {
    headerName: 'Cargo',
    field: 'cargo',
    minWidth: 250,
  },
  {
    headerName: 'Comentario de reasignación',
    field: 'comentario_reasignacion',
    minWidth: 500,
  },
  {
    headerName: 'Fecha de reasignación',
    field: 'fecha_reasignacion',
    minWidth: 220,
    renderCell: (params: any) => {
      return params.value ? formatDate(params.value) : 'Sin fecha';
    },
  },
  {
    headerName: 'Justificación de reasignación rechazada',
    field: 'justificacion_reasignacion_rechazada',
    minWidth: 450,
    renderCell: (params: any) => {
      return params.value ? params.value : 'Sin justificación';
    },
  },
  {
    headerName: 'Unidad organizacional asignada',
    field: 'unidad_organizacional',
    minWidth: 300,
    renderCell: (params: any) => {
      return params?.value?.nombre ?? 'N/A';
    },
  },
];
