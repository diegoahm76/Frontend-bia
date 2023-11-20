import Swal from 'sweetalert2';
import { api } from '../../../../../api/axios';
import { control_error, control_success } from '../../../../../helpers';
import { control_warning } from '../../../../almacen/configuracion/store/thunks/BodegaThunks';

/* eslint-disable @typescript-eslint/naming-convention */
interface Item {
  fecha_radicado: string;
}

export const getGrilladoPqrsdfPanelVentanilla = async (
  estado_actual_solicitud: string,
  radicado: string,
  tipo_solicitud: string
): Promise<Item[]> => {
  try {
    const url = `gestor/panel_ventanilla/pqrsdf/get/?estado_actual_solicitud=${encodeURIComponent(
      estado_actual_solicitud
    )}&radicado=${encodeURIComponent(
      radicado
    )}&tipo_solicitud=${encodeURIComponent(tipo_solicitud)}`;
    const { data } = await api.get(url);
    if (data?.data?.length) {
      const dataGrid = data?.data?.map((item: Item) => ({
        ...item,
        fecha_radicado: new Date(item.fecha_radicado).toLocaleDateString(
          'es-ES',
          {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          }
        ),
      }));
      console.log('data', data);
      control_success(data?.detail);
      return dataGrid;
    }

    void Swal.fire({
      icon: 'warning',
      title: 'No se encontraron pqrsdf relacionadas con el filtro seleccionado',
      showConfirmButton: false,
      timer: 1500,
    });
    return [];
  } catch (e: any) {
    control_error(e?.response?.data?.detail);
    console.error(e);
    return [];
  }
};
