export interface organigrama {
    id_unidad_organizacional: number;
    nombre: string;
    item_ya_usado: boolean;
};
export interface AsignacionEncuesta {
    Id_PQRSDF: any;
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
    sucursal:any,
    solicitud: any,
    estado: any,
    asunto:any,
}
export interface pqrs {
    value: string;
    label: string;
};
export interface Solicitud {
    id_medio_solicitud: any;
    nombre: any;
    aplica_para_pqrsdf: any;
    aplica_para_tramites: any;
    aplica_para_otros: any;
    registro_precargado: any;
    activo: any;
    item_ya_usado: any;
};
export interface SucursalEmpresa {
    id_sucursal_empresa: number;
    numero_sucursal: number;
    descripcion_sucursal: string;
    direccion: string;
    direccion_sucursal_georeferenciada_lat: string;
    direccion_sucursal_georeferenciada_lon: string | null;
    direccion_notificacion: string;
    direccion_notificacion_referencia: string;
    email_sucursal: string;
    telefono_sucursal: string;
    es_principal: boolean;
    activo: boolean;
    item_ya_usado: boolean;
    id_persona_empresa: number;
    municipio: string;
    pais_sucursal_exterior: string | null;
    municipio_notificacion: string;
}


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
