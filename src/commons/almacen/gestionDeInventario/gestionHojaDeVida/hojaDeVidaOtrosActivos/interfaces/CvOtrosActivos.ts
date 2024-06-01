export interface Icv {
  others: IOthers[];
  current_other: IOthers;
  current_cv_other: IcvOthers;
  cv_other: IcvOthers[];
  marcas: IMarca[];
  maintenance_other: IObjMantenimiento[];
}

export interface IcvOthers {
  id_hoja_de_vida?: number | null;
  especificaciones_tecnicas?: string | null;
  caracteristicas_fisicas?: string | null;
  observaciones_adicionales?: string | null;
  id_bien?: number | null;
  cod_tipo_bien?: string | number | null;
  id_marca?: number | null;
  marca?: string;
  doc_identificador_nro?: string | null;
  estado?: string;
  nombre?: string;
  codigo_bien?: string | null;
  id_articulo?: number | null;
  ruta_imagen_foto?: string | any;
}

export interface IOthers {
  id_bien?: number | null;
  codigo_bien?: string | null;
  nro_elemento_bien?: number | null;
  nombre?: string;
  cod_tipo_bien?: string | null;
  cod_tipo_activo?: string | null;
  nivel_jerarquico?: number | null;
  nombre_cientifico?: string | null;
  descripcion?: string;
  doc_identificador_nro?: string | null;
  cod_metodo_valoracion?: number | null;
  cod_tipo_depreciacion?: number | null;
  cantidad_vida_util?: number | null;
  valor_residual?: number | null;
  stock_minimo?: number | null;
  stock_maximo?: number | null;
  solicitable_vivero?: boolean;
  tiene_hoja_vida?: boolean;
  maneja_hoja_vida?: boolean;
  visible_solicitudes?: boolean;
  id_marca?: number | null;
  id_unidad_medida?: number | null;
  id_porcentaje_iva?: number | null;
  id_unidad_medida_vida_util?: number | null;
  id_bien_padre?: number | null;
  cod_tipo_elemento_vivero?: number | null;
  es_semilla_vivero?: boolean | null;
  estado?: string;
  marca?: string;
  nombre_padre?: string;
  porcentaje_iva?: number;
  unidad_medida?: string;
  unidad_medida_vida_util?: string;
}

export interface IMarca {
  id_marca: number;
  nombre: string;
  activo: boolean;
  item_ya_usado: boolean;
}

export interface IObjMantenimiento {
  id_programacion_mantenimiento?: number | null;
  tipo?: string | null;
  fecha?: string | null;
  estado?: string | null;
  responsable?: string | null;
  tipo_descripcion?: string | null;
}
