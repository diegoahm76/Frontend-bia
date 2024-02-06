/* eslint-disable @typescript-eslint/naming-convention */

export const ModalColumns = [
  {
    headerName: 'Tipo Persona',
    field: 'tipo_persona_desc',
    minWidth: 150,
  },
  {
    headerName: 'Tipo Documento',
    field: 'tipo_documento',
    minWidth: 150,
  },
  {
    headerName: 'Numero Documento',
    field: 'numero_documento',
    minWidth:200,
    renderCell: (params: any) => {
      return params.value ? params.value : 'N/A';
    },
  },
  {
    headerName: 'Primer Nombre',
    field: 'primer_nombre',
    minWidth: 150,
    renderCell: (params: any) => {
      return params.value ? params.value : 'N/A';
    },
  },
  {
    headerName: 'Segundo Nombre',
    field: 'segundo_nombre',
    minWidth: 150,
    renderCell: (params: any) => {
      return params.value ? params.value : 'N/A';
    },
  },
  {
    headerName: 'Primer Apellido',
    field: 'primer_apellido',
    minWidth: 150,
    renderCell: (params: any) => {
      return params.value ? params.value : 'N/A';
    },
  },
  {
    headerName: 'Segundo Apellido',
    field: 'segundo_apellido',
    minWidth: 150,
    renderCell: (params: any) => {
      return params.value ? params.value : 'N/A';
    },
  },
  {
    headerName: 'Nombre Completo',
    field: 'nombre_completo',
    minWidth: 300,
    renderCell: (params: any) => {
      return params.value ? params.value : 'N/A';
    },
  },
  {
    headerName: 'Razon Social',
    field: 'razon_social',
    minWidth: 300,
    renderCell: (params: any) => {
      return params.value ? params.value : 'N/A';
    },
  },
  {
    headerName: 'Nombre Comercial',
    field: 'nombre_comercial',
    minWidth: 300,
    renderCell: (params: any) => {
      return params.value ? params.value : 'N/A';
    },
  },
  {
    headerName: 'Digito Verificacion',
    field: 'digito_verificacion',
    minWidth: 150,
    renderCell: (params: any) => {
      return params.value ? params.value : 'N/A';
    },
  },
  {
    headerName: 'Naturaleza Empresa',
    field: 'cod_naturaleza_empresa',
    minWidth: 150,
    renderCell: (params: any) => {
      return params.value ? params.value : 'N/A';
    },
  },
  {
    headerName: '¿Tiene Usuario?',
    field: 'tiene_usuario',
    minWidth: 150,
    renderCell: (params: any) => {
      return params.value ? 'Si' : 'No';
    },
  },
  {
    headerName: 'Tipo Usuario',
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
