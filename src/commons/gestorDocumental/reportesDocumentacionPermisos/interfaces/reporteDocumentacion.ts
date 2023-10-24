export interface IReporteDocumentacion {
  trd: IObjTrd[];
  serie_subserie: IObjSubserieSerie[];
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
