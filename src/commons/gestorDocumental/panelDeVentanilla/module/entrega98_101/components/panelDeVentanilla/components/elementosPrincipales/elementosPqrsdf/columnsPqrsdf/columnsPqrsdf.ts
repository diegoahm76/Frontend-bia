/* eslint-disable @typescript-eslint/naming-convention */
import { formatDate } from '../../../../../../../../../../../utils/functions/formatDate';

/*

        {
           // "id_PQRSDF": 10,
          "tipo_solicitud": "PQRSDF", ok
            "nombre_completo_titular": "SUPERUSUARIO 1er NOMBRE SUPERUSUARIO 1er APELL", ok
            "asunto": "SIN IDENTIFICAR", ok
            "cantidad_anexos": 0, ok
            "radicado": "XYZ789-2023-R67890", ok
            "fecha_radicado": "2023-11-07T12:00:00", ok
            "requiere_digitalizacion": true, ok
            "estado_solicitud": "GUARDADO", ok
            "estado_asignacion_grupo": "Pendiente", ok
            "nombre_sucursal": null, ok
            "numero_solicitudes_digitalizacion": 0,
            "numero_solicitudes_usuario": 0
        },

*/

export const columnsPqrsdf = [
  {
    headerName: 'Tipo de solicitud',
    field: 'tipo_solicitud',
    minWidth: 250,
  },
  {
    headerName: 'Nombre completo del titular',
    field: 'nombre_completo_titular',
    minWidth: 250,
  },
  {
    headerName: 'Asunto',
    field: 'asunto',
    minWidth: 250,
  },
  {
    headerName: 'Cantidad de anexos',
    field: 'cantidad_anexos',
    minWidth: 250,
  },
  {
    headerName: 'Radicado',
    field: 'radicado',
    minWidth: 250,
  },
  {
    headerName: 'Fecha de radicado',
    field: 'fecha_radicado',
    minWidth: 250,
    renderCell: (params: any) => {
      const validData = formatDate(params.value);
      return validData;
    },
  },
  {
    headerName: 'Requiere digitalización',
    field: 'requiere_digitalizacion',
    minWidth: 250,
    renderCell: (params: any) => {
      return params.value ? 'Si' : 'No';
    },
  },
  {
    headerName: 'Estado de solicitud',
    field: 'estado_solicitud',
    minWidth: 250,
  },
  {
    headerName: 'Estado de asignación de grupo',
    field: 'estado_asignacion_grupo',
    minWidth: 250,
  },
  {
    headerName: 'Nombre de sucursal',
    field: 'nombre_sucursal',
    minWidth: 250,
    renderCell: (params: any) => {
      return params.value ? params.value : 'N/A';
    },
  },
];
