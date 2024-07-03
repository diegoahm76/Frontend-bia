/* eslint-disable @typescript-eslint/naming-convention */
/*
{
    "tipo_solicitud": "OPA",
    "nombre_proyecto": "Opción 2",
    "nombre_opa": "Aprovechamiento forestal de árboles en riesgo",
    "nombre_completo_titular": "SeguridadNombre  SeguridadApellido ",
    "costo_proyecto": 0,
    "pagado": false,
    "cantidad_predios": null,
    "cantidad_anexos": 0,
    "radicado": "UNICO-2023-00256",
    "fecha_radicado": "2023-12-22T16:34:14.674486",
    "sede": null,
    "requiere_digitalizacion": true,
    "estado_actual": "EN VENTANILLA CON PENDIENTES",
    "estado_asignacion_grupo": null,
    "persona_asignada": null,
    "unidad_asignada": null,
}
*/

export const columnsOpas = [
  {
    headerName: "Tipo de solicitud",
    field: "tipo_solicitud",
    width: 300,
  },
  {
    headerName: "Nombre del proyecto",
    field: "nombre_proyecto",
    width: 300,
  },
  {
    headerName: "Nombre de la OPA",
    field: "nombre_opa",
    width: 450,
  },
  {
    headerName: "Nombre del titular",
    field: "nombre_completo_titular",
    width: 450,
  },
  {
    headerName: "Costo del proyecto",
    field: "costo_proyecto",
    width: 250,
  },
  {
    headerName: "Pagado",
    field: "pagado",
    width: 220,
    renderCell: (params: any) => {
      return params.value ? "Sí" : "No";
    }
  },
  {
    headerName: "Cantidad de predios",
    field: "cantidad_predios",
    width: 350,
    renderCell: (params: any) => {
      return params.value ? params.value : "0";
    }
  },
  {
    headerName: "Cantidad de anexos",
    field: "cantidad_anexos",
    width: 320,
    renderCell: (params: any) => {
      return params.value ? params.value : "N/A";
    }
  },
  {
    headerName: "Radicado",
    field: "radicado",
    width: 320,
    renderCell: (params: any) => {
      return params.value ? params.value : "Sin radicar";
    }
  },
  {
    headerName: "Fecha de radicado",
    field: "fecha_radicado",
    width: 320,
    renderCell: (params: any) => {
      return params.value ? new Date(params.value).toLocaleDateString() : "N/A";
    }
  },
  {
    headerName: "Sede",
    field: "sede",
    width: 350,
    renderCell: (params: any) => {
      return params.value ? params.value : "Sin sede";
    }
  },
  {
    headerName: "Requiere digitalización",
    field: "requiere_digitalizacion",
    width: 280,
    renderCell: (params: any) => {
      return params.value ? "Sí" : "No";
    }
  },
  {
    headerName: "Estado actual",
    field: "estado_actual",
    width: 320,
    renderCell: (params: any) => {
      return params.value ? params.value : "Sin estado";
    }
  },
  {
    headerName: "Estado de asignación de grupo",
    field: "estado_asignacion_grupo",
    width: 350,
    renderCell: (params: any) => {
      return params.value ? params.value : "Sin asignar";
    }
  },
  {
    headerName: "Persona asignada",
    field: "persona_asignada",
    width: 400,
    renderCell: (params: any) => {
      return params.value ? params.value : "Sin asignar";
    }
  },
  {
    headerName: "Unidad asignada",
    field: "unidad_asignada",
    width: 320,
    renderCell: (params: any) => {
      return params.value ? params.value : "Sin asignar";
    }
  }
]
/*

  {
            "tipo_tramite": "Requerimiento a una solicitud",
            "fecha_radicado": null,
            "numero_radicado": "SIN RADICAR",
            "estado": null
        }
        
        */
export const columnsRequerimientosPendientes = [
  {
    headerName: "Tipo de trámite",
    field: "tipo_tramite",
    width: 300,
  },
  {
    headerName: "Fecha de radicado",
    field: "fecha_radicado",
    width: 300,
    renderCell: (params: any) => {
      return params.value ? new Date(params.value).toLocaleDateString() : "N/A";
    }
  },
  {
    headerName: "Número de radicado",
    field: "numero_radicado",
    width: 450,
    renderCell: (params: any) => {
      return params.value ? params.value : "Sin radicar";
    }
  },
  {
    headerName: "Estado",
    field: "estado",
    width: 450,
    renderCell: (params: any) => {
      return params.value ? params.value : "Sin estado";
    }
  }
]