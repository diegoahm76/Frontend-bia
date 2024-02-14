/* eslint-disable @typescript-eslint/naming-convention */

/*
{
    "Asunto": "nueva28.1",
    "Radicado": "N/A",
    "Fecha de Radicado": null,
    "Persona Que Radicó": "N/A",
    "Estado": "GUARDADO",
    "Ubicacion en la corporacion": null
}
*/

export const columnsOtros = [
  {
    headerName: 'Tipo de solicitud',
    field: 'Tipo de Solicitud',
    minWidth: 150,
    renderCell: (params: any) => params.value || 'N/A',
  },
  {
    headerName: 'Titular',
    field: 'Titular',
    minWidth: 450,
    renderCell: (params: any) => params.value || 'N/A',
  },
  {
    headerName: 'Asunto',
    field: 'Asunto',
    minWidth: 450,
    renderCell: (params: any) => params.value || 'N/A',
  },
  {
    headerName: 'Radicado',
    field: 'Radicado',
    minWidth: 220,
    renderCell: (params: any) => params.value || 'N/A',
  },
  {
    headerName: 'Fecha de radicado',
    field: 'Fecha de Radicado',
    minWidth: 150,
    renderCell: (params: any) => {
      return params.value ? new Date(params.value).toLocaleDateString() : 'N/A';
    },
  },
  {
    headerName: 'Persona que radicó',
    field: 'Persona Que Radicó',
    minWidth: 550,
    renderCell: (params: any) => params.value || 'N/A',
  },
  {
    headerName: 'Estado',
    field: 'Estado',
    minWidth: 350,
    renderCell: (params: any) => params.value || 'N/A',
  },
  {
    headerName: 'Ubicación en la corporación',
    field: 'Ubicacion en la corporacion',
    minWidth: 250,
    renderCell: (params: any) => params.value || 'N/A',
  },
];