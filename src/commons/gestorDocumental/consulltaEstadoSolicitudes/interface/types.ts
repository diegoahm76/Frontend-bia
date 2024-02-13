export interface Pqr {
    value: string;
    label: string;
};
export interface TipoPQRSDF {
    codigo: string;
    descripcion: string;
};
export interface AsignacionEncuesta {
    Id_PQRSDF: any;
    tipo_pqrsdf: any;
    Titular: any;
    Radicado: any;
    Estado: any;
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
    tipo_solicitud: any,
};
export interface estado {
    id_estado_solicitud: number;
    nombre: string;
    aplica_para_pqrsdf: boolean;
    aplica_para_tramites: boolean;
    aplica_para_otros: boolean;
};