import Swal from 'sweetalert2';

/* eslint-disable @typescript-eslint/naming-convention */
export const API_PATHS = {
  //* persona que solicita el requerimiento al usuario
  solicita: 'gestor/bandeja-tareas/pqrsdf/persona/requerimiento/get/',
  //* persona titular de la pqrsdf
  titular: (id: number) => `gestor/bandeja-tareas/opa/persona/titular/get/${id}/`,
  //* información de la opa
  detalleSolicitud: (id: number) =>
    `gestor/bandeja-tareas/opa/tramite/detalle/get/${id}/`,
    //* Historico de solicitudes de las respuestas de opa
  solicitudUsuario: (id: number) =>
    `gestor/bandeja-tareas/opa/respuesta/get/${id}/`,
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
