/* eslint-disable @typescript-eslint/naming-convention */
export const columnsModalBusAvanLider = [
  {
    headerName: 'Tipo de Persona',
    field: 'tipo_persona',
    minWidth: 180,
    renderCell: (params: any) => {
      return params.value === 'N' ? 'Natural' : 'Jurídica';
    },
  },
  {
    headerName: 'Tipo de documento',
    field: 'tipo_documento',
    minWidth: 200,
  },
  {
    headerName: 'Número de documento',
    field: 'numero_documento',
    minWidth: 200,
  },
  {
    headerName: 'Nombre',
    field: 'nombre_completo',
    minWidth: 350,
  },
];
