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

// Objetivos de desarrollo sostenible
export interface IObjetivoDesarrolloSostenible {
  id_objetivo?: number;
  nombre_objetivo?: string;
  activo?: boolean;
  item_ya_usado?: boolean;
  registro_precargado?: boolean;
}
// Tipo de ejes
export interface TiposEjes {
  id_tipo_eje?: number;
  nombre_tipo_eje?: string;
  activo?: boolean;
  item_ya_usado?: boolean;
  registro_precargado?: boolean;
}
export interface IEntidades {
  id_entidad?: number;
  nombre_entidad?: string;
  activo?: boolean;
  item_ya_usado?: boolean;
  registro_precargado?: boolean;
}
export interface IMedicion {
  id_medicion?: number;
  nombre_medicion?: string;
  activo?: boolean;
  item_ya_usado?: boolean;
  registro_precargado?: boolean;
}
// Tipos
export interface ITipos {
  id_tipo?: number;
  nombre_tipo?: string;
  activo?: boolean;
  item_ya_usado?: boolean;
  registro_precargado?: boolean;
}