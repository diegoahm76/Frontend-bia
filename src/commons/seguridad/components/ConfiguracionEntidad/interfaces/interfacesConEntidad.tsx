// Definición de la interfaz para los datos de la sucursal de la empresa
export  interface IconfiguracionEntidad {
    email_corporativo_sistema: string;
    fecha_inicio_dir_actual: string;
    fecha_inicio_coord_alm_actual: string;
    fecha_inicio_respon_trans_actual: string;
    fecha_inicio_coord_viv_actual: string;
    fecha_inicio_almacenista: string;
    id_persona_director_actual: number;
    id_persona_coord_almacen_actual: number;
    id_persona_respon_transporte_actual: number;
    id_persona_coord_viveros_actual: number;
    id_persona_almacenista: number;
}




export interface Itablaucursales {
    id_sucursal_empresa: number;
    numero_sucursal: number;
    descripcion_sucursal: string;
    direccion: string;
    direccion_sucursal_georeferenciada: string | null;
    municipio: string | null;
    pais_sucursal_exterior: string | null;
    direccion_notificacion: string;
    direccion_notificacion_referencia: string | null;
    municipio_notificacion: string | null;
    email_sucursal: string;
    telefono_sucursal: string;
    es_principal: boolean;
    activo: boolean;
    item_ya_usado: boolean;
    id_persona_empresa: number;
}

export interface ItablaUnidades {
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

export interface IDataentidad {
    id_persona: number;
    numero_documento: string;
    nombre_tipo_documento: string;
    digito_verificacion: string;
    razon_social: string;
}