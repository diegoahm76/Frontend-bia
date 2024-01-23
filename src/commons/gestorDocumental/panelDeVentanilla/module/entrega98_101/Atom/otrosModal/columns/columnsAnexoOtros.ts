/* eslint-disable @typescript-eslint/naming-convention */
/*
{
  "medio_almacenamiento": "Papel",
  "nombre_anexo": "Nombre anexo",
  "medio_almacenamiento_otros_Cual": null,
  "numero_folios": 56,
  "ya_digitalizado": true,
  "observacion_digitalizacion": null,
}
*/
export const columnsAnexoOtros = [
  {
    headerName: "Medio de almacenamiento",
    field: "medio_almacenamiento",
    width: 250,
    renderCell: (params: any) => {
      return params.value || 'N/A';
    }
  },
  {
    headerName: "Nombre del anexo",
    field: "nombre_anexo",
    width: 250,
    renderCell: (params: any) => {
      return params.value || 'N/A';
    }
  },
  {
    headerName: "Medio de almacenamiento otros",
    field: "medio_almacenamiento_otros_Cual",
    width: 250,
    renderCell: (params: any) => {
      return params.value || 'N/A';
    }
  },
  {
    headerName: "Cantidad de folios",
    field: "numero_folios",
    width: 200,
  },
  {
    headerName: "Digitalizado",
    field: "ya_digitalizado",
    width: 200,
    renderCell: (params: any) => {
      return params.value ? 'Si' : 'No';
    }
  },
  {
    headerName: "Observación de digitalización",
    field: "observacion_digitalizacion",
    width: 350,
    renderCell: (params: any) => {
      return params.value || 'N/A';
    }
  }
]