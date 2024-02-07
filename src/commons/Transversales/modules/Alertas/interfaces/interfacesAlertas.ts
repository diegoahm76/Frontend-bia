export interface InterAlertas {
    id_lider_unidad_org: number;
    nombre_organigrama: string;
    version_organigra: string;
    codigo_unidad_org: string;
    nombre_unidad_org: string;
    tipo_documento: string;
    numero_documento: string;
    nombre_completo: string;
    fecha_asignacion: string;
    observaciones_asignacion: string;
    id_unidad_organizacional: number;
    id_persona: number;
    id_persona_asigna: number;
}

export interface AlertaBandejaAlertaPersona {
    documento:string;
    id_alerta_bandeja_alerta_persona: number;
    nivel_prioridad: number;
    tipo_alerta: string;
    fecha_hora: string;
    nombre_clase_alerta: string;
    id_modulo: number;
    nombre_modulo: string;
    ultima_repeticion: boolean;
    leido:   boolean;
    fecha_leido: string | null;
    archivado: boolean;
    fecha_archivado: string | null;
    repeticiones_suspendidas: boolean;
    fecha_suspencion_repeticion: string | null;
    fecha_envio_email: string | null;
    email_usado: string;
    responsable_directo: boolean;
    id_bandeja_alerta_persona: number;
    id_alerta_generada: number;
    mensaje: string;
}

export interface Alerta_update {
    id_alerta_bandeja_alerta_persona: number;
    leido: string | boolean;
    fecha_leido: string | null;
    archivado: boolean;
    fecha_archivado: string | null;
    repeticiones_suspendidas: boolean;
    fecha_suspencion_repeticion: string | null;
    fecha_envio_email: string | null;
    email_usado: string;
    responsable_directo: boolean;
    id_bandeja_alerta_persona: number;
    id_alerta_generada: number;
}
export interface InterfazMostarAlerta {
    columnnns: any; // o el tipo adecuado para id_alerta_bandeja_alerta_persona
    dat: number; // o el tipo adecuado para id_alerta_bandeja_alerta_persona
    marcador: boolean;
    activate_suspender_alerta: () => void;
}

export interface InterfazMostarAlerta2 {
    dat: number; // o el tipo adecuado para id_alerta_bandeja_alerta_persona
    marcador: boolean;
    activate_suspender_alerta: () => void;
}
