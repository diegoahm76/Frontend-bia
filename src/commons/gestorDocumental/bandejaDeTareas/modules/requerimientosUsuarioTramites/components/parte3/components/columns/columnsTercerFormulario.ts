/* eslint-disable @typescript-eslint/naming-convention */
export const columnsThirdForm = [
  { field: 'nombre_archivo', headerName: 'Nombre del archivo', minWidth: 350 },
  { field: 'numero_folios', headerName: 'Número de folios', minWidth: 200 },
  { field: 'medio_almacenamiento', headerName: 'Medio de almacenamiento', minWidth: 250, renderCell: (params: any) => 'No aplica'},
];