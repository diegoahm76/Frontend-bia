/*
{
    "succes": true,
    "detail": "Se encontraron los siguientes registros",
    "data": [
        {
            "id_tarea_asignada": 2,
            "tipo_tarea": "Responder Documentos",
            "asignado_por": "SeguridadNombre  SeguridadApellido ",
            "asignado_para": "SeguridadNombre  SeguridadApellido ",
            "consecutivo": "NUEVO3.110.1.1.2024.000186",
            "fecha_consecutivo": "2024-05-17T08:28:39.298609",
            "radicado": "Salida-2024-0003",
            "fecha_radicado": "2024-05-17T08:28:39.255955",
            "fecha_asignacion": "2024-05-17T10:33:25.674261",
            "comentario_asignacion": null,
            "estado_tarea": "En proceso de respuesta",
            "estado_asignacion_tarea": null,
            "unidad_org_destino": null,
            "estado_reasignacion_tarea": null,
            "documento": {
                "id_consecutivo_tipologia": 71,
                "archivos_digitales": {
                    "id_archivo_digital": 89,
                    "nombre_de_Guardado": "3ea3cd5010c25e836662",
                    "formato": "docx",
                    "tamagno_kb": 90,
                    "ruta_archivo": "/media/home/BIA/Otros/Documentos/3ea3cd5010c25e836662.docx",
                    "fecha_creacion_doc": "2024-05-17T08:28:39.762959",
                    "es_Doc_elec_archivo": true
                },
                "agno_consecutivo": 2024,
                "nro_consecutivo": "000186",
                "prefijo_consecutivo": "NUEVO3",
                "fecha_consecutivo": "2024-05-17T08:28:39.298609",
                "fecha_radicado_interno": null,
                "fecha_radicado_salida": "2024-05-17T08:28:39.255955",
                "id_unidad_organizacional": 5126,
                "id_tipologia_doc": 1,
                "CatalogosSeriesUnidad": 6,
                "id_persona_genera": 215,
                "id_radicado_interno": null,
                "id_radicado_salida": 17,
                "id_archivo_digital": 89,
                "id_PQRSDF": null,
                "id_tramite": null
            },
            "tarea_reasignada_a": null,
            "id_tarea_asignada_padre_inmediata": null
        }
    ]
}
*/

import { formatDate } from "../../../../../../../../../TramitesServicios/utils/FormatoFecha";

/*
{
    "id_tarea_asignada": 189,
    "tipo_tarea": "Responder Documentos",
    "asignado_por": "SeguridadNombre  SeguridadApellido ",
    "asignado_para": "SeguridadNombre  SeguridadApellido ",
    "consecutivo": "CT.102.2024.0000000007",
    "fecha_consecutivo": "2024-05-17T17:38:42.366292",
    "radicado": "INTERNO-2024-0000023",
    "fecha_radicado": "2024-05-17T17:38:42.359465",
    "fecha_asignacion": "2024-05-17T20:00:23.707973",
    "comentario_asignacion": null,
    "estado_tarea": "En proceso de respuesta",
    "estado_asignacion_tarea": null,
    "unidad_org_destino": null,
    "estado_reasignacion_tarea": null,
    "documento": {
        "id_consecutivo_tipologia": 71,
        "archivos_digitales": {
            "id_archivo_digital": 2148,
            "nombre_de_Guardado": "699ab3bbf4826176d9e5",
            "formato": "docx",
            "tamagno_kb": 90,
            "ruta_archivo": "/media/home/BIA/Otros/Documentos/699ab3bbf4826176d9e5.docx",
            "fecha_creacion_doc": "2024-05-17T17:38:42.457538",
            "es_Doc_elec_archivo": true
        },
        "agno_consecutivo": 2024,
        "nro_consecutivo": "0000000007",
        "prefijo_consecutivo": "CT",
        "fecha_consecutivo": "2024-05-17T17:38:42.366292",
        "fecha_radicado_interno": null,
        "fecha_radicado_salida": "2024-05-17T17:38:42.359465",
        "id_unidad_organizacional": 5382,
        "id_tipologia_doc": 45,
        "CatalogosSeriesUnidad": null,
        "id_persona_genera": 215,
        "id_radicado_interno": null,
        "id_radicado_salida": 828,
        "id_archivo_digital": 2148,
        "id_PQRSDF": null,
        "id_tramite": null
    },
    "tarea_reasignada_a": null,
    "id_tarea_asignada_padre_inmediata": null
}
*/
// eslint-disable-next-line @typescript-eslint/naming-convention
export const columnsDocumentos = [
  {
    headerName: "Tipo de Tarea",
    field: "tipo_tarea",
    width: 250,
    renderCell: (params: any) => params?.row?.tipo_tarea ? params.row.tipo_tarea : 'N/A',
  },
  {
    headerName: "Asignado Por",
    field: "asignado_por",
    width: 250,
    renderCell: (params: any) => params?.row?.asignado_por ? params.row.asignado_por : 'N/A',
  },
  {
    headerName: "Asignado Para",
    field: "asignado_para",
    width: 250,
    renderCell: (params: any) => params?.row?.asignado_para ? params.row.asignado_para : 'N/A',
  },
  {
    headerName: "Consecutivo",
    field: "consecutivo",
    width: 250,
    renderCell: (params: any) => params?.row?.consecutivo ? params.row.consecutivo : 'N/A',
  },
  {
    headerName: "Fecha del Consecutivo",
    field: "fecha_consecutivo",
    width: 250,
    renderCell: (params: any) => params?.row?.fecha_consecutivo ? formatDate(params.row.fecha_consecutivo) : 'N/A',
  },
  {
    headerName: "Radicado",
    field: "radicado",
    width: 250,
    renderCell: (params: any) => params?.row?.radicado ? params.row.radicado : 'N/A',
  },
  {
    headerName: "Fecha de radicado",
    field: "fecha_radicado",
    width: 250,
    renderCell: (params: any) => params?.row?.fecha_radicado ? formatDate(params.row.fecha_radicado) : 'N/A',
  },
  {
    headerName: "Fecha de Asignación",
    field: "fecha_asignacion",
    width: 250,
    renderCell: (params: any) => params?.row?.fecha_asignacion ? formatDate(params.row.fecha_asignacion) : 'N/A',
  },
  {
    headerName: "Estado de la Tarea",
    field: "estado_tarea",
    width: 250,
    renderCell: (params: any) => params?.row?.estado_tarea ? params.row.estado_tarea : 'N/A',
  },
];