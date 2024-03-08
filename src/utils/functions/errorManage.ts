/* eslint-disable @typescript-eslint/naming-convention */
import Swal from 'sweetalert2';

export function handleApiError(error: any) {
  let errorMessage = 'Ha ocurrido un error';

  if (error.response) {
    if (error.response.status === 500) {
      errorMessage = 'Error del servidor, por favor intente nuevamente';
    } else if (error.response.status === 404) {
      errorMessage = 'Recurso no encontrado, por favor intente nuevamente';
    } else {
      errorMessage = `Error desconocido, código de estado: ${error.response.status}`;
    }
  } else if (error.request) {
    errorMessage = 'No se recibió respuesta del servidor, por favor intente nuevamente';
  } else {
    errorMessage = 'Error al configurar la solicitud, por favor intente nuevamente';
  }

  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: errorMessage,
    footer: 'Por favor intente nuevamente',
  });
}