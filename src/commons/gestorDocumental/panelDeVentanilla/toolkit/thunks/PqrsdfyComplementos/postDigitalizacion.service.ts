import { api } from '../../../../../../api/axios';
import { control_error } from '../../../../../../helpers';
import { showAlert } from '../../../../../../utils/showAlert/ShowAlert';
import { control_warning } from '../../../../../almacen/configuracion/store/thunks/BodegaThunks';

/* eslint-disable @typescript-eslint/naming-convention */
export const postDigitalizacionPqrsdf = async (data: any) => {
  try {
    if (!data) {
      control_warning('No se ha seleccionado ninguna PQRSDF para digitalizar');
    }
    const url = `gestor/panel_ventanilla/pqrsdf/solicitudd_digitalizacion/create/`;
    const response = await api.post(url, {
      id_pqrsdf: data,
    });

    if (response.data.succes) {
      showAlert(
        'Solicitud de digitalización exitosa',
        'Se ha enviado correctamente la solicitud de digitalización',
        'success'
      );
    }

    return response;
  } catch (err: any) {
    showAlert('Opps...', `${err.response.data.detail}`, 'error');
  }
};

export const postDigitalizacionComplementos = async (data: any) => {
  try {
    if (!data) {
      control_warning(
        'No se ha seleccionado ningún complemento para digitalizar'
      );
    }
    const url = `gestor/panel_ventanilla/complementos/digitalizacion/create/`;
    const response = await api.post(url, {
      id_complemento_usu_pqr: data,
    });

    if (response.data.succes) {
      showAlert(
        'Solicitud de digitalización exitosa',
        'Se ha enviado correctamente la solicitud de digitalización',
        'success'
      );
    }
  } catch (err: any) {
    showAlert('Opps...', `${err.response.data.detail}`, 'error');
  }
};
