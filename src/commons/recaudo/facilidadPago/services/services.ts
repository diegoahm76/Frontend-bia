import { api } from '../../../../api/axios';

export const get_obligaciones_usuario = async (): Promise<any> => {
  return await api.get('recaudo/pagos/listado-obligaciones/');
};
