export interface Icv {
  computers: IComputers[];
  current_computer: IComputers;
  current_cv_computer: ICvcomputers;
  cv_computer: ICvcomputers[];
  marcas: IMarca[];
  maintenance: IObjMantenimiento[];
}

export interface IMarca {
  id_marca: number;
  nombre: string;
  activo: boolean;
  item_ya_usado: boolean;
}

export interface IComputers {
  id_bien: number | null;
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
  cod_tipo_elemento_vivero: number | null;
  es_semilla_vivero: boolean | null;
  estado: string;
  marca: string;
  nombre_padre: string;
  porcentaje_iva: number;
  unidad_medida: string;
  unidad_medida_vida_util: string;
}

export interface ICvcomputers {
  id_hoja_de_vida?: number | null;
  antivirus?: string;
  capacidad_almacenamiento?: string;
  color?: string;
  memoria_ram?: string;
  observaciones_adicionales?: string;
  otras_aplicaciones?: string;
  procesador?: string;
  ruta_imagen_foto?: string | any;
  sistema_operativo?: string;
  suite_ofimatica?: string;
  tipo_almacenamiento?: string;
  tipo_de_equipo?: string;
  codigo_bien?: string | null;
  doc_identificador_nro?: string;
  estado?: string;
  id_articulo?: number | null;
  marca?: string;
  nombre?: string;
  id_marca?: number | null;
}

export interface IObjMantenimiento {
  id_programacion_mantenimiento?: number | null;
  tipo?: string | null;
  fecha?: string | null;
  estado?: string | null;
  responsable?: string | null;
  tipo_descripcion?: string | null;
}
