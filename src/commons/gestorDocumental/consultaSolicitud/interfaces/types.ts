export interface organigrama {
    id_unidad_organizacional: number;
    nombre: string;
    item_ya_usado: boolean;
};
export interface AsignacionEncuesta {
    id_pqrsdf: any;
    tipo_pqrsdf: any;
    medio_solicitud: any;
    sucursal_recepcion: any;
    numero_radicado: any;
    fecha_radicado: any;
    persona_recibe: any;
    fecha_solicitud: any;
};
export interface FormData {
    id_persona_alertar: any;
    organigrama: any;
    fecha_desde: any;
    fecha_hasta: any;
    radicado: any;
    estado_solicitud: any,
    pqrs: any,
    estado: any,
}
export interface Sexo {
    value: string;
    label: string;
};
export interface estado {
    id_estado_solicitud: number;
    nombre: string;
    aplica_para_pqrsdf: boolean;
    aplica_para_tramites: boolean;
    aplica_para_otros: boolean;
}

export interface Persona {
    id_persona: any;
    primer_nombre: string;
    segundo_nombre: string;
    primer_apellido: string;
    segundo_apellido: string;
    tipo_usuario: string;
};
