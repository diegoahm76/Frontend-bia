export interface BusquedaDepositos {
  nombre_deposito: string;
  identificacion_por_entidad: string;
  nombre_sucursal: string;
}

export interface InfoDepositos {
  id_deposito?: number;
  orden_ubicacion_por_entidad: number;
  nombre_deposito: string;
  identificacion_por_entidad: string;
  nombre_sucursal: string;
}
export interface InfoEstantes {
  id_deposito?: number;
  orden_ubicacion_por_deposito: number;
  identificacion_por_deposito: string;
  nombre_deposito: string;
  identificacion_deposito: string;
}
export interface ListarSucursales {
  id_sucursal_empresa: number;
  numero_sucursal: number;
  descripcion_sucursal: string;
  direccion: string;
  direccion_sucursal_georeferenciada: string;
  municipio: string;
  pais_sucursal_exterior: null;
  direccion_notificacion: string;
  direccion_notificacion_referencia: string;
  municipio_notificacion: string;
  email_sucursal: string;
  telefono_sucursal: string;
  es_principal: boolean;
  activo: boolean;
  item_ya_usado: boolean;
  id_persona_empresa: number;
}

export interface ListarDepositos {
  id_deposito: number;
  nombre_deposito: string;
  identificacion_por_entidad: string;
  orden_ubicacion_por_entidad: number;
  direccion_deposito: string;
  cod_municipio_nal: null | string;
  cod_pais_exterior: null | string;
  id_sucursal_entidad: number;
  nombre_sucursal: string;
  municipio: string;
  activo: boolean;
}
export interface GetEstantes {
  id_estante_deposito: number;
  orden_ubicacion_por_deposito: number;
  identificacion_por_deposito: string;
}
export interface GetBandejas {
  id_bandeja_estante: number;
  orden_ubicacion_por_estante: number;
  identificacion_por_estante: string;
}
export interface OrdenSiguiente {
  orden_siguiente: number;
}

export interface PostEstantes {
  id_deposito: number;
  identificacion_por_deposito: string;
}
export interface PutMoverEstantes {
  identificacion_por_entidad_destino: string;
  nombre_deposito_destino: string;
}
