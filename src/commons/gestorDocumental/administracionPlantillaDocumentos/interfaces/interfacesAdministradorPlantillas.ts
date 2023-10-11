export interface InfoPorId {
    id_plantilla_doc: number;
    nombre_creador: string | null;
    nombre_completo: string;
    cod_tipo_acceso_display: string;
    nombre: string;
    descripcion: string;
    asociada_a_tipologia_doc_trd: boolean;
    otras_tipologias: string | null;
    codigo_formato_calidad_asociado: string;
    version_formato_calidad_asociado: string;
    cod_tipo_acceso: string;
    observacion: string;
    activa: boolean;
    fecha_creacion: string;
    id_archivo_digital: number;
    id_formato_tipo_medio: number;
    id_tipologia_doc_trd: number;
    id_persona_crea_plantilla: number;
  }

  export interface UnidadOrganizacional {
    id_unidad_organizacional: number;
    nombre_unidad_org_actual_admin_series: string;
    codigo_unidad_org_actual_admin_series: string;
    nombre: string;
    codigo: string;
    cod_tipo_unidad: string;
    cod_agrupacion_documental: string;
    unidad_raiz: boolean;
    item_usado: boolean;
    activo: boolean;
    id_organigrama: number;
    id_nivel_organigrama: number;
    id_unidad_org_padre: number | null;
    id_unidad_org_actual_admin_series: number;

  }
  

  export interface VariablesCreacionPlantilla {
    id_actualizar: number;
    nombre: string;
    descripcion: string;
    id_formato_tipo_medio: number|any;
    asociada_a_tipologia_doc_trd: boolean|string;
    cod_tipo_acceso: string;
    codigo_formato_calidad_asociado: string;
    version_formato_calidad_asociado: string;
    archivo: any;
    otras_tipologias:string;
    acceso_unidades:any[];
    acceso_unidades_dos:any[];
    observacion:string;
    activa:boolean;    
    id_tipologia_doc_trd:number;
    borrar_text:number;
}