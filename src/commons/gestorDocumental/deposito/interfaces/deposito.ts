import type { GetEstantes, InfoDepositos } from "../Estantes/types/types";

export interface IDeposito {
  deposito: IObjDeposito[];
  current_deposito: IObjDeposito;
  sucursales: IObjSucursales[];
  mode_estante: IMode;
  bandeja: IObjBandeja[];
  current_bandeja: IObjBandeja;
  data_estantes: GetEstantes;
  data_depositos: InfoDepositos;
  deposito_estante: IdEstanteDeposito;
}
export interface IMode {
  ver: boolean;
  editar: boolean;
  crear: boolean;
}

export interface IdEstanteDeposito {
  id_deposito: number | null;
  id_estante_deposito: number | null;
  nombre_deposito?: string;
  identificacion_por_deposito?: string;
}

export interface IObjDeposito {
  id_deposito?: number | null;
  nombre_deposito?: string | null;
  identificacion_por_entidad?: number | null;
  direccion_deposito?: string | null;
  orden_ubicacion_por_entidad: number | null;
  cod_municipio_nal?: number | null;
  cod_pais_exterior?: string | null;
  id_sucursal_entidad?: number | null;
  nombre_sucursal: string | null;
  municipio: number | null;
  activo: boolean;
  id_sucursal_empresa?: number | null;
}

export interface IObjSucursales {
  id_sucursal_empresa?: number;
  numero_sucursal?: number | null;
  descripcion_sucursal: string | null;
  direccion: string | null;
  direccion_sucursal_georeferenciada: string | null;
  municipio?: number | null;
  pais_sucursal_exterior: number | null;
  direccion_notificacion: string | null;
  direccion_notificacion_referencia: string | null;
  municipio_notificacion?: number | null;
  email_sucursal: string | null;
  telefono_sucursal?: number | null;
  es_principal: boolean | null;
  activo: boolean | null;
  item_ya_usado: boolean | null;
  id_persona_empresa?: number | null;
}

export interface IObjBandeja {
  id_estante_deposito?: number | null;
  id_bandeja_estante?: number | null;
  orden_ubicacion_por_estante?: number | null;
  identificacion_por_estante?: string | number | null;
}
