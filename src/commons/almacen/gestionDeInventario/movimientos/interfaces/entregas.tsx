import { type Persona } from '../../../../../interfaces/globalModels';

export interface IEntrega {
    persona_entrega: Persona;
    entregas: IObjEntrega[];
    current_entrega: IObjEntrega;
    bienes_entrega: IObjBienEntrega[];
    current_bien_entrega: IObjBienEntrega;
    nro_entrega: number | null;
    tipo_entrada: TipoEntrada[];
    bienes_entrada: IObjBienesEntrada[];
    current_entrada: IObjEntrada;
    entradas: IObjEntrada[];
    bien_selected: IObjBienesEntrada;
    bienes_entrada_aux: IObjBienesEntrada[];
    bienes: IObjBien[];
    current_bien: IObjBien;
}

export interface IObjBien {
    bodega: string | null;
    cantidad_disponible: number | null;
    codigo_bien: string | null;
    cantidad?: number | null;
    disponible: boolean | null;
    id_bien: number | null;
    id_bodega: number | null;
    id_inventario: number | null;
    nombre: string | null;
    origen: string | null;
    tipo_documento: string | null;
    unidad_medida: string | null;
}

export interface IObjEntrega {
    id_despacho_consumo?: number | null | undefined;
    numero_despacho_consumo?: number | null;
    numero_solicitud_por_tipo?: null;
    fecha_solicitud?: string | null;
    fecha_despacho?: string | null;
    fecha_registro?: string | null;
    motivo?: string | null;
    es_despacho_conservacion?: boolean;
    despacho_anulado?: boolean;
    justificacion_anulacion?: null;
    fecha_anulacion?: string | null;
    ruta_archivo_doc_con_recibido?: string | null;
    id_solicitud_consumo?: number | null;
    id_persona_despacha?: number | null;
    id_persona_solicita?: number | null;
    id_unidad_para_la_que_solicita?: number | null;
    id_funcionario_responsable_unidad?: number | null;
    id_entrada_almacen_cv?: number | null;
    id_entrada_almacen?: number | null;
    id_bodega_general?: number | null;
    id_persona_anula?: number | null;
    tipo_entrada?: string | null;
    numero_entrada_almacen?: number | null;
    fecha_entrada?: string | null;
    observacion?: string | null;
    entrada_anulada?: boolean;
    id_proveedor?: number | null;
    id_tipo_entrada?: number | null;
    id_bodega?: number | null;
    persona_crea?: string | number;
}

export interface IObjBienEntrega {
    id_item_despacho_consumo?: number | null;
    id_despacho_consumo?: number | null
    id_bien_despachado?: number | null;
    id_entrada_almacen_bien?: number | null;
    id_bodega?: number | null;
    cantidad_despachada?: number | null;
    numero_posicion_despacho?: number | null;
    observacion?: string | null;
    id_bien?: number | null;
    bodega?: string | null;
    nombre_bien?: string | null;
    codigo_bien?: string | null;
    unidad_medida?: string | null;
}

export interface TipoEntrada {
    cod_tipo_entrada?: number | null;
    nombre?: string | null;
    descripcion?: string | null;
    titulo_persona_origen?: string | null;
    constituye_propiedad?: boolean;
}

export interface IObjBienesEntrada {
    id_entrada_almacen?: number | null;
    id_bien?: number | null;
    cantidad_entrante?: number | null;
    tiene_cantidad_disponible?: boolean | null;
    cantidad_disponible?: number | null;
    cantidad?: number | null;
    codigo_bien?: string | null;
    nombre_bien?: string | null;
    observaciones?: string | null;
    cantidad_faltante?: number | null;
    cantidad_despachada?: number | null;
}

export interface IObjEntrada {
    id_entrada_almacen?: number | null;
    tipo_entrada?: string | null;
    numero_entrada_almacen?: number | null;
    fecha_entrada?: string | null;
    fecha_real_registro?: string | null;
    motivo?: string | null;
    observacion?: string | null;
    valor_total_entrada?: number | null;
    fecha_ultima_actualizacion_diferente_creador?: string | null;
    entrada_anulada?: boolean | null;
    justificacion_anulacion?: string | null;
    fecha_anulacion?: string | null;
    id_proveedor?: number | null;
    id_tipo_entrada?: number | null;
    id_bodega?: number | null;
    ruta_archivo_doc_con_recibido: string | null;
    id_creador?: number | null;
    id_persona_ult_act_dif_creador?: number | null;
    id_persona_anula?: number | null;
}
