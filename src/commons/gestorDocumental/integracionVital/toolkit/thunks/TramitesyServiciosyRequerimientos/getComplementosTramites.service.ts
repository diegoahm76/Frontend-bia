import Swal from 'sweetalert2';
import { api } from '../../../../../../api/axios';
import { control_error, control_success } from '../../../../../../helpers';
import { showAlert } from '../../../../../../utils/showAlert/ShowAlert';

/* eslint-disable @typescript-eslint/naming-convention */
export const getComplementosAsociadosTramite = async (
  idSolicitudTramite: string,
  handleThirdLoading: React.Dispatch<React.SetStateAction<boolean>>
): Promise<any[]> => {
  try {
    handleThirdLoading(true);
    const url = `gestor/panel_ventanilla/tramites/complementos/get/${idSolicitudTramite}/`;
    const { data } = await api.get(url);
    if (data?.data?.length) {
      //  console.log('')(data.data);
      control_success(`${data?.detail} de complementos`);
      return data?.data;
    }

    await Swal.fire({
      title: 'Opps...',
      icon: 'warning',
      text: 'No se encontraron complementos relacionados a la solicitud de trámite seleccionada',
      showConfirmButton: true,
    });
    return [];
  } catch (e: any) {
    void Swal.fire({
      title: 'Opps...',
      icon: 'error',
      text: `${e?.response?.data?.detail} de complementos asociados a la solicitud de trámite seleccionada`,
      showConfirmButton: true,
    });
    return [];
  } finally {
    handleThirdLoading(false);
  }
};


// * ----------------
export const getAnexosComplementoTramite = async (idComplementoTramite: any) => {
  try {
    // gestor/panel_ventanilla/complementos/anexos/get/62/
    const url = `gestor/panel_ventanilla/complementos/anexos/get/${idComplementoTramite}/`;
    const { data } = await api.get(url);
    console.log('data', data);
    if (data.data.length > 0) {
      control_success(
        data?.detail || 'Se obtuvieron los anexos de la OPA correctamente.'
      );
      return data.data;
    } else {
      control_error('No se encontraron anexos para la OPA.');
      return [];
    }
  } catch (err: any) {
    showAlert(
      'Opps...',
      err?.response?.data.detail || err.message || 'No se encontraron anexos para la OPA.',
      'error'
    );
    return [];
  }
};
// ------------------------
export const getArchivoComplementoTramite = async (
  id_anexo: any,
): Promise<any> => {
  try {
    // gestor/panel_ventanilla/pqrsdf/anexo-documento/get/501/
    const url = `gestor/panel_ventanilla/pqrsdf/anexo-documento/get/${id_anexo}/`;
    const { data } = await api.get(url);
    control_success('Archivo obtenido con éxito')
    return data?.data;
  } catch (err: any) {
    control_error('No hay archivos para este anexo');
  }
};
