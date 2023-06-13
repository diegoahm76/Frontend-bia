export interface Cargos {
  id_cargo: number;
  nombre: string;
  activo: boolean;
}
export interface CrearCargo {
  nombre: string;
}
export interface EditarCargo {
  nombre: string;
  activo: boolean;
}

// estado civil
export interface GetEstadoCivil {
  cod_estado_civil: string;
  nombre:           string;
  precargado:       boolean;
  activo:           boolean;
  item_ya_usado:    boolean;
}
export interface EditarEstadoCivil {
  cod_estado_civil: string;
  nombre:           string;
  activo:           boolean;
}

// tipo de documento
export interface TiposDoc {
  cod_tipo_documento: string;
  nombre:           string;
  precargado:       boolean;
  activo:           boolean;
  item_ya_usado:    boolean;
}
export interface EditarTiposDoc {
  nombre:           string;
  activo:           boolean;
}