import { type Dispatch, type SetStateAction } from "react";

export interface IDefaultValues {
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
export interface IAuth {
  confirmacionEmail: boolean;
  confirmacionCelular: boolean;
}
export interface IDatosNotificacion {
  departamento: any;
  // departamento: IList | string;
}

export interface IFormValues {
  fechaNacimiento: string | number | Date;
  tipo_persona: IList;
  digito_verificacion: string;
  municipioNotificacion: any;
  paisNotificacion?: any;
}

export interface IList {
  label: string;
  value: string;
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
export interface IObjectSend {
  paisNotificacion: any;
  municipioNotificacion: string | null;
}
export interface IDefaultValuesUpdatePassword {
  password: string;
  password2: string;
}

export interface UserRol {
  id_rol: number;
  nombre_rol: string;
  descripcion_rol: string;
  Rol_sistema: boolean;
  representante_legal: boolean;
  nombre_empresa: null;
}

export interface IUser {
  email: string;
  id_usuario: number;
  nombre_de_usuario: string;
  tokens: {
    access: string;
    refresh: string;
  };
}
export interface IUserInfo {
  permisos: [];
  representante_legal: [];
  user_info: IUser;
  user_sesion: string;
  reintentos: boolean;
}

export interface AuthHook {
  get_permissions_by_rol: (param: number) => Promise<void>,
  submit_handler: (param: number) => Promise<void>,
  set_is_captcha_valid: Dispatch<SetStateAction<boolean>>,
  set_open: Dispatch<SetStateAction<boolean>>,
  is_captcha_valid: boolean,
  is_loading: boolean,
  roles: UserRol[],
  open: boolean,
  reintentos?: number,
}