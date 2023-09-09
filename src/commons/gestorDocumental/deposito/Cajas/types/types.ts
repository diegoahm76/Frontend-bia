export interface IBuscarCaja {
  identificacion_deposito?: number | null;
  id_deposito?: number | null;
  identificacion_estante?: string;
  id_estante?: number | null;
  identificacion_bandeja?: string;
  id_bandeja?: number | null;
  identificacion_caja?: string;
  id_caja?: number | null;
  orden_caja?: number | null;
  nombre_deposito?: string;
}
export interface ICarpetas {
    id_carpeta_caja: number;
    identificacion_por_caja: string;
    orden_ubicacion_por_caja: number;
    id_expediente: null;
    id_caja_bandeja: number;
    identificacion_caja: string;
}
export interface ICajas {
    id_caja_bandeja: number;
    identificacion_por_bandeja: string;
    orden_ubicacion_por_bandeja: number;
    id_bandeja_estante: number;
    identificacion_bandeja: string;
}

export interface PostCajas {
  id_bandeja_estante: number;
  identificacion_por_bandeja: string;
}
export interface IPutCajas {
  identificacion_bandeja_destino: string;
  identificacion_estante_destino: string;
  identificacion_deposito_destino: string;
}
export interface IPutOrdenCaja {
  identificacion_por_bandeja: string;
  orden_ubicacion_por_bandeja: number;
}
