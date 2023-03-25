export interface Icv {
  cv_articles: IcvArtivlesComputers[];
  cv_computers: IcvComputers | null;
  cv_maintenance: IcvMaintenance[];
}

export interface IcvMaintenance {
  estado: string;
  fecha: Date | string;
  id_programacion_mantenimiento: number;
  responsable: string;
  tipo_descripcion: string;
  tipo: string;
}
export interface IMarcas {
  id_marca: number;
  nombre: string;
  activo: boolean;
  item_ya_usado: boolean;
}

export interface ICvComputo {
  state: IMarcas[];
  marca: IMarcas;
  cvcomputo: IcvComputers[];
  current_cvcomputo: IcvComputers;
}

export interface IcvComputers {
  cantidad_vida_util: null;
  cod_metodo_valoracion: null;
  cod_tipo_activo: string;
  cod_tipo_bien: string;
  cod_tipo_depreciacion: null;
  codigo_bien: string;
  descripcion: null;
  doc_identificador_nro: string;
  estado: string;
  id_bien_padre: number;
  id_bien: number;
  id_marca: null;
  id_porcentaje_iva: number;
  id_unidad_medida_vida_util: null;
  id_unidad_medida: number;
  maneja_hoja_vida: boolean;
  marca: null | string;
  nivel_jerarquico: number;
  nombre_cientifico: null;
  nombre: string;
  nro_elemento_bien: number;
  solicitable_vivero: boolean;
  stock_maximo: null;
  stock_minimo: null;
  tiene_hoja_vida: null | boolean;
  valor_residual: null;
  visible_solicitudes: boolean;
}

export interface IcvComputersForm {
  antivirus: string;
  capacidad_almacenamiento: string;
  color: string;
  id_articulo: number;
  memoria_ram: string;
  observaciones_adicionales: string;
  otras_aplicaciones: string;
  procesador: string;
  ruta_imagen_foto: string;
  sistema_operativo: string;
  suite_ofimatica: string;
  tipo_almacenamiento: string;
  tipo_de_equipo: string;
  cod_tipo_bien: number | string;
  codigo_bien: string;
  doc_identificador_nro: string;
  estado: string;
  id_bien: number;
  marca: IList;
  nombre: string;
}
export interface IcvVehiclesForm {
  capacidad_extintor: number;
  capacidad_pasajeros: number;
  cilindraje: number;
  cod_tipo_vehiculo: IList;
  codigo_bien: string;
  color: string;
  dimesion_llantas: number;
  doc_identificador_nro: string;
  en_circulacion: boolean | null;
  es_agendable: boolean | null;
  es_arrendado: boolean | null;
  estado: null | string;
  fecha_adquisicion: Date | null | string;
  fecha_circulacion: Date | null | string;
  fecha_ultimo_kilometraje: Date | null | string;
  fecha_vigencia_garantia: Date | null | string;
  id_articulo: number;
  id_hoja_de_vida: number;
  id_proveedor: null | number | string;
  id_vehiculo_arrendado: null | number | string;
  linea: string;
  marca: IList;
  nombre: string;
  numero_chasis: string;
  numero_motor: string;
  observaciones_adicionales: string;
  ruta_imagen_foto: string;
  tarjeta_operacion: string;
  tiene_platon: boolean | null;
  tipo_combustible: IList;
  transmision: string;
  ultimo_kilometraje: number;
  modelo: string;
  celular: string;
  direccion: string;
  email: string;
  fecha_expedicion_op: Date | null | string;
  fecha_expedicion_soat: Date | null | string;
  fecha_expedicion_str: Date | null | string;
  fecha_expedicion_tecnomecanica: Date | null | string;
  fecha_expiracion_op: Date | null | string;
  fecha_expiracion_soat: Date | null | string;
  fecha_expiracion_str: Date | null | string;
  fecha_expiracion_tecnomecanica: Date | null | string;
  id_bien: number | string;
  nombre_conductor: string;
  numero_document: string;
  numero_soat: string;
  numero_str: string;
  numero_tecnomecanica: string;
  tipo_document: IList;
}

export interface IcvArtivlesComputers {
  cantidad_vida_util: null | number;
  cod_metodo_valoracion: null | string;
  cod_tipo_activo: string;
  cod_tipo_bien: string;
  cod_tipo_depreciacion: null | string;
  codigo_bien: string;
  descripcion: null | string;
  doc_identificador_nro: string;
  estado: string;
  id_bien_padre: number | null;
  id_bien: number;
  id_marca: number | null;
  id_porcentaje_iva: number;
  id_unidad_medida_vida_util: null | number;
  id_unidad_medida: number;
  maneja_hoja_vida: boolean;
  marca: null | string;
  nivel_jerarquico: number;
  nombre_cientifico: null | string;
  nombre: string;
  nro_elemento_bien: number;
  solicitable_vivero: boolean;
  stock_maximo: null | number;
  stock_minimo: null | number;
  tiene_hoja_vida: boolean | null;
  valor_residual: null | number;
  visible_solicitudes: boolean;
}
export interface IList {
  label: string | null;
  value: number | null | string;
}
