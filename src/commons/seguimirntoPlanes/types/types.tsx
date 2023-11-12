export interface IPlanes {
  id_plan?: number | null;
  nombre_plan: string;
  sigla_plan: string;
  tipo_plan: string;
  agno_inicio: number | null;
  agno_fin: number | null;
  estado_vigencia: boolean;
}

export interface IMode {
  ver: boolean;
  editar: boolean;
  crear: boolean;
}

// Eje Estrategico
export interface IEjeEstrategico {
  id_eje_estrategico?: number | null;
  nombre_plan?: string;
  nombre_tipo_eje?: string;
  nombre: string;
  id_plan?: number | null;
  id_tipo_eje?: number | null;
}
// Objetivo
export interface IObjetivo {
  id_objetivo?: number | null;
  nombre_plan?: string;
  nombre_objetivo: string;
  id_plan?: number | null;
}
// Programas
export interface IProgramas {
  id_programa?: number | null;
  nombre_plan?: string;
  porcentaje_1: number | null;
  porcentaje_2: number | null;
  porcentaje_3: number | null;
  porcentaje_4: number | null;
  nombre_programa: string;
  id_plan?: number | null;
}
export interface IPlanesIndex {
  plan: IPlanes;
  eje_estrategico: IEjeEstrategico;
  mode: IMode;
  obj_plan: IObjetivo;
  programa: IProgramas;
}
