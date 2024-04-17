import { api } from '../../../../../../api/axios';
import { control_success } from '../../../../../../helpers';
import { showAlert } from '../../../../../../utils/showAlert/ShowAlert';
import { formatDateUse } from '../PqrsdfyComplementos/getPqrsdfPanVen.service';

/* eslint-disable @typescript-eslint/naming-convention */
interface Params {
  handleSecondLoading: React.Dispatch<React.SetStateAction<boolean>>;
  radicado?: string;
  fecha_inicio?: string;
  fecha_fin?: string;
  nombre_titular?: string;
  asunto_proyecto?: string;
  pago_tramite?: string;
  expediente?: string;
  estado_actual_solicitud?: string;
}

export const getGrilladoTramitesPanelVentanilla = async (
  handleSecondLoading: Params['handleSecondLoading'],
  radicado: Params['radicado'] = '',
  fecha_inicio: Params['fecha_inicio'] = '',
  fecha_fin: Params['fecha_fin'] = '',
  nombre_titular: Params['nombre_titular'] = '',
  asunto_proyecto: Params['asunto_proyecto'] = '',
  pago_tramite: Params['pago_tramite'] = '',
  expediente: Params['expediente'] = '',
  estado_actual_solicitud: Params['estado_actual_solicitud'] = ''
): Promise<any[]> => {
  handleSecondLoading(true);

  const params = new URLSearchParams({
    fecha_inicio: fecha_inicio ? formatDateUse(new Date(fecha_inicio)) : '',
    fecha_fin: fecha_fin ? formatDateUse(new Date(fecha_fin)) : '',
    nombre_titular,
    radicado_tramite: radicado,
    asunto_proyecto,
    pago_tramite,
    expediente,
    estado_actual_solicitud,
  });

  const url = `gestor/panel_ventanilla/tramites/get/?${params.toString()}`;

  try {
    const { data } = await api.get(url);

    if (data?.data?.length) {
      control_success(
        `Se encontraron ${data?.data?.length} tramites relacionados con el filtro seleccionado`
      );
      return data?.data;
    }

    showAlert(
      'Opps...',
      'No se encontraron tramites relacionados con el filtro seleccionado',
      'warning'
    );

    return [];
  } catch (e: any) {
    if (e?.response?.status === 404) {
      showAlert(
        'Opps...',
        `No se encontraron tramites relacionados con el filtro seleccionado`,
        'warning'
      );
    } else {
      showAlert(
        'Opps...',
        `${e?.response?.data?.detail} para la búsqueda realizada`,
        'warning'
      );
    }

    return [];
  } finally {
    handleSecondLoading(false);
  }
};