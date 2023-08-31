import type { AxiosResponse } from 'axios';
import type { ResponseServer } from '../../../../../interfaces/globalModels';
import type {
  IBuscarCaja,
  ICajas,
  ICarpetas,
  IPutCajas,
  IPutOrdenCaja,
  PostCajas,
} from '../types/types';
import { api } from '../../../../../api/axios';

// * ----------------------------------------------- [ GET ] -----------------------------------------------

export const search_caja = async ({
  identificacion_deposito,
  identificacion_estante,
  identificacion_bandeja,
  identificacion_caja,
  orden_caja,
}: any): Promise<AxiosResponse<ResponseServer<IBuscarCaja[]>>> => {
  const url = `gestor/depositos-archivos/cajaBandeja/busqueda-avanzada-caja/?identificacion_deposito=${String(
    identificacion_deposito ?? ''
  )}&identificacion_estante=${String(
    identificacion_estante ?? ''
  )}&identificacion_bandeja=${String(
    identificacion_bandeja ?? ''
  )} &identificacion_caja=${String(
    identificacion_caja ?? ''
  )}&orden_caja=${String(orden_caja ?? '')}
            `;
  return await api.get<ResponseServer<IBuscarCaja[]>>(url);
};
// * carpetas por caja
export const get_caja_carpetas = async (
  id_caja: number
): Promise<ICarpetas[]> => {
  const response: AxiosResponse<ResponseServer<ICarpetas[]>> = await api.get<
    ResponseServer<ICarpetas[]>
  >(
    `gestor/depositos-archivos/carpetaCaja/listar-carpetas-por-caja/${id_caja}/`
  );
  return response.data.data;
};

// *cajas por bandeja
export const get_cajas_bandeja = async (
  id_bandeja: number
): Promise<ICajas[]> => {
  const response: AxiosResponse<ResponseServer<ICajas[]>> = await api.get<
    ResponseServer<ICajas[]>
  >(
    `gestor/depositos-archivos/cajaBandeja/listar-cajas-por-bandeja/${id_bandeja}/`
  );
  return response.data.data;
};

// ! ----------------------------------------------- [ DELETE ] -----------------------------------------------
export const delete_caja = async (id: number): Promise<any> => {
  const response = await api.delete(
    `gestor/depositos-archivos/cajaBandeja/eliminar/${id}/`
  );
  return response.data;
};

// * ----------------------------------------------- [ POST ] -----------------------------------------------
export const post_caja = async (data: PostCajas): Promise<PostCajas> => {
  const response = await api.post(
    `gestor/depositos-archivos/cajaBandeja/crear/`,
    data
  );
  return response.data;
};
// ? ----------------------------------------------- [ PUT ] -----------------------------------------------
export const put_mover_caja = async (
  id_caja: number,
  data: IPutCajas
): Promise<IPutCajas> => {
  const response = await api.put(
    `gestor/depositos-archivos/cajaBandeja/mover-caja/${id_caja}/`,
    data
  );
  return response.data;
};
export const put_caja = async (
  id_caja: number,
  data: IPutOrdenCaja
): Promise<IPutOrdenCaja> => {
  const response = await api.put(
    `gestor/depositos-archivos/cajaBandeja/actualizar-caja/${id_caja}/`,
    data
  );
  return response.data;
};
