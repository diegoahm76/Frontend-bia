/* eslint-disable @typescript-eslint/naming-convention */

export const columnsTramites = [
  {
    headerName: 'Tipo de solicitud',
    field: 'tipo_solicitud',
    minWidth: 300,
    renderCell: (params: any) => params.value || 'N/A',
  },
  {
    headerName: 'Titular',
    field: 'nombre_completo_titular',
    minWidth: 350,
    renderCell: (params: any) => params.value || 'N/A',
  },
  {
    headerName: 'Radicado',
    field: 'radicado',
    minWidth: 220,
    renderCell: (params: any) => params.value || 'N/A',
  },
  {
    headerName: 'Fecha de radicado',
    field: 'fecha_radicado',
    minWidth: 150,
    renderCell: (params: any) => {
      return params.value ? new Date(params.value).toLocaleDateString() : 'N/A';
    },
  },
  {
    headerName: 'Persona que radicó',
    field: 'persona_radica',
    minWidth: 450,
    renderCell: (params: any) => params.value || 'N/A',
  },
  {
    headerName: 'Estado',
    field: 'estado_actual',
    minWidth: 350,
    renderCell: (params: any) => params.value || 'N/A',
  },
  {
    headerName: 'Nombre del trámite',
    field: 'nombre_tramite',
    minWidth: 530,
    renderCell: (params: any) => params.value || 'N/A',
  },
  {
    headerName: 'Ubicación en la corporación',
    field: 'ubicacion_corporacion',
    minWidth: 200,
    renderCell: (params: any) => params.value || 'N/A',
  }
]