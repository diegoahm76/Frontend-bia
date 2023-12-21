/* eslint-disable @typescript-eslint/naming-convention */

/*

        {
           // "id_PQRSDF": 10,
          "tipo_solicitud": "PQRSDF", ok
            "nombre_completo_titular": "SUPERUSUARIO 1er NOMBRE SUPERUSUARIO 1er APELL", ok
            "asunto": "SIN IDENTIFICAR", ok
            "cantidad_anexos": 0, ok
            "radicado": "XYZ789-2023-R67890", ok
            "fecha_radicado": "2023-11-07T12:00:00", ok
            "requiere_digitalizacion": true, ok
            "estado_solicitud": "GUARDADO", ok
            "estado_asignacion_grupo": "Pendiente", ok
            "nombre_sucursal": null, ok
            "numero_solicitudes_digitalizacion": 0,
            "numero_solicitudes_usuario": 0
        },

*/

export const columnsPqrsdf = [
  {
    headerName: 'Tipo de solicitud',
    field: 'tipo_solicitud',
    minWidth: 220,
  },
  {
    headerName: 'Nombre completo del titular',
    field: 'nombre_completo_titular',
    minWidth: 400,
    renderCell: (params: any) => {
      return params.value ? params.value : 'N/A';
    },
  },
  {
    headerName: 'Asunto',
    field: 'asunto',
    minWidth: 450,
  },
  {
    headerName: 'Cantidad de anexos',
    field: 'cantidad_anexos',
    minWidth: 220,
  },
  {
    headerName: 'Radicado',
    field: 'radicado',
    minWidth: 235,
    renderCell: (params: any) => {
      return params.row.radicado ? params.row.radicado : 'N/A';
    },
  },
  {
    headerName: 'Fecha de radicado',
    field: 'fecha_radicado',
    minWidth: 230,
    renderCell: (params: any) => {
      return params.value ? params.value : 'N/A';
    },
  },
  {
    headerName: 'Estado de solicitud',
    field: 'estado_solicitud',
    minWidth: 280,
  },
  {
    headerName: 'Nombre de sucursal',
    field: 'nombre_sucursal',
    minWidth: 230,
    renderCell: (params: any) => {
      return params.value ? params.value : 'N/A';
    },
  },
  {
    headerName: 'Nombre de sucursal implicada',
    field: 'nombre_sucursal_implicada',
    minWidth: 230,
    renderCell: (params: any) => {
      return params.value ? params.value : 'N/A';
    },
  },
  {
    headerName: 'Medio de solicitud',
    field: 'medio_solicitud',
    minWidth: 250,
    renderCell: (params: any) => {
      return params.value ? params.value : 'N/A';
    },
  },
  {
    headerName: 'Persona asignada',
    field: 'persona_asignada',
    minWidth: 280,
    renderCell: (params: any) => {
      return params.value ? params.value : 'N/A';
    },
  },
  {
    headerName: 'Unidad asignada',
    field: 'unidad_asignada',
    minWidth: 280,
    renderCell: (params: any) => {
      return params.value ? params.value : 'N/A';
    },
  },
];
