import { formatDate } from "../../../../../../../../utils/functions/formatDate";

// eslint-disable-next-line @typescript-eslint/naming-convention
export const columnsAsignaciones = [
  {
    headerName: 'Consecutivo',
    field: 'consecutivo_asign_x_pqrsdf',
    sortable: true,
    filter: true,
    resizable: true,
    minWidth: 150,
  },
  {
    headerName: 'Acción',
    field: 'accion',
    sortable: true,
    filter: true,
    resizable: true,
    minWidth: 250,
  },
  {
    headerName: 'Fecha de asignación',
    field: 'fecha_asignacion',
    sortable: true,
    filter: true,
    resizable: true,
    minWidth: 220,
    renderCell: (params: any) => {
      return params.value ? formatDate(params.value) : 'Sin fecha';
    }
  },
  {
    headerName: 'Fecha de elección de estado',
    field: 'fecha_eleccion_estado',
    sortable: true,
    filter: true,
    resizable: true,
    minWidth: 220,
    renderCell: (params: any) => {
      return params.value ? formatDate(params.value) : 'Sin fecha';
    }
  },
  {
    headerName: 'Asignado para',
    field: 'asignado_para',
    sortable: true,
    filter: true,
    resizable: true,
    minWidth: 250,
  },
  {
    headerName: 'Sección',
    field: 'sec_sub',
    sortable: true,
    filter: true,
    resizable: true,
    minWidth: 300,
  },
  {
    headerName: 'Grupo',
    field: 'grupo',
    sortable: true,
    filter: true,
    resizable: true,
    minWidth: 150,
    renderCell: (params: any) => {
      return params.value ? params.value : 'Sin grupo';
    }
  },

  {
    headerName: 'Justificación de rechazo',
    field: 'justificacion_rechazo',
    sortable: true,
    filter: true,
    resizable: true,
    minWidth: 400,
    renderCell: (params: any) => {
      return params.value ? params.value : 'Sin justificación';
    },
  },
];

