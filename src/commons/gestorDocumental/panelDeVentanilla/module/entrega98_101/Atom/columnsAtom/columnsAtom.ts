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
    field: 'digitalizado',
    minWidth: 150,
    renderCell: (params: any) => {
      return params.digitalizado ? 'Si' : 'No';
    },
  },
  {
    headerName: 'Observación',
    field: 'observacion',
    minWidth: 350,
  },
];

// ? ------ AQUI TAMBIEN VAN A ESTAR LAS ROWS DE EJEMPLO para los anexos

export const rowsEJEMPLO = [
  {
    radicado: 'Radicado 1',
    nombre: 'ejemplo 1',
    medio_almacenamiento: 'ejemplo 1',
    numero_folios: 'ejemplo 1',
    digitalizado: 'ejemplo 1',
    observacion: 'ejemplo 1',
  },
  {
    radicado: 'Radicado 2',
    nombre: 'ejemplo 2',
    medio_almacenamiento: 'ejemplo 2',
    numero_folios: 'ejemplo 2',
    digitalizado: 'ejemplo 2',
    observacion: 'ejemplo 2',
  },
  {
    radicado: 'Radicado 3',
    nombre: 'ejemplo 3',
    medio_almacenamiento: 'ejemplo 3',
    numero_folios: 'ejemplo 3',
    digitalizado: 'ejemplo 3',
    observacion: 'ejemplo 3',
  },
  {
    radicado: 'Radicado 4',
    nombre: 'ejemplo 4',
    medio_almacenamiento: 'ejemplo 4',
    numero_folios: 'ejemplo 4',
    digitalizado: 'ejemplo 4',
    observacion: 'ejemplo 4',
  },
  {
    radicado: 'Radicado 5',
    nombre: 'ejemplo 5',
    medio_almacenamiento: 'ejemplo 5',
    numero_folios: 'ejemplo 5',
    digitalizado: 'ejemplo 5',
    observacion: 'ejemplo 5',
  },
  {
    radicado: 'Radicado 6',
    nombre: 'ejemplo 6',
    medio_almacenamiento: 'ejemplo 6',
    numero_folios: 'ejemplo 6',
    digitalizado: 'ejemplo 6',
    observacion: 'ejemplo 6',
  },
  {
    radicado: 'Radicado 7',
    nombre: 'ejemplo 7',
    medio_almacenamiento: 'ejemplo 7',
    numero_folios: 'ejemplo 7',
    digitalizado: 'ejemplo 7',
    observacion: 'ejemplo 7',
  },
  {
    radicado: 'Radicado 8',
    nombre: 'ejemplo 8',
    medio_almacenamiento: 'ejemplo 8',
    numero_folios: 'ejemplo 8',
    digitalizado: 'ejemplo 8',
    observacion: 'ejemplo 8',
  },
  {
    radicado: 'Radicado 9',
    nombre: 'ejemplo 9',
    medio_almacenamiento: 'ejemplo 9',
    numero_folios: 'ejemplo 9',
    digitalizado: 'ejemplo 9',
    observacion: 'ejemplo 9',
  },
];

export const rowsEjemploAnexosDePqrsdf = [
  {
    radicado: "Radicado LXM-1122_2029",
    nombre: 'Certificado de divorcio de usuario',
    medio_almacenamiento: 'Micro SD',
    numero_folios: '7',
    digitalizado: 'SI',
    observacion: 'Información legal',
  },
  {
    radicado: "Radicado NXO-3344_2030",
    nombre: 'Diploma de grado de usuario',
    medio_almacenamiento: 'Flash Drive',
    numero_folios: '8',
    digitalizado: 'NO',
    observacion: 'Información académica',
  },
  {
    radicado: "Radicado PXQ-5566_2031",
    nombre: 'Certificado de empleo de usuario',
    medio_almacenamiento: 'Disco Blu-ray',
    numero_folios: '9',
    digitalizado: 'SI',
    observacion: 'Información laboral',
  },
  {
    radicado: "Radicado RXS-7788_2032",
    nombre: 'Certificado de residencia de usuario',
    medio_almacenamiento: 'Tarjeta de memoria',
    numero_folios: '10',
    digitalizado: 'NO',
    observacion: 'Información de residencia',
  },
  {
    radicado: "Radicado TXU-9900_2033",
    nombre: 'Certificado de defunción de usuario',
    medio_almacenamiento: 'Tarjeta SIM',
    numero_folios: '11',
    digitalizado: 'SI',
    observacion: 'Información de defunción',
  },
  {
    radicado: "Radicado VXW-2233_2034",
    nombre: 'Certificado de adopción de usuario',
    medio_almacenamiento: 'Tarjeta CF',
    numero_folios: '12',
    digitalizado: 'NO',
    observacion: 'Información de adopción',
  },
  {
    radicado: "Radicado XXZ-4455_2035",
    nombre: 'Certificado de naturalización de usuario',
    medio_almacenamiento: 'Tarjeta SDHC',
    numero_folios: '13',
    digitalizado: 'SI',
    observacion: 'Información de naturalización',
  },
  {
    radicado: "Radicado YXA-6677_2036",
    nombre: 'Certificado de ciudadanía de usuario',
    medio_almacenamiento: 'Tarjeta XQD',
    numero_folios: '14',
    digitalizado: 'NO',
    observacion: 'Información de ciudadanía',
  },
  {
    radicado: 'Radicado JXK-7890_2028',
    nombre: 'Certificado de matrimonio de usuario',
    medio_almacenamiento: 'SSD',
    numero_folios: '6',
    digitalizado: 'NO',
    observacion: 'Manejo de datos familiares',
  },
  {
    radicado: 'Radicado FXG-9012_2026',
    nombre: 'Tarjeta de identidad de usuario',
    medio_almacenamiento: 'Disco duro',
    numero_folios: '4',
    digitalizado: 'NO',
    observacion: 'Manejo de datos financieros',
  },
  {
    radicado: 'Radicado HXI-3456_2027',
    nombre: 'Certificado de nacimiento de usuario',
    medio_almacenamiento: 'Nube',
    numero_folios: '5',
    digitalizado: 'SI',
    observacion: 'Información personal',
  },
];

/// ? informacion de ejemplo para los metadatos
