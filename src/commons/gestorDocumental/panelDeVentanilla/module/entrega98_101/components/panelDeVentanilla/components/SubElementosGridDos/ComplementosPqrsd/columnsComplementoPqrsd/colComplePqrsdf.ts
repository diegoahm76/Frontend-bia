/* eslint-disable @typescript-eslint/naming-convention */
/*
      {
            "idComplementoUsu_PQR": 6,
            "tipo": "Complemento de PQRSDF",
            "nombre_completo_titular": "SUPERUSUARIO 1er NOMBRE SUPERUSUARIO 1er APELL",
            "asunto": "EEEE",
            "cantidad_anexos": 0,
            "radicado": "ABC123-2023-R12345",
            "requiere_digitalizacion": true,
            "numero_solicitudes": 0
      },
  */

export const columnsComplementoPqrsdf = [
  {
    headerName: 'Tipo',
    field: 'tipo',
    minWidth: 250,
  },
  {
    headerName: 'Nombre completo titular',
    field: 'nombre_completo_titular',
    minWidth: 300,
  },
  {
    headerName: 'Asunto',
    field: 'asunto',
    minWidth: 200,
  },
  {
    headerName: 'Cantidad anexos',
    field: 'cantidad_anexos',
    minWidth: 200,
  },
  {
    headerName: 'Radicado',
    field: 'radicado',
    minWidth: 200,
  },
  {
    headerName: 'Requiere digitalización',
    field: 'requiere_digitalizacion',
    minWidth: 200,
    renderCell: (params: any) => {
      return params.value ? 'Si' : 'No';
    },
  },
];
