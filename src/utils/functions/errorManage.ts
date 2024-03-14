/* eslint-disable @typescript-eslint/naming-convention */
import Swal from 'sweetalert2';

export function handleApiError(error: any) {
  let errorMessage = 'Ha ocurrido un error';

  if (error.response) {
    if (error.response.status === 500) {
      errorMessage = 'Ha ocurrido un error y/o no se han encontrado datos relacionados';
    } else if (error.response.status === 404) {
      errorMessage = 'Recurso no encontrado, no hay datos disponibles';
    } else {
      errorMessage = `Error desconocido, código de estado: ${error.response.status}`;
    }
  } else if (!errorMessage && error.request) {
    errorMessage = 'No se recibió respuesta del servidor, por favor intente nuevamente';
  } else if (!errorMessage) {
    errorMessage = 'Error al configurar la solicitud, por favor intente nuevamente';
  }

  Swal.fire({
    icon: 'warning',
    title: 'Oops...',
    text: errorMessage,
    footer: 'Por favor intente nuevamente o contacte al administrador del sistema.',
  });
}