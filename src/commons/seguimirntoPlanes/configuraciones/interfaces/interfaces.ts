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
// Sector 
export interface ISector {
  id_sector?: number;
  nombre_sector: string;
  aplicacion: string;
  activo?: boolean;
  item_ya_usado?: boolean;
  registro_precargado?: boolean;
}
// Modalidades
export interface IModalidad {
  id_modalidad?: number;
  nombre_modalidad?: string;
  codigo_modalidad?: string;
  activo?: boolean;
  item_ya_usado?: boolean;
  registro_precargado?: boolean;
}

// Ubicaciones
export interface IUbicacion {
  id_ubicacion?: number;
  nombre_ubicacion?: string;
  codigo_ubicacion?: string;
  activo?: boolean;
  item_ya_usado?: boolean;
  registro_precargado?: boolean;
}

// Fuente de recursos PAA
export interface IFuenteRecursoPAA {
  id_fuente?: number;
  nombre_fuente?: string;
  activo?: boolean;
  item_ya_usado?: boolean;
  registro_precargado?: boolean;
}

// intervalos
export interface IIntervalo {
  id_intervalo?: number;
  nombre_intervalo?: string;
  activo?: boolean;
  item_ya_usado?: boolean;
  registro_precargado?: boolean;
}

// Estados VF
export interface IEstadoVF {
  id_estado?: number;
  nombre_estado?: string;
  activo?: boolean;
  item_ya_usado?: boolean;
  registro_precargado?: boolean;
}

// Còdigos UNSPSC

export interface ICodigoUnspsc {
  id_codigo?: number;
  codigo_unsp?: string;
  nombre_producto_unsp?: string;
  activo?: boolean;
  item_ya_usado?: boolean;
  registro_precargado?: boolean;
}