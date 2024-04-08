import Swal from 'sweetalert2';
import { api } from '../../../../../../api/axios';
import { control_success } from '../../../../../../helpers';

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
