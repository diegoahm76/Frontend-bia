export interface IBienGet {
    [x: string]: any;
    bien: IBienes[];
    bien_seleccionado: IBienes;
    dataEdit: IDataEdit;
  }
  
  export interface IBienes {
    id_bien: number|null;
    codigo_bien: string;
    nro_elemento_bien: number;
    nombre: string;
    cod_tipo_bien: string;
    cod_tipo_activo: string;
    nivel_jerarquico: number;
    nombre_cientifico: string;
    descripcion: string;
    doc_identificador_nro: string;
    cod_metodo_valoracion: number;
    cod_tipo_depreciacion: number;
    cantidad_vida_util: number;
    valor_residual: number;
    stock_minimo: number;
    stock_maximo: number;
    solicitable_vivero: boolean;
    tiene_hoja_vida: boolean;
    maneja_hoja_vida: boolean;
    visible_solicitudes: boolean;
    id_marca?: number;
    id_unidad_medida?: number;
    id_porcentaje_iva?: number;
    id_unidad_medida_vida_util?: number;
    id_bien_padre?: number | null;
  }
  
  interface IDataEdit{
    edit: boolean,
    id_bien_padre: number|null,
    nivel_jerarquico: number,
  } 

  export interface IGeneric {
    label: string;
    value: string
}

export interface IGeneric2{
    value: string;
}
  