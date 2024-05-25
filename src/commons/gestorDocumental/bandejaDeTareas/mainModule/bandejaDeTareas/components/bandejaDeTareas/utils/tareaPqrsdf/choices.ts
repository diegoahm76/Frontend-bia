/* eslint-disable @typescript-eslint/naming-convention */
/* PQRSDF , trámites y servicios, otros */

// ? pendiente realizar el tipado, ya que probablemente cambie la info necesaria en base de datos
export const choicesTipoDeTarea = [
  { value: 'Rpqr', label: 'Responder PQRSDF', idTipoSolicitud: 1 },
  { value: 'Rtra', label: 'Responder Trámite', idTipoSolicitud: 2 },
  { value: 'ROtros', label: 'Responder Otro', idTipoSolicitud: 3 },
  { value: 'ROpas', label: 'Responder OPA', idTipoSolicitud: 4 },
  {value: 'Documentos', label: 'Documentos', idTipoSolicitud: 5, }
];
