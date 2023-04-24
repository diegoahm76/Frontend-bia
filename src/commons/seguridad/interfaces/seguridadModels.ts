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
  roles: [];
  // Estatus
  activo: boolean;
  activo_fecha_ultimo_cambio: string;
  activo_justificacion_cambio:string;
  bloqueado: boolean;
  bloqueado_fecha_ultimo_cambio: string;
  bloqueado_justificacion_cambio:string;
  // Otros datos
  fecha_creacion:string;
  fecha_activación_inicial:string;
  creado_desde_portal:boolean;
  persona_que_creo: string;
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
    tipo_usuario: string;
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
  // id_persona: number;
  // nombre_unidad_organizacional_actual: string;
  // tiene_usuario: boolean;
  // fecha_asignacion_unidad: string;
  // es_unidad_organizacional_actual: string;
  // cod_naturaleza_empresa: string;
  // direccion_notificacion_referencia: string;
  // fecha_cambio_representante_legal: string;
  // fecha_inicio_cargo_rep_legal: string;
  // fecha_inicio_cargo_actual: string;
  // fecha_a_finalizar_cargo_actual: string;
  // observaciones_vinculacion_cargo_actual: string;
  // fecha_ultim_actualizacion_autorizaciones: string;
  // fecha_creacion: string;
  // fecha_ultim_actualiz_diferente_crea: string;
  // id_cargo: string;
  // id_unidad_organizacional_actual: number;
  // id_persona_crea: string;
  // id_persona_ultim_actualiz_diferente_crea: string;
}
export interface Roles {
  id_rol: number;
  nombre_rol: string;
  descripcion_rol: string;
  Rol_sistema: boolean;
}

export interface Rol{
  rol: Roles;
  permisos: Permisos[];
}

export interface Permisos{
  subsistema: string,
  desc_subsistema: string,
  modulos: Modulos[]
}

export interface Modulos{
  id_modulo: number,
  nombre_modulo: string,
  descripcion: string,
  ruta_formulario: string,
  nombre_icono: string,
  permisos: Acciones[]
}

export interface Acciones{
  name: string, 
  value: boolean,
  id: number  
}

export interface User {
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
  roles: Roles[]; 
  rol: Rol;
  users: User[];
  persons: Persons[];
  action_admin_users: string;
  user_info: User
}

export interface SeguridadSlice {
  seguridad: ISeguridadInfo;
}
