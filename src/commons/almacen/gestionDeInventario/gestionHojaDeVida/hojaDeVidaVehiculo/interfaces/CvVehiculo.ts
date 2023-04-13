export interface Icv {
  vehicles: IVehicles[];
  current_vehicle: IVehicles;
  current_cv_vehicle: IcvVehicles;
  marcas: IMarca[];
}

export interface IVehicles {
  id_bien: number;
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
  id_hoja_de_vida: number;
  cod_tipo_vehiculo: string;
  tiene_platon: boolean;
  capacidad_pasajeros: number;
  color: string;
  linea: string;
  tipo_combustible: string;
  es_arrendado: boolean;
  ultimo_kilometraje: number;
  fecha_ultimo_kilometraje: number;
  fecha_adquisicion: number;
  fecha_vigencia_garantia: number;
  numero_motor: string;
  numero_chasis: string;
  cilindraje: number;
  transmision: string;
  dimension_llantas: number;
  capacidad_extintor: number;
  tarjeta_operacion: string;
  observaciones_adicionales: string;
  es_agendable: boolean;
  en_circulacion: boolean;
  fecha_circulacion: number;
  ruta_imagen_foto: string;
  id_vehiculo_arrendado: null;
  id_proveedor: null;
  codigo_bien: string;
  nombre: string;
  doc_identificador_nro: string;
  id_marca: number;
  marca: string;
  estado: string;
  tipo_vehiculo: string;
  id_articulo: number;
}

export interface IcvMaintenance {
  estado: string;
  fecha: Date | string;
  id_programacion_mantenimiento: number;
  responsable: string;
  tipo_descripcion: string;
  tipo: string;
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
