export interface ISucursalEditar {
  email_sucursal: string;
  confirm_email_sucursal: string;
  telefono_sucursal: number;
  descripcion_sucursal: string;
  direccion: string;
  direccion_sucursal_georeferenciada: string;
  direccion_notificacion: string;
  id_sucursal_empresa: number;
  numero_sucursal: number;
  es_principal: boolean;
  activo: boolean;
  municipio: string;
  pais_sucursal_exterior: string;
  municipio_notificacion: string;
  item_ya_usado: boolean;
  id_persona_empresa: number;
}

export interface ISucursalEmpresa {
  id_sucursal_empresa: number;
  numero_sucursal: number;
  descripcion_sucursal: string;
  direccion: string;
  direccion_sucursal_georeferenciada: string | null;
  municipio: string | null;
  pais_sucursal_exterior: string | null;
  direccion_notificacion: string;
  direccion_notificacion_referencia: string | null;
  municipio_notificacion: string | null;
  email_sucursal: string;
  telefono_sucursal: string;
  es_principal: boolean;
  activo: boolean;
  item_ya_usado: boolean;
  id_persona_empresa: number;
}
export interface ISucursalCrear {
  descripcion_sucursal: string;
  direccion: string;
  direccion_sucursal_georeferenciada: string | null;
  municipio: string | null;
  pais_sucursal_exterior: string | null;
  direccion_notificacion: string;
  direccion_notificacion_referencia: string | null;
  municipio_notificacion: string | null;
  email_sucursal: string;
  telefono_sucursal: string;
  es_principal: boolean;
  activo: boolean;
  item_ya_usado: boolean;
  id_persona_empresa: number;
}