/* eslint-disable @typescript-eslint/naming-convention */
import Swal from "sweetalert2";

export const showAlert = (title: string, text: string, icon: 'success' | 'info' | 'error' | 'warning') => {
  void Swal.fire({
    title,
    text,
    icon,
    confirmButtonText: `Entendido`,
  });
};