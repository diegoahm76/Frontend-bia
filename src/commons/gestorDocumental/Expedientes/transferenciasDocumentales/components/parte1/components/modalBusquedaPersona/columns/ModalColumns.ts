/* eslint-disable @typescript-eslint/naming-convention */
/*
{
    "tipo_persona_desc": "Natural",
    "tipo_documento": "CC",
    "numero_documento": "1006860603",
    "primer_nombre": "JOHN",
    "segundo_nombre": "FREDDY",
    "primer_apellido": "BERMUDEZ",
    "segundo_apellido": "RIVERA",
    "nombre_completo": "JOHN FREDDY BERMUDEZ RIVERA",
    "razon_social": null,
    "nombre_comercial": "",
    "digito_verificacion": null,
    "cod_naturaleza_empresa": null,
    "tiene_usuario": true,
    "tipo_usuario": "Interno"
}
*/

export const ModalColumns = [
  {
    headerName: 'tipo_persona_desc',
    field: 'tipo_persona_desc',
    minWidth: 150,
  },
  {
    headerName: 'tipo_documento',
    field: 'tipo_documento',
    minWidth: 150,
  },
  {
    headerName: 'numero_documento',
    field: 'numero_documento',
    minWidth: 150,
    renderCell: (params: any) => {
      return params.value ? params.value : 'N/A';
    },
  },
  {
    headerName: 'primer_nombre',
    field: 'primer_nombre',
    minWidth: 150,
    renderCell: (params: any) => {
      return params.value ? params.value : 'N/A';
    },
  },
  {
    headerName: 'segundo_nombre',
    field: 'segundo_nombre',
    minWidth: 150,
    renderCell: (params: any) => {
      return params.value ? params.value : 'N/A';
    },
  },
  {
    headerName: 'primer_apellido',
    field: 'primer_apellido',
    minWidth: 150,
    renderCell: (params: any) => {
      return params.value ? params.value : 'N/A';
    },
  },
  {
    headerName: 'segundo_apellido',
    field: 'segundo_apellido',
    minWidth: 150,
    renderCell: (params: any) => {
      return params.value ? params.value : 'N/A';
    },
  },
  {
    headerName: 'nombre_completo',
    field: 'nombre_completo',
    minWidth: 150,
    renderCell: (params: any) => {
      return params.value ? params.value : 'N/A';
    },
  },
  {
    headerName: 'razon_social',
    field: 'razon_social',
    minWidth: 150,
    renderCell: (params: any) => {
      return params.value ? params.value : 'N/A';
    },
  },
  {
    headerName: 'nombre_comercial',
    field: 'nombre_comercial',
    minWidth: 150,
    renderCell: (params: any) => {
      return params.value ? params.value : 'N/A';
    },
  },
  {
    headerName: 'digito_verificacion',
    field: 'digito_verificacion',
    minWidth: 150,
    renderCell: (params: any) => {
      return params.value ? params.value : 'N/A';
    },
  },
  {
    headerName: 'cod_naturaleza_empresa',
    field: 'cod_naturaleza_empresa',
    minWidth: 150,
    renderCell: (params: any) => {
      return params.value ? params.value : 'N/A';
    },
  },
  {
    headerName: 'tiene_usuario',
    field: 'tiene_usuario',
    minWidth: 150,
    renderCell: (params: any) => {
      return params.value ? 'Si' : 'No';
    },
  },
  {
    headerName: 'tipo_usuario',
    field: 'tipo_usuario',
    minWidth: 150,
    renderCell: (params: any) => {
      return params.value ? params.value : 'N/A';
    },
  },
];

/*
{
    "id_persona": 33,
    "tipo_persona": "J",
    "tipo_persona_desc": "Juridica",
    "tipo_documento": "NT",
    "numero_documento": "1006812412",
    "primer_nombre": null,
    "segundo_nombre": null,
    "primer_apellido": null,
    "segundo_apellido": null,
    "nombre_completo": "OSCARCORPS",
    "razon_social": "OSCARCORPS",
    "nombre_comercial": "Rodriguezz",
    "digito_verificacion": "1",
    "cod_naturaleza_empresa": "PR",
    "tiene_usuario": true,
    "tipo_usuario": "Externo"
}
*/
