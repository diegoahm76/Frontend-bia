/* eslint-disable @typescript-eslint/naming-convention */
// ? estas columnas van en el componente RenderDataGrid pero van a ser de ejemplo mientras se manejan los datos desde backend

/*
  A manera de ejemplo se van a generar las siguientes columnas de ejemplo

  1. nombre
  2. medio_almacenamiento
  3. numero_folios
  4. digitalizado (si o no) - boolean
  5. observacion
  6. la accion

  //* el elemento del archivo a descargar tambien debe estar pero no se debe mostrar en la tabla
*/

// ? ------ AQUI VAN A ESTAR LAS COLUMNAS DE EJEMPLO para los anexos

export const columnsAtom = [
  {
    headerName: 'Nombre del anexo',
    field: 'nombre_anexo',
    minWidth: 300,
  },
  {
    headerName: 'Medio de almacenamiento',
    field: 'medio_almacenamiento',
    minWidth: 200,
  },
  {
    headerName: 'Número de folios',
    field: 'numero_folios',
    minWidth: 150,
  },
  {
    headerName: 'Digitalizado',
    field: 'ya_digitalizado',
    minWidth: 150,
    renderCell: (params: any) => {
      return params.value ? 'Si' : 'No';
    },
  },
];
