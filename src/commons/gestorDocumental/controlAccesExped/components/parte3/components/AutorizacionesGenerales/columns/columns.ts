/* eslint-disable @typescript-eslint/naming-convention */
import { type GridValueGetterParams } from "@mui/x-data-grid";

export const columnsControlAcceso = [
  {
    field: 'codigo_unidad_organizacional',
    headerName: 'Cód. unidad org',
    width: 130,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.codigo_unidad_organizacional || 'N/A'}`,
  },
  {
    field: 'nombre_unidad_organizacional',
    headerName: 'Unidad org',
    width: 150,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.nombre_unidad_organizacional || 'N/A'}`,
  },
  {
    field: 'nombre_serie',
    headerName: 'Serie',
    width: 130,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.nombre_serie || 'N/A'}`,
  },
  {
    field: 'codigo_serie',
    headerName: 'Cód. serie',
    width: 120,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.codigo_serie || 'N/A'}`,
  },
  {
    field: 'nombre_subserie',
    headerName: 'Subserie',
    width: 130,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.nombre_subserie || 'N/A'}`,
  },
  {
    field: 'codigo_subserie',
    headerName: 'Cód. Subserie',
    width: 120,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.codigo_subserie || 'N/A'}`,
  },
]