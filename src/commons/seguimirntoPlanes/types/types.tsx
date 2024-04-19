import type { IPlan } from '../Consultas/types/types';

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
  nombre_objetivo?: string;
  sigla_plan?: string;
  nombre_tipo_eje?: string;
  nombre: string;
  id_plan?: number | null;
  id_programa: number | null;
  id_objetivo?: number | null;
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
  nombre_eje_estrategico?: string;
  nombre_programa: string;
  numero_programa: string;
  porcentaje_1: number | null;
  porcentaje_2: number | null;
  porcentaje_3: number | null;
  porcentaje_4: number | null;
  cumplio: boolean;
  fecha_creacion: string;
  id_eje_estrategico?: number | null;
  id_sector: number | null;
}
// Proyectos
export interface IProyectos {
  id_proyecto?: number | null;
  numero_proyecto: string;
  nombre_programa?: string;
  nombre_plan?: string;
  pondera_1: number | null;
  pondera_2: number | null;
  pondera_3: number | null;
  pondera_4: number | null;
  nombre_proyecto: string;
  id_programa: number | null;
  id_plan: number | null;
  fecha_creacion: string;
  cumplio: boolean;
}
// productos
export interface IProductos {
  id_producto?: number | null;
  nombre_proyecto?: string;
  nombre_producto: string;
  nombre_plan?: string;
  id_proyecto?: number | null;
  numero_producto? : string;
  id_programa: number | null;
  id_plan: number | null;
  fecha_creacion: string;
  cumplio: boolean;
}
// Actividades
export interface IActividades {
  id_actividad?: number | null;
  nombre_producto?: string;
  nombre_actividad?: string;
  id_producto?: number | null;
  numero_actividad?: string;
  numero_producto: string;
  id_plan?: number | null;
  nombre_plan?: string;
  nombre_proyecto?: string;
  nombre_programa?: string;
  id_programa: number | null;
  id_proyecto: number | null;
  fecha_creacion: string;
  cumplio: boolean;
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
  nombre_proyecto?: string;
  nombre_programa?: string;
  numero_indicador: string;
  tipo_indicador?: string;
  linea_base: string;
  medida: string;
  id_medicion?: number | null;
  id_tipo?: number | null;
  id_producto?: number | null;
  id_actividad?: number | null;
  id_proyecto?: number | null;
  id_plan: number | null;
  id_programa: number | null;
  fecha_creacion: string;
  cumplio: boolean;
}
// Metas por Indicador
export interface IMetaIndicador {
  id_meta?: number | null;
  nombre_indicador?: string;
  nombre_meta: string;
  unidad_meta: string;
  porcentaje_meta: number | null;
  valor_meta: string;
  cumplio: boolean;
  fecha_creacion_meta?: string;
  agno_1: number | null;
  agno_2: number | null;
  agno_3: number | null;
  agno_4: number | null;
  valor_ejecutado_compromiso: number | null;
  valor_ejecutado_obligado: number | null;
  avance_fisico: number | null;
  id_indicador?: number | null;
  id_plan: number | null;
  id_programa: number | null;
  id_proyecto: number | null;
  id_producto: number | null;
  id_actividad: number | null;
  nombre_plan?: string;
  nombre_programa?: string;
  nombre_proyecto?: string;
  nombre_producto?: string;
  nombre_actividad?: string;
}
// Rubro
export interface IRubro {
  id_rubro?: number | null;
  cuenta: string;
  cod_pre: string;
  valcuenta: string;
  nombre_programa?: string;
  nombre_proyecto?: string;
  nombre_producto?: string;
  nombre_actividad?: string;
  nombre_indicador?: string;
  id_programa?: number | null;
  id_proyecto?: number | null;
  id_producto?: number | null;
  id_actividad?: number | null;
  id_indicador?: number | null;
}
// subprogramas
export interface ISubprogramas {
  id_subprograma?: number | null;
  nombre_subprograma: string;
  nombre_programa?: string;
  numero_subprograma: string;
  id_programa?: number | null;
}
// Fuentes de financiacion indicadores
export interface IFuentesFinanciacion {
  id_fuente: number | null;
  nombre_fuente: string;
  nombre_indicador?: string;
  nombre_cuenca?: string;
  nombre_proyecto?: string;
  nombre_actividad?: string;
  nombre_producto?: string;
  nombre_meta: string;
  vano_1: number | null;
  vano_2: number | null;
  vano_3: number | null;
  vano_4: number | null;
  valor_total: number | null;
  id_indicador?: number | null;
  id_cuenca?: number | null;
  id_proyecto?: number | null;
  id_actividad?: number | null;
  id_producto?: number | null;
  id_meta: number | null;
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
  nombre_meta?: string;
  nombre_indicador?: string;
  cuenta: string;
  valor_cuenta: number | null;
  id_sector?: number | null;
  id_rubro?: number | null;
  id_programa?: number | null;
  id_subprograma?: number | null;
  id_proyecto?: number | null;
  id_producto?: number | null;
  id_actividad?: number | null;
  id_indicador: number | null;
  id_meta: number | null;
}

// Concepto POAI
export interface IConceptoPOAI {
  id_concepto?: number | null;
  nombre_indicador?: string;
  nombre?: string;
  concepto: string;
  cuenta?: string;
  valor_total: number | null;
  id_rubro?: number | null;
  id_indicador?: number | null;
  id_unidad_organizacional?: number | null;
}
// fuentes de financiacion
export interface IFuentes {
  id_fuente: number | null;
  nombre_fuente: string;
  vano_1: number | null;
  vano_2: number | null;
  vano_3: number | null;
  vano_4: number | null;
  concepto: string;
  id_concepto: number | null;
}
// Banco Proyectos
export interface IBanco {
  id_banco?: number | null;
  nombre_proyecto?: string;
  nombre_actividad?: string;
  nombre_indicador?: string;
  nombre_fuente?: string;
  nombre_meta?: string;
  rubro?: string;
  banco_valor?: number | null;
  objeto_contrato?: string;
  id_proyecto?: number | null;
  id_actividad?: number | null;
  id_indicador?: number | null;
  id_meta?: number | null;
  id_rubro?: number | null;
  id_fuente_financiacion?: number | null;
}

// PLAN ANUAL DE ADQUISICIONES
export interface IPlanAdquisiciones {
  id_plan_anual?: number | null;
  nombre_plan?: string;
  nombre_intervalo?: string;
  nombre_modalidad?: string;
  nombre_fuente?: string;
  nombre_estado?: string;
  nombre_unidad?: string;
  nombre_ubicacion?: string;
  persona_responsable?: string;
  descripcion?: string;
  codigo_modalidad: string;
  mes_inicio?: String;
  mes_oferta?: String;
  duracion?: number | null;
  valor_total_estimado?: number | null;
  valor_vigencia_actual?: number | null;
  vigencia_futura?: number | null;
  decreto_paa?: boolean;
  suministro_paa?: boolean;
  email_persona_responsable?: string;
  telefono_persona_responsable: string;
  id_plan?: number | null;
  id_intervalo?: number | null;
  id_modalidad?: number | null;
  id_recurso_paa?: number | null;
  id_estado_vf?: number | null;
  id_unidad_organizacional?: number | null;
  id_ubicaion?: number | null;
  id_persona_responsable?: number | null;
}
export interface InfoPersona {
  id_persona: number | null;
  tipo_persona?: string;
  tipo_documento: string;
  numero_documento: string;
  primer_nombre: string;
  segundo_nombre: string;
  primer_apellido: string;
  segundo_apellido: string;
  nombre_completo: string;
  razon_social: string;
  nombre_comercial: string;
  tiene_usuario: boolean;
  digito_verificacion: string;
  tipo_usuario: string;
  cod_naturaleza_empresa: string;
}
// PAA - Codigos unspsc
export interface IUnspsc {
  id_paacodigo?: number | null;
  nombre_paa?: string;
  nombre_producto_unsp?: string;
  codigo_unsp?: string;
  id_plan?: number | null;
  id_codigo?: number | null;
}

// Seguimiento PAI
export interface ISeguimientoPAI {
  id_seguimiento_pai?: number | null;
  nombre_programa?: string;
  nombre_proyecto?: string;
  nombre_producto?: string;
  nombre_actividad?: string;
  nombre_unidad?: string;
  nombre_indicador?: string;
  nombre_meta?: string;
  razagada?: boolean;
  mes?: string;
  porcentaje_avance?: number | null;
  fecha_registro_avance?: string;
  entrega_vigencia?: string;
  adelanto?: string;
  hizo?: string;
  cuando?: string;
  donde?: string;
  resultado?: string;
  participacion?: string;
  beneficiarios?: string;
  compromisos?: string;
  contratros?: string;
  fecha_creacion?: string;
  id_unidad_organizacional?: number | null;
  id_programa: number | null;
  id_proyecto?: number | null;
  id_producto?: number | null;
  id_actividad?: number | null;
  id_indicador?: number | null;
  id_meta?: number | null;
}

// Seguimiento POAI

export interface ISeguiminetoPOAI {
  id?: number | null;
  id_seguimiento?: number | null;
  nombre_plan?: string;
  nombre_programa?: string;
  nombre_proyecto?: string;
  nombre_producto?: string;
  nombre_actividad?: string;
  nombre_unidad?: string;
  nombre_indicador?: string;
  nombre_meta?: string;
  codigo_modalidad?: string;
  concepto?: string;
  sector?: string;
  nombre_fuente?: string;
  cuenta?: string;
  objeto_contrato?: string;
  ubicacion?: string;
  clase_tercero?: string;
  porcentaje_pto?: number | null;
  vano_1?: number | null;
  vano_2?: number | null;
  vano_3?: number | null;
  vano_4?: number | null;
  valor_total?: number | null;
  numero_cdp_paa?: number | null;
  numero_rp_paa?: number | null;
  valor_seguimiento_banco_paa?: number | null;
  valor_cdp_paa?: number | null;
  valor_rp_paa?: number | null;
  fecha_termiacion?: string;
  duracion?: number | null;
  valor_mesual_paoi?: number | null;
  mes_oferta_paa?: string;
  mes_solicita?: string;
  valor_pagado?: number | null;
  valor_obligado?: number | null;
  valor_saldo?: number | null;
  porcentaje_ejecuta?: number | null;
  numero_contrato?: number | null;
  numerp_rp?: number | null;
  numero_cdp?: number | null;
  fecha_rp?: string;
  valor_cdp?: number | null;
  fecha_cdp?: string;
  observaciones?: string;
  id_plan?: number | null;
  id_programa?: number | null;
  id_proyecto?: number | null;
  id_producto?: number | null;
  id_actividad?: number | null;
  id_indicador?: number | null;
  id_meta?: number | null;
  id_concepto?: number | null;
  id_fuente_financiacion?: number | null;
  id_unidad_organizacional?: number | null;
  id_detalle_inversion?: number | null;
  id_banco_proyecto?: number | null;
  id_modalidad?: number | null;
  id_ubicacion?: number | null;
  id_clase_tercero?: number | null;
  id_sector?: number | null;
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
  concepto_poai: IConceptoPOAI;
  fuente: IFuentes;
  banco: IBanco;
  plan_adquisiciones: IPlanAdquisiciones;
  personas_planes: InfoPersona;
  paa_codigos: IUnspsc;
  mode_paa_codigos: IMode;
  seguimiento_pai: ISeguimientoPAI;
  consulta_plan: IPlan;
  seguimiento_poai: ISeguiminetoPOAI;
}

// unidades organizacionales
export interface IUnidadesActuales {
  id_unidad_organizacional: number;
  nombre_unidad_org_actual_admin_series: string;
  codigo_unidad_org_actual_admin_series: string;
  nombre: string;
  codigo: string;
  cod_tipo_unidad: string;
  cod_agrupacion_documental: null | string;
  unidad_raiz: boolean;
  item_usado: boolean;
  activo: boolean;
  id_organigrama: number;
  id_nivel_organigrama: number;
  id_unidad_org_padre: number | null;
  id_unidad_org_actual_admin_series: number;
}
