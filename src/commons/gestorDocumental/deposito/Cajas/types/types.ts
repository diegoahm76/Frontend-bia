export interface IBuscarCaja {
    id_deposito:             number | null
    id_estante:              number | null
    id_bandeja:              number | null
    id_caja:                 number | null
    identificacion_deposito: string;
    identificacion_estante:  string;
    identificacion_bandeja:  string;
    identificacion_caja:     string;
    orden_caja:              number | null
}