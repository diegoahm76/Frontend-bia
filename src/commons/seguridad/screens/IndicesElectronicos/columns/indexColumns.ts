/* eslint-disable @typescript-eslint/naming-convention */
import { type GridColDef } from '@mui/x-data-grid';
import { formatDate } from '../../../../../utils/functions/formatDate';

export const indexColumns: GridColDef[] = [
  {
    field: 'codigo_exp_und_serie_subserie',
    headerName: 'CÓDIGO',
    sortable: true,
    width: 180,
    renderCell: (params) =>
      `${params.row.codigo_exp_und_serie_subserie ?? ''}.${params.row.codigo_exp_Agno ?? ''}.${params.row.codigo_exp_consec_por_agno ?? ''}`,
  },
  {
    field: 'nombre_trd_origen',
    headerName: 'TRD',
    sortable: true,
    width: 200,
  },
  {
    field: 'titulo_expediente',
    headerName: 'TITULO',
    width: 200,
  },
  {
    field: 'nombre_unidad_org',
    headerName: 'UNIDAD ORGANIZACIONAL',
    width: 250,
  },
  {
    field: 'nombre_serie_origen',
    headerName: 'SERIE',
    width: 200,
  },
  {
    field: 'nombre_subserie_origen',
    headerName: 'SUB SERIE',
    width: 200,
    renderCell: (params) =>
      params.row.nombre_subserie_origen
        ? params.row.nombre_subserie_origen
        : 'N/A',
  },
  {
    field: 'fecha_apertura_expediente',
    headerName: 'AÑO',
    width: 130,
    renderCell: (params) =>
      params.row.fecha_apertura_expediente
        ? params.row.fecha_apertura_expediente.split('-')[0]
        : '',
  },
];

/*{
  "fecha_indice_electronico": "2023-09-07T00:00:00",
  "abierto": false,
  "fecha_cierre": "2023-11-17T14:55:41.955491",
  "fecha_envio_cod_verificacion": "2023-11-17T14:50:36.069752",
  "email_envio_cod_verificacion": "ingpablolbarrera@gmail.com",
  "nro_cel_envio_cod_verificacion": "573104812324",
  "fecha_intro_cod_verificacion_ok": "2023-11-17T14:55:41.955491",
  "observacion_firme_cierre": "prueba de cierre de índices electrónicos",
}
*/
export const columnsDelIndiceExp: GridColDef[] = [
  {
    headerName: 'Fecha de índice electrónico',
    field: 'fecha_indice_electronico',
    width: 200,
    renderCell: (params) => (params.value ? formatDate(params.value) : 'N/A'),
  },
  {
    headerName: 'Abierto',
    field: 'abierto',
    width: 100,
    renderCell: (params) => (params.value ? 'Si' : 'No'),
  },
  {
    headerName: 'Fecha de cierre',
    field: 'fecha_cierre',
    width: 200,
    renderCell: (params) => (params.value ? formatDate(params.value) : 'N/A'),
  },
  {
    headerName: 'Fecha de envío de código de verificación',
    field: 'fecha_envio_cod_verificacion',
    width: 200,
    renderCell: (params) => (params.value ? formatDate(params.value) : 'N/A'),
  },
  {
    headerName: 'Email de envío de código de verificación',
    field: 'email_envio_cod_verificacion',
    width: 300,
    renderCell: (params) => (params?.value ? params?.value : 'N/A'),
  },
  {
    headerName: 'Número de celular de envío de código de verificación',
    field: 'nro_cel_envio_cod_verificacion',
    width: 350,
    renderCell: (params) => (params?.value ? params?.value : 'N/A'),
  },
  {
    headerName: 'Fecha de introducción de código de verificación',
    field: 'fecha_intro_cod_verificacion_ok',
    width: 350,
    renderCell: (params) => (params.value ? formatDate(params.value) : 'N/A'),
  },
  {
    headerName: 'Observación de cierre',
    field: 'observacion_firme_cierre',
    width: 300,
    renderCell: (params) => (params?.value ? params?.value : 'N/A'),
  },
];
