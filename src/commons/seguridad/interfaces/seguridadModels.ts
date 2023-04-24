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

  id_persona: number,
  tipo_persona: string,
  tipo_documento: string,
  numero_documento: string,
  primer_nombre: string,
  segundo_nombre: string,
  primer_apellido: string,
  segundo_apellido: string,
  nombre_completo: string,
  razon_social: string,
  nombre_comercial: string,
  tiene_usuario: boolean
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
//  {
//   crear: { value: boolean, id: number },
//   actualizar: { value: boolean, id: number },
//   borrar: { value: boolean, id: number },
//   consultar: { value: boolean, id: number }
// }

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

export interface IRolesInfo {
  superUser: SuperUser[];
  roles: Roles[];
  rol: Rol
}

export interface SeguridadSlice {
  seguridad: IRolesInfo;
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