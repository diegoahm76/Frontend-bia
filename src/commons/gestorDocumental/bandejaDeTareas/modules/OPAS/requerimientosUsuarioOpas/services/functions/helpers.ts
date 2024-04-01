import Swal from 'sweetalert2';

/* eslint-disable @typescript-eslint/naming-convention */
export const API_PATHS = {
  //* persona que solicita el requerimiento al usuariom sobre la opa
  // gestor/bandeja-tareas/pqrsdf/persona/requerimiento/get/
  solicita: 'gestor/bandeja-tareas/pqrsdf/persona/requerimiento/get/',
  //* persona titular de la opa
  // gestor/bandeja-tareas/opa/persona/titular/get/36/
  titular: (id: number) => `gestor/bandeja-tareas/opa/persona/titular/get/${id}/`,
  //* detalle de la solicitud de opa
  // gestor/bandeja-tareas/opa/tramite/detalle/get/36/
  detalleSolicitud: (id: number) =>
    `gestor/bandeja-tareas/opa/tramite/detalle/get/${id}/`,
  //* histórico de solicitudes de requerimientos de opas
  // gestor/bandeja-tareas/opa/requerimiento/tramite/get/52/
  solicitudUsuario: (id: number) =>
    `gestor/bandeja-tareas/opa/requerimiento/tramite/get/${id}/`,
};

export const handleError = (navigate: any, route?: any) => {
  Swal.fire({
    icon: 'error',
    title: 'Error',
    allowOutsideClick: false,
    text: 'Error al obtener la información, por favor intente nuevamente.',
    confirmButtonText: 'Aceptar',
  }).then(() => {
    navigate(route);
  });
};
