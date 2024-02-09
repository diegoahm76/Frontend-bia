/* eslint-disable @typescript-eslint/naming-convention */
export const columnsBusquedaAsignacion = [
  { headerName: 'Nombre Organigrama', field: 'nombre_organigrama', minWidth: 250 },
  {
    headerName: 'Versión Organigrama',
    field: 'version_organigra',
    minWidth: 200
  },
  {
    headerName: 'Cód. Unidad Organizacional',
    field: 'codigo_unidad_org',
    minWidth: 200
  },
  {
    headerName: "Nombre unidad a la que fue asignado",
    field: 'nombre_unidad_org',
    minWidth: 500,
  },
  {
    headerName: 'Tipo de Documento',
    field: 'tipo_documento',
    width: 150
  },
  {
    headerName: 'Número de Documento',
    field: 'numero_documento',
    minWidth: 220
  },
  {
    headerName: 'Nombre',
    field: 'nombre_completo',
    minWidth: 350
  },
  {
    headerName: 'Observaciones de la asignación',
    field: 'observaciones_asignacion',
    minWidth: 420,
    maxWidth: 500
  }
];
