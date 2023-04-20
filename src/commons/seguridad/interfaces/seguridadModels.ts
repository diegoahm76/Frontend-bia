import {  type Dispatch, type SetStateAction } from 'react';
import type { IList } from '../../../interfaces/globalModels';

export interface DelegarSuper {
  tipo_documento_opt: IList[]; 
  tipo_documento: string; 
  loading: boolean; 
  get_selects_options: () => Promise<void>; 
  set_tipo_documento: Dispatch<SetStateAction<string>>;
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
  roles: Roles[]; 
  rol: Rol;
  users: Users[];
  persons: Persons[];
}

export interface SeguridadSlice {
  seguridad: ISeguridadInfo;
}
