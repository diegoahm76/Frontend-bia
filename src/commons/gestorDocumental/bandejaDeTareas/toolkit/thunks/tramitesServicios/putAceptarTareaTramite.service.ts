import { api } from '../../../../../../api/axios';
import { showAlert } from '../../../../../../utils/showAlert/ShowAlert';
import { control_warning } from '../../../../../almacen/configuracion/store/thunks/BodegaThunks';

/* eslint-disable @typescript-eslint/naming-convention */
const SUCCESS_MESSAGE = 'La tarea se ha aceptado correctamente';
const ERROR_MESSAGE = 'Ha ocurrido un error al aceptar la tarea';
const URL_BASE =
  'gestor/bandeja-tareas/tareas-asignadas/tramites/aceptar/update';

export const putAceptarTareaTramite = async (idTarea: number) => {
  try {
    const url = `${URL_BASE}/${idTarea}/`;
    const response = await api.put(url, {});

    if (response.data.success) {
      showAlert('Atención...', SUCCESS_MESSAGE, 'success');

      const dataNew = {
        ...response.data,
        // ? la data del expediente vendrá proximanente dentro del servicio establecido por parte de backend, en la generacion del auto de inicio y del pago que vendría por parte de recaudo
        data_expediente: {
          auto: 'http://accioneduca.org/admin/archivos/modulos/ayudanos/prueba.pdf',
          pago: 'https://seguimiento.agoraparticipa.org/docs/PDF_TEXT-CA4Bn.pdf',
        },
      };

      if (dataNew.data_expediente.auto) {
        window.open(dataNew.data_expediente.auto, '_blank');
      } else {
        control_warning('No se ha encontrado el auto de inicio');
      }

      if (dataNew.data_expediente.pago) {
        window.open(dataNew.data_expediente.pago, '_blank');
      } else {
        control_warning('No se ha encontrado el pago');
      }

      return dataNew;
    } else {
      showAlert('Opps...', ERROR_MESSAGE, 'error');
    }
  } catch (error: any) {
    showAlert(
      'Opps...',
      error?.response?.data?.detail || ERROR_MESSAGE,
      'error'
    );
    throw error;
  }
};
