import { api } from "../../../../../../api/axios";
import { showAlert } from "../../../../../../utils/showAlert/ShowAlert";
import { control_warning } from "../../../../../almacen/configuracion/store/thunks/BodegaThunks";

/* eslint-disable @typescript-eslint/naming-convention */
export const putAceptarTareaOpa = async (idTarea: number) => {
  try {
    // gestor/bandeja-tareas/tareas-asignadas/opas/aceptar/update/121/
    const url = `gestor/bandeja-tareas/tareas-asignadas/opas/aceptar/update/${idTarea}/`;
    const bodyPut = {};
    const response = await api.put(url, bodyPut);

    if (response.data.success) {
      showAlert(
        'Atención...',
        'La tarea se ha aceptado correctamente',
        'success'
      );

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
    }
  } catch (error) {
    showAlert('Opps...', 'Ha ocurrido un error al aceptar la tarea', 'error');
  }
};
