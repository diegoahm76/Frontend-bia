/* eslint-disable @typescript-eslint/naming-convention */
import Swal, { SweetAlertResult } from "sweetalert2";

/**
 * Muestra una alerta al usuario.
 *
 * @param title - El título de la alerta.
 * @param text - El texto de la alerta.
 * @param icon - El icono de la alerta.
 * @param showConfirmButton - Si se debe mostrar el botón de confirmación. Por defecto es true.
 */
export const showAlert = (
  title: string,
  text: string,
  icon: 'success' | 'info' | 'error' | 'warning',
  showConfirmButton: boolean = true
): Promise<SweetAlertResult<any>> => {
  try {
    return Swal.fire({
      title,
      text,
      icon,
      confirmButtonText: showConfirmButton ? 'Entendido' : undefined,
      timer: showConfirmButton ? undefined : 2500,
    });
  } catch (error) {
    console.error('Error al mostrar la alerta:', error);
    return Promise.reject(error);
  }
};