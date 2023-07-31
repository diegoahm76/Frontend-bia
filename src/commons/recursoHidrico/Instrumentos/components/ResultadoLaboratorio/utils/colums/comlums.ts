import { type GridColDef } from "@mui/x-data-grid";

export const columns_result_lab: GridColDef[] = [
  {
    field: 'parametro',
    headerName: 'PARAMETRO',
    width: 200,
    valueGetter: (params) => {
      if (params.row.parametro === 'FQ') {
        return 'Fisicoquímico';
      } else if (params.row.parametro === 'MB') {
        return 'Microbiológico';
      } else {
        return params.row.parametro;
      }
    },
  },

  { field: 'unidad', headerName: 'UNIDAD', width: 200 },
  { field: 'metodo', headerName: 'METODO DE ANÁLISIS', width: 200 },
  { field: 'fecha_analisis', headerName: 'FECHA ANÁLISIS', width: 200 },
  { field: 'resultado', headerName: 'Resultado', width: 200 },
]