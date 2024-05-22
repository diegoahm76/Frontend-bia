import Swal from 'sweetalert2';
import { api } from '../../../../../../../api/axios';

/* eslint-disable @typescript-eslint/naming-convention */
export const postResponderUsuario = async (
  formData: any,
  setLoadingButton: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    const url = `gestor/pqr/crear-respuesta-pqrsdf/`;
    const url_guardado = `gestor/pqr/archivar-pqrsdf/`;
    const {
      respuesta_pqrsdf: { id_pqrsdf },
    } = formData;
    console.log('id_pqrsdf', id_pqrsdf);
    setLoadingButton(true);

    const response = await api.post(url, formData);

    if (response.status === 200 || response.status === 201) {
      const response_guardado = await api.post(url_guardado, {
        id_PQRSDF: id_pqrsdf,
      });
      console.log(response_guardado);
      const response = await api.post(url_guardado, formData);

      Swal.fire({
        icon: 'success',
        title: 'Se ha respondido la solicitud',
        showConfirmButton: true,
      });
      return Promise.resolve(response.data);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ha ocurrido un error',
        footer: 'Por favor intente nuevamente',
      });
      return Promise.reject(response.data);
    }
  } catch (error: any) {
    if (error.response && error.response.status === 400) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.response.data.detail,
        footer: 'Por favor verifica los datos enviados',
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ha ocurrido un error',
        footer: 'Por favor intente nuevamente',
      });
    }
  } finally {
    setLoadingButton(false);
  }
};
