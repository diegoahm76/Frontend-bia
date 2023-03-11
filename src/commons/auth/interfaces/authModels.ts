import { type Dispatch, type SetStateAction } from 'react';

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
  permisos: Permiso[];
  representante_legal: any[];
  user_sesion: string;
  status: 'checking' | 'not-authenticated' | 'authenticated';
  error_message: string;
  open_dialog: boolean;
  entorno: 'C' | 'L';
  dialog_representante: boolean;
}

export interface Permiso {
  id_permiso_modulo_rol: number;
  id_rol_id: number;
  id_permiso_modulo_id: number;
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
  get_permissions_by_rol: (param: number) => Promise<void>;
  submit_handler: (param: number) => Promise<void>;
  set_is_captcha_valid: Dispatch<SetStateAction<boolean>>;
  set_open: Dispatch<SetStateAction<boolean>>;
  is_captcha_valid: boolean;
  is_loading: boolean;
  roles: UserRol[];
  open: boolean;
  reintentos?: number;
}

export interface SimpleDialogProps {
  open: boolean;
  on_close: (value: string) => void;
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

export interface IList {
  label: string;
  value: string;
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
  // departamento: IList | string;
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
  telefono_celular: string;
  ubicacion_georeferenciada: string;
  razon_social: string;
  telefono_celular_empresa: string;
  direccion_notificaciones: string;
  representante_legal: string;
  cod_municipio_notificacion_nal: string | null;
}

export interface AuthSlice {
  auth: IUserInfo;
}

export interface Permissions {
  subsistema: string;
  desc_subsistema: string;
  modulos: Modulo[];
}

export interface Modulo {
  id_modulo: number;
  nombre_modulo: string;
  descripcion: string;
  ruta_formulario: string;
  nombre_icono: string;
  permisos: Permisos;
}

export interface Permisos {
  actualizar?: boolean;
  consultar: boolean;
  ejecutar?: boolean;
  crear?: boolean;
  borrar?: boolean;
}
