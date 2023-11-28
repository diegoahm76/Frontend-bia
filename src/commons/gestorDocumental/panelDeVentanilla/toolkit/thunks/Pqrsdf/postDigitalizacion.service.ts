import { api } from '../../../../../../api/axios';
import { control_error } from '../../../../../../helpers';
import { showAlert } from '../../../../../../utils/showAlert/ShowAlert';
import { control_warning } from '../../../../../almacen/configuracion/store/thunks/BodegaThunks';

/* eslint-disable @typescript-eslint/naming-convention */
export const postDigitalizacionPqrsdfCompletemento = async (data: any) => {
  try {
    if (!data) {
      control_warning(
        'No se ha seleccionado ningún documento para digitalizar'
      );
    }
    const url = `gestor/panel_ventanilla/pqrsdf/solicitudd_digitalizacion/create/`;
    const response = await api.post(url, {
      id_pqrsdf: data,
    });

    if (response.data.succes) {
      showAlert(
        'Digitalización exitosa',
        'Se ha digitalizado correctamente la solicitud',
        'success'
      );
    }


    return response;
  } catch (err: any) {
    showAlert('Opps...', `${err.response.data.detail}`, 'error');
  }
};
