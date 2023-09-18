export interface ExpedienteDocumental {
    codigo_exp_und_serie_subserie: string;
    id_expediente_documental: number | null;
    titulo_expediente: string;
    id_und_seccion_propietaria_serie: number | null;
    nombre_unidad_org: string;
    id_serie_origen: number | null;
    nombre_serie_origen: string;
    id_subserie_origen: number | null;
    nombre_subserie_origen: string;
    id_trd_origen: number | null;
    nombre_trd_origen: string;
    fecha_apertura_expediente: string;
}

export interface IExpediente {
    cierre_expediente: ExpedienteDocumental;
}