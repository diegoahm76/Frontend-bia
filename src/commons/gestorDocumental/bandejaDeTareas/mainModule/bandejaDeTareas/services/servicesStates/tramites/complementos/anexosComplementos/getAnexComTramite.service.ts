/* eslint-disable @typescript-eslint/naming-convention */

import Swal from "sweetalert2";
import { api } from "../../../../../../../../../../api/axios";
import { control_success } from "../../../../../../../../../../helpers";


export const getAnexosComplementoBandejaTareasTramites = async (idComplemento: number) => {
  try {
    const url = `gestor/bandeja-tareas/tareas-asignadas/tramites/respuesta/anexo/get/${idComplemento}/`;
    const { data } = await api.get(url);

    if (data.data.length > 0) {
      control_success(
        data?.detail ||
          'Se obtuvieron los anexos del complemento de manera correcta.'
      );
      return data.data;
    } else {
      await Swal.fire({
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
