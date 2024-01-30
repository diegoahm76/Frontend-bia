/* eslint-disable @typescript-eslint/naming-convention */
/*
   {
    "medio_almacenamiento": "No Aplica",
    "nombre_anexo": "Policia",
    "orden_anexo_doc": 1,
    "cod_medio_almacenamiento": "Na",
    "medio_almacenamiento_otros_Cual": null,
    "numero_folios": 0,
    "ya_digitalizado": false,
    "observacion_digitalizacion": null,
    "id_docu_arch_exp": null
}
*/

export const columnsModalOpas = [
  {
    headerName: 'Nombre del anexo',
    field: 'nombre_anexo',
    width: 200,
  },
  {
    headerName: 'Medio de almacenamiento',
    field: 'medio_almacenamiento',
    width: 200,
  },
  {
    headerName: 'Número de folios',
    field: 'numero_folios',
    width: 200,
    renderCell: (params: any) => {
      return params.value ? 'N/A' : params.value;
    },
  },
  {
    headerName: 'Ya digitalizado',
    field: 'ya_digitalizado',
    width: 200,
    renderCell: (params: any) => {
      return params.value ? 'Si' : 'No';
    },
  },
  {
    headerName: 'Observación de digitalización',
    field: 'observacion_digitalizacion',
    width: 350,
    renderCell: (params: any) => {
      return params.value ? params.value : 'N/A';
    },
  },
];
