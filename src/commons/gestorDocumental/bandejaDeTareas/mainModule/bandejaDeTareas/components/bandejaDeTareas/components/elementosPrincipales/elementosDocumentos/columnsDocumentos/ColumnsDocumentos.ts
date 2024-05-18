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
    fieldName: "Tipo de Tarea",
    field: "tipo_tarea",
    width: 250,
    renderCell: (params: any) => params?.value ? params?.value : 'N/A',
  },
  {
    fieldName: "Asignado Por",
    field: "asignado_por",
    width: 250,
    renderCell: (params: any) => params?.value ? params?.value : 'N/A',
  },
  {
    fieldName: "Asignado Para",
    field: "asignado_para",
    width: 250,
    renderCell: (params: any) => params?.value ? params?.value : 'N/A',
  },
  {
    fieldName: "Consecutivo",
    field: "consecutivo",
    width: 250,
    renderCell: (params: any) => params?.value ? params?.value : 'N/A',
  },
  {
    fieldName: "Fecha del Consecutivo",
    field: "fecha_consecutivo",
    width: 250,
    renderCell: (params: any) => params?.value ? formatDate(params?.value) : 'N/A',
  },
  {
    fieldName: "Radicado",
    field: "radicado",
    width: 250,
    renderCell: (params: any) => params?.value ? params?.value : 'N/A',
  },
  {
    fieldName: "fecha_radicado",
    field: "Fecha de radicado",
    width: 250,
    renderCell: (params: any) => params?.value ? formatDate(params?.value) : 'N/A',
  },
  {
    fieldName: "fecha_asignacion",
    field: "Fecha de Asignación",
    width: 250,
    renderCell: (params: any) => params?.value ? formatDate(params?.value) : 'N/A',
  },
  {
    fieldName: "estado_tarea",
    field: "Estado de la Tarea",
    width: 250,
    renderCell: (params: any) => params?.value ? params?.value : 'N/A',
  },
];