import { formatDate } from "../../../../../../../TramitesServicios/utils/FormatoFecha";

// eslint-disable-next-line @typescript-eslint/naming-convention
export const actos = [
  /*{
    headerName: 'Consecutivo',
    field: 'consecutivo_asign_x_tramite',
    minWidth: 150,
  },
  {
    headerName: 'Acción',
    field: 'accion',
    minWidth: 250,
  },
  {
    headerName: 'Fecha de asignación',
    field: 'fecha_asignacion',
    minWidth: 220,
    renderCell: (params: any) => {
      return params.value ? formatDate(params.value) : 'Sin fecha';
    },
  },
  {
    headerName: 'Fecha de elección de estado',
    field: 'fecha_eleccion_estado',
    minWidth: 220,
    renderCell: (params: any) => {
      return params.value ? formatDate(params.value) : 'Sin fecha';
    },
  },*/
  {
    headerName: 'Número de acto administrativo',
    field: 'numero_acto_administrativo',
    minWidth: 250,
  },
  {
    headerName: 'Fecha acto administrativo',
    field: 'fecha_acto_administrativo',
    minWidth: 350,
  },
/*  {
    headerName: 'Grupo',
    field: 'grupo',
    minWidth: 150,
    renderCell: (params: any) => {
      return params.value ? params.value : 'Sin grupo';
    },
  },

  {
    headerName: 'Justificación de rechazo',
    field: 'justificacion_rechazo',
    minWidth: 400,
    renderCell: (params: any) => {
      return params.value ? params.value : 'Sin justificación';
    },
  },*/
];
