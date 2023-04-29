import type{ Dispatch,  SetStateAction } from 'react';
import type { IList } from '../../../interfaces/globalModels';
// import { type Dayjs } from 'dayjs';

export interface DelegarSuper {
  tipo_documento_opt: IList[];
  tipo_documento: string;
  loading: boolean;
  get_selects_options: () => Promise<void>;
  set_tipo_documento: Dispatch<SetStateAction<string>>;
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

export type keys_object_search_user = 
| 'tipo_persona'
| 'nombre_usuario';
export interface DataAadminUser {
  tipo_persona: string;
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
  nombre_de_usuario?: string;
  imagen_usuario: string;
  // Tipo usuario y Roles
  tipo_usuario: string;
  roles: RolUser[];
  // Estatus
  activo: boolean;
  activo_fecha_ultimo_cambio: string | null;
  activo_justificacion_cambio:string | null;
  bloqueado: boolean;
  bloqueado_fecha_ultimo_cambio: string | null;
  bloqueado_justificacion_cambio:string | null;
  // Otros datos
  fecha_creacion:string;
  fecha_activación_inicial:string | null;
  creado_desde_portal:boolean;
  persona_que_creo: number | null;
}

export interface RolUser{
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
    data_register: DataAadminUser;
    has_user: boolean;
    is_exists: boolean;
    is_saving: boolean;
    is_search: boolean;
    loading: boolean;
    numero_documento: string;
    tipo_documento_opt: IList[];
    tipo_documento: string;
    tipo_persona_opt: IList[];
    tipo_persona: string;
    tipo_usuario_opt: IList[];
    activo: string;
    activo_opt: IList[];
    tipo_usuario: string;
    roles: RolUser[];
    // roles_opt: RolUser[];
    get_selects_options: () => Promise<void>;
    set_data_register: Dispatch<SetStateAction<DataAadminUser>>;
    set_has_user: Dispatch<SetStateAction<boolean>>;
    set_is_exists: Dispatch<SetStateAction<boolean>>;
    set_is_saving: Dispatch<SetStateAction<boolean>>;
    set_is_search: Dispatch<SetStateAction<boolean>>;
    set_numero_documento: Dispatch<SetStateAction<string>>  
    set_tipo_documento: Dispatch<SetStateAction<string>>;
    set_tipo_persona: Dispatch<SetStateAction<string>>;
    set_tipo_usuario: Dispatch<SetStateAction<string>>;
    set_activo: Dispatch<SetStateAction<string>>;
  }

  export interface EstadoCivil {
    cod_estado_civil?: string;
    nombre: string;
    precargado: boolean;
    activo: boolean;
    item_ya_usado: boolean;
    cod_tipo_documento?: string;
  }
export interface InfoPersonal {
  id_persona:	number,
  tipo_persona:	string,
  tipo_documento:	string,
  numero_documento:	string,
  primer_nombre:	string,
  segundo_nombre:	string,
  primer_apellido:	string,
  segundo_apellido:	string,
  nombre_completo:	string,
  razon_social:	string,
  nombre_comercial:	string,
  tiene_usuario:	boolean
}

export interface InfoUsuario {
  id_usuario: number,
  nombre_de_usuario: string,
  persona: number,
  tipo_persona: string,
  numero_documento: string,
  primer_nombre: string,
  primer_apellido: string,
  nombre_completo: string,
  razon_social: string,
  nombre_comercial: string,
  is_superuser: false
}

export interface Roles {
  id_rol: number;
  nombre_rol: string;
  descripcion_rol: string;
  Rol_sistema: boolean;
}

export interface Rol {
  rol: Roles;
  permisos: Permisos[];
}

export interface Permisos {
  subsistema: string,
  desc_subsistema: string,
  modulos: Modulos[]
}

export interface Modulos {
  id_modulo: number,
  nombre_modulo: string,
  descripcion: string,
  ruta_formulario: string,
  nombre_icono: string,
  permisos: Acciones[]
}

export interface Acciones {
  name: string,
  value: boolean,
  id: number
}




export interface SeguridadSlice {
  seguridad: ISeguridadInfo;
}


export interface Users {
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
  roles: Array<{
    id_rol: number;
    nombre_rol: string;
  }>;
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
  roles: Roles[]; 
  rol: Rol;
  users: Users[];
  persons: Persons[];
  action_admin_users: string;
  data_user_search: InfoUsuario;
  data_person_search: InfoPersonal;
  user_info: Users;
}

export interface SuperUser {
  id_persona: number,
  tipo_persona: string,
  tipo_documento: string,
  numero_documento: string,
  primer_nombre: string,
  segundo_nombre: string | null,
  primer_apellido: string,
  segundo_apellido: string | null,
  nombre_completo: string,
  razon_social: string | null,
  nombre_comercial: string | null,
  tiene_usuario: boolean
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