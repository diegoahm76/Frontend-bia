export interface Icv {
  others: IOthers[];
  current_other: IOthers;
  current_cv_other: IcvOthers;
  marcas: IMarca[];
}

export interface IcvOthers {
  especificaciones_tecnicas: string;
  caracteristicas_fisicas: string;
  observaciones_adicionales: string;
  id_bien: number;
  cod_tipo_bien: string | number;
  id_marca?: number;
  doc_identificador_nro: string;
  estado: string;
}

export interface IOthers {
  id_bien: number;
  codigo_bien: string | null;
  nro_elemento_bien: number | null;
  nombre: string;
  cod_tipo_bien?: string | null;
  cod_tipo_activo: string | null;
  nivel_jerarquico: number | null;
  nombre_cientifico: string | null;
  descripcion: string;
  doc_identificador_nro: string | null;
  cod_metodo_valoracion: number | null;
  cod_tipo_depreciacion: number | null;
  cantidad_vida_util: number | null;
  valor_residual: number | null;
  stock_minimo: number | null;
  stock_maximo: number | null;
  solicitable_vivero: boolean;
  tiene_hoja_vida: boolean;
  maneja_hoja_vida: boolean;
  visible_solicitudes: boolean;
  id_marca?: number | null;
  id_unidad_medida?: number | null;
  id_porcentaje_iva?: number | null;
  id_unidad_medida_vida_util?: number | null;
  id_bien_padre?: number | null;
}

export interface IList {
  label: string | number;
  value: number | string;
}

export interface IMarca {
  id_marca: number;
  nombre: string;
  activo: boolean;
  item_ya_usado: boolean;
}

export interface IcvMaintenance {
  estado: string;
  fecha: Date | string;
  id_programacion_mantenimiento: number;
  responsable: string;
  tipo_descripcion: string;
  tipo: string;
}
