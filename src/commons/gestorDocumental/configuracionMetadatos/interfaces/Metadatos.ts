export interface IConfiguracionMetadatos {
  metadatos: IMetadatos[];
  valores_metadatos: IObjValoresMetadatos[];
  current_valor_metadato: IObjValoresMetadatos;
}

export interface IMetadatos {
  id_metadato_personalizado?: number | null;
  nombre_metadato?: string | null;
  nombre_a_mostrar?: string | null;
  descripcion?: string | null;
  cod_tipo_dato_alojar?: string | null;
  longitud_dato_alojar?: number | null;
  valor_minimo: number | null;
  valor_maximo?: number | null;
  orden_aparicion?: number | null;
  esObligatorio?: boolean;
  aplica_para_documento?: boolean;
  aplica_para_expediente?: boolean;
  activo?: boolean;
  valor_a_mostrar?: string | null;
  item_ya_usado?: boolean;
}

export interface IList {
  value?: string | null;
  label?: string | null;
}

export interface IObjValoresMetadatos {
  id_lista_valor_metadato_pers?: number | null;
  valor_a_mostrar?: string | null;
  orden_dentro_de_lista?: number | null;
  id_metadato_personalizado?: number | null;
}
