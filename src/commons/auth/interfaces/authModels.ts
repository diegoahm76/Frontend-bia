import { type Dispatch, type SetStateAction } from "react";

export interface UserRol {
  id_rol: number;
  nombre_rol: string;
  descripcion_rol: string;
  Rol_sistema: boolean;
  representante_legal: boolean;
  nombre_empresa: null;
}

export interface LoginUser {
  email: string;
  password: string;
}

export interface IUserInfo {
  permisos: [];
  representante_legal: [];
  userinfo: {
    email: string;
    id_usuario: number;
    nombre_usuario: string;
    tokens: {
      access: string;
      refresh: string;
    };
  };
  user_sesion: string;
  reintentos: boolean;
  status: 'checking' | 'not-authenticated' | 'authenticated';
  error_message: string;
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

export interface SimpleDialogProps {
  open: boolean;
  selected_value: string;
  on_close: (value: string) => void;
}