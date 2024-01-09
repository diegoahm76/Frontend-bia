/* eslint-disable @typescript-eslint/naming-convention */
import { type GridValueGetterParams } from "@mui/x-data-grid";
import { formatDate } from "../../../../../../../../../../../utils/functions/formatDate";

export const columnsStatic = [
  {
    headerName: "Tipo de complemento",
    field: "tipo",
    minWidth: 250,
  },
  {
    headerName: "Titular",
    field: "titular",
    minWidth: 230,
  },
  {
    headerName: "Asunto",
    field: "asunto",
    minWidth: 200,
  },
  {
    headerName: "Cantidad de anexos",
    field: "cantidad_anexos",
    minWidth: 200,
  },
  {
    headerName: "Radicado",
    field: "radicado",
    minWidth: 200,
  },
  {
    headerName: "Fecha de radicado",
    field: "fecha_radicado",
    minWidth: 200,
    renderCell: (params: GridValueGetterParams) => params.value ? formatDate(params.value) : 'N/A'
  },
  {
    headerName: "Fecha de adición",
    field: "fecha_de_adicion",
    minWidth: 200,
    renderCell: (params: GridValueGetterParams) => params.value ? formatDate(params.value) : 'N/A'
  },
]
