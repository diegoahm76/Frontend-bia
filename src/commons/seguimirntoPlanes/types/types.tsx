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
// Proyectos
export interface IProyectos {
  id_proyecto?: number | null;
  numero_proyecto: number | null;
  nombre_programa?: string;
  pondera_1: number | null;
  pondera_2: number | null;
  pondera_3: number | null;
  pondera_4: number | null;
  nombre_proyecto: string;
  id_programa?: number | null;
}
// productos
export interface IProductos {
  id_producto?: number | null;
  nombre_proyecto?: string;
  nombre_producto: string;
  id_proyecto?: number | null;
  numero_producto?: number | null;
}
// Actividades
export interface IActividades {
  id_actividad?: number | null;
  nombre_producto?: string;
  nombre_actividad?: string;
  id_producto?: number | null;
  numero_actividad?: number | null;
  id_plan?: number | null;
  nombre_plan?: string;
}
// Indicadores
export interface Indicadores {
  id_indicador: number | null;
  nombre_medicion?: string;
  nombre_tipo?: string;
  nombre_producto?: string;
  nombre_actividad?: string;
  nombre_plan?: string;
  nombre_indicador: string;
  linea_base: string;
  medida: string;
  id_medicion?: number | null;
  id_tipo?: number | null;
  id_producto?: number | null;
  id_actividad?: number | null;
  id_plan?: number | null;
}
// Metas por Indicador
export interface IMetaIndicador {
  id_meta?: number | null;
  nombre_indicador?: string;
  nombre_meta: string;
  unidad_meta: string;
  porcentaje_meta: number | null;
  valor_meta: string;
  id_indicador?: number | null;
}
// Rubro
export interface IRubro {
  id_rubro?: number | null;
  cuenta: string;
  cod_pre: string;
  valcuenta: string;
}
// subprogramas
export interface ISubprogramas {
  id_subprograma?: number | null;
  nombre_subprograma: string;
  nombre_programa?: string;
  id_programa?: number | null;
}
// Fuentes de financiacion indicadores
export interface IFuentesFinanciacion {
  id_fuente: number | null;
  nombre_fuente: string;
  nombre_indicador?: string;
  nombre_cuenca?: string;
  vano_1: number | null;
  vano_2: number | null;
  vano_3: number | null;
  vano_4: number | null;
  valor_total: number | null;
  id_indicador?: number | null;
  id_cuenca?: number | null;
}
// Detalle Inversion Cuentas
export interface IDetalleCuentas {
  id_detalle_inversion?: number | null;
  nombre_sector?: string;
  nombre_rubro?: string;
  nombre_programa?: string;
  nombre_subprograma?: string;
  nombre_proyecto?: string;
  nombre_producto?: string;
  nombre_actividad?: string;
  cuenta: string;
  valor_cuenta: number | null;
  id_sector?: number | null;
  id_rubro?: number | null;
  id_programa?: number | null;
  id_subprograma?: number | null;
  id_proyecto?: number | null;
  id_producto?: number | null;
  id_actividad?: number | null;
}
export interface IPlanesIndex {
  plan: IPlanes;
  eje_estrategico: IEjeEstrategico;
  mode: IMode;
  obj_plan: IObjetivo;
  programa: IProgramas;
  proyecto: IProyectos;
  producto: IProductos;
  actividad: IActividades;
  indicador: Indicadores;
  meta: IMetaIndicador;
  rubro: IRubro;
  subprograma: ISubprogramas;
  fuente_financiacion: IFuentesFinanciacion;
  detalle_inversion: IDetalleCuentas;
}
