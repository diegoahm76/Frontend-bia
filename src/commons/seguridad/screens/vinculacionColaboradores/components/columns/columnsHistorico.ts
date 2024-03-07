/*{
  "nombre_cargo": "Desarrollador Front-End",
  "nombre_unidad_organizacional": "SUbdireccion admin y fin",
  "fecha_inicial_historico": "2023-05-30T19:17:48.789036",
  "fecha_final_historico": "2023-09-12T19:57:43.417679",
  "observaciones_vinculni_cargo": null,
  "justificacion_cambio_und_org": "Traslado Masivo de Unidad por Entidad por seguridad el 2023-09-12 19:57:43",
  "desvinculado": false,
  "fecha_desvinculacion": null,
  "observaciones_desvinculacion": null
},*/

export const columns_historico_vinculaciones = [
  {
    headerName: 'Cargo',
    field: 'nombre_cargo',
    minWidth: 350,
  },
  {
    headerName: 'Unidad Organizacional',
    field: 'nombre_unidad_organizacional',
    minWidth: 350,
  },
  {
    headerName: 'Fecha Inicial',
    field: 'fecha_inicial_historico',
    minWidth: 200,
    valueFormatter: (params: any) => {
      return params.value ? new Date(params.value).toLocaleDateString() : '';
    },
  },
  {
    headerName: 'Fecha Final',
    field: 'fecha_final_historico',
    minWidth: 200,
    valueFormatter: (params: any) => {
      return params.value ? new Date(params.value).toLocaleDateString() : '';
    },
  },
  {
    headerName: 'Justificación',
    field: 'justificacion_cambio_und_org',
    minWidth: 450,
    renderCell: (params: any) => {
      return params.value ? params.value : 'Sin justificación';
    },
  },
  {
    headerName: 'Desvinculado',
    field: 'desvinculado',
    minWidth: 200,
    valueFormatter: (params: any) => {
      return params.value ? 'Si' : 'No';
    },
  },
  {
    headerName: 'Fecha Desvinculación',
    field: 'fecha_desvinculacion',
    minWidth: 200,
    valueFormatter: (params: any) => {
      return params.value ? new Date(params.value).toLocaleDateString() : '';
    },
  },
  {
    headerName: 'Observaciones Desvinculación',
    field: 'observaciones_desvinculacion',
    minWidth: 450,
    renderCell: (params: any) => {
      return params.value ? params.value : 'Sin observaciones';
    },
  },
  {
    headerName: 'Observaciones Vinculación',
    field: 'observaciones_vinculni_cargo',
    minWidth: 450,
    renderCell: (params: any) => {
      return params.value ? params.value : 'Sin observaciones';
    },
  },
];
