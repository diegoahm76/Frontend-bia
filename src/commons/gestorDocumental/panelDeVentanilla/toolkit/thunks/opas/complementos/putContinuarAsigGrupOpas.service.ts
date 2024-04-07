/* eslint-disable @typescript-eslint/naming-convention */
import { api } from "../../../../../../../api/axios";
import { showAlert } from "../../../../../../../utils/showAlert/ShowAlert";

export const putContinuarAsigGrupoComOpa = async (
  idComplemento: number | string
) => {
  if (!idComplemento) {
    showAlert('Opps...', 'No se ha seleccionado ningún complemento', 'error');
    return;
  }

  try {
    console.log('idComplemento', idComplemento);
    console.log({
      complemento_asignado_unidad: true,
    })
    const url = `gestor/panel_ventanilla/opas/respuesta-requerimiento/continuar-asignacion/${idComplemento}/`;
    const response = await api.put(url, {
      complemento_asignado_unidad: true,
    });

     if (response?.data?.succes || response?.data?.success) {
      showAlert(
        'Asignación a unidad de complemento exitosa',
        'Se ha continuado con la asignación a unidad del complemento seleccionado',
        'success'
      );
    }

    return response;

    return response;
  } catch (err: any) {
    const errorMessage = err.response?.data?.detail || err.message || 'Ha ocurrido un error';
    showAlert('Opps...', errorMessage, 'error');
  }
};