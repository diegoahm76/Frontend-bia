/* eslint-disable @typescript-eslint/naming-convention */
import Swal from 'sweetalert2';

 export const confirmarAccion = async (accion: () => void, mensaje: string): Promise<void> => {
  const result = await Swal.fire({
    customClass: {
      confirmButton: 'square-btn',
      cancelButton: 'square-btn',
    },
    width: 350,
    text: mensaje,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#0EC32C',
    cancelButtonColor: '#DE1616',
    confirmButtonText: 'Sí, confirmar',
    cancelButtonText: 'Cancelar',
  });
  if (result.isConfirmed) {
    accion();
  }
};