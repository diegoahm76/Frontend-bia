import type { AxiosResponse } from "axios";
import type { ResponseServer } from "../../../../../interfaces/globalModels";
import type { GetBandejas, GetEstantes, InfoDepositos, InfoEstantes, ListarDepositos, ListarSucursales, PostEstantes } from "../types/types";
import { api } from "../../../../../api/axios";


// ? ----------------------------------------------- [ GET ] -----------------------------------------------
export const search_deposito = async ({
    nombre_deposito,
    identificacion_por_entidad,
    nombre_sucursal,
}: any): Promise<AxiosResponse<ResponseServer<InfoDepositos[]>>> => {
    const url = `gestor/depositos-archivos/estanteDeposito/buscar-deposito/?nombre_deposito=${String(
        nombre_deposito ?? ''
    )}&identificacion_por_entidad=${String(
        identificacion_por_entidad ?? ''
    )}&nombre_sucursal=${String(
        nombre_sucursal ?? '')}`;
    return await api.get<ResponseServer<InfoDepositos[]>>(url);
};
export const search_estante = async ({
    identificacion_estante,
    orden_estante,
    nombre_deposito,
}: any): Promise<AxiosResponse<ResponseServer<InfoEstantes[]>>> => {
    const url = `gestor/depositos-archivos/bandejaEstante/buscar-estante/?identificacion_estante=${String(
        identificacion_estante ?? ''
    )}&orden_estante=${String(
        orden_estante ?? ''
    )}&nombre_deposito=${String(
        nombre_deposito ?? '')}`;
    return await api.get<ResponseServer<InfoEstantes[]>>(url);
};

// * sucursales
export const get_sucursales = async (): Promise<ListarSucursales[]> => {
    const response = await api.get(`transversal/sucursales/sucursales-empresa-lista/3`);
    const data = response.data.data;
    return data ?? [];
};
// * depositos
export const get_depositos = async (): Promise<ListarDepositos[]> => {
    const response = await api.get(`gestor/depositos-archivos/deposito/listar/`);
    const data = response.data.data;
    return data ?? [];
};
// * estantes por d
export const get_estantes_deposito = async (id_deposito: number): Promise<GetEstantes[]> => {
    const response: AxiosResponse<ResponseServer<GetEstantes[]>> = await api.get<
        ResponseServer<GetEstantes[]>
    >(`gestor/depositos-archivos/estanteDeposito/listar-estante-por-deposito/${id_deposito}/`);
    return response.data.data;
};
// * orden estantes
export const get_orden_estantes = async (): Promise<ListarSucursales[]> => {
    const response = await api.get(`gestor/depositos-archivos/estanteDeposito/siguiente-orden/`);
    const data = response.data.data;
    return data ?? [];
};
// * bandejas por estantes
export const get_depositos_estante = async (id_estante: number): Promise<GetBandejas[]> => {
    const response: AxiosResponse<ResponseServer<GetBandejas[]>> = await api.get<
        ResponseServer<GetBandejas[]>
    >(`gestor/depositos-archivos/bandejaEstante/listar-bandejas-por-estante/${id_estante}/`);
    return response.data.data;
};

// ? ----------------------------------------------- [ POST ] -----------------------------------------------
export const post_deposito = async (data: PostEstantes): Promise<PostEstantes> => {
    const response = await api.post(`gestor/depositos-archivos/estanteDeposito/crear/`, data);
    return response.data;
}



