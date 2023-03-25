export interface IBien {
    bienes: IObjBien[];
    current_bien: IObjBien;
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
      cod_tipo_bien: string|null;
      cod_tipo_activo: string|null;
      nivel_jerarquico: number|null;
      nombre_cientifico: string|null;
      descripcion: string;
      es_semilla_vivero: boolean|null;
      cod_tipo_elemento_vivero: string|null,
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
    }