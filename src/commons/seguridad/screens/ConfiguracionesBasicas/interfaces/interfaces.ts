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