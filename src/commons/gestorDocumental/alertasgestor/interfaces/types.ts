
export interface Persona {
    id_persona: number;
    primer_nombre: string;
    segundo_nombre: string;
    primer_apellido: string;
    segundo_apellido: string;
}
export interface Alertas {
    id_persona_alertar: number;
    nombre_completo: string;
    nombre_unidad: string | null;
    perfil_sistema: string | null;
    es_responsable_directo: boolean;
    registro_editable: boolean;
    cod_clase_alerta: string;
    id_persona: number;
    id_unidad_org_lider: number | null;
    datos_reordenados: {
        destinatario: string;
        detalle: string;
        nombre: string;
        principal: string;
    };
}


export interface SelectAlerta {
    cod_clase_alerta: string;
    nombre_subsistema: string;
    nombre_clase_alerta: string;
    descripcion_clase_alerta: string;
    cod_tipo_clase_alerta: string;
    cod_categoria_clase_alerta: string;
    cant_dias_previas: number | null;
    frecuencia_previas: string | null;
    cant_dias_post: number | null;
    frecuencia_post: string | null;
    envios_email: boolean;
    mensaje_base_dia: string;
    mensaje_base_previo: string | null;
    mensaje_base_vencido: string | null;
    nivel_prioridad: string;
    activa: boolean;
    asignar_responsable: boolean;
    nombre_funcion_comple_mensaje: string;
    id_modulo_destino: number;
    id_modulo_generador: number;
}