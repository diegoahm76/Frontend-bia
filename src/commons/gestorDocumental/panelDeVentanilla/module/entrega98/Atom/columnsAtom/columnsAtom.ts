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
    headerName: 'Nombre',
    field: 'nombre',
    minWidth: 150,
  },
  {
    headerName: 'Medio de almacenamiento',
    field: 'medio_almacenamiento',
    minWidth: 150,
  },
  {
    headerName: 'Número de folios',
    field: 'numero_folios',
    minWidth: 150,
  },
  {
    headerName: 'Digitalizado',
    field: 'digitalizado',
    minWidth: 150,
    renderCell: (params: any) => {
      return params.digitalizado ? 'Si' : 'No';
    },
  },
  {
    headerName: 'Observación',
    field: 'observacion',
    minWidth: 150,
  },
];

// ? ------ AQUI TAMBIEN VAN A ESTAR LAS ROWS DE EJEMPLO para los anexos

export const rowsEJEMPLO = [
  {
    nombre: 'ejemplo 1',
    medio_almacenamiento: 'ejemplo 1',
    numero_folios: 'ejemplo 1',
    digitalizado: 'ejemplo 1',
    observacion: 'ejemplo 1',
  },
  {
    nombre: 'ejemplo 2',
    medio_almacenamiento: 'ejemplo 2',
    numero_folios: 'ejemplo 2',
    digitalizado: 'ejemplo 2',
    observacion: 'ejemplo 2',
  },
  {
    nombre: 'ejemplo 3',
    medio_almacenamiento: 'ejemplo 3',
    numero_folios: 'ejemplo 3',
    digitalizado: 'ejemplo 3',
    observacion: 'ejemplo 3',
  },
  {
    nombre: 'ejemplo 4',
    medio_almacenamiento: 'ejemplo 4',
    numero_folios: 'ejemplo 4',
    digitalizado: 'ejemplo 4',
    observacion: 'ejemplo 4',
  },
  {
    nombre: 'ejemplo 5',
    medio_almacenamiento: 'ejemplo 5',
    numero_folios: 'ejemplo 5',
    digitalizado: 'ejemplo 5',
    observacion: 'ejemplo 5',
  },
  {
    nombre: 'ejemplo 6',
    medio_almacenamiento: 'ejemplo 6',
    numero_folios: 'ejemplo 6',
    digitalizado: 'ejemplo 6',
    observacion: 'ejemplo 6',
  },
  {
    nombre: 'ejemplo 7',
    medio_almacenamiento: 'ejemplo 7',
    numero_folios: 'ejemplo 7',
    digitalizado: 'ejemplo 7',
    observacion: 'ejemplo 7',
  },
  {
    nombre: 'ejemplo 8',
    medio_almacenamiento: 'ejemplo 8',
    numero_folios: 'ejemplo 8',
    digitalizado: 'ejemplo 8',
    observacion: 'ejemplo 8',
  },
  {
    nombre: 'ejemplo 9',
    medio_almacenamiento: 'ejemplo 9',
    numero_folios: 'ejemplo 9',
    digitalizado: 'ejemplo 9',
    observacion: 'ejemplo 9',
  },
];

/// ? informacion de ejemplo para los metadatos
