export interface Roles {
  id_rol: string;
  nombre_rol: string;
  descripcion_rol: string;
  Rol_sistema: string;
}

export interface IRolesInfo {
  roles: Roles[];
}