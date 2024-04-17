/* eslint-disable @typescript-eslint/naming-convention */
import { formatDate } from "../../../../../../../../../../../utils/functions/formatDate"

export const columnsOtros = [
  {
    headerName: 'Tipo de solicitud',
    field: 'tipo_solicitud',
    width: 150,
  },
  {
    headerName: 'Nombre completo del titular',
    field: 'nombre_completo_titular',
    width: 320,
    renderCell: (params: any) => {
      return params.value || 'N/A'
    }
  },
  {
    headerName: 'Asunto',
    field: 'asunto',
    width: 320,
    renderCell: (params: any) => {
      return params.value || 'N/A'
    }
  },
  {
    headerName: 'Cantidad de anexos',
    field: 'cantidad_anexos',
    width: 180,
    renderCell: (params: any) => {
      return params.value || 'N/A'
    }
  },
  {
    headerName: 'Radicado',
    field: 'radicado',
    width: 200,
  },
  {
    headerName: 'Fecha de radicado',
    field: 'fecha_radicado',
    width: 175,
    renderCell: (params: any) => {
      return formatDate(params.value) || ''
    }
  },
  {
    headerName: 'Estado de la solicitud',
    field: 'estado_solicitud',
    width: 220,
    renderCell_: (params: any) => {
      return params.value || 'N/A'
    }
  },
  {
    headerName: 'Persona asignada',
    field: 'persona_asignada',
    width: 250,
    renderCell: (params: any) => {
      return params.value || 'N/A'
    }
  },
  {
    headerName: 'Persona que recibe',
    field: 'persona_recibe',
    width: 250,
    renderCell: (params: any) => {
      return params.value || 'N/A'
    }
  },
  {
    headerName: 'Número de folios totales',
    field: 'nro_folios_totales',
    width: 200,
  },
  {
    headerName: 'Unidad asignada',
    field: 'unidad_asignada',
    width: 350,
    renderCell: (params: any) => {
      return params.value || 'N/A'
    }
  },
  {
    headerName: 'Persona que interpone',
    field: 'persona_interpone',
    width: 380,
    renderCell: (params: any) => {
      return params.value || 'N/A'
    }
  },
  {
    headerName: 'Relación del titular',
    field: 'relacion_titular',
    width: 220,
    renderCell: (params: any) => {
      return params.value || 'N/A'
    }
  },
  {
    headerName: 'Fecha de registro',
    field: 'fecha_registro',
    width: 200,
    renderCell: (params: any) => {
      return formatDate(params.value) || 'N/A'
    }
  },
  {
    headerName: 'Fecha de envío definitivo de digitalización',
    field: 'fecha_envio_definitivo_digitalizacion',
    width: 300,
    renderCell: (params: any) => {
      return formatDate(params.value) || 'N/A'
    }
  },
  {
    headerName: 'Fecha de digitalización completada',
    field: 'fecha_digitalizacion_completada',
    width: 290,
    renderCell: (params: any) => {
      return formatDate(params.value) || 'N/A'
    }
  },
  {
    headerName: 'Fecha inicial del estado actual',
    field: 'fecha_inicial_estado_actual',
    width: 250,
    renderCell: (params: any) => {
      return formatDate(params.value) || 'N/A'
    }
  },
  {
    headerName: 'Nombre sucursal recepción física',
    field: 'nombre_sucursal_recepcion_fisica',
    width: 300,
    renderCell: (params: any) => {
      return params.value || 'N/A'
    }
  },
  {
    headerName: 'Descripción de la solicitud',
    field: 'descripcion',
    width: 450,
    renderCell: (params: any) => {
      return params.value || 'N/A'
    }
  },
  {
    headerName: "Medio de solicitud",
    field: "medio_solicitud",
    width: 300,
    renderCell: (params: any) => {
      return params.value || 'N/A'
    }
  },
  {
    headerName: "Forma de presentación",
    field: "forma_presentacion",
    width: 200,
    renderCell: (params: any) => {
      return params.value || 'N/A'
    }
  }
]