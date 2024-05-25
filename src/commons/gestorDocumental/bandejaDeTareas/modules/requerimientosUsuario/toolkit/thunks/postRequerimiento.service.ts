import Swal from 'sweetalert2';
import { api } from '../../../../../../../api/axios';

/* eslint-disable @typescript-eslint/naming-convention */
export const postRequerimientoUsuario = async (
  formData: any,
  setLoadingButton: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const url = `gestor/bandeja-tareas/pqrsdf/requerimiento/create/`;
  try {
    if (!formData || typeof formData !== 'object') {
      throw new Error('Invalid formData');
    }

    if (typeof setLoadingButton !== 'function') {
      throw new Error('setLoadingButton must be a function');
    }

    setLoadingButton(true);
    const response = await api.post(url, formData);

    if (!response || typeof response !== 'object') {
      throw new Error('Invalid response from api.post');
    }

    console.log(response);
    return Promise.resolve(response);
  } catch (error) {
    console.error(error);
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Ha ocurrido un error',
      footer: 'Por favor intente nuevamente',
    });
    throw error; // Re-throw the error so it can be caught in the calling function
  } finally {
    setLoadingButton(false);
  }
};