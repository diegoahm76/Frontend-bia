/* eslint-disable @typescript-eslint/naming-convention */
import { api } from '../../../../../../api/axios';
import { showAlert } from '../../../../../../utils/showAlert/ShowAlert';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const putContinuarAsigGrupoComple = async (
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
    // gestor/panel_ventanilla/pqrsdf/asignacion/grupo/update/32/
    const url = `gestor/panel_ventanilla/complementos/asignacion/grupo/update/${idComplemento}/`;
    const response = await api.put(url, {
      complemento_asignado_unidad: true,
    });

     if (response?.data?.succes || response?.data?.success) {
      showAlert(
        'Asignación a unidad de complementos exitosa',
        'Se ha continuado con la asignación a unidad de complementos',
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