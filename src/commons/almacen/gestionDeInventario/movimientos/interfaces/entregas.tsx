import { type Persona } from "../../../../../interfaces/globalModels";


export interface IEntrega {

    persona_entrega: Persona;
    entregas: IObjEntrega[];
    current_entrega: IObjEntrega;
    bienes_entrega: IObjBienEntrega[];
    current_bien_entrega: IObjBienEntrega;
    nro_entrega: number | null;
    tipo_entrada: TipoEntrada[]
}

export interface IObjEntrega {
    id_despacho_consumo?: number | null;
    numero_despacho_consumo?: number | null;
    numero_solicitud_por_tipo: null,
    fecha_solicitud?: string | null;
    fecha_despacho?: string | null;
    fecha_registro?: string | null;
    motivo?: string | null;
    es_despacho_conservacion: boolean,
    despacho_anulado: null,
    justificacion_anulacion: null,
    fecha_anulacion: null,
    ruta_archivo_doc_con_recibido: null;
    id_solicitud_consumo?: number | null;
    id_persona_despacha?: number | null;
    id_persona_solicita?: number | null;
    id_unidad_para_la_que_solicita?: number | null;
    id_funcionario_responsable_unidad?: number | null;
    id_entrada_almacen_cv?: number | null;
    id_bodega_general?: number | null;
    id_persona_anula?: number | null;
    persona_crea?: string | number;
}

export interface IObjBienEntrega {
    id_despacho_consumo?: number | null;
    id_bien_despachado?: number | null;
    id_entrada_almacen_bien?: number | null;
    id_bodega?: number | null;
    cantidad_despachada?: number | null;
    numero_posicion_despacho?: number | null;
    observacion?: string | null;
}

export interface TipoEntrada {
    cod_tipo_entrada?: number | null;
    nombre?: string | null;
    descripcion?: string | null;
    titulo_persona_origen?: string | null;
    constituye_propiedad?: boolean
}


