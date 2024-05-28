/* eslint-disable @typescript-eslint/naming-convention */

export interface PQRSDFDataAtencionaQqrsdf {
    num_pqrsdf_recibidos: number;
    num_pqrsdf_respondidos: number;
    num_pqrsdf_no_respondidos: number;
    porcentaje_respondidos: number;
    porcentaje_no_respondidos: number;
    rango_cumplimiento: string;
    title: string; // Nuevo campo para el título

  }
  
  export const initialPQRSDFData: PQRSDFDataAtencionaQqrsdf = {
    num_pqrsdf_recibidos: 0,
    title:"", // Nuevo campo para el título
    num_pqrsdf_respondidos: 0,
    num_pqrsdf_no_respondidos: 0,
    porcentaje_respondidos: 0.0,
    porcentaje_no_respondidos: 0.0,
    rango_cumplimiento: "Sin definir",
  };
  
  export interface AtencionDerechosPeticionData {
    num_peticiones_recibidos: number;
    num_peticiones_respondidos: number;
    porcentaje_respondidos: number;
    porcentaje_no_respondidos: number;
    indicador_atencion: number;
    rango_cumplimiento: string;
  }
  
  export const initialAtencionDerechosPeticionData: AtencionDerechosPeticionData = {
    num_peticiones_recibidos: 0,
    num_peticiones_respondidos: 0,
    porcentaje_respondidos: 0.0,
    porcentaje_no_respondidos: 0.0,
    indicador_atencion: 0.0,
    rango_cumplimiento: "Sin definir",
  };
  
  export interface AtencionQuejasData {
    num_quejas_recibidas: number;
    num_quejas_respondidas: number;
    porcentaje_respondidas: number;
    porcentaje_no_respondidas: number;
    indicador_atencion: number;
    rango_cumplimiento: string;
  }
  
  export const initialAtencionQuejasData: AtencionQuejasData = {
    num_quejas_recibidas: 0,
    num_quejas_respondidas: 0,
    porcentaje_respondidas: 0.0,
    porcentaje_no_respondidas: 0.0,
    indicador_atencion: 0.0,
    rango_cumplimiento: "Sin definir",
  };
  
  export interface AtencionReclamosData {
    num_reclamos_recibidos: number;
    num_reclamos_respondidos: number;
    porcentaje_respondidos: number;
    porcentaje_no_respondidos: number;
    indicador_atencion: number;
    rango_cumplimiento: string;
  }
  
  export const initialAtencionReclamosData: AtencionReclamosData = {
    num_reclamos_recibidos: 0,
    num_reclamos_respondidos: 0,
    porcentaje_respondidos: 0.0,
    porcentaje_no_respondidos: 0.0,
    indicador_atencion: 0.0,
    rango_cumplimiento: "Sin definir",
  };
  
  export interface SugerenciasRadicadasData {
    num_pqrsdf_radicadas: number;
    num_sugerencias_radicadas: number;
    num_sugerencias_no_radicadas: number;
    porcentaje_sugerencias_radicadas: number;
    porcentaje_sugerencias_no_radicadas: number;
    rango_cumplimiento: string;
  }
  
  export const initialSugerenciasRadicadasData: SugerenciasRadicadasData = {
    num_pqrsdf_radicadas: 0,
    num_sugerencias_radicadas: 0,
    num_sugerencias_no_radicadas: 0,
    porcentaje_sugerencias_radicadas: 0.0,
    porcentaje_sugerencias_no_radicadas: 0.0,
    rango_cumplimiento: "Sin definir",
  };
  
  export interface PqrsdfContestadasOportunamenteData {
    num_pqrsdf_recibidos: number;
    num_pqrsdf_contestados_oportunamente: number;
    porcentaje_contestados_oportunamente: number;
    porcentaje_contestados_inoportunamente: number;
    rango_cumplimiento: string;
  }
  
  export const initialPqrsdfContestadasOportunamenteData: PqrsdfContestadasOportunamenteData = {
    num_pqrsdf_recibidos: 0,
    num_pqrsdf_contestados_oportunamente: 0,
    porcentaje_contestados_oportunamente: 0.0,
    porcentaje_contestados_inoportunamente: 0.0,
    rango_cumplimiento: "Sin definir",
  };
  
  export interface PeticionesContestadasOportunamenteData {
    num_peticiones_recibidas: number;
    num_peticiones_contestadas_oportunamente: number;
    porcentaje_contestadas_oportunamente: number;
    porcentaje_contestadas_inoportunamente: number;
    rango_cumplimiento: string;
  }
  
  export const initialPeticionesContestadasOportunamenteData: PeticionesContestadasOportunamenteData = {
    num_peticiones_recibidas: 0,
    num_peticiones_contestadas_oportunamente: 0,
    porcentaje_contestadas_oportunamente: 0.0,
    porcentaje_contestadas_inoportunamente: 0.0,
    rango_cumplimiento: "Sin definir",
  };
  
  export interface QuejasContestadasOportunamenteData {
    num_quejas_recibidas: number;
    num_quejas_contestadas_oportunamente: number;
    porcentaje_contestadas_oportunamente: number;
    porcentaje_contestadas_inoportunamente: number;
    rango_cumplimiento: string;
  }
  
  export const initialQuejasContestadasOportunamenteData: QuejasContestadasOportunamenteData = {
    num_quejas_recibidas: 0,
    num_quejas_contestadas_oportunamente: 0,
    porcentaje_contestadas_oportunamente: 0.0,
    porcentaje_contestadas_inoportunamente: 0.0,
    rango_cumplimiento: "Sin definir",
  };
  
  export interface ReclamosOportunamenteData {
    num_reclamos_recibidos: number;
    num_reclamos_contestados_oportunamente: number;
    porcentaje_contestados_oportunamente: number;
    porcentaje_no_contestados_inoportunamente: number;
    rango_cumplimiento: string;
  }
  
  export const initialReclamosOportunamenteData: ReclamosOportunamenteData = {
    num_reclamos_recibidos: 0,
    num_reclamos_contestados_oportunamente: 0,
    porcentaje_contestados_oportunamente: 0.0,
    porcentaje_no_contestados_inoportunamente: 0.0,
    rango_cumplimiento: "Sin definir",
  };
  
  export interface DenunciasContestadasOportunamenteData {
    num_denuncias_recibidas: number;
    num_denuncias_contestadas_oportunamente: number;
    porcentaje_contestadas_oportunamente: number;
    porcentaje_no_contestadas_oportunamente: number;
    rango_cumplimiento: string;
  }
  
  export const initialDenunciasContestadasOportunamenteData: DenunciasContestadasOportunamenteData = {
    num_denuncias_recibidas: 0,
    num_denuncias_contestadas_oportunamente: 0,
    porcentaje_contestadas_oportunamente: 0.0,
    porcentaje_no_contestadas_oportunamente: 0.0,
    rango_cumplimiento: "Sin definir",
  };
  
  export interface PQRSDFVencidasData {
    num_pqrsdf_recibidas: number;
    num_pqrsdf_vencidas: number;
    porcentaje_vencidas: number;
    porcentaje_oportunas: number;
    rango_cumplimiento: string;
  }
  
  export const initialPQRSDFVencidasData: PQRSDFVencidasData = {
    num_pqrsdf_recibidas: 0,
    num_pqrsdf_vencidas: 0,
    porcentaje_vencidas: 0.0,
    porcentaje_oportunas: 0.0,
    rango_cumplimiento: "Sin definir",
  };
  
  export interface IndicadorMedioSolicitud {
    id_medio_solicitud: number;
    nombre_medio_solicitud: string;
    cantidad_pqrsdf: number;
  }
  
  export interface PeriodicidadChartProps {
    indicadores_por_medio_solicitud: IndicadorMedioSolicitud[];
    total_pqrsdf: number;
  }
  
  export interface PeriodicidadData {
    indicadores_por_medio_solicitud: IndicadorMedioSolicitud[];
    total_pqrsdf: number;
  }
  
  export interface ExportedData {
    PQRSDFDataAtencionaQqrsdf: PQRSDFDataAtencionaQqrsdf;
    AtencionDerechosPeticionData: AtencionDerechosPeticionData;
    AtencionQuejasData: AtencionQuejasData;
    AtencionReclamosData: AtencionReclamosData;
    SugerenciasRadicadasData: SugerenciasRadicadasData;
    PqrsdfContestadasOportunamenteData: PqrsdfContestadasOportunamenteData;
    PeticionesContestadasOportunamenteData: PeticionesContestadasOportunamenteData;
    QuejasContestadasOportunamenteData: QuejasContestadasOportunamenteData;
    ReclamosOportunamenteData: ReclamosOportunamenteData;
    DenunciasContestadasOportunamenteData: DenunciasContestadasOportunamenteData;
    PQRSDFVencidasData: PQRSDFVencidasData;
  }
  