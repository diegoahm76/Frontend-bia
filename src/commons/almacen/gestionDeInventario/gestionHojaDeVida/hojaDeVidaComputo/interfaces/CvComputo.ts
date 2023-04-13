export interface Icv {
  computers: IComputers[];
  current_computer: IComputers;
  current_cv_computer: ICvcomputers;
  marcas: IMarca[];
}

export interface IcvMaintenance {
  estado: string;
  fecha: Date | string;
  id_programacion_mantenimiento: number;
  responsable: string;
  tipo_descripcion: string;
  tipo: string;
}
export interface IMarca {
  id_marca: number;
  nombre: string;
  activo: boolean;
  item_ya_usado: boolean;
}

export interface IComputers {
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

export interface ICvcomputers {
  antivirus: string;
  capacidad_almacenamiento: string;
  color: string;
  memoria_ram: string;
  observaciones_adicionales: string;
  otras_aplicaciones: string;
  procesador: string;
  ruta_imagen_foto: string;
  sistema_operativo: string;
  suite_ofimatica: string;
  tipo_almacenamiento: string;
  tipo_de_equipo: string;
  codigo_bien: string;
  doc_identificador_nro: string;
  estado: string;
  id_articulo: number | null;
  marca: string;
  nombre: string;
  id_marca: number;
}

export interface IList {
  label: string | number;
  value: number | string;
}
