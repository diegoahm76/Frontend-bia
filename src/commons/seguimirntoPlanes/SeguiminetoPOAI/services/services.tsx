import { api } from '../../../../api/axios';
import type {
  ISeguiminetoPOAI,
  IProyectos,
  IRubro,
  IMetaIndicador,
  IDetalleCuentas,
  IBanco,
} from '../../types/types';
import type {
  IIntervalo,
  IModalidad,
  IUbicacion,
} from '../../configuraciones/interfaces/interfaces';
import { ClaseTercero } from '../../../../interfaces/globalModels';

// ! Bancos
// ? ----------------------------------------------- [ GET ] -----------------------------------------------
export const get_seguimiento = async (): Promise<ISeguiminetoPOAI[]> => {
  const response = await api.get(
    `seguimiento-planes/consultar-seguimiento-poai/`
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
export const get_metas_indicador = async (): Promise<IMetaIndicador[]> => {
  const response = await api.get(`seguimiento/planes/consultar-metas/`);
  return response.data.data;
};

export const get_detalle_inversion = async (): Promise<IDetalleCuentas[]> => {
  const response = await api.get(
    `seguimiento-planes/consultar-detalle-inversion-cuentas/`
  );
  return response.data.data;
};

export const get_ubicaciones = async (): Promise<IUbicacion[]> => {
  const response = await api.get(`seguimiento-planes/consultar-ubicaciones/`);
  return response.data.data;
};

export const get_modalidades = async (): Promise<IModalidad[]> => {
  const response = await api.get(`seguimiento-planes/consultar-modalidades/`);
  return response.data.data;
};

export const get_intervalos = async (): Promise<IIntervalo[]> => {
  const response = await api.get(`seguimiento-planes/consultar-intervalos/`);
  return response.data.data;
};

export const get_banco = async (): Promise<IBanco[]> => {
  const response = await api.get(
    `seguimiento-planes/consultar-banco-proyectos/`
  );
  return response.data.data;
};

export const get_clase_tercero = async (): Promise<ClaseTercero[]> => {
  const response = await api.get(`listas/clase-tercero/`);
  console.log(response.data.data, 'clase tercero');
  return response.data.data;
};

// ? ----------------------------------------------- [ POST ] -----------------------------------------------
export const post_seguimiento = async (
  data: ISeguiminetoPOAI
): Promise<ISeguiminetoPOAI> => {
  const response = await api.post(
    `seguimiento-planes/crear-seguimiento-poai/`,
    data
  );
  return response.data;
};

// ? ----------------------------------------------- [ PUT ] -----------------------------------------------
export const put_seguimiento = async (
  id_seguimiento: number,
  data: ISeguiminetoPOAI
): Promise<ISeguiminetoPOAI> => {
  const response = await api.put(
    `seguimiento-planes/actualizar-seguimiento-poai/${id_seguimiento}/`,
    data
  );
  return response.data;
};
