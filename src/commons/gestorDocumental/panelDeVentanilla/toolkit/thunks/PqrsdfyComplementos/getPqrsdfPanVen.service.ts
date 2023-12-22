import Swal from 'sweetalert2';
import { api } from '../../../../../../api/axios';
import { control_error, control_success } from '../../../../../../helpers';
import { control_warning } from '../../../../../almacen/configuracion/store/thunks/BodegaThunks';
import { formatDate } from '../../../../../../utils/functions/formatDate';

/* eslint-disable @typescript-eslint/naming-convention */

export function formatDateUse(date: Date) {
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  return `${year}-${month}-${day}`;
}
interface Item {
  fecha_radicado: string;
}

const BASE_URL = 'gestor/panel_ventanilla/pqrsdf/get/';

export const getGrilladoPqrsdfPanelVentanilla = async (
  estado_actual_solicitud: string = '',
  radicado: string = '',
  tipo_solicitud: string = '',
  fecha_inicio: string = '',
  fecha_fin: string = '',
  tipo_pqrsdf: string = '',
  handleSecondLoading: React.Dispatch<React.SetStateAction<boolean>>
): Promise<Item[]> => {
  try {
    handleSecondLoading(true);
    const formattedFechaInicio = fecha_inicio
      ? encodeURIComponent(formatDateUse(new Date(fecha_inicio)))
      : '';
    const formattedFechaFin = fecha_fin
      ? encodeURIComponent(formatDateUse(new Date(fecha_fin)))
      : '';
    const url = `${BASE_URL}?estado_actual_solicitud=${encodeURIComponent(
      estado_actual_solicitud ?? ''
    )}&radicado=${encodeURIComponent(
      radicado ?? ''
    )}&tipo_solicitud=${encodeURIComponent(
      tipo_solicitud ?? ''
    )}&fecha_inicio=${formattedFechaInicio}&fecha_fin=${formattedFechaFin}&tipo_PQRSDF=${encodeURIComponent(
      tipo_pqrsdf ?? ''
    )}`;
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
    void Swal.fire({
      title: 'Opps...',
      icon: 'warning',
      text: `${e?.response?.data?.detail} para la búsqueda realizada`,
      showConfirmButton: true,
    });
    return [];
  } finally {
    handleSecondLoading(false);
  }
};
