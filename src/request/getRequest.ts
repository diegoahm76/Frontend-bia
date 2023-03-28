import { api } from '../api/axios';

export const get_direcciones = async (): Promise<any> => {
  return await api.get('choices/direcciones/');
};
