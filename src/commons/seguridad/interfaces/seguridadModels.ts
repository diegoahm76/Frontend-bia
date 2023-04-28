import { type Dispatch, type SetStateAction } from 'react';
import type { IList } from '../../../interfaces/globalModels';

export interface DelegarSuper {
  tipo_documento_opt: IList[];
  tipo_documento: string;
  loading: boolean;
  get_selects_options: () => Promise<void>;
  set_tipo_documento: Dispatch<SetStateAction<string>>;
}

export interface InfoPersonal {
  id_persona: number;
  tipo_persona: string;
  tipo_documento: string;
  numero_documento: string;
  primer_nombre: string;
  segundo_nombre: string;
  primer_apellido: string;
  segundo_apellido: string;
  nombre_completo: string;
  razon_social: string;
  nombre_comercial: string;
  tiene_usuario: boolean;
}

export interface Roles {
  subsistema: string;
  desc_subsistema: string;
  checked: boolean;
  modulos: Modulo[];
}

export interface Modulo {
  id_modulo: number;
  nombre_modulo: string;
  descripcion: string;
  ruta_formulario: string;
  nombre_icono: string;
  permisos: Acciones;
  checked: boolean;
}

export interface Acciones {
  crear?: Accion;
  actualizar?: Accion;
  consultar?: Accion;
  borrar?: Accion;
  anular?: Accion;
  ejecutar?: Accion;
}

export interface Accion {
  value: boolean;
  id: number;
}

export interface Permisos {
  subsistema: string;
  desc_subsistema: string;
  modulos: Modulos[];
}

export interface Modulos {
  id_modulo: number;
  nombre_modulo: string;
  descripcion: string;
  ruta_formulario: string;
  nombre_icono: string;
  permisos: Acciones[];
}

export interface PermisosRol {
  id_rol: number;
  id_permiso_modulo: number;
  id_permiso_modulo_rol?: number;
}

export interface RolCreated {
  id_rol: number;
  nombre_rol: string;
  descripcion_rol: string;
  Rol_sistema: boolean;
}

export interface SuperUser {
  id_persona: number;
  tipo_persona: string;
  tipo_documento: string;
  numero_documento: string;
  primer_nombre: string;
  segundo_nombre: string | null;
  primer_apellido: string;
  segundo_apellido: string | null;
  nombre_completo: string;
  razon_social: string | null;
  nombre_comercial: string | null;
  tiene_usuario: boolean;
}

export interface IRolesInfo {
  superUser: SuperUser[];
}
