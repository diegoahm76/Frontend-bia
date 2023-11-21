/* eslint-disable @typescript-eslint/naming-convention */
/* PQRSDF , trámites y servicios, otros */

// ? pendiente realizar el tipado, ya que probablemente cambie la info necesaria en base de datos
export const choicesTipoDeSolicitud = [
  { value: 'PQRSDF', label: 'PQRSDF', idTipoSolicitud: 1 },
  {
    value: 'Tramites y servicios',
    label: 'Tramites y servicios',
    idTipoSolicitud: 2,
  },
  { value: 'Otros', label: 'Otros', idTipoSolicitud: 3 },
];

/* radicado, ventanilla con pendientes, ventanilla sin pendientes */
export const choicesEstadoActual = [
  { value: 'Radicado', label: 'Radicado', idEstadoActual: 1 },
  {
    value: 'Ventanilla con pendientes',
    label: 'Ventanilla con pendientes',
    idEstadoActual: 2,
  },
  {
    value: 'Ventanilla sin pendientes',
    label: 'Ventanilla sin pendientes',
    idEstadoActual: 3,
  },
];
