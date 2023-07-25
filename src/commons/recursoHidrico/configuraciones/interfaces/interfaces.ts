export interface Cuenca {
  id_cuenca: number;
  nombre: string;
  precargado: boolean;
  activo: boolean;
  item_ya_usado: boolean;
}
export interface CrearCuenca {
  nombre: string;
}
export interface EditarCuenca {
  nombre: string;
  activo: boolean;
}

// estado civil
export interface Pozo {
  id_pozo: number;
  descripcion: string;
  cod_pozo: string;
  nombre: string;
  precargado: boolean;
  activo: boolean;
  item_ya_usado: boolean;
}
export interface EditarPozo {
  id_pozo: number;
  descripcion: string;
  cod_pozo: string;
  nombre: string;
  activo: boolean;
}
export interface Parametros {
  id_parametro: number;
  cod_tipo_parametro: string;
  nombre: string;
  unidad_de_medida: string;
  precargado: boolean;
  activo: boolean;
  item_ya_usado: boolean;
}
export interface EditarParametros {
  id_parametro: number;
  cod_tipo_parametro: string;
  nombre: string;
  unidad_de_medida: string;
  activo: boolean;
}