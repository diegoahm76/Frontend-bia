import type { Dayjs } from 'dayjs';
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
  telefono_empresa_2: string | null;
  sexo: string;
  estado_civil: string | EstadoCivil;
  pais_nacimiento: string;
  email_empresarial: string;
  telefono_fijo_residencial: string | null;
  pais_residencia: string;
  municipio_residencia: string;
  direccion_residencia: string;
  direccion_laboral: string;
  direccion_residencia_ref: string;
  cod_municipio_laboral_nal: string;
  acepta_notificacion_sms: boolean;
  acepta_notificacion_email: boolean;
  acepta_tratamiento_datos: boolean;
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
  show_password: boolean;
  fecha_nacimiento: Dayjs | null;
  error_email: boolean;
  error_password: boolean;
  is_saving: boolean;
  is_search: boolean;
  message_error_password: string;
  data_register: IPerson;
  is_exists: boolean;
  error_phone: boolean;
  has_user: boolean;
  set_has_user: Dispatch<SetStateAction<boolean>>;
  set_error_error_phone: Dispatch<SetStateAction<boolean>>;
  set_is_exists: Dispatch<SetStateAction<boolean>>;
  set_fecha_nacimiento: Dispatch<SetStateAction<Dayjs | null>>;
  set_error_email: Dispatch<SetStateAction<boolean>>;
  set_error_password: Dispatch<SetStateAction<boolean>>;
  set_is_saving: Dispatch<SetStateAction<boolean>>;
  set_is_search: Dispatch<SetStateAction<boolean>>;
  set_message_error_password: Dispatch<SetStateAction<string>>;
  set_data_register: Dispatch<SetStateAction<IPerson>>;
  set_tipo_persona: Dispatch<SetStateAction<string>>;
  set_tipo_documento: Dispatch<SetStateAction<string>>;
  set_show_password: Dispatch<SetStateAction<boolean>>;
  get_selects_options: () => Promise<void>;
  validate_exits: (numero_documento: string) => Promise<void>;
  handle_click_show_password: () => void;
  validate_password: (string: string) => boolean;
  handle_change_checkbox: (event: ChangeEvent<HTMLInputElement>) => void;
}

export interface InfoPersona extends IPerson {
  id_persona: number;
  nombre_unidad_organizacional_actual: string;
  tiene_usuario: boolean;
  fecha_asignacion_unidad: null;
  es_unidad_organizacional_actual: null;
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
