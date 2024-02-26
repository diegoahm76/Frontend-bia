/* eslint-disable @typescript-eslint/naming-convention */
/*
{
    "requiere_digitalizacion": true,
    "numero_solicitudes": 0,
    "complemento_asignado_unidad": false,

}
*/

export const columnsReqTra = [
  {
    headerName: 'Tipo',
    field: 'tipo',
    minWidth: 400,
  },
  {
    headerName: 'Nombre completo del titular',
    field: 'nombre_completo_titular',
    minWidth: 450,
  },
  {
    headerName: 'Asunto',
    field: 'asunto',
    minWidth: 500,
    renderCell: (params: any) => {
      return params.value ?? 'N/A';
    }
  },
  {
    headerName: 'Radicado',
    field: 'radicado',
    minWidth: 200,
  },
  {
    headerName: 'Fecha de radicado',
    field: 'fecha_radicado',
    minWidth: 200,
    renderCell: (params: any) => {
      return new Date(params.value).toLocaleDateString() ?? 'No identificada';
    }
  },
  {
    headerName: "Cantidad de anexos",
    field: "cantidad_anexos",
    minWidth: 200,
  },
  {
    headerName: "Fecha de complemento",
    field: "fecha_complemento",
    minWidth: 200,
    renderCell: (params: any) => {
      return new Date(params.value).toLocaleDateString() ?? 'No identificada';
    }
  },
  {
    headerName: "Medio de solicitud",
    field: "medio_solicitud",
    minWidth: 200,
    renderCell: (params: any) => {
      return params.value ?? 'N/A';
    }
  },
  {
    headerName: "Número de folios totales",
    field: "nro_folios_totales",
    minWidth: 200,
  },
  {
    headerName: "Nombre completo de quien recibe",
    field: "nombre_completo_recibe",
    minWidth: 400,
    renderCell: (params: any) => {
      return params.value ?? 'N/A';
    }
  },
  {
    headerName: "Descripción",
    field: "descripcion",
    minWidth: 500,
    renderCell: (params: any) => {
      return params.value ?? 'N/A';
    }
  }
];