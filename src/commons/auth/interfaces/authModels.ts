import type { ChangeEvent, Dispatch, SetStateAction } from 'react';
import type {
  IList,
  Paises,
  TipoDocumento,
  TipoPersona
} from '../../../interfaces/globalModels';

export interface UserRol {
  id_rol: number;
  nombre_rol: string;
  descripcion_rol: string;
  Rol_sistema: boolean;
  representante_legal: boolean;
  nombre_empresa: null;
}

export interface LoginUser {
  nombre_de_usuario: string;
  password: string;
}

export interface ResponseAuth {
  userinfo: IUserInfo;
}

export interface IUserInfo {
  userinfo: UserData;
  permisos: Permisos[];
  representante_legal: any[];
  user_sesion: string;
  status: 'checking' | 'not-authenticated' | 'authenticated';
  error_message: string;
  open_dialog: boolean;
  entorno: 'C' | 'L';
  dialog_representante: boolean;
}

export interface UserData {
  email: string;
  nombre_de_usuario: string;
  tokens: Tokens;
  is_superuser: boolean;
  id_usuario: number;
  tipo_usuario: string;
  id_persona: number;
  tipo_persona: string;
}

export interface Tokens {
  refresh: string;
  access: string;
}

export interface AuthHook {
  set_is_captcha_valid: Dispatch<SetStateAction<boolean>>;
  set_open: Dispatch<SetStateAction<boolean>>;
  is_captcha_valid: boolean;
  open: boolean;
  reintentos?: number;
}

export interface SimpleDialogProps {
  open: boolean;
  on_close: (value: string) => void;
}

export interface IFormValues {
  fechaNacimiento: string | number | Date;
  tipo_persona: IList;
  digito_verificacion: string;
  municipioNotificacion: any;
  paisNotificacion?: any;
}

export interface IDatosNotificacion {
  departamento: any;
}

export interface IAuth {
  confirmacionEmail: boolean;
  confirmacionCelular: boolean;
}
export interface IRegister {
  tipo_persona: string;
  tipoDocumento: any;
  numero_documento: string;
  razonSocial: string;
  dv: string;
  primerNombre: string;
  segundoNombre: string;
  primerApellido: string;
  segundoApellido: string;
  fechaNacimiento: any;
  ubicacion_georeferenciada: string;
  pais_residencia: string;
  municipio: string;
  pais_nacimiento: string;
  sexo: string;
  eMail: string;
  cEmail: string;
  cod_pais_nacionalidad_empresa: string;
  celular: string;
  cCelular: string;
  nombreComercial: string;
  acepta_notificacion_sms: boolean;
  acepta_notificacion_email: boolean;
  acepta_tratamiento_datos: boolean;
  direccionNotificacion: string;
  municipioNotificacion: any;
}

export interface IObjectSend {
  paisNotificacion: any;
  municipioNotificacion: string | null;
}

export interface IPerson {
  tipo_persona: string;
  tipo_documento: string;
  numero_documento: string;
  digito_verificacion: string | null;
  nombre_comercial: string | null;
  primer_nombre: string;
  segundo_nombre: string | null;
  primer_apellido: string;
  segundo_apellido: string | null;
  fecha_nacimiento: string | number | Date;
  email: string;
  confirmar_email: string;
  telefono_celular: string;
  confirmar_celular: string;
  ubicacion_georeferenciada: string;
  razon_social: string | null;
  telefono_celular_empresa: string | null;
  direccion_notificaciones: string;
  representante_legal: string | null;
  cod_municipio_notificacion_nal: string | null;
  nombre_de_usuario?: string;
  password?: string;
  confirmar_password?: string;
  require_nombre_comercial: boolean;
}

export interface AuthSlice {
  auth: IUserInfo;
}

export interface Permisos {
  subsistema: string;
  desc_subsistema: string;
  expanded: boolean;
  modulos: Modulo[];
}

export interface Modulo {
  id_modulo: number;
  nombre_modulo: string;
  descripcion: string;
  ruta_formulario: string;
  nombre_icono: string;
  permisos: Acciones;
}

export interface Acciones {
  actualizar?: boolean;
  consultar: boolean;
  ejecutar?: boolean;
  crear?: boolean;
  borrar?: boolean;
}

export interface ReisterHook {
  paises_options: Paises[];
  tipo_documento_opt: TipoDocumento[];
  tipo_persona_opt: TipoPersona[];
  loading: boolean;
  requiere_nombre_comercial: boolean;
  tipo_persona: string;
  tipo_documento: string;
  set_tipo_persona: Dispatch<SetStateAction<string>>;
  set_tipo_documento: Dispatch<SetStateAction<string>>;
  get_selects_options: () => Promise<void>;
  handle_change_checkbox: (event: ChangeEvent<HTMLInputElement>) => void;
}

// Generated by https://quicktype.io
export interface Persona {
  id_persona: number;
  tipo_documento: EstadoCivil;
  estado_civil: EstadoCivil;
  representante_legal: string | null;
  nombre_unidad_organizacional_actual: string;
  tiene_usuario: boolean;
  tipo_persona: string;
  numero_documento: string;
  digito_verificacion: string;
  primer_nombre: string;
  segundo_nombre: string;
  primer_apellido: string;
  segundo_apellido: string;
  nombre_comercial: string;
  razon_social: string | null;
  pais_residencia: string;
  municipio_residencia: string;
  direccion_residencia: string;
  direccion_residencia_ref: string;
  ubicacion_georeferenciada: string;
  direccion_laboral: string;
  direccion_notificaciones: string;
  pais_nacimiento: string;
  fecha_nacimiento: string;
  sexo: string;
  fecha_asignacion_unidad: null;
  es_unidad_organizacional_actual: null;
  email: string;
  email_empresarial: null;
  telefono_fijo_residencial: null;
  telefono_celular: string;
  telefono_empresa: null;
  cod_municipio_laboral_nal: string;
  cod_municipio_notificacion_nal: string;
  telefono_celular_empresa: string | null;
  telefono_empresa_2: null;
  cod_pais_nacionalidad_empresa: null;
  acepta_notificacion_sms: boolean;
  acepta_notificacion_email: boolean;
  acepta_tratamiento_datos: boolean;
  cod_naturaleza_empresa: null;
  direccion_notificacion_referencia: null;
  fecha_cambio_representante_legal: string;
  fecha_inicio_cargo_rep_legal: null;
  fecha_inicio_cargo_actual: string;
  fecha_a_finalizar_cargo_actual: null;
  observaciones_vinculacion_cargo_actual: null;
  fecha_ultim_actualizacion_autorizaciones: string;
  fecha_creacion: string;
  fecha_ultim_actualiz_diferente_crea: string;
  id_cargo: null;
  id_unidad_organizacional_actual: number;
  cod_municipio_expedicion_id: null;
  id_persona_crea: null;
  id_persona_ultim_actualiz_diferente_crea: null;
}

export interface EstadoCivil {
  cod_estado_civil?: string;
  nombre: string;
  precargado: boolean;
  activo: boolean;
  item_ya_usado: boolean;
  cod_tipo_documento?: string;
}
