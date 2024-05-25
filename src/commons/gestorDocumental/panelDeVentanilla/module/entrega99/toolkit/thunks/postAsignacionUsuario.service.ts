import Swal from 'sweetalert2';
import { api } from '../../../../../../../api/axios';
import { handleApiError } from '../../../../../../../utils/functions/errorManage';

/* eslint-disable @typescript-eslint/naming-convention */
export const postAsignacionUsuario = async (
  formData: any,
  setLoadingButton: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const url = `gestor/panel_ventanilla/pqrsdf/solicitud-al-usuario/create/`;
  try {
    setLoadingButton(true);
    const response = await api.post(url, formData);

    if (response.data.succes) {
      Swal.fire({
        title: 'Solicitud enviada',
        icon: 'success',
        showConfirmButton: false,
        timer: 1500,
      });
      return Promise.resolve(response);
    } else {
      throw new Error('La solicitud no se pudo enviar');
    }
  } catch (error: any) {
    handleApiError(error);
  } finally {
    setLoadingButton(false);
  }
};
