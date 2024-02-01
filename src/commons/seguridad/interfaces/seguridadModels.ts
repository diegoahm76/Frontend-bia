import {
  type BaseSyntheticEvent,
  type Dispatch,
  type SetStateAction,
} from 'react';
import type {
  FieldErrors,
  UseFormRegister,
  UseFormReset,
} from 'react-hook-form';
import type { DataPersonas, IList } from '../../../interfaces/globalModels';
import {
  type AutocompleteChangeDetails,
  type AutocompleteChangeReason,
  type SelectChangeEvent,
} from '@mui/material';

export interface IList2 {
  value: number;
  label: string;
}

export interface FormValuesSearchPerson {
  tipo_persona: string;
  tipo_documento: string;
  numero_documento: string;
  primer_nombre: string;
  primer_apellido: string;
}

export interface FormValuesSearchUser {
  tipo_persona: string;
  nombre_usuario: string;
}

export type keys_object_search_person =
  | 'tipo_persona'
  | 'tipo_documento'
  | 'numero_documento'
  | 'primer_nombre'
  | 'primer_apellido';

export type keys_object_search_user = 'tipo_persona' | 'nombre_usuario';
export interface DataAadminUser {
  tipo_persona: string;
  // id_persona: number;
  // Datos basicos
  tipo_documento: string;
  numero_documento: string;
  // Datos personales
  // - Juridica
  razon_social: string | null;
  nombre_comercial: string | null;
  // - Natural
  primer_apellido: string;
  primer_nombre: string;
  segundo_apellido: string | null;
  segundo_nombre: string | null;
  // Datos de acceso
  nombre_de_usuario: string;
  imagen_usuario: any;
  // Tipo usuario y Roles
  tipo_usuario: string;
  roles: IList2[];
  // Estatus
  activo: boolean;
  activo_fecha_ultimo_cambio: string | null;
  activo_justificacion_cambio: string | null;
  bloqueado: boolean;
  bloqueado_fecha_ultimo_cambio: string | null;
  bloqueado_justificacion_cambio: string | null;
  // Otros datos
  fecha_creacion: string;
  fecha_activación_inicial: string | null;
  creado_desde_portal: boolean;
  persona_que_creo: string | null;
  sucursal_defecto: any;
}

export interface DataCreateUser {
  nombre_de_usuario?: string;
  persona: number;
  tipo_usuario: string;
  roles: RolUser[];
  redirect_url: string;
  profile_img: string;
}

export interface DataEditUser {
  is_active: boolean;
  is_blocked: boolean;
  tipo_usuario: string;
  roles: RolUser[];
  profile_img: string;
  justificacion_activacion: string | null;
  justificacion_bloqueo: string | null;
}

export interface RolUser {
  id_rol: number;
  nombre_rol: string;
}

export type keys_object =
  | 'tipo_persona'
  | 'tipo_documento'
  | 'numero_documento'
  | 'razon_social'
  | 'nombre_comercial'
  | 'primer_apellido'
  | 'primer_nombre'
  | 'segundo_apellido'
  | 'segundo_nombre'
  | 'nombre_de_usuario'
  | 'imagen_usuario'
  | 'tipo_usuario'
  | 'roles'
  | 'activo'
  | 'activo_fecha_ultimo_cambio'
  | 'activo_justificacion_cambio'
  | 'bloqueado'
  | 'bloqueado_fecha_ultimo_cambio'
  | 'bloqueado_justificacion_cambio'
  | 'fecha_creacion'
  | 'fecha_activación_inicial'
  | 'creado_desde_portal'
  | 'persona_que_creo';

export interface UserCreate {
  detail: string;
  success: boolean;
}
export interface AdminUserHook {
  set_value_admin_user: any;
  errors_admin_users: FieldErrors<DataAadminUser>;
  action_admin_users: string;
  user_info: Users;
  loading_create_or_update: boolean;
  loading_inputs: boolean;
  selected_image: string | ArrayBuffer | null;
  check_user_is_active: boolean;
  check_user_is_blocked: boolean;
  data_disponible: boolean;
  historial_cambios_estado_is_active: boolean;
  data_register: DataAadminUser;
  loading: boolean;
  tipo_documento: string;
  tipo_documento_opt: IList[];
  numero_documento: string;
  tipo_persona: string;
  tipo_persona_opt: IList[];
  tipo_usuario_opt: IList[];
  tipo_usuario: string;
  activo: boolean;
  activo_opt: IList[];
  bloqueado: boolean;
  bloqueado_opt: IList[];
  roles: IList2[];
  roles_opt: IList2[];
  // rol_fixed: IList2[];
  users_x_person_is_active: boolean;
  set_historial_cambios_estado_is_active: Dispatch<SetStateAction<boolean>>;
  set_users_x_person_is_active: Dispatch<SetStateAction<boolean>>;
  on_submit: (
    e?: BaseSyntheticEvent<object, any, any> | undefined
  ) => Promise<void>;
  on_change: (e: SelectChangeEvent<string>) => void;
  handle_change_autocomplete: (
    event: React.SyntheticEvent<Element, Event>,
    value: IList2[],
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<IList2>
  ) => void;
  handle_change: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handle_image_select: (event: React.ChangeEvent<HTMLInputElement>) => void;
  register_admin_user: UseFormRegister<DataAadminUser>;
  set_data_register: Dispatch<SetStateAction<DataAadminUser>>;
  set_tipo_documento: Dispatch<SetStateAction<string>>;
  set_tipo_persona: Dispatch<SetStateAction<string>>;
  set_data_disponible: Dispatch<SetStateAction<boolean>>;
  set_loading_inputs: Dispatch<SetStateAction<boolean>>;
  set_numero_documento: Dispatch<SetStateAction<string>>;
  reset_admin_user: UseFormReset<DataAadminUser>;
  clean_user_info: () => void;
  watch_admin_user: any;

  setListaSucursales: any;
  listaSucursales: any;
  sucursalSelected: any;
  setSucursalSelected: any;
}

export interface EstadoCivil {
  cod_estado_civil?: string;
  nombre: string;
  precargado: boolean;
  activo: boolean;
  item_ya_usado: boolean;
  cod_tipo_documento?: string;
}

export interface UsersXPerson {
  id_usuario: number;
  nombre_de_usuario: string;
}

export interface InfoUsuario {
  id_usuario: number;
  nombre_de_usuario: string;
  persona: number;
  tipo_persona: string;
  numero_documento: string;
  primer_nombre: string;
  primer_apellido: string;
  nombre_completo: string;
  razon_social: string;
  nombre_comercial: string;
  is_superuser: false;
}

export interface SeguridadSlice {
  seguridad: ISeguridadInfo;
}

export interface Users {
  descripcion_sucursal_empresa: any;
  id_sucursal_empresa: any;
  id_usuario: number;
  nombre_de_usuario: string;
  persona: number;
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
  is_active: boolean;
  fecha_ultimo_cambio_activacion: string | null;
  justificacion_ultimo_cambio_activacion: string | null;
  is_blocked: boolean;
  fecha_ultimo_cambio_bloqueo: string | null;
  justificacion_ultimo_cambio_bloqueo: string | null;
  tipo_usuario: string;
  profile_img: string;
  creado_por_portal: boolean;
  created_at: string;
  activated_at: string | null;
  id_usuario_creador: number | null;
  primer_nombre_usuario_creador: string | null;
  primer_apellido_usuario_creador: string | null;
  roles: IList2[];
}

export interface Persons {
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

export interface ISeguridadInfo {
  superUser: SuperUser[];
  roles: RolUser[];
  rol: Rol;
  users: Users[];
  persons: Persons[];
  action_admin_users: string;
  data_user_search: InfoUsuario;
  data_person_search: InfoPersonal;
  user_info: Users;
  legal_person: DataPersonas;
  
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

export interface DatosRestringidos {
  tipo_documento: string;
  numero_documento: string;
  primer_nombre: string;
  segundo_nombre: string;
  primer_apellido: string;
  segundo_apellido: string;
  ruta_archivo_soporte: FormData;
  justificacion: string;
}
export interface DatosRestringidos_juridica {
  numero_documento: string;
  razon_social: string;
  nombre_comercial: string;
  cod_naturaleza_empresa: string | number;
  ruta_archivo_soporte: FormData;
  justificacion: string;
}

export interface HistoricoCambioEstadosUser {
  id_historico: number;
  nombre_operador: string;
  cod_operacion: string;
  fecha_operacion: string;
  justificacion: string;
  id_usuario_afectado: number;
  usuario_operador: number;
}

export interface DelegarSuper {
  tipo_documento_opt: IList[];
  tipo_documento: string;
  loading: boolean;
  get_selects_options: () => Promise<void>;
  set_tipo_documento: Dispatch<SetStateAction<string>>;
}

export interface InfoPersonal {
  // id_usuario: number;
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
  usuarios: UsersXPerson[];
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

export interface PermisosRolEdit {
  id_permisos_modulo: number;
}

export interface Rol {
  id_rol: number;
  nombre_rol: string;
  descripcion_rol: string;
  Rol_sistema: boolean;
}

export interface IRolesInfo {
  superUser: SuperUser[];
}

export interface RolSlice {
  rol: Rol;
  permisos: Permisos[];
}

// export interface Acciones {
//   name: string;
//   value: boolean;
//   id: number;
// }

export interface UsersRol {
  id_rol?: number;
  id_usuario?: number;
  nombre_usuario: string;
  id_persona?: number;
  nombre_persona: string;
}
