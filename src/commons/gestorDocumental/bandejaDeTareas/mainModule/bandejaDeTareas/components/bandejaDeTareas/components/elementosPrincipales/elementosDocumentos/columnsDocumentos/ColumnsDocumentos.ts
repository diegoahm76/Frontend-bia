/*
{
   "consecutivo": "nuevo.1.2.4.2024.003",
   "fecha_consecutivo": "12/12/2024",
   "persona_genera": "brayan barragan",
   "radicado salida o interno": "salida-2024-009",
   "fecha_radicado salida o interno":  "12/12/2024"
}
*/

import { formatDate } from "../../../../../../../../../TramitesServicios/utils/FormatoFecha";

// eslint-disable-next-line @typescript-eslint/naming-convention
export const columnsDocumentos = [
  {
    fieldName: "Consecutivo",
    field: "consecutivo",
    width: 250,
    renderCell: (params: any) => params?.value ? params?.value : 'N/A',
  },
  {
    fieldName: "Fecha del consecutivo",
    field: "fecha_consecutivo",
    width: 250,
    //renderCell: (params: any) => params?.value ? formatDate(params?.value) : 'N/A',

  },
  {
    fieldName: "Persona que genera",
    field: "persona_genera",
    width: 250,
    renderCell: (params: any) => params?.value ? params?.value : 'N/A',
  },
  {
    fieldName: "Radicado de salida o interno",
    field: "radicado salida o interno",
    width: 250,
    renderCell: (params: any) => params?.value ? params?.value : 'N/A',
  },
  {
    fieldName: "Fecha de radicado de salida o interno",
    field: "fecha_radicado salida o interno",
    width: 250,
    //renderCell: (params: any) => params?.value ? formatDate(params?.value) : 'N/A',
  },
]