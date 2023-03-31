import type { Dayjs } from 'dayjs';
import type { ChangeEvent, Dispatch, SetStateAction } from 'react';
import type { IList } from '../../../interfaces/globalModels';

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
  is_blocked: boolean;
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
  departamento_expedicion: any;
}

export interface IAuth {
  confirmacionEmail: boolean;
  confirmacionCelular: boolean;
}
export interface IObjectSend {
  paisNotificacion: any;
  municipioNotificacion: string | null;
}

export type keys_object =
  | 'acepta_notificacion_email'
  | 'acepta_notificacion_sms'
  | 'acepta_tratamiento_datos'
  | 'cod_municipio_expedicion_id'
  | 'cod_municipio_laboral_nal'
  | 'cod_municipio_notificacion_nal'
  | 'confirmar_celular'
  | 'confirmar_email'
  | 'departamento_expedicion'
  | 'departamento_nacimiento'
  | 'departamento_residencia'
  | 'digito_verificacion'
  | 'direccion_laboral'
  | 'direccion_notificaciones'
  | 'direccion_residencia_ref'
  | 'direccion_residencia'
  | 'dpto_notifiacion'
  | 'email_empresarial'
  | 'email'
  | 'estado_civil'
  | 'fecha_nacimiento'
  | 'municipio_residencia'
  | 'nombre_comercial'
  | 'nombre_de_usuario'
  | 'numero_documento'
  | 'pais_nacimiento'
  | 'pais_notificacion'
  | 'pais_residencia'
  | 'password'
  | 'primer_apellido'
  | 'primer_nombre'
  | 'razon_social'
  | 'representante_legal'
  | 'require_nombre_comercial'
  | 'segundo_apellido'
  | 'segundo_nombre'
  | 'sexo'
  | 'telefono_celular_empresa'
  | 'telefono_celular'
  | 'telefono_empresa_2'
  | 'telefono_fijo_residencial'
  | 'tipo_documento'
  | 'tipo_persona'
  | 'cod_naturaleza_empresa'
  | 'ubicacion_georeferenciada';

export interface DataRegistePortal {
  acepta_notificacion_email: boolean;
  acepta_notificacion_sms: boolean;
  acepta_tratamiento_datos: boolean;
  cod_municipio_expedicion_id: string;
  cod_municipio_laboral_nal: string;
  cod_municipio_notificacion_nal: string;
  cod_pais_nacionalidad_empresa: string;
  cod_naturaleza_empresa: string;
  direccion_notificacion_referencia: string;
  fecha_inicio_cargo_rep_legal: string;
  telefono_empresa: string;
  confirmar_celular: string;
  confirmar_email: string;
  confirmar_password?: string;
  departamento_expedicion: string;
  departamento_nacimiento: string;
  departamento_residencia: string;
  digito_verificacion: string | null;
  direccion_laboral: string;
  direccion_notificaciones: string;
  direccion_residencia_ref: string;
  direccion_residencia: string;
  complemeto_direccion: string;
  email_empresarial: string;
  email: string;
  estado_civil: string | EstadoCivil;
  fecha_nacimiento: string | number | Date;
  municipio_residencia: string;
  nombre_comercial: string | null;
  pais_notificacion: string;
  dpto_notifiacion: string;
  nombre_de_usuario?: string;
  numero_documento: string;
  pais_nacimiento: string;
  pais_residencia: string;
  password?: string;
  primer_apellido: string;
  primer_nombre: string;
  razon_social: string | null;
  representante_legal: string | null;
  require_nombre_comercial: boolean;
  segundo_apellido: string | null;
  segundo_nombre: string | null;
  sexo: string;
  telefono_celular_empresa: string | null;
  telefono_celular: string;
  telefono_empresa_2: string | null;
  telefono_fijo_residencial: string | null;
  tipo_documento: string;
  tipo_persona: string;
  ubicacion_georeferenciada: string;
  redirect_url: string;
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
  ciudad_expedicion: string;
  ciudad_notificacion: string;
  ciudad_residencia: string;
  ciudades_opt: IList[];
  ciudades_residencia_opt: IList[];
  ciudad_notificacion_opt: IList[];
  data_register: DataRegistePortal;
  departamento_expedicion: string;
  departamento_residencia: string;
  departamentos_opt: IList[];
  dpto_notifiacion_opt: IList[];
  dpto_notifiacion: string;
  dpts_residencia_opt: IList[];
  error_email: boolean;
  error_password: boolean;
  error_phone: boolean;
  estado_civil_opt: IList[];
  estado_civil: string;
  fecha_nacimiento: Dayjs | null;
  genero_opt: IList[];
  genero: string;
  has_user: boolean;
  is_exists: boolean;
  is_saving: boolean;
  is_search: boolean;
  loading: boolean;
  message_error_password: string;
  pais_nacimiento: string;
  pais_notificacion: string;
  pais_residencia: string;
  paises_options: IList[];
  requiere_nombre_comercial: boolean;
  show_password: boolean;
  tipo_documento_opt: IList[];
  tipo_documento: string;
  tipo_persona_opt: IList[];
  tipo_persona: string;
  get_selects_options: () => Promise<void>;
  handle_change_checkbox: (event: ChangeEvent<HTMLInputElement>) => void;
  handle_click_show_password: () => void;
  set_ciudad_expedicion: Dispatch<SetStateAction<string>>;
  set_ciudad_notificacion_opt: Dispatch<SetStateAction<IList[]>>;
  set_ciudad_notificacion: Dispatch<SetStateAction<string>>;
  set_ciudad_residencia: Dispatch<SetStateAction<string>>;
  set_ciudades_opt: Dispatch<SetStateAction<IList[]>>;
  set_ciudades_residencia_opt: Dispatch<SetStateAction<IList[]>>;
  set_data_register: Dispatch<SetStateAction<DataRegistePortal>>;
  set_departamento: Dispatch<SetStateAction<string>>;
  set_departamentos_opt: Dispatch<SetStateAction<IList[]>>;
  set_dpto_notifiacion_opt: Dispatch<SetStateAction<IList[]>>;
  set_dpto_notifiacion: Dispatch<SetStateAction<string>>;
  set_dpto_residencia_opt: Dispatch<SetStateAction<IList[]>>;
  set_dpto_residencia: Dispatch<SetStateAction<string>>;
  set_error_email: Dispatch<SetStateAction<boolean>>;
  set_error_error_phone: Dispatch<SetStateAction<boolean>>;
  set_error_password: Dispatch<SetStateAction<boolean>>;
  set_estado_civil_opt: Dispatch<SetStateAction<IList[]>>;
  set_estado_civil: Dispatch<SetStateAction<string>>;
  set_fecha_nacimiento: Dispatch<SetStateAction<Dayjs | null>>;
  set_genero_opt: Dispatch<SetStateAction<IList[]>>;
  set_genero: Dispatch<SetStateAction<string>>;
  set_has_user: Dispatch<SetStateAction<boolean>>;
  set_is_exists: Dispatch<SetStateAction<boolean>>;
  set_is_saving: Dispatch<SetStateAction<boolean>>;
  set_is_search: Dispatch<SetStateAction<boolean>>;
  set_message_error_password: Dispatch<SetStateAction<string>>;
  set_pais_nacimiento: Dispatch<SetStateAction<string>>;
  set_pais_notificacion: Dispatch<SetStateAction<string>>;
  set_pais_residencia: Dispatch<SetStateAction<string>>;
  set_show_password: Dispatch<SetStateAction<boolean>>;
  set_tipo_documento: Dispatch<SetStateAction<string>>;
  set_tipo_persona: Dispatch<SetStateAction<string>>;
  validate_exits: (numero_documento: string) => Promise<void>;
}

export interface InfoPersona extends DataRegistePortal {
  id_persona: number;
  nombre_unidad_organizacional_actual: string;
  tiene_usuario: boolean;
  fecha_asignacion_unidad: string;
  es_unidad_organizacional_actual: string;
  cod_naturaleza_empresa: string;
  direccion_notificacion_referencia: string;
  fecha_cambio_representante_legal: string;
  fecha_inicio_cargo_rep_legal: string;
  fecha_inicio_cargo_actual: string;
  fecha_a_finalizar_cargo_actual: string;
  observaciones_vinculacion_cargo_actual: string;
  fecha_ultim_actualizacion_autorizaciones: string;
  fecha_creacion: string;
  fecha_ultim_actualiz_diferente_crea: string;
  id_cargo: string;
  id_unidad_organizacional_actual: number;
  id_persona_crea: string;
  id_persona_ultim_actualiz_diferente_crea: string;
}

export interface EstadoCivil {
  cod_estado_civil?: string;
  nombre: string;
  precargado: boolean;
  activo: boolean;
  item_ya_usado: boolean;
  cod_tipo_documento?: string;
}

export interface UserCreate {
  detail: string;
  success: boolean;
}

export interface DataUnlockUser {
  nombre_de_usuario: string;
  numero_documento: string;
  telefono_celular: string;
  email: string;
  fecha_nacimiento: string;
  redirect_url: string;
}
