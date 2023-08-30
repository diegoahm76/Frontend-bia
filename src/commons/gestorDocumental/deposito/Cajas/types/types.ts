export interface IBuscarCaja {
    identificacion_deposito?: number | null
    id_deposito?: number | null;
    identificacion_estante?: string;
    id_estante?: number | null;
    identificacion_bandeja?: string;
    id_bandeja?: number | null;
    identificacion_caja?: string;
    id_caja?: number | null;
    orden_caja?: number | null;
}
export interface ICarpetas {
    id_caja_bandeja: number | null;
    identificacion_por_bandeja: string;
    orden_ubicacion_por_bandeja: number | null;
    id_bandeja_estante: number | null;
}
export interface ICajas {
    id_caja_bandeja: number;
    identificacion_por_bandeja: string;
    orden_ubicacion_por_bandeja: number;
    id_bandeja_estante: number;
}
export interface PostCajas {
    id_bandeja_estante: number;
    identificacion_por_bandeja: string;
}