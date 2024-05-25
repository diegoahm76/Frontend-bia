import { api } from "../../../../../../api/axios";
import { showAlert } from "../../../../../../utils/showAlert/ShowAlert";

/* eslint-disable @typescript-eslint/naming-convention */
export const postContinuarAsigGrupoCompleTramite = async (
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
    const url = `gestor/panel_ventanilla/tramites/complementos/asignar/create/`;
    const response = await api.post(url, {
      id_complemento_usu_pqr: idComplemento,
    });

     if (response?.data?.succes || response?.data?.success) {
      showAlert(
        'Asignación a unidad de complemento exitosa',
        'Se ha continuado con la asignación a unidad del complemento seleccionado',
        'success'
      );
    }

    return response;

  } catch (err: any) {
    const errorMessage = err.response?.data?.detail || err.message || 'Ha ocurrido un error';
    showAlert('Opps...', errorMessage, 'error');
  }
};