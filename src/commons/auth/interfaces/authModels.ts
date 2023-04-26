import type { Dayjs } from 'dayjs';
import type { Dispatch, SetStateAction } from 'react';
import type { IList } from '../../../interfaces/globalModels';
import type {
  FieldErrors,
  FieldValues,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch
} from 'react-hook-form';

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
  permisos: Menu[];
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
  nombre?: string;
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
  | 'cod_pais_nacionalidad_empresa'
  | 'tipo_documento_rep'
  | 'numero_documento_rep'
  | 'nombre_rep'
  | 'celular_rep'
  | 'direccion_rep'
  | 'ciudad_rep'
  | 'email_rep'
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
  tipo_documento_rep: string;
  numero_documento_rep: string;
  nombre_rep: string;
  celular_rep: string;
  direccion_rep: string;
  ciudad_rep: string;
  email_rep: string;
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
  representante_legal: number | null;
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

export interface Menu {
  subsistema: string;
  desc_subsistema: string;
  expanded: boolean;
  menus: MenuElement[];
}

export interface MenuElement {
  id_menu: number;
  desc_subsistema: string;
  nombre: string;
  nivel_jerarquico: number;
  orden_por_padre: number;
  subsistema: string;
  id_menu_padre: number | null;
  modulos: Modulo[];
  expanded: boolean;
  submenus: MenuElement[];
}

export interface Modulo {
  id_modulo: number;
  nombre_modulo: string;
  descripcion: string;
  subsistema: string;
  desc_subsistema: string;
  ruta_formulario: string;
  nombre_icono: string;
  id_menu: number;
  permisos: Permisos;
  expanded: boolean;
}

export interface Permisos {
  crear?: boolean;
  consultar: boolean;
  actualizar?: boolean;
  borrar?: boolean;
  ejecutar?: boolean;
}

export interface ReisterHook {
  ciudad_expedicion: string;
  ciudad_notificacion_opt: IList[];
  ciudad_notificacion: string;
  ciudad_residencia: string;
  ciudades_opt: IList[];
  ciudades_residencia_opt: IList[];
  data_register: DataRegistePortal;
  departamento_expedicion: string;
  departamento_residencia: string;
  departamentos_opt: IList[];
  documento_rep: string;
  dpto_notifiacion_opt: IList[];
  dpto_notifiacion: string;
  dpts_residencia_opt: IList[];
  error_email: boolean;
  error_password: boolean;
  error_phone: boolean;
  errors: FieldErrors<FieldValues>;
  estado_civil_opt: IList[];
  estado_civil: string;
  fecha_nacimiento: Dayjs | null;
  fecha_rep_legal: Dayjs | null;
  genero_opt: IList[];
  genero: string;
  is_avaiable: boolean;
  is_exists: boolean;
  is_error: boolean;
  is_saving: boolean;
  is_search: boolean;
  is_valid: boolean;
  loading: boolean;
  message_error_password: string;
  message_no_person: string;
  message_error: string;
  nacionalidad_emp: string;
  naturaleza_emp_opt: IList[];
  naturaleza_emp: string;
  nombre_representante: string;
  numero_documento: string;
  pais_nacimiento: string;
  pais_residencia: string;
  paises_options: IList[];
  show_password: boolean;
  tipo_documento_opt: IList[];
  tipo_documento_rep: string;
  tipo_documento: string;
  tipo_persona_opt: IList[];
  tipo_persona: string;
  get_selects_options: () => Promise<void>;
  handle_click_show_password: () => void;
  handle_submit: UseFormHandleSubmit<FieldValues>;
  register: UseFormRegister<FieldValues>;
  set_ciudad_expedicion: Dispatch<SetStateAction<string>>;
  set_ciudad_notificacion_opt: Dispatch<SetStateAction<IList[]>>;
  set_ciudad_notificacion: Dispatch<SetStateAction<string>>;
  set_ciudad_residencia: Dispatch<SetStateAction<string>>;
  set_ciudades_opt: Dispatch<SetStateAction<IList[]>>;
  set_ciudades_residencia_opt: Dispatch<SetStateAction<IList[]>>;
  set_data_register: Dispatch<SetStateAction<DataRegistePortal>>;
  set_departamento: Dispatch<SetStateAction<string>>;
  set_departamentos_opt: Dispatch<SetStateAction<IList[]>>;
  set_documento_rep: Dispatch<SetStateAction<string>>;
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
  set_fecha_rep_legal: Dispatch<SetStateAction<Dayjs | null>>;
  set_genero_opt: Dispatch<SetStateAction<IList[]>>;
  set_genero: Dispatch<SetStateAction<string>>;
  set_is_exists: Dispatch<SetStateAction<boolean>>;
  set_is_saving: Dispatch<SetStateAction<boolean>>;
  set_is_search: Dispatch<SetStateAction<boolean>>;
  set_message_error_password: Dispatch<SetStateAction<string>>;
  set_message_no_person: Dispatch<SetStateAction<string>>;
  set_nacionalidad_emp: Dispatch<SetStateAction<string>>;
  set_naturaleza_emp: Dispatch<SetStateAction<string>>;
  set_nombre_representante: Dispatch<SetStateAction<string>>;
  set_numero_documento: Dispatch<SetStateAction<string>>;
  set_pais_nacimiento: Dispatch<SetStateAction<string>>;
  set_pais_residencia: Dispatch<SetStateAction<string>>;
  set_show_password: Dispatch<SetStateAction<boolean>>;
  set_tipo_documento_rep: Dispatch<SetStateAction<string>>;
  set_tipo_documento: Dispatch<SetStateAction<string>>;
  set_tipo_persona: Dispatch<SetStateAction<string>>;
  set_value: UseFormSetValue<FieldValues>;
  validate_exits_representante: (numero_documento: string) => Promise<void>;
  validate_exits: (numero_documento: string) => Promise<void>;
  watch: UseFormWatch<FieldValues>;
}

export interface DataRegisterPersonaN {
  tipo_persona: string;
  tipo_documento: string;
  numero_documento: string;
  cod_municipio_expedicion_id: string;
  nombre_comercial: string;
  primer_nombre: string;
  segundo_nombre: string;
  primer_apellido: string;
  segundo_apellido: string;
  fecha_nacimiento: string;
  email: string;
  telefono_celular: string;
  telefono_empresa_2: null | string;
  sexo: string;
  estado_civil: string;
  pais_nacimiento: string;
  email_empresarial: string;
  ubicacion_georeferenciada: string;
  telefono_fijo_residencial: null | string;
  pais_residencia: string;
  municipio_residencia: string;
  direccion_residencia: string;
  direccion_laboral: string;
  direccion_residencia_ref: string;
  direccion_notificaciones: string;
  cod_municipio_laboral_nal: string;
  cod_municipio_notificacion_nal: string;
  acepta_notificacion_sms: boolean;
  acepta_notificacion_email: boolean;
  acepta_tratamiento_datos: boolean;
  nombre_de_usuario: string;
  password: string;
  redirect_url: string;
}

export interface InfoPersonaComplete {
  id_persona: number;
  tipo_documento: EstadoCivil;
  estado_civil: EstadoCivil;
  representante_legal: string | null;
  nombre_unidad_organizacional_actual: string | null;
  tiene_usuario: boolean;
  tipo_persona: string;
  numero_documento: string;
  digito_verificacion: string | null;
  primer_nombre: string;
  segundo_nombre: string | null;
  primer_apellido: string;
  segundo_apellido: string | null;
  nombre_comercial: string | null;
  razon_social: string;
  pais_residencia: string | null;
  municipio_residencia: string | null;
  direccion_residencia: string | null;
  direccion_residencia_ref: string | null;
  ubicacion_georeferenciada: string;
  direccion_laboral: string | null;
  direccion_notificaciones: string | null;
  pais_nacimiento: string | null;
  fecha_nacimiento: string;
  sexo: string | null;
  fecha_asignacion_unidad: string | null;
  es_unidad_organizacional_actual: string | null;
  email: string;
  email_empresarial: string;
  telefono_fijo_residencial: string;
  telefono_celular: string | null;
  telefono_empresa: string | null;
  cod_municipio_laboral_nal: string | null;
  cod_municipio_notificacion_nal: string | null;
  telefono_celular_empresa: string | null;
  telefono_empresa_2: string | null;
  cod_pais_nacionalidad_empresa: string | null;
  acepta_notificacion_sms: boolean;
  acepta_notificacion_email: boolean;
  acepta_tratamiento_datos: boolean;
  cod_naturaleza_empresa: string | null;
  direccion_notificacion_referencia: string | null;
  fecha_cambio_representante_legal: string | null;
  fecha_inicio_cargo_rep_legal: string | null;
  fecha_inicio_cargo_actual: string | null;
  fecha_a_finalizar_cargo_actual: string | null;
  observaciones_vinculacion_cargo_actual: string | null;
  fecha_ultim_actualizacion_autorizaciones: string | null;
  fecha_creacion: string;
  fecha_ultim_actualiz_diferente_crea: string | null;
  id_cargo: string | null;
  id_unidad_organizacional_actual: string | null;
  cod_municipio_expedicion_id: string | null;
  id_persona_crea: string | null;
  id_persona_ultim_actualiz_diferente_crea: string | null;
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

export interface ChangePassword {
  password: string;
  token: string | null;
  uidb64: string | null;
}

export interface DataUserRecover {
  nombre_de_usuario: string;
  tipo_envio: string;
  redirect_url: string;
}

export interface ResponseRecover {
  email: string;
  sms: string;
}
