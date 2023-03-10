
export interface ICCD {
    ccds: ICCDObject[];
    ccd_current: ICCDObject | null;
}

export interface ICCDObject {
    id_ccd: number;
    id_organigrama: number;
    version: string;
    nombre: string;
    fecha_terminado: null | Date;
    fecha_puesta_produccion: null | Date;
    fecha_retiro_produccion: null | Date;
    justificacion: null | string;
    ruta_soporte: string;
    actual: boolean;
}
export interface ICCDForm {
    id_ccd: number;
    version: string;
    nombre_ccd: string;
    fecha_terminado: null | Date | string;
    organigrama: IListOrganigrama;
    unidades_organigrama: IListOrganigrama;
}
export interface ICCDAsingForm {
    sries_asignacion: IListOrganigrama;
    sries: string;
    subserie_asignacion: IListOrganigrama[] | [];
    subserie: string;
    unidades_asignacion: IListOrganigrama;
}
export interface IListOrganigrama {
    label: string;
    value: number;
}
export interface IListMultiselect {
    list: IListOrganigrama[] | [];
}
export interface ISeries {
    series_ccd: ISeriesObject[];
    serie_ccd_current: ISeriesObject | null;
}
export interface ISeriesObject {
    id_serie_doc: number | null;
    nombre: string;
    codigo: number;
    id_ccd: number;
}
export interface ISubSeries {
    subseries_ccd: ISubSeriesObject[];
    subseries_ccd_current: ISubSeriesObject | null;
}
export interface ISubSeriesObject {
    id_subserie_doc: number | null;
    nombre: string;
    codigo: number;
    id_ccd: number;
}
export interface IAssignments {
    assignments_ccd: IAssignmentsObject[];
    assignments_ccd_current: IAssignmentsObject | null;
}
export interface IAssignmentsObject {
    id_unidad_organizacional: number;
    id_serie_doc: number;
    subseries: any[];
    id_serie_subserie_doc?: number;
    seccion?: string;
    codigo_serie?: number;
    nombre_serie?: string;
    id?: number;
}
