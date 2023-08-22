import type { AxiosResponse } from "axios";
import type { ResponseServer } from "../../../../../interfaces/globalModels";
import type { InfoDepositos, InfoEstantes, ListarDepositos, ListarSucursales } from "../types/types";
import { api } from "../../../../../api/axios";



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