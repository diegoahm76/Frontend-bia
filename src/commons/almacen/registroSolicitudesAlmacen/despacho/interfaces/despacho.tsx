




export interface IObjDespacho {
    id_despacho_consumo?: number | null;
    numero_despacho_consumo?: number | null;
    numero_solicitud_por_tipo?: number | null;
    fecha_solicitud?: string | null;
    fecha_despacho?: string | null;
    fecha_registro?: string | null;
    motivo?: string | null;
    es_despacho_conservacion?: boolean;
    despacho_anulado: null,
    justificacion_anulacion?: string | null;
    fecha_anulacion?: string | null;
    ruta_archivo_doc_con_recibido: null;
    id_solicitud_consumo?: number | null;
    id_persona_despacha?: number | null;
    id_persona_solicita?: number | null;
    id_unidad_para_la_que_solicita?: number | null;
    id_funcionario_responsable_unidad?: number | null;
    id_entrada_almacen_cv?: number | null;
    id_bodega_general?: number | null;
    id_persona_anula?: number | null;
}

export interface IObjBienConsumo {
    id_bien?: number | null;
    marca?: string | null;
    nombre_padre?: string | null;
    unidad_medida?: string | null;
    unidad_medida_vida_util?: string | null;
    porcentaje_iva?: number | null;
    codigo_bien?: string | null;
    nro_elemento_bien?: number | null;
    nombre?: string | null;
    cod_tipo_bien?: string | null;
    cod_tipo_activo?: string | null;
    nivel_jerarquico?: number | null;
    nombre_cientifico?: string | null;
    descripcion?: string | null;
    doc_identificador_nro?: number | null;
    cod_metodo_valoracion?: string | null;
    cod_tipo_depreciacion?: string | null;
    cantidad_vida_util?: number | null;
    valor_residual?: number | null;
    stock_minimo?: number | null;
    stock_maximo?: number | null;
    solicitable_vivero?: boolean | null;
    es_semilla_vivero?: boolean | null;
    cod_tipo_elemento_vivero?: string | null;
    tiene_hoja_vida?: boolean | null;
    maneja_hoja_vida?: boolean | null;
    visible_solicitudes?: boolean | null;
    id_marca?: number | null;
    id_unidad_medida?: number | null;
    id_porcentaje_iva?: number | null;
    id_unidad_medida_vida_util?: number | null;
    id_bien_padre?: number | null;
}
