/* eslint-disable @typescript-eslint/naming-convention */

import { formatDate } from '../../../../utils/functions/formatDate';

/*{

}
*/
export const columnsConsultaOpas = [
  {
    headerName: 'Tipo Solicitud',
    field: 'Tipo Solicitud',
    minWidth: 200,
  },
  {
    headerName: 'Dirección',
    field: 'descripcion_direccion',
    minWidth: 220,
  },
  {
    headerName: 'Coordenada X',
    field: 'coordenada_x',
    minWidth: 150,
  },
  {
    headerName: "Estado de la solicitud",
    field: "Location_info",
    minWidth: 250,
    renderCell: (params: any) =>
      params.value ? params.value : 'N/A',
  },
  {
    headerName: 'Coordenada Y',
    field: 'coordenada_y',
    minWidth: 150,
  },
  {
    headerName: 'Municipio',
    field: 'cod_municipio',
    minWidth: 150,
  },
  {
    headerName: 'Titular',
    field: 'Persona_titular',
    minWidth: 450,
  },
  {
    headerName: 'Radicado',
    field: 'Radicado',
    minWidth: 200,
  },
  {
    headerName: 'Fecha de Radicado',
    field: 'Fecha_Radicado',
    minWidth: 200,
    renderCell: (params: any) =>
      params.value ? formatDate(params.value) : 'N/A',
  },
  {
    headerName: 'Persona que radica',
    field: 'Persona_radica_nombre',
    minWidth: 500,
    renderCell: (params: any) =>
      params.value ? params.value : 'N/A',
  },
  {
    headerName: 'Tiempo de respuesta',
    field: 'Tiempo de respuesta',
    minWidth: 250,
    renderCell: (params: any) =>
      params.value ? formatDate(params.value) : 'N/A',
  },
];
