import { type INodo } from "./Nodo";


export interface IBien {
  code_bien?: string|null|undefined,
  nodo: INodo[],
  current_nodo: INodo,
  bienes: IObjBien[];
  current_bien: IObjBien;
  marca: IMarcas[],
  unidad_medida: IMedidas[],
  porcentaje_iva: IPorcentajes[],
}

export interface IMarcas {
  id_marca: number ;
  nombre: string;
  activo: boolean;
  item_ya_usado: boolean;
}
export interface IPorcentajes {
  id_porcentaje_iva: number ;
  porcentaje: number;
  observacion: string;
}
export interface IMedidas {
  id_unidad_medida: number ;
  nombre: string;
  abreviatura: string;
  id_magnitud: number | null;
  precargado: boolean;
  activo: boolean;
  item_ya_usado: boolean;
}

export interface IList{
  value: string|number,
  label: string|number
}

  export interface IObjBien {
    id_bien?: number|null;
    codigo_bien: string|null;
    nro_elemento_bien: number|null;
    nombre: string;
    cod_tipo_bien?: string|null;
    cod_tipo_activo: string|null;
    nivel_jerarquico: number|null;
    nombre_cientifico: string|null;
    descripcion: string;
    doc_identificador_nro: string|null;
    cod_metodo_valoracion: number|null;
    cod_tipo_depreciacion: number|null;
    cantidad_vida_util: number|null;
    valor_residual: number|null;
    stock_minimo: number|null;
    stock_maximo: number|null;
    solicitable_vivero: boolean;
    tiene_hoja_vida: boolean;
    maneja_hoja_vida: boolean;
    visible_solicitudes: boolean;
    id_marca?: number|null;
    id_unidad_medida?: number|null;
    id_porcentaje_iva?: number|null;
    id_unidad_medida_vida_util?: number|null;
    id_bien_padre?: number | null;
    nombre_padre?: string|null,
  }
  