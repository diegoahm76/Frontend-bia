import Swal from 'sweetalert2';
import { control_error, control_success } from '../../../../../../../helpers';
import { api } from '../../../../../../../api/axios';

/* eslint-disable @typescript-eslint/naming-convention */
export const getAnexosComplemento = async (idComplemento: number) => {
  try {
    const url = `gestor/panel_ventanilla/pqrsdf/anexo/get/${idComplemento}/`;
    const { data } = await api.get(url);

    if (data.data.length > 0) {
      control_success(
        data?.detail ||
          'Se obtuvieron los anexos del complemento de manera correcta.'
      );
      return data.data;
    } else {
      void Swal.fire({
        icon: 'info',
        title: 'Opps...',
        text: 'No hay anexos para este complemento',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#0096d2',
      });
      return [];
    }
  } catch (err: any) {
    void Swal.fire({
      icon: 'info',
      title: 'Opps...',
      text: 'No hay anexos para este complemento',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#0096d2',
    });
    return [];
  }
};
