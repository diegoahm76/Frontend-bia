/* eslint-disable @typescript-eslint/naming-convention */
import Swal from "sweetalert2";

export const showAlert = async (title: string, text: string, icon: 'success' | 'info' | 'error' | 'warning') => {
  return await Swal.fire({
    title,
    text,
    icon,
    confirmButtonText: `Entendido`,
  });
};