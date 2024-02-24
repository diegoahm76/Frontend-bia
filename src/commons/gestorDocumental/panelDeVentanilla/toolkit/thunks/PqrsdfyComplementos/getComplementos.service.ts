/* eslint-disable @typescript-eslint/naming-convention */
import Swal from 'sweetalert2';
import { control_success } from '../../../../../../helpers';
import { api } from '../../../../../../api/axios';

export const getComplementosAsociadosPqrsdf = async (
  idPqrsd: string,
  handleThirdLoading: React.Dispatch<React.SetStateAction<boolean>>
): Promise<any[]> => {
  try {
    handleThirdLoading(true);
    const url = `gestor/panel_ventanilla/complementos/get/${encodeURIComponent(
      idPqrsd
    )}`;
    const { data } = await api.get(url);
    if (data?.data?.length) {
      //  console.log('')(data.data);
      control_success(`${data?.detail} de complementos`);
      return data?.data;
    }

    void Swal.fire({
      title: 'Opps...',
      icon: 'warning',
      text: 'No se encontraron complementos relacionados a la PQRSDF',
      showConfirmButton: true,
    });
    return [];
  } catch (e: any) {
    void Swal.fire({
      title: 'Opps...',
      icon: 'error',
      text: `${e?.response?.data?.detail} de complementos asociados a la PQRSDF seleccionada`,
      showConfirmButton: true,
    });
    console.error(e);
    return [];
  } finally {
    handleThirdLoading(false);
  }
};
