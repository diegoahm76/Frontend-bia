/* eslint-disable @typescript-eslint/naming-convention */
import { GridCellParams } from '@mui/x-data-grid';

export const columnsPart2 = [
  {
    headerName: 'Cód. Unidad',
    field: 'cod_unidad_actual',
    sortable: true,
    filter: true,
    width: 150,
  },
  {
    headerName: 'Nombre Unidad',
    field: 'nom_unidad_actual',
    sortable: true,
    filter: true,
    width: 300,
  },
  {
    headerName: 'Sección responsable del CCD nuevo',
    field: 'nom_unidad_nueva',
    sortable: true,
    filter: true,
    width: 300,
    renderCell: (params: GridCellParams) => {
      const codUnidadNueva = params.row.cod_unidad_nueva;
      const nomUnidadNueva = params.row.nom_unidad_nueva;
      return `${codUnidadNueva} - ${nomUnidadNueva}`;
    },
  },
];