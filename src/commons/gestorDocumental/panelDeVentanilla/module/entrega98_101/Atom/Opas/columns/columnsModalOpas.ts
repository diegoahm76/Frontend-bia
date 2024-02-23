/* eslint-disable @typescript-eslint/naming-convention */

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
