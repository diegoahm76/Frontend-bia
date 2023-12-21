import Swal from 'sweetalert2';
import { formatDateUse } from '../PqrsdfyComplementos/getPqrsdfPanVen.service';
import { api } from '../../../../../../api/axios';

/* eslint-disable @typescript-eslint/naming-convention */
export const getOpasPanVen = async (
  handleSecondLoading: React.Dispatch<React.SetStateAction<boolean>>,
  fecha_inicio: string = '',
  fecha_fin: string = '',
  nombre_proyecto: string = '',
  estado_actual_solicitud: string = '',
  radicado: string = '',
  nombre_titular: string = ''
): Promise<any> => {
  try {
    handleSecondLoading(true);
    const formattedFechaInicio = fecha_inicio
      ? encodeURIComponent(formatDateUse(new Date(fecha_inicio)))
      : '';
    const formattedFechaFin = fecha_fin
      ? encodeURIComponent(formatDateUse(new Date(fecha_fin)))
      : '';
    const url = `gestor/panel_ventanilla/opas/tramite/get/`;
    /*  const url = `${BASE_URL}?estado_actual_solicitud=${encodeURIComponent(
      estado_actual_solicitud ?? ''
    )}&radicado=${encodeURIComponent(
      radicado ?? ''
    )}&tipo_solicitud=${encodeURIComponent(
      tipo_solicitud ?? ''
    )}&fecha_inicio=${formattedFechaInicio}&fecha_fin=${formattedFechaFin}&tipo_PQRSDF=${encodeURIComponent(
      tipo_pqrsdf ?? ''
    )}`;*/
    const { data } = await api.get(url);
    if (data?.data?.length) {
      console.log(data?.data);

      // ? se deben filtrar (exluir) todas las opas cuya propiedad radicado sea igual a "SIN RADICAR"

      /* const dataGrid = data?.data?.map((item: Item) => ({
        ...item,
        fecha_radicado: formatDate(item.fecha_radicado),
      }));
      control_success(`${data?.detail} de pqrsdf`);
      return dataGrid;*/
      return data?.data;
    }

    void Swal.fire({
      title: 'Opps...',
      icon: 'warning',
      text: 'No se encontraron OPAS relacionadas con el filtro seleccionado',
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
