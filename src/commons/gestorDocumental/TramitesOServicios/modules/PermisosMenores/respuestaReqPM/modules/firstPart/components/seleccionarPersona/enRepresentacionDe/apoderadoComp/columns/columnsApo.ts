/* eslint-disable @typescript-eslint/naming-convention */
/*
{

    "nombre_comercial": "AlejoCorp",
    "digito_verificacion": null,
    "cod_naturaleza_empresa": null,
    "tiene_usuario": true,
    "tipo_usuario": "Interno",
}
*/

export const columnsApoderado = [
  {
    headerName: "Tipo de persona",
    field: "tipo_persona_desc",
    width: 250,
  },
  {
    headerName: "Tipo de documento",
    field: "tipo_documento",
    width: 200,
  },
  {
    headerName: "Número de documento",
    field: "numero_documento",
    width: 200,
  },
  {
    headerName: "Nombre completo",
    field: "nombre_completo",
    width: 400,
    renderCell: (params: any) => {
      return params.value || 'N/A';
    }
  },
  {
    headerName: "Razón social",
    field: "razon_social",
    width: 400,
    renderCell: (params: any) => {
      return params.value || 'N/A';
    }
  },
  {
    headerName: "Nombre comercial",
    field: "nombre_comercial",
    width: 400,
    renderCell: (params: any) => {
      return params.value || 'N/A';
    }
  },
  {
    headerName: "Digito de verificación",
    field: "digito_verificacion",
    width: 320,
    renderCell: (params: any) => {
      return params.value || 'N/A';
    }
  },
  {
    headerName: "Código de naturaleza de la empresa",
    field: "cod_naturaleza_empresa",
    width: 300,
    renderCell: (params: any) => {
      return params.value || 'N/A';
    }
  },
  {
    headerName: "Tiene usuario",
    field: "tiene_usuario",
    width: 250,
    renderCell: (params: any) => {
      return params.value ? 'Sí' : 'No';
    }
  },
  {
    headerName: "Tipo de usuario",
    field: "tipo_usuario",
    width: 180,
    renderCell: (params: any) => {
      return params.value || 'N/A';
    }
  },
]