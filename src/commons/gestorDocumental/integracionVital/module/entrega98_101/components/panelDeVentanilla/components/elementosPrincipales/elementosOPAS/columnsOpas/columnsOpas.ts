/* eslint-disable @typescript-eslint/naming-convention */

import { formatDate } from "../../../../../../../../../../../utils/functions/formatDate";

/*

 {
            "id_solicitud_tramite": 14,
            "id_persona_titular": 215,
            "nombre_completo_titular": "SeguridadNombre  SeguridadApellido ",
            "tipo_solicitud": "OPA",
            "asunto": "No APLICA",
            "cantidad_anexos": "NO APLICA",
            "radicado": "SIN RADICAR",
            "fecha_radicado": null,
            "nombre_sucursal": "NO APLICA",
            "requiere_digitalizacion": false,
            "id_estado_actual_solicitud": 1,
            "estado_actual_solicitud": "GUARDADO",
            "id_persona_interpone": 215,
            "nombre_persona_interpone": "SeguridadNombre  SeguridadApellido ",
            "cod_relacion_con_el_titular": "MP",
            "relacion_con_el_titular": "Misma persona",
            "cod_tipo_operacion_tramite": "N",
            "tipo_operacion_tramite": "Nuevo",
            "nombre_proyecto": "Opción 2",
            "costo_proyecto": 0.0,
            "fecha_ini_estado_actual": "2023-12-20T22:53:00.727360",
            "id_permiso_ambiental": 2,
            "cod_tipo_permiso_ambiental": "O",
            "tipo_permiso_ambiental": "Otros Procedimientos Administrativos Ambientales",
            "permiso_ambiental": "Opción 2",
            "descripcion_direccion": "444",
            "coordenada_x": "444",
            "coordenada_y": "444"
        },

*/

export const columnsOpas = [
  {
    headerName: 'Tipo de solicitud',
    field: 'tipo_solicitud',
    minWidth: 150,
  },
  {
    headerName: 'Nombre completo del titular',
    field: 'nombre_completo_titular',
    minWidth: 370,
    renderCell: (params: any) => {
      return params.value ? params.value : 'N/A';
    },
  },
  {
    headerName : "Nombre de la OPA",
    field: "nombre_opa",
    minWidth: 500,
    renderCell: (params: any) => {
      return params.value ? params.value : 'Opa desconocida';
    }
  },
  {
    headerName: 'Asunto',
    field: 'asunto',
    minWidth: 450,
    renderCell: (params: any) => {
      return params.value ? params.value : 'N/A';
    }
  },
  {
    headerName: 'Cantidad de anexos',
    field: 'cantidad_anexos',
    minWidth: 190,
  },
  {
    headerName: 'Radicado',
    field: 'radicado',
    minWidth: 190,
    renderCell: (params: any) => {
      return params.row.radicado ? params.row.radicado : 'N/A';
    },
  },
  {
    headerName: 'Fecha de radicado',
    field: 'fecha_radicado',
    minWidth: 220,
    renderCell: (params: any) => {
      return params.value ? formatDate(params.value) : 'N/A';
    },
  },
  {
    headerName: 'Estado de solicitud',
    field: 'estado_actual',
    minWidth: 400,
    renderCell: (params: any) => {
      return params.value ? params.value : 'N/A';
    },
  },
  {
    headerName: 'Tipo de permiso ambiental',
    field: 'tipo_permiso_ambiental',
    minWidth: 400,
    renderCell: (params: any) => {
      return params.value ? params.value : 'N/A';
    }
  },
  {
    headerName: 'Permiso ambiental',
    field: 'permiso_ambiental',
    minWidth: 300,
    renderCell: (params: any) => {
      return params.value ? params.value : 'N/A';
    }
  },
  {
    headerName: 'Nombre del proyecto',
    field: 'nombre_proyecto',
    minWidth: 500,
    renderCell: (params: any) => {
      return params.value ? params.value : 'N/A';
    }
  },
  {
    headerName: 'Coordenada X',
    field: 'coordenada_x',
    minWidth: 160,
    renderCell: (params: any) => {
      return params.value ? params.value : 'N/A';
    }
  },
  {
    headerName: 'Coordenada Y',
    field: 'coordenada_y',
    minWidth: 160,
    renderCell: (params: any) => {
      return params.value ? params.value : 'N/A';
    }
  },
  {
    headerName: 'Unidad asignada',
    field: 'unidad_asignada',
    minWidth: 160,
    renderCell: (params: any) => {
      return params.value ? params.value : 'N/A';
    }
  }
];

