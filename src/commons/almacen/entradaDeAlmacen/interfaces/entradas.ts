export interface crear_entrada {
  info_entrada: IInfoEntrada;
  info_items_entrada: IInfoItemEntrada[];
}

export interface IInfoEntrada {
  id_entrada_almacen: number | null;
  fecha_entrada: string | null;
  motivo: string | null;
  observacion: string | null;
  id_proveedor: number | null;
  id_tipo_entrada: number | null;
  id_bodega: number | null;
  valor_total_entrada: number;
}

export interface IInfoItemEntrada {
  id_entrada_local: string;
  id_item_entrada_almacen: number | null;
  id_entrada_almacen: number | null;
  id_bien?: number | null;
  id_unidad_medida_vida_util: number | null;
  codigo: string;
  nombre: string;
  cantidad?: number;
  id_bodega: number | null;
  numero_posicion: number;
  porcentaje_iva: number;
  id_bien_padre: number | null;
  valor_unitario: number;
  valor_residual: number | null;
  valor_iva: number;
  valor_total_item: number;
}

export interface anular_entrada { 
  justificacion_anulacion: string 
}

