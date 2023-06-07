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
  id:              number;
  cod_estado_civil: string;
  nombre:           string;
  precargado:       boolean;
  activo:           boolean;
  item_ya_usado:    boolean;
}