/* eslint-disable @typescript-eslint/naming-convention */
import Swal from 'sweetalert2';
import { api } from '../../../../../../api/axios';
import { control_success } from '../../../../../../helpers';
import { formatDateUse } from '../PqrsdfyComplementos/getPqrsdfPanVen.service';

export const getGrilladoSolicitudesOtrosfPanelVentanilla = async (
  estado_actual_solicitud: string = '',
  radicado: string = '',
  fecha_inicio: string = '',
  fecha_fin: string = '',
  handleSecondLoading: React.Dispatch<React.SetStateAction<boolean>>
): Promise<any[]> => {
  try {
    handleSecondLoading(true);
    const formattedFechaInicio = fecha_inicio
      ? encodeURIComponent(formatDateUse(new Date(fecha_inicio)))
      : '';
    const formattedFechaFin = fecha_fin
      ? encodeURIComponent(formatDateUse(new Date(fecha_fin)))
      : '';

    // gestor/panel_ventanilla/otros/get/?estado_actual_solicitud=GUARD&radicado=UNICO&fecha_inicio=2023-12-13&fecha_fin=2024-01-20

    const url = `gestor/panel_ventanilla/otros/get/?estado_actual_solicitud=${encodeURIComponent(
      estado_actual_solicitud ?? ''
    )}&radicado=${encodeURIComponent(
      radicado ?? ''
    )}&fecha_inicio=${formattedFechaInicio}&fecha_fin=${formattedFechaFin}`;

    const { data } = await api.get(url);
    if (data?.data?.length) {
      control_success(
        `Resultados encontrados, para solicitudes de otros: ${data?.data?.length}`
      );
      return data?.data;
    }

    void Swal.fire({
      title: 'Opps...',
      icon: 'warning',
      text: 'No se encontraron solicitudes de otros relacionadas con el filtro seleccionado',
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
