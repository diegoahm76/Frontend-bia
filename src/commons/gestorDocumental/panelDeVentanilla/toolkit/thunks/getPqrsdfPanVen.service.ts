import Swal from 'sweetalert2';
import { api } from '../../../../../api/axios';
import { control_error, control_success } from '../../../../../helpers';
import { control_warning } from '../../../../almacen/configuracion/store/thunks/BodegaThunks';
import { formatDate } from '../../../../../utils/functions/formatDate';

/* eslint-disable @typescript-eslint/naming-convention */
interface Item {
  fecha_radicado: string;
}

const BASE_URL = 'gestor/panel_ventanilla/pqrsdf/get/';

export const getGrilladoPqrsdfPanelVentanilla = async (
  estado_actual_solicitud: string,
  radicado: string,
  tipo_solicitud: string,
  handleSecondLoading: React.Dispatch<React.SetStateAction<boolean>>
): Promise<Item[]> => {
  try {
    handleSecondLoading(true);
    const url = `${BASE_URL}?estado_actual_solicitud=${encodeURIComponent(
      estado_actual_solicitud
    )}&radicado=${encodeURIComponent(
      radicado
    )}&tipo_solicitud=${encodeURIComponent(tipo_solicitud)}`;
    const { data } = await api.get(url);
    if (data?.data?.length) {
      const dataGrid = data?.data?.map((item: Item) => ({
        ...item,
        fecha_radicado: formatDate(item.fecha_radicado),
      }));
      control_success(`${data?.detail} de pqrsdf`);
      return dataGrid;
    }

    void Swal.fire({
      title: 'Opps...',
      icon: 'warning',
      text: 'No se encontraron pqrsdf relacionadas con el filtro seleccionado',
      showConfirmButton: true,
    });
    return [];
  } catch (e: any) {
    control_error(e?.response?.data?.detail);
    console.error(e);
    return [];
  } finally {
    handleSecondLoading(false);
  }
};
