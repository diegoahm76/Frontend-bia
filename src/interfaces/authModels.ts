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
  userSesion: string;
  reintentos: boolean;
}
