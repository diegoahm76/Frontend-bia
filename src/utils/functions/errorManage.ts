/* eslint-disable @typescript-eslint/naming-convention */
import Swal from 'sweetalert2';

export function handleApiError(error: any) {
  const errorMessages: any = {
    500: 'Ha ocurrido un error y/o no se han encontrado datos relacionados',
    404: 'Recurso no encontrado, no hay datos disponibles',
  };

  const defaultErrorMessage = 'Ha ocurrido un error';
  let errorMessage: any = defaultErrorMessage;

  if (error.response) {
    errorMessage = errorMessages[error.response.status] || `Error desconocido, código de estado: ${error.response.status}`;
  } else if (error.request) {
    errorMessage = 'No se recibió respuesta del servidor, por favor intente nuevamente';
  } else {
    errorMessage = 'Error al configurar la solicitud, por favor intente nuevamente';
  }

  Swal.fire({
    icon: 'warning',
    title: 'Oops...',
    text: errorMessage,
    footer: 'Por favor intente nuevamente o contacte al administrador del sistema.',
  });
}