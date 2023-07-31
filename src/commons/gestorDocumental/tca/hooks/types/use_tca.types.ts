interface baseForm {
  nombre: string;
  version: string;
}

export interface formulario_create_update_tca extends baseForm {
  id_tca?: any;
  id_trd?: any;
  id_organigrama?: any;
  actual?: any;
}

export interface formulario_busqueda_tca extends baseForm {}

export interface formulario_administracion_tca_base {
  id_cat_serie_und_ccd_trd: string;
  cod_clas_expediente: {
    value: string | number;
    label: string | number;
  };
}
