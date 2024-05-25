/* eslint-disable @typescript-eslint/naming-convention */
import { type GridValueGetterParams } from "@mui/x-data-grid";
import { formatDate } from "../../../../../../../../../../../utils/functions/formatDate";

const columnsStatic = [
  {
    headerName: "Tipo de complemento",
    field: "tipo",
    minWidth: 400,
    renderCell: (params: GridValueGetterParams) => params.value ? params.value : 'N/A'
  },
  {
    headerName: "Titular",
    field: "titular",
    minWidth: 400,
  },
  {
    headerName: "Asunto",
    field: "asunto",
    minWidth: 400,
    renderCell: (params: GridValueGetterParams) => params.value ? params.value : 'N/A'
  },
  {
    headerName: "Cantidad de anexos",
    field: "cantidad_anexos",
    minWidth: 200,
    renderCell: (params: GridValueGetterParams) => params.value ? params.value : 'N/A'
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

const newColumnsStatic = columnsStatic.filter(column => column.field !== 'titular');

const columnsTramites = [
  ...newColumnsStatic,
  {
    headerName: "Nombre del titular",
    field: "nombre_completo_titular",
    minWidth: 400,
  }
]

export {
  columnsStatic,
  columnsTramites
}