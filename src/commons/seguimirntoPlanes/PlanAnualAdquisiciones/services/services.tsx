import { api } from '../../../../api/axios';
import type {
  ICodigoUnspsc,
  IEstadoVF,
  IFuenteRecursoPAA,
  IIntervalo,
  IModalidad,
  IUbicacion,
} from '../../configuraciones/interfaces/interfaces';
import type { IPlanAdquisiciones, IUnspsc } from '../../types/types';
// import { get_codigo_unspsc } from '../../configuraciones/Request/request';

// ! plan anual de adquisiciones
// ? ----------------------------------------------- [ GET ] -----------------------------------------------
export const get_plan_adiquisiciones = async (): Promise<
  IPlanAdquisiciones[]
> => {
  const response = await api.get(
    `seguimiento-planes/consultar-plan-anual-adquisiciones/`
  );
  return response.data.data;
};

export const get_paa_codigos_id_plan = async (
  id_plan: number
): Promise<IUnspsc[]> => {
  const response = await api.get(
    `seguimiento-planes/consultar-paa-codigos-unsp-id-paa/${id_plan}/`
  );
  return response.data.data;
};

export const get_paa_codigos = async (): Promise<IUnspsc[]> => {
  const response = await api.get(
    `seguimiento-planes/consultar-paa-codigos-unsp/`
  );
  return response.data.data;
};

export const get_intervalos = async (): Promise<IIntervalo[]> => {
  const response = await api.get(`seguimiento-planes/consultar-intervalos/`);
  return response.data.data;
};

export const get_modalidades = async (): Promise<IModalidad[]> => {
  const response = await api.get(`seguimiento-planes/consultar-modalidades/`);
  return response.data.data;
};

export const get_recursos_paa = async (): Promise<IFuenteRecursoPAA[]> => {
  const response = await api.get(
    `seguimiento-planes/consultar-fuentes-recursos-paa/`
  );
  return response.data.data;
};

export const get_estados_vf = async (): Promise<IEstadoVF[]> => {
  const response = await api.get(`seguimiento-planes/consultar-estados-vf/`);
  return response.data.data;
};

export const get_ubicaciones = async (): Promise<IUbicacion[]> => {
  const response = await api.get(`seguimiento-planes/consultar-ubicaciones/`);
  return response.data.data;
};

export const get_codigo_unspsc = async (): Promise<ICodigoUnspsc[]> => {
  const response = await api.get(`seguimiento-planes/consultar-codigos-unsp/`);
  return response.data.data;
};
export const get_codigo_unspsc_pag = async (page:number): Promise<ICodigoUnspsc[]> => {
  const response = await api.get(`seguimiento-planes/consultar-codigos-unsp/?page=${page}&page_size=10`);
  return response.data.data;
};

// ? ----------------------------------------------- [ POST ] -----------------------------------------------

export const post_plan_adiquisiciones = async (
  data: IPlanAdquisiciones
): Promise<IPlanAdquisiciones> => {
  const response = await api.post(
    `seguimiento-planes/crear-plan-anual-adquisiciones/`,
    data
  );
  return response.data;
};

export const post_paa_codigos = async (data: IUnspsc): Promise<IUnspsc> => {
  const response = await api.post(
    `seguimiento-planes/crear-paa-codigos-unsp/`,
    data
  );
  return response.data;
};

// ? ----------------------------------------------- [ PUT ] -----------------------------------------------
export const put_plan_adiquisiciones = async (
  id_plan: number,
  data: IPlanAdquisiciones
): Promise<IPlanAdquisiciones> => {
  const response = await api.put(
    `seguimiento-planes/actualizar-plan-anual-adquisiciones/${id_plan}/`,
    data
  );
  return response.data;
};

export const put_paa_codigos = async (
  id_paacodigo: number,
  data: IUnspsc
): Promise<IUnspsc> => {
  const response = await api.put(
    `seguimiento-planes/actualizar-paa-codigos-unsp/${id_paacodigo}/`,
    data
  );
  return response.data;
};

// ? ----------------------------------------------- [ DELETE ] -----------------------------------------------

export const delete_paa_codigos = async (
  id_paacodigo: number
): Promise<IUnspsc> => {
  const response = await api.delete(
    `seguimiento-planes/eliminar-paa-codigos-unsp/${id_paacodigo}/`
  );
  return response.data;
};
