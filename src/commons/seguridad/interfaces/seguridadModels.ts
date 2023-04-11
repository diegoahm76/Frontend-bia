export interface Roles {
  id_rol: number;
  nombre_rol: string;
  descripcion_rol: string;
  Rol_sistema: boolean;
}

export interface IRolesInfo {
  roles: Roles[];
}
