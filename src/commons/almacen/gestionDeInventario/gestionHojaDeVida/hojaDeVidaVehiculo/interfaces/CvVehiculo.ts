export interface Icv {
  vehicles: IVehicles[];
  current_vehicle: IVehicles;
  current_cv_vehicle: IcvVehicles;
  cv_vehicle: IcvVehicles[];
  marcas: IMarca[];
  maintenance_vehicle: IObjMantenimiento[];
}

export interface IVehicles {
  id_bien: number | null;
  id_vehiculo_arrendado?: number | null;
  codigo_bien: string | null;
  nro_elemento_bien: number | null;
  nombre: string;
  cod_tipo_bien?: string | null;
  cod_tipo_activo: string | null;
  nivel_jerarquico: number | null;
  nombre_cientifico: string | null;
  descripcion: string;
  doc_identificador_nro: string;
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

export interface IcvVehicles {
  id_hoja_de_vida?: number | null;
  cod_tipo_vehiculo?: string | null;
  tiene_platon?: boolean | null;
  capacidad_pasajeros?: number | null;
  color?: string | null;
  linea?: string | null;
  tipo_combustible?: string | null;
  es_arrendado?: boolean | null;
  ultimo_kilometraje?: number | null;
  fecha_ultimo_kilometraje?: string | null;
  fecha_adquisicion?: string | null;
  fecha_vigencia_garantia?: string | null;
  numero_motor?: string | null;
  numero_chasis?: string | null;
  cilindraje?: number | null;
  transmision?: string | null;
  dimension_llantas?: number | null;
  capacidad_extintor?: number | null;
  tarjeta_operacion?: string | null;
  observaciones_adicionales?: string | null;
  es_agendable?: boolean | null;
  en_circulacion?: boolean | null;
  fecha_circulacion?: string | null;
  ruta_imagen_foto?: string | any;
  id_vehiculo_arrendado?: null | null;
  id_proveedor?: null | null;
  codigo_bien?: string | null;
  nombre?: string | null;
  doc_identificador_nro?: string | null;
  id_marca?: number | null;
  marca?: string | null;
  estado?: string | null;
  tipo_vehiculo?: string | null;
  id_articulo?: number | null;
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
