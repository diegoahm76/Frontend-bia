import { api } from '../../../../api/axios';
import type { IMetaIndicador } from '../../types/types';

// ! Metas por indicador
// ? ----------------------------------------------- [ GET ] -----------------------------------------------
export const get_metas_id = async (
  id_indicador: number
): Promise<IMetaIndicador[]> => {
  const response = await api.get(
    `seguimiento/planes/consultar-metas-id-indicador/${id_indicador}/`
  );
  return response.data.data;
};


// ? ----------------------------------------------- [ POST ] -----------------------------------------------
export const post_meta = async (
  data: IMetaIndicador
): Promise<IMetaIndicador> => {
  const response = await api.post(
    `seguimiento/planes/crear-metas/`,
    data
  );
  return response.data;
};

// ? ----------------------------------------------- [ PUT ] -----------------------------------------------
export const put_meta = async (
  id_meta: number,
  data: IMetaIndicador
): Promise<IMetaIndicador> => {
  const response = await api.put(
    `seguimiento/planes/actualizar-metas/${id_meta}/`,
    data
  );
  return response.data;
};
