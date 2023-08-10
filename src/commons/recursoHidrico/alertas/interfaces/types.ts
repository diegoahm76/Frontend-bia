export interface ConfiguracionAlerta {
    cod_clase_alerta: string;
    nombre_clase_alerta: string;
    descripcion_clase_alerta: string;
    cod_tipo_clase_alerta: string;
    cod_categoria_clase_alerta: string;
    cant_dias_previas: null;
    frecuencia_previas: null;
    cant_dias_post: null;
    frecuencia_post: null;
    envios_email: boolean;
    mensaje_base_dia: string;
    mensaje_base_previo: null;
    mensaje_base_vencido: null;
    nivel_prioridad: string;
    activa: boolean;
    asignar_responsable: boolean;
    id_modulo_destino: number;
    id_modulo_generador: number;
}

export interface IAlerta {
    cod_clase_alerta: string;
    nombre_clase_alerta: string;
}
export interface DataAlertaPersona {
    id_persona_alertar: number;
    nombre_completo: string;
    nombre_unidad: null;
    perfil_sistema: string;
    es_responsable_directo: boolean;
    registro_editable: boolean;
    cod_clase_alerta: string;
    id_persona: number | null;
    id_unidad_org_lider: null;
    datos_reordenados: DatosReordenados;
}
export interface DatosReordenados {
    destinatario: string;
    detalle: string;
    nombre: string;
    principal: boolean;
}
export interface AlertaProgramada {
    id_fecha: number;
    dia_cumplimiento: number;
    mes_cumplimiento: number;
    age_cumplimiento: null;
    cod_clase_alerta: string;
}
export interface CrearAlerta {
    cod_clase_alerta: string;
    dia_cumplimiento: number;
    mes_cumplimiento: number;
}
export interface CrearPersonaAlerta {
    cod_clase_alerta:       string;
    id_persona:             null | number;
    id_unidad_org_lider:    number;
    perfil_sistema:         null | number;
    es_responsable_directo: boolean;
}
export interface PutConfigutracionAlerta {
    envios_email:    boolean;
    nivel_prioridad: string;
    activa:          boolean;
}
