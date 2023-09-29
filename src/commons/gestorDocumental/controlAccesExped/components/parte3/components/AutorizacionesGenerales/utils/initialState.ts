/* eslint-disable @typescript-eslint/naming-convention */
const initialStateCreacionControlDeAccesoExp = {
  id_ctrl_acceso_clasif_exp_ccd: null, // ! debe ir en nulo al ser la primera creación que se está realizando
  id_serie_doc: null, // ?  camino 2 ? lleva valor : no lleva valor
  nombre_serie: null, // ?  camino 2 ? lleva valor : no lleva valor
  codigo_serie: null, // ?  camino 2 ? lleva valor : no lleva valor
  id_subserie_doc: null, // ?  camino 2 y id_subserie_doc existe ? lleva valor : no lleva valor
  nombre_subserie: null, // ?  camino 2 y  subserie existe ? lleva valor : no lleva valor
  codigo_subserie: null, // ?  camino 2 codigo subserie existe ? lleva valor : no lleva valor
  nombre_unidad_organizacional: null, // ? camino 2 ? lleva valor : no lleva valor
  codigo_unidad_organizacional: null, // ? camino 2 ? lleva valor : no lleva valor
  id_cat_serie_und_org_ccd: null, // ? camino 2 ? lleva valor : no lleva valor

  //! este es el paquete de restricciones que inicialmente se debe enviar y plantear todo en false si es apenas la creación del control de acceso de expedientes
  entidad_entera_consultar: false,
  entidad_entera_descargar: false,
  seccion_actual_respon_serie_doc_consultar: false,
  seccion_actual_respon_serie_doc_descargar: false,
  seccion_raiz_organi_actual_consultar: false,
  seccion_raiz_organi_actual_descargar: false,
  secciones_actuales_mismo_o_sup_nivel_respon_consulta: false,
  secciones_actuales_mismo_o_sup_nivel_respon_descargar: false,
  secciones_actuales_inf_nivel_respon_consultar: false,
  secciones_actuales_inf_nivel_respon_descargar: false,
  unds_org_sec_respon_mismo_o_sup_nivel_resp_exp_consultar: false,
  unds_org_sec_respon_mismo_o_sup_nivel_resp_exp_descargar: false,
  unds_org_sec_respon_inf_nivel_resp_exp_consultar: false,
  unds_org_sec_respon_inf_nivel_resp_exp_descargar: false,

  //! este es el paquete de restricciones que inicialmente se debe enviar y plantear todo en false si es apenas la creación del control de acceso de expedientes


  id_ccd: null, // se debe poner el id del ccd respectivamente
  cod_clasificacion_exp: '', // se debe de igual manera configurar el cod. clasificacion de expediente en la edición de los checkbox
};

export const rowsDataGrid = [
  {
    ...initialStateCreacionControlDeAccesoExp,
  },
];

/* const rows = [
    ...initialStateCreacionControlDeAccesoExp,
]; */