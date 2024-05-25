/* eslint-disable @typescript-eslint/naming-convention */
import Swal from "sweetalert2";
import { api } from "../../../../../../../../../api/axios";
import { control_success } from "../../../../../../../../../helpers";

export const getAnexosComplementoOpas = async (idComplemento: number) => {
  try {
    // gestor/bandeja-tareas/tareas-asignadas/opas/respuesta/anexo/get/37/
    const url = `gestor/bandeja-tareas/tareas-asignadas/opas/respuesta/anexo/get/${idComplemento}/`;
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
