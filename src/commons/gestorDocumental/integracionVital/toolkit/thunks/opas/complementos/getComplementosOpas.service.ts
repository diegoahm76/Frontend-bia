/* eslint-disable @typescript-eslint/naming-convention */
import Swal from "sweetalert2";
import { control_success } from "../../../../../../../helpers";
import { api } from "../../../../../../../api/axios";

// eslint-disable-next-line @typescript-eslint/naming-convention
export const getComplementosAsociadosOpas = async (
  idSolicitudTramite: string,
  handleThirdLoading: React.Dispatch<React.SetStateAction<boolean>>
): Promise<any[]> => {
  const warningTitle = 'Opps...';
  const warningIcon = 'warning';
  const errorIcon = 'error';
  const showConfirmButton = true;

  try {
    handleThirdLoading(true);
    const url = `gestor/panel_ventanilla/opas/requerimiento/get/${encodeURIComponent(idSolicitudTramite)}`;
    const { data } = await api.get(url);

    if (data.data.length) {
      control_success(`${data.detail} de complementos`);
      return data.data;
    }

    Swal.fire({
      title: warningTitle,
      icon: warningIcon,
      text: 'No se encontraron complementos relacionados a la OPA',
      showConfirmButton,
    });

    return [];
  } catch (e: any) {
    Swal.fire({
      title: warningTitle,
      icon: errorIcon,
      text: `${e.response.data.detail} de complementos / respuestas requerimientos asociados a la OPA seleccionada`,
      showConfirmButton,
    });

    return [];
  } finally {
    handleThirdLoading(false);
  }
};