export interface IReporteDocumentacion {
  trd: IObjTrd[];
  serie_subserie: IObjSubserieSerie[];
  permisos_no_propios: DatosRespuesta[];
  permisos_generales: PermisosGenerales | null;
}

export interface IObjTrd {
  id_trd?: number | null;
  id_ccd?: number | null;
  nombre_ccd?: string | null;
  version_ccd?: string | null;
  id_organigrama?: number | null;
  nombre_organigrama?: string | null;
  version_organigrama?: string | null;
  tablas_control_acceso: {
    id_tca?: number | null;
    nombre?: string | null;
    version?: string | null;
  };
  version?: string | null;
  nombre?: string | null;
  fecha_terminado?: string | null;
  fecha_puesta_produccion?: string | null;
  fecha_retiro_produccion?: string | null;
  actual?: boolean;
}

export interface IObjSubserieSerie {
  id_unidad_organizacional?: number | null;
  nombre?: string | null;
}

export interface Catalogo {
  id_catalogo_serie?: number | null;
  id_serie_doc?: number | null;
  nombre_serie?: string;
  id_subserie_doc?: number | null;
  nombre_subserie?: string | null;
}

export interface Permisos {
  activo?: boolean;
  cod_agrupacion_documental?: string | null;
  id_und_organizacional_actual?: number | null;
  nombre_und_organizacional_actual?: string | null;
  codigo_und_organizacional_actual?: string | null;
  id_permisos_und_org_actual_serie_exp_ccd?: number | null;
  id_cat_serie_und_org_ccd?: number | null;
  pertenece_seccion_actual_admin_serie?: boolean;
  crear_expedientes?: boolean;
  crear_documentos_exps_no_propios?: boolean;
  anular_documentos_exps_no_propios?: boolean;
  borrar_documentos_exps_no_propios?: boolean;
  conceder_acceso_documentos_exps_no_propios?: boolean;
  conceder_acceso_expedientes_no_propios?: boolean;
  consultar_expedientes_no_propios?: boolean;
  descargar_expedientes_no_propios?: boolean;
  mostrar?: boolean;
}
export interface Denegacion {
  id_cat_serie_und_org_ccd?: number | null;
  denegar_anulacion_docs?: boolean;
  denegar_borrado_docs?: boolean;
  excluir_und_actual_respon_series_doc_restriccion?: boolean;
  denegar_conceder_acceso_doc_na_resp_series?: boolean;
  denegar_conceder_acceso_exp_na_resp_series?: boolean;
}

export interface DatosRespuesta {
  catalogo: Catalogo;
  permisos: Permisos[];
  denegacion: Denegacion;
}

export interface PermisosGenerales {
  permisos_acceso_clasificacion: PermisoClasificacion[];
  exclusiones: Exclusiones[];
}

export interface PermisoClasificacion {
  id_ctrl_acceso_clasif_exp_ccd?: number | null;
  id_serie_doc?: number | null;
  nombre_serie?: string | null;
  codigo_serie?: string | null;
  id_subserie_doc?: number | null;
  nombre_subserie?: string | null;
  codigo_subserie?: string | null;
  nombre_unidad_organizacional?: string | null;
  codigo_unidad_organizacional?: number | null;
  entidad_entera_consultar?: boolean;
  entidad_entera_descargar?: boolean;
  seccion_actual_respon_serie_doc_consultar?: boolean;
  seccion_actual_respon_serie_doc_descargar?: boolean;
  seccion_raiz_organi_actual_consultar?: boolean;
  seccion_raiz_organi_actual_descargar?: boolean;
  secciones_actuales_mismo_o_sup_nivel_respon_consulta?: boolean;
  secciones_actuales_mismo_o_sup_nivel_respon_descargar?: boolean;
  secciones_actuales_inf_nivel_respon_consultar?: boolean;
  secciones_actuales_inf_nivel_respon_descargar?: boolean;
  unds_org_sec_respon_mismo_o_sup_nivel_resp_exp_consultar?: boolean;
  unds_org_sec_respon_mismo_o_sup_nivel_resp_exp_descargar?: boolean;
  unds_org_sec_respon_inf_nivel_resp_exp_consultar?: boolean;
  unds_org_sec_respon_inf_nivel_resp_exp_descargar?: boolean;
  id_ccd?: number | null;
  cod_clasificacion_exp?: string | null;
  id_cat_serie_und_org_ccd?: number | null;
}

export interface Exclusiones {
  catalogo: {
    id_catalogo_serie: number;
    id_serie_doc: number | null;
    nombre_serie: string;
    id_subserie_doc: number | null;
    nombre_subserie: string | null;
  };
  exclusiones: ExclusionesSiguiente[];
}
export interface ExclusionesSiguiente {
  id_ctrl_acceso_clasif_exp_ccd?: number | null;
  id_serie_doc?: number | null;
  nombre_serie?: string | null;
  codigo_serie?: string | null;
  id_subserie_doc?: number | null;
  nombre_subserie?: string | null;
  codigo_subserie?: string | null;
  nombre_unidad_organizacional?: string | null;
  codigo_unidad_organizacional?: string | null;
  entidad_entera_consultar?: boolean;
  entidad_entera_descargar?: boolean;
  seccion_actual_respon_serie_doc_consultar?: boolean;
  seccion_actual_respon_serie_doc_descargar?: boolean;
  seccion_raiz_organi_actual_consultar?: boolean;
  seccion_raiz_organi_actual_descargar?: boolean;
  secciones_actuales_mismo_o_sup_nivel_respon_consulta?: boolean;
  secciones_actuales_mismo_o_sup_nivel_respon_descargar?: boolean;
  secciones_actuales_inf_nivel_respon_consultar?: boolean;
  secciones_actuales_inf_nivel_respon_descargar?: boolean;
  unds_org_sec_respon_mismo_o_sup_nivel_resp_exp_consultar?: boolean;
  unds_org_sec_respon_mismo_o_sup_nivel_resp_exp_descargar?: boolean;
  unds_org_sec_respon_inf_nivel_resp_exp_consultar?: boolean;
  unds_org_sec_respon_inf_nivel_resp_exp_descargar?: boolean;
  id_ccd?: number | null;
  cod_clasificacion_exp?: string | null;
  id_cat_serie_und_org_ccd?: number | null;
}
