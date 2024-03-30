/* eslint-disable @typescript-eslint/naming-convention */
import { api } from '../../../../../api/axios';
import { control_success } from '../../../../../helpers';
import { showAlert } from '../../../../../utils/showAlert/ShowAlert';
import { control_warning } from '../../../../almacen/configuracion/store/thunks/BodegaThunks';
import { formatDateUse } from '../../../../gestorDocumental/panelDeVentanilla/toolkit/thunks/PqrsdfyComplementos/getPqrsdfPanVen.service';

export const getExpedientesByFiltro = async (
  setLoadingButton: React.Dispatch<React.SetStateAction<boolean>>,
  id_trd_origen: string = '',
  fecha_apertura_expediente: string = '',
  id_serie_origen: string = '',
  id_subserie_origen: string = '',
  titulo_expediente: string = '',
  fecha_inicio_expediente: string = '',
  fecha_fin_expediente: string = '',
  consecutivo_expediente: string = '',
  tipo_de_expediente: string = ''
) => {
  try {
    setLoadingButton(true);

    const formattedFechaInicio = fecha_inicio_expediente
      ? encodeURIComponent(formatDateUse(new Date(fecha_inicio_expediente)))
      : '';
    const formattedFechaFin = fecha_fin_expediente
      ? encodeURIComponent(formatDateUse(new Date(fecha_fin_expediente)))
      : '';

    const url = `gestor/expedientes-archivos/expedientes/buscar-expediente-abierto/?id_trd_origen=${id_trd_origen}&fecha_apertura_expediente=${fecha_apertura_expediente}&id_serie_origen=${id_serie_origen}&id_subserie_origen=${id_subserie_origen}&titulo_expediente=${encodeURIComponent(
      titulo_expediente
    )}&fecha_inicio_expediente=${formattedFechaInicio}&fecha_fin_expediente=${formattedFechaFin}&codigo_exp_consec_por_agno=${consecutivo_expediente}`;

    const { data } = await api.get(url);

    if (data?.data?.length > 0) {
      control_success('se han encontrado los siguientes expedientes');
      console.log(data.data);

      if (tipo_de_expediente === '') {
        return data?.data;
      } else if (tipo_de_expediente === 'simple') {
        return data.data.filter(
          (expediente: any) => !expediente.codigo_exp_consec_por_agno
        );
      } else {
        return data?.data;
      }
    }
    control_warning(
      'No se han encontrado expedientes que coincidan con los filtros seleccionados'
    );
    return [];
  } catch (error) {
    showAlert(
      'Ops...',
      'Error al obtener los expedientes o no se han encontrado expedientes que coincidan con los filtros seleccionados',
      'error'
    );
    return [];
  } finally {
    setLoadingButton(false);
  }
};

// get trds - gestor/trd/get-list/

// get series - {{url}}/api/gestor/ccd/catalogo/serie-subserie/get-by-id-ccd/1/

// get subsereies - {{url}}/api/gestor/ccd/subseries/get-by-id-serie-doc/2/
