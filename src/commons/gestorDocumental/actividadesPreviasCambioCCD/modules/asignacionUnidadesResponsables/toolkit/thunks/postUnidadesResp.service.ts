import { api } from '../../../../../../../api/axios';
import { control_success } from '../../../../../../../helpers';

/* eslint-disable @typescript-eslint/naming-convention */
export const postUnidadesResp = async (
  dataToPostUnidadesResp: any,
  setLoading: any
) => {
  try {
    setLoading(true);
    const url = `gestor/ccd/unidades-responsables-ccd/create/`;
    const response = await api.post(url, dataToPostUnidadesResp);
    control_success('Asignación realizada');
    return response;
  } catch (error) {
  } finally {
    setLoading(false);
  }
};

//* se deben llamar 4 servicios luego de realizar el post
