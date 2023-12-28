import Swal from 'sweetalert2';
import { api } from '../../../../../../../api/axios';

/* eslint-disable @typescript-eslint/naming-convention */
export const postAsignacionUsuario = async (
  formData: any,
  setLoadingButton: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const url = `gestor/pqr/crear-respuesta-pqrsdf/`;
  console.log('formData', formData);
  try {
    setLoadingButton(true);

    const response = await api.post(url, formData);

    // console.log('')('response', response);
    return Promise.resolve(response);
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Ha ocurrido un error',
      footer: 'Por favor intente nuevamente',
    });
  } finally {
    setLoadingButton(false);
  }
};