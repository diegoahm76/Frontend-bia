/* eslint-disable @typescript-eslint/naming-convention */
export const accordionData = Array.from({ length: 12 }, (_, i) => ({
  nombre_pqr: `PQR ${i + 1} año: ${i + 1}`,
  id_radicado: `panel${i + 1}`,
  titular: `General settings ${i + 1}`,
  estado_actual_radicado: 'Active',
  cantidad_anexos: 5,
  asunto: `Asunto ${i + 1}`,
  solicitud: [
    {
      id_solicitud: `id_solicitud ${i + 1}`,
      accion_solicitud: `accion_solicitud ${i + 1}`,
      fecha_respuesta_solicitud: `fecha_respuesta_solicitud ${i + 1}`,
      estado_digitalizacion: `estado_digitalizacion ${i + 1}`,
      observacion: `observacion ${i + 1}`,
    },
  ],

  info_solicitud: [
    {
      // id: `id ${i + 1}`,
      accion: `accion ${i + 1}`,
      fecha_solicitud: `fecha_solicitud ${i + 1}`,
    },
  ],
}));

export const infoSolicitudColumns = [
  {
    headerName: 'Acción',
    field: 'accion',
    minWidth: 350,
  },
  {
    headerName: 'Fecha de  la solicitud',
    field: 'fecha_solicitud',
    minWidth: 350,
  },
];

export const consultaColumns = [
  {
    headerName: 'Acción',
    field: 'accion_solicitud',
    minWidth: 210,
  },
  {
    headerName: 'Fecha de la solicitud',
    field: 'fecha_respuesta_solicitud',
    minWidth: 260,
  },
  {
    headerName: 'Estado de la digitalización',
    field: 'estado_digitalizacion',
    minWidth: 255,
  },
  {
    headerName: 'Observación',
    field: 'observacion',
    minWidth: 360,
  },
];

export const stylesTypography = {
  marginTop: '0.5rem',
  marginBottom: '1rem',
};
