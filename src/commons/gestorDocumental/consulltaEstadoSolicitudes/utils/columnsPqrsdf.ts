/* eslint-disable @typescript-eslint/naming-convention */
import { GridValueFormatterParams } from '@mui/x-data-grid';
import { formatDate } from '../../../../utils/functions/formatDate';

const COLUMS_PQRSDF = [
  {
    field: 'Tipo de Solicitud',
    headerName: 'Tipo de Solicitud',
    minWidth: 180,
  },
  {
    field: 'tipo_pqrsdf_descripcion',
    headerName: 'Tipo de PQRSDF',
    minWidth: 250,
  },
  { field: 'Titular', headerName: 'Titular', minWidth: 350 },
  { field: 'Asunto', headerName: 'Asunto', minWidth: 400 },
  { field: 'Radicado', headerName: 'Radicado', minWidth: 250 },
  {
    field: 'Fecha de Radicado',
    headerName: 'Fecha de Radicado',
    minWidth: 250,
    renderCell: (params: GridValueFormatterParams) =>
      params.value ? formatDate(params.value) : '',
  },
  {
    field: 'Persona Que Radicó',
    headerName: 'Persona Que Radicó  ',
    minWidth: 350,
  },
  { field: 'Estado', headerName: 'Estado', minWidth: 300 },
  {
    field: 'Ubicacion en la corporacion',
    headerName: 'Ubicacion en la corporacion',
    minWidth: 300,
  },
];

export { COLUMS_PQRSDF };
