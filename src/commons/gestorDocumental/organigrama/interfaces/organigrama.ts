export interface IOrganigram {
    mold_organigram: IDatum[];
    organigram: IObjOrganigram[];
    organigram_current: IObjOrganigram;
    levels_organigram: IObjLevels[];
    unity_organigram: IObjUnitys[];
}

export interface IObjOrganigram {
    id_organigrama: number | null;
    nombre: string;
    fecha_terminado: string | Date | null;
    descripcion: string;
    fecha_puesta_produccion: string | Date | null;
    fecha_retiro_produccion: string | Date | null;
    justificacion_nueva_version: string | Date | null;
    version: string;
    actual: boolean;
    ruta_resolucion: string | null;
}

export interface IObjCreateOrganigram {
    nombre: string;
    version: string;
    descripcion: string;
}

export interface IObjLevels {
    id_nivel_organigrama: number | string | null;
    id_organigrama: number | string | null;
    orden_nivel: number;
    nombre: string;
}
export interface IObjUnitys {
    id_unidad_organizacional?: number;
    id_organigrama: number;
    id_nivel_organigrama: number;
    nombre: string;
    codigo: string;
    cod_tipo_unidad: string;
    cod_agrupacion_documental: null | string;
    unidad_raiz: boolean;
    id_unidad_org_padre?: null | number | string;
    cod_unidad_org_padre: null | string | number;
}

export interface FormValuesUnitys {
    unidad_raiz?: IUnityRoot;
    codigo: string;
    nombre: string;
    tipo_unidad?: ITypeUnity;
    nivel_unidad?: ILevelUnity;
    agrupacion_documental?: IDocumentaryGroup;
    nivel_padre?: ILevelFather;
    [x: string]: any;
}

export interface IUnityRoot {
    label: string;
    value: boolean;
}
export interface ITypeUnity {
    label?: string;
    value?: string | null;
    isDisabled?: boolean;
}

export interface ILevelUnity {
    label: string;
    value: string | number | null;
    orden: number | string | null;
}

export interface IDocumentaryGroup {
    label: string;
    value: string | null;
    isDisabled: boolean;
}

export interface ILevelFather {
    label: string;
    value: string | number | null;
    id_nivel_organigrama: number;
    isDisabled: boolean;
}

export interface IDatum {
    id_unidad_organizacional: number;
    id_organigrama: number;
    id_nivel_organigrama: number;
    nombre: string;
    codigo: string;
    cod_tipo_unidad: string;
    cod_agrupacion_documental: string;
    unidad_raiz: boolean;
    id_unidad_org_padre?: any;
    orden_nivel: number;
    hijos: ISon[];
    unidades_staff: IUnidadesstaff[];
}

interface IUnidadesstaff {
    id_unidad_organizacional: number;
    id_organigrama: number;
    id_nivel_organigrama: number;
    nombre: string;
    codigo: string;
    cod_tipo_unidad: string;
    cod_agrupacion_documental?: any;
    unidad_raiz: boolean;
    id_unidad_org_padre?: any;
    orden_nivel: number;
}

export interface ISon {
    id_unidad_organizacional?: number;
    id_organigrama: number;
    id_nivel_organigrama: number;
    nombre: string;
    codigo: string;
    cod_tipo_unidad: string;
    cod_agrupacion_documental: null | string;
    unidad_raiz: boolean;
    id_unidad_org_padre?: null | number | string;
    cod_unidad_org_padre: null | string | number;
    hijos: ISon[];
}