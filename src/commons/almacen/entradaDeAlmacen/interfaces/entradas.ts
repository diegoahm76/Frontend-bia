export interface IInfoEntrada {
  id_entrada_almacen: null;
  fecha_entrada: "2023-02-27 09:00:00";
  motivo: string;
  observacion: string;
  id_proveedor: 1;
  id_tipo_entrada: 3;
  id_bodega: 2;
  valor_total_entrada: 122323232.0;
}

export interface IInfoItemEntrada {
  id_item_entrada_almacen: null;
  id_entrada_almacen: null;
  id_bien: 30;
  cantidad: 1000;
  id_bodega: 1;
  numero_posicion: 1;
  porcentaje_iva: 1;
  id_bien_padre: null;
  valor_unitario: 2000;
  valor_residual: null;
  valor_iva: 2;
  valor_total_item: 2200;
}
