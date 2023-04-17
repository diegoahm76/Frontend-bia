export interface IBodegaGet {
  bodega: IBodega[];
  bodega_seleccionada: IBodega;
  // id_responsable: IdResponsable[];
}
export interface IBodega {
  id_bodega: number;
  nombre: string;
  cod_municipio: string;
  direccion: string;
  // id_responsable: IdResponsable;
  es_principal: boolean;
}

export interface IdResponsable {
  id_persona: number;
  tipo_documento: string;
  primer_nombre: string;
  segundo_nombre: string;
  primer_apellido: string;
  segundo_apellido: string;
}
