import Swal from 'sweetalert2';

/* eslint-disable @typescript-eslint/naming-convention */
export const API_PATHS = {
  //* persona que solicita el requerimiento al usuario
  solicita: 'gestor/bandeja-tareas/pqrsdf/persona/requerimiento/get/',
  //* persona titular de la pqrsdf
  titular: (id: number) => `gestor/bandeja-tareas/pqrsdf/titular/get/${id}/`,
  detalleSolicitud: (id: number) =>
    `gestor/panel_ventanilla/pqrsdf/detalle-solicitud/get/${id}/`,
  solicitudUsuario: (id: number) =>
    `gestor/bandeja-tareas/pqrsdf/requerimiento/get/${id}/`,
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
