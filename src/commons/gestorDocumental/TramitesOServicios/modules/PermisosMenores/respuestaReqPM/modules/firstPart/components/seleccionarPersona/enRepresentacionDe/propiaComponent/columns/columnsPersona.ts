/* eslint-disable @typescript-eslint/naming-convention */
/*
genera las columns con headerName, field, minWidth usando estos datos y un render cell que maneje en caso de que venga null el value (omite todos los id en las columnas)

{
    "tipo_persona_desc": "Natural",
    "tipo_documento": "TI",
    "numero_documento": "13123",
    "primer_nombre": "MIGUEL",
    "segundo_nombre": "MIGUEL",
    "primer_apellido": "MURCIA",
    "segundo_apellido": "OCAMPO",
    "nombre_completo": "MIGUEL MIGUEL MURCIA OCAMPO",
    "razon_social": null,
    "nombre_comercial": "CORPO",
    "digito_verificacion": null,
    "cod_naturaleza_empresa": null,
    "tiene_usuario": true,
    "tipo_usuario": "Externo"
}
*/

export const columnsPersona = [
  {
    headerName: 'Tipo de persona',
    field: 'tipo_persona_desc',
    minWidth: 150,
    renderCell: (params: any) => {
      return params.value ? params.value : 'N/A';
    }
  },
  {
    headerName: 'Tipo de documento',
    field: 'tipo_documento',
    minWidth: 150,
    renderCell: (params: any) => {
      return params.value ? params.value : 'N/A';
    }
  },
  {
    headerName: 'Número de documento',
    field: 'numero_documento',
    minWidth: 250,
    renderCell: (params: any) => {
      return params.value ? params.value : 'N/A';
    }
  },
  {
    headerName: 'Nombre completo',
    field: 'nombre_completo',
    minWidth: 400,
    renderCell: (params: any) => {
      return params.value ? params.value : 'N/A';
    }
  },
  {
    headerName: 'Razón social',
    field: 'razon_social',
    minWidth: 400,
    renderCell: (params: any) => {
      return params.value ? params.value : 'N/A';
    }
  },
  {
    headerName: 'Nombre comercial',
    field: 'nombre_comercial',
    minWidth: 400,
    renderCell: (params: any) => {
      return params.value ? params.value : 'N/A';
    }
  },
  {
    headerName: "Dígito de verificación",
    field: "digito_verificacion",
    minWidth: 200,
    renderCell: (params: any) => {
      return params.value ? params.value : 'N/A';
    }
  },
  {
    headerName: "Código de naturaleza de la empresa",
    field: "cod_naturaleza_empresa",
    minWidth: 250,
    renderCell: (params: any) => {
      return params.value ? params.value : 'N/A';
    }
  },
  {
    headerName: "Tiene usuario",
    field: "tiene_usuario",
    minWidth: 150,
    renderCell: (params: any) => {
      return params.value ? 'SI' : 'NO';
    }
  },
  {
    headerName: 'Tipo de usuario',
    field: 'tipo_usuario',
    minWidth: 150,
    renderCell: (params: any) => {
      return params.value ? params.value : 'N/A';
    }
  },
]