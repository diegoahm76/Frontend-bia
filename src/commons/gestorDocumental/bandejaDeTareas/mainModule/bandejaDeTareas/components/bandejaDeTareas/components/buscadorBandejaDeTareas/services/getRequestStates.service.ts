import { api } from '../../../../../../../../../../api/axios';
import { IRequestState } from './request.types';

/* eslint-disable @typescript-eslint/naming-convention */
/*export const getRequestStates = async (): Promise<any> => {
  try {
    const url = `gestor/panel_ventanilla/estados_solicitudes/get/`;
    const {
      data: { data = {} },
    } = await api.get(url);
    const x = data.map(
      ({ id_estado_solicitud: value, nombre: label }: IRequestState) => ({
        value,
        label,
      })
    );
    //  console.log('')(x);
    return x; //
  } catch (err) {
    //  console.log('')(err);
  }
};
*/