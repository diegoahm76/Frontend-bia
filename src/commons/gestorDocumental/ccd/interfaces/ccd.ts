import type { IList } from '../../../../interfaces/globalModels';

export interface ICCD {
  ccds: ICCDObject[];
  ccd_current: ICCDObject | null;
}

export interface ICCDObject {
  nombre_unidad_organizacional: string | number;
  valor_aumento_serie: string | number;
  valor_aumento_subserie: string | number;
  id_ccd: number;
  id_organigrama: number;
  version: string;
  nombre: string;
  fecha_terminado: null | Date;
  fecha_puesta_produccion: null | Date;
  fecha_retiro_produccion: null | Date;
  justificacion: null | string;
  ruta_soporte?: File | string | any;
  actual: boolean;
}
export interface ICCDForm {
  ruta_soporte?: File | string | any;
  id_ccd: number;
  version: string;
  nombre_ccd: string;
  fecha_terminado: null | Date | string;
  organigrama: IList | any;
  unidades_organigrama: IList | any;
  valor_aumento_serie: string | number | any;
  valor_aumento_subserie: string | number | any;
}
export interface ICCDAsingForm {
  sries_asignacion: IList;
  sries: string;
  subserie_asignacion: IList[] | [];
  subserie: string;
  unidades_asignacion: IList;
}

export interface IListMultiselect {
  list: IList[] | [];
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

export interface DataCambioCCDActual {
  id_ccd: number;
  justificacion: string;
}