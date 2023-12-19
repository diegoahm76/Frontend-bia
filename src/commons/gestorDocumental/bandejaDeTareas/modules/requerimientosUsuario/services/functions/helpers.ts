import Swal from 'sweetalert2';

/* eslint-disable @typescript-eslint/naming-convention */
export const API_PATHS = {
  solicita: 'gestor/panel_ventanilla/pqrsdf/solicita/get/',
  titular: (id: number) => `gestor/panel_ventanilla/pqrsdf/titular/get/${id}/`,
  detalleSolicitud: (id: number) =>
    `gestor/panel_ventanilla/pqrsdf/detalle-solicitud/get/${id}/`,
  solicitudUsuario: (id: number) =>
    `gestor/panel_ventanilla/pqrsdf/solicitud-usuario/get/${id}/`,
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
