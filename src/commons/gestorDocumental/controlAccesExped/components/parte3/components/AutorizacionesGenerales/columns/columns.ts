/* eslint-disable @typescript-eslint/naming-convention */
import { type GridValueGetterParams } from "@mui/x-data-grid";

export const columnsControlAcceso = [
  {
    field: 'codigo_unidad_organizacional',
    headerName: 'Cód. unidad organizacional',
    width: 190,
    headerAlign: 'center',
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.codigo_unidad_organizacional || 'N/A'}`,
  },
  {
    field: 'nombre_unidad_organizacional',
    headerName: 'Unidad organizacional',
    width: 170,
    headerAlign: 'center',
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.nombre_unidad_organizacional || 'N/A'}`,
  },
  {
    field: 'codigo_serie',
    headerName: 'Código serie',
    width: 120,
    headerAlign: 'center',
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.codigo_serie || 'N/A'}`,
  },
  {
    field: 'nombre_serie',
    headerName: 'Serie',
    width: 130,
    headerAlign: 'center',
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.nombre_serie || 'N/A'}`,
  },
  {
    field: 'codigo_subserie',
    headerName: 'Código subserie',
    width: 130,
    headerAlign: 'center',
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.codigo_subserie || 'N/A'}`,
  },
  {
    field: 'nombre_subserie',
    headerName: 'Subserie',
    width: 130,
    headerAlign: 'center',
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.nombre_subserie || 'N/A'}`,
  },
  {
    field: 'cod_clasificacion_exp',
    headerName: 'Cód. Clasificación expediente',
    width: 210,
    headerAlign: 'center',
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.cod_clasificacion_exp || 'N/A'}`,
  },
]