import { api } from '../../../../api/axios';
import type {
  IBanco,
  IProyectos,
  IRubro,
  IMetaIndicador,
} from '../../types/types';

// ! Bancos
// ? ----------------------------------------------- [ GET ] -----------------------------------------------
export const get_banco = async (): Promise<IBanco[]> => {
  const response = await api.get(
    `seguimiento-planes/consultar-banco-proyectos/`
  );
  return response.data.data;
};

export const get_banco_by_meta_id = async (
  id_meta: number
): Promise<IBanco[]> => {
  const response = await api.get(
    `seguimiento-planes/consultar-banco-proyectos/${id_meta}/`
  );
  return response.data.data;
};

export const get_proyectos = async (): Promise<IProyectos[]> => {
  const response = await api.get(`seguimiento/planes/consultar-proyectos/`);
  return response.data.data;
};

export const get_rubros = async (): Promise<IRubro[]> => {
  const response = await api.get(`seguimiento/planes/consultar-rubros/`);
  return response.data.data;
};

// export const get_metas_indicador = async (
//   id_indicador: number
// ): Promise<IMetaIndicador[]> => {
//   const response = await api.get(
//     `seguimiento/planes/consultar-metas-id-indicador/${id_indicador}/`
//   );
//   return response.data.data;
// };
export const get_metas_indicador = async (
): Promise<IMetaIndicador[]> => {
  const response = await api.get(`seguimiento/planes/consultar-metas/`);
  return response.data.data;
};

// ? ----------------------------------------------- [ POST ] -----------------------------------------------
export const post_banco = async (data: IBanco): Promise<IBanco> => {
  const response = await api.post(
    `seguimiento-planes/crear-banco-proyectos/`,
    data
  );
  return response.data;
};

// ? ----------------------------------------------- [ PUT ] -----------------------------------------------
export const put_banco = async (
  id_detalle: number,
  data: IBanco
): Promise<IBanco> => {
  const response = await api.put(
    `seguimiento-planes/actualizar-banco-proyectos/${id_detalle}/`,
    data
  );
  return response.data;
};
