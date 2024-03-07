/* eslint-disable @typescript-eslint/naming-convention */

/*{
  "id_solicitud_al_usuario_sobre_pqrsdf": 35,
  "tipo_tramite": "Solicitud de Complemento de Información al Usuario",
  "fecha_radicado_salida": null,
  "numero_radicado": "SIN RADICAR",
  "estado": "PENDIENTE POR RADICAR"
},*/

export const columnsGridHistorico = [
  {
    headerName: 'Tipo de trámite',
    field: 'tipo_tramite',
    width: 400,
  },
  {
    headerName: 'Fecha de radicado de salida',
    field: 'fecha_radicado_salida',
    width: 220,
    renderCell: (params: any) => params.value || 'N/A',
  },
  {
    headerName: 'Número de radicado de salida',
    field: 'numero_radicado',
    width: 230,
  },
  {
    headerName: 'Estado',
    field: 'estado',
    width: 170,
  },
]



