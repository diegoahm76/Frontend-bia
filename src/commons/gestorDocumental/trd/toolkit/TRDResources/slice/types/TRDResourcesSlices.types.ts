export interface TRD {
  //! TRD necesarios para el funcionamiento de la aplicación
  trds: any[];
  trd_current: any;

  //! catalogo de series y subseries por Unidad organizacional
  catalado_series_subseries_unidad_organizacional: any[];
  ccd_current_catalogo_ser_sub_unid: any;

  //! data formatos tipos medios creados
  data_format_documental_type_current: any;
  data_format_documental_type: any[];

  //! data tipologias documentales
  tipologias: any[];
  tipologias_asociadas_a_trd: any[];
  tipologias_documental_current: any;

  //! catalogo TRD
  catalogo_trd: any[];

  //! selected_item_from_catalogo_trd
  selected_item_from_catalogo_trd: any;

  //! add tipologia documental to trd
  nuevasTipologias: any[];
  // ! historial de cambios
  historialCambios: any[];
}