import Swal from 'sweetalert2';
import { api } from '../../../../../../api/axios';
import { control_success } from '../../../../../../helpers';

/* eslint-disable @typescript-eslint/naming-convention */
export const getLiderByUnidadOrganizacional = async (
  idUnidadOrg: number,
  setLiderAsignado: React.Dispatch<React.SetStateAction<any>>,
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    setLoading?.(true);
    const url = `gestor/panel_ventanilla/persona-lider/get/${idUnidadOrg}/`;
    const { data } = await api.get(url);

    if (data?.data) {
      control_success('Se encontró el lider de la unidad organizacional');
      return data?.data;
    }
  } catch (error: any) {
    setLiderAsignado(undefined);
    await Swal.fire({
      icon: 'error',
      title: 'Error',
      text: `Esta unidad ${error?.response?.data?.detail} en consecuencia no se puede asignar la PQRSDF`,
    });

    return [];
  } finally {
    setLoading?.(false);
  }
};
