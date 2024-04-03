/* eslint-disable @typescript-eslint/naming-convention */

import { formatDate } from "../../../../../../../../../TramitesServicios/utils/FormatoFecha";
/*
  {
            "tipo": "Respuesta Requerimiento",
            "radicado": "UNICO-2024-00135",
            "nombre_persona_responde": "SeguridadNombre  SeguridadApellido ",
            "fecha_respuesta": "2024-04-02T12:04:54.463046",
            "descripcion": "Requerimiento Opa",
            "fecha_radicado": "2024-04-02T12:04:54.463046",
        },
*/

export const columnsReqOpas = [
  {
    headerName: "Tipo",
    field: "tipo",
    width: 300,
  },
  {
    headerName: "Radicado",
    field: "radicado",
    width: 300,
    renderCell: (params: any) => params.value ? params.value : "N/A",
  },
  {
    headerName: "Nombre persona responde",
    field: "nombre_persona_responde",
    width: 400,
    renderCell: (params: any) => params.value ? params.value : "N/A",
  },
  {
    headerName: "Fecha respuesta",
    field: "fecha_respuesta",
    width: 300,
    renderCell: (params: any) => params.value ? formatDate(params.value) : "N/A",
  },
  {
    headerName: "Descripción",
    field: "descripcion",
    width: 450,
    renderCell: (params: any) => params.value ? params.value : "N/A",
  },
  {
    headerName: "Fecha radicado",
    field: "fecha_radicado",
    width: 300,
    renderCell: (params: any) => params.value ? formatDate(params.value) : "N/A",
  }
]