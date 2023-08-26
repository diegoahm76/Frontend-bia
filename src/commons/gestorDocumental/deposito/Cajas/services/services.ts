import type { AxiosResponse } from "axios";
import type { ResponseServer } from "../../../../../interfaces/globalModels";
import type { IBuscarCaja } from "../types/types";
import { api } from "../../../../../api/axios";

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
        identificacion_bandeja ?? '')} &identificacion_caja=${String(
            identificacion_caja ?? ''
        )}&orden_caja=${String(orden_caja ?? '')}
            `;
    return await api.get<ResponseServer<IBuscarCaja[]>>(url);
};
