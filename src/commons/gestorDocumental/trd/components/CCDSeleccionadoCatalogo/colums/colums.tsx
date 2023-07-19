import { type GridColDef } from '@mui/x-data-grid';

export const columns: GridColDef[] = [
 /* {
    headerName: 'ID Un. Org',
    field: 'id_unidad_organizacional',
    minWidth: 90,
    maxWidth: 100
  }, */
  {
    headerName: 'Unidad Organizacional',
    field: 'nombreUnidad',
    minWidth: 210,
    maxWidth: 220
  },
  {
    headerName: 'Cód. Serie',
    field: 'codigo_serie',
    minWidth: 95,
    maxWidth: 100
  },
  {
    headerName: 'Serie',
    field: 'nombre_serie',
    minWidth: 150,
    maxWidth: 200
  },
  {
    headerName: 'Cód. Subserie',
    field: 'codigo_subserie',
    minWidth: 95,
    maxWidth: 100
  },
  {
    headerName: 'Subserie',
    field: 'nombre_subserie',
    minWidth: 150,
    maxWidth: 200
  },
];