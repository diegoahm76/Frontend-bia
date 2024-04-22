import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type {
  IMode,
  IEjeEstrategico,
  IPlanes,
  IPlanesIndex,
  IObjetivo,
  IProgramas,
  IProyectos,
  IProductos,
  IActividades,
  Indicadores,
  IMetaIndicador,
  IRubro,
  ISubprogramas,
  IFuentesFinanciacion,
  IDetalleCuentas,
  IConceptoPOAI,
  IFuentes,
  IBanco,
  IPlanAdquisiciones,
  InfoPersona,
  IUnspsc,
  ISeguimientoPAI,
  ISeguiminetoPOAI,
  IMetasPgar,
  ILineaBasePgar,
  IActividadPgar,
  IIndicadorPgar,
} from '../../types/types';
import { IPlan } from '../../Consultas/types/types';

export const initial_state_planes: IPlanes = {
  id_plan: null,
  nombre_plan: '',
  sigla_plan: '',
  tipo_plan: '',
  agno_inicio: null,
  agno_fin: null,
  estado_vigencia: false,
};

export const mode_planes: IMode = {
  ver: false,
  crear: false,
  editar: false,
};

export const initial_state_eje_estrategico: IEjeEstrategico = {
  id_eje_estrategico: null,
  nombre_plan: '',
  nombre_tipo_eje: '',
  // nombre_programa: '',
  nombre: '',
  id_plan: null,
  id_programa: null,
  id_tipo_eje: null,
};

export const initial_state_objetivo_plan: IObjetivo = {
  id_objetivo: null,
  nombre_plan: '',
  nombre_objetivo: '',
  id_plan: null,
};

export const initial_state_programa: IProgramas = {
  id_programa: null,
  nombre_plan: '',
  numero_programa: '',
  porcentaje_1: null,
  porcentaje_2: null,
  porcentaje_3: null,
  porcentaje_4: null,
  nombre_programa: '',
  id_eje_estrategico: null,
  id_sector: null,
  fecha_creacion: '',
  cumplio: false,
};

export const initial_state_meta_pgar: IMetasPgar = {
  id_meta_eje: null,
  nombre_eje_estrategico: '',
  nombre_objetivo: '',
  nombre_plan: '',
  tipo_eje_estrategico: '',
  nombre_plan_objetivo: '',
  nombre_meta_eje: '',
  numero_meta_eje: '',
  fecha_creacion: '',
  cumplio: false,
  id_eje_estrategico: null,
  id_objetivo: null,
  id_plan: null,
}

export const initial_state_linea_base: ILineaBasePgar = {
  id_linea_base: null,
  nombre_eje_estrategico: '',
  nombre_objetivo: '',
  nombre_plan: '',
  nombre_meta: '',
  tipo_eje_estrategico: '',
  nombre_linea_base: '',
  fecha_creacion: '',
  cumplio: false,
  id_meta_eje: null,
  id_eje_estrategico: null,
  id_plan: null,
  id_objetivo: null,
}

export const initial_state_actividad_pgar: IActividadPgar = {
  id_actividad: null,
  numero_actividad: '',
  nombre_actividad: '',
  nombre_plan: '',
  nombre_eje_estrategico: '',
  nombre_meta: '',
  nombre_linea_base: '',
  id_linea_base: null,
  id_meta_eje: null,
  id_eje_estrategico: null,
  id_plan: null,
  id_objetivo: null,
  fecha_creacion: '',
  cumplio: false,
}

export const initial_state_indicador_pegar: IIndicadorPgar = {
  id_indicador: null,
  numero_indicador: '',
  nombre_indicador: '',
  nombre_linea_base: '',
  medida: '',
  tipo_indicador: '',
  entidad_responsable: '',
  nombre_actividad: '',
  nombre_plan: '',
  nombre_eje_estrategico: '',
  nombre_meta: '',
  id_medicion: null,
  id_actividad: null,
  id_plan: null,
  id_linea_base: null,
  id_meta_eje: null,
  id_eje_estrategico: null,
  id_objetivo: null,
  id_unidad_organizacional: null,
  fecha_creacion: '',
  cumplio: false,
}

export const initial_state_armonizacion_pgar: any = {
  id_indicador: null,
  numero_indicador: '',
  nombre_indicador: '',
  nombre_actividad: '',
  linea_base: '',
  nombre_plan: '',
  nombre_eje_estrategico: '',
  nombre_meta: '',
  id_actividad: null,
  id_linea_base: null,
  id_meta_eje: null,
  id_eje_estrategico: null,
  id_planPGAR: null,
  id_planPAI: null,
  id_objetivo: null,
  fecha_creacion: '',
  cumplio: false,
}

export const initial_state_proyecto: IProyectos = {
  id_proyecto: null,
  numero_proyecto: '',
  nombre_programa: '',
  pondera_1: null,
  pondera_2: null,
  pondera_3: null,
  pondera_4: null,
  nombre_proyecto: '',
  id_programa: null,
  id_plan: null,
  fecha_creacion: '',
  cumplio: false,
};

export const initial_state_productos: IProductos = {
  id_producto: null,
  nombre_proyecto: '',
  nombre_producto: '',
  id_proyecto: null,
  numero_producto: '',
  id_plan: null,
  id_programa: null,
  fecha_creacion: '',
  cumplio: false,
};

export const initial_state_actividades: IActividades = {
  id_actividad: null,
  nombre_producto: '',
  nombre_actividad: '',
  id_producto: null,
  numero_actividad: '',
  numero_producto: '',
  id_plan: null,
  nombre_plan: '',
  id_proyecto: null,
  id_programa: null,
  fecha_creacion: '',
  cumplio: false,
};

export const initial_state_indicadores: Indicadores = {
  id_indicador: null,
  nombre_medicion: '',
  nombre_tipo: '',
  nombre_producto: '',
  nombre_actividad: '',
  nombre_plan: '',
  nombre_indicador: '',
  nombre_proyecto: '',
  numero_indicador: '',
  linea_base: '',
  medida: '',
  tipo_indicador: '',
  id_medicion: null,
  id_tipo: null,
  id_producto: null,
  id_actividad: null,
  id_plan: null,
  id_proyecto: null,
  id_programa: null,
  fecha_creacion: '',
  cumplio: false,
};

export const initial_state_meta: IMetaIndicador = {
  id_meta: null,
  nombre_indicador: '',
  nombre_meta: '',
  unidad_meta: '',
  porcentaje_meta: null,
  valor_meta: '',
  cumplio: false,
  fecha_creacion_meta: '',
  agno_1: null,
  agno_2: null,
  agno_3: null,
  agno_4: null,
  valor_ejecutado_compromiso: null,
  valor_ejecutado_obligado: null,
  avance_fisico: null,
  id_indicador: null,
  id_plan: null,
  id_programa: null,
  id_proyecto: null,
  id_producto: null,
  id_actividad: null,
  nombre_plan: '',
  nombre_programa: '',
  nombre_proyecto: '',
  nombre_producto: '',
  nombre_actividad: '',
};

export const initial_state_rubro: IRubro = {
  id_rubro: null,
  cuenta: '',
  cod_pre: '',
  valcuenta: '',
  nombre_programa: '',
  nombre_proyecto: '',
  nombre_producto: '',
  nombre_actividad: '',
  nombre_indicador: '',
  id_programa: null,
  id_proyecto: null,
  id_producto: null,
  id_actividad: null,
  id_indicador: null,
};

export const initial_state_subprogramas: ISubprogramas = {
  id_subprograma: null,
  nombre_programa: '',
  nombre_subprograma: '',
  numero_subprograma: '',
  id_programa: null,
};

export const initial_state_fuentes_fianciacion: IFuentesFinanciacion = {
  id_fuente: null,
  nombre_fuente: '',
  nombre_indicador: '',
  nombre_cuenca: '',
  nombre_proyecto: '',
  nombre_actividad: '',
  nombre_producto: '',
  nombre_meta: '',
  vano_1: null,
  vano_2: null,
  vano_3: null,
  vano_4: null,
  valor_total: null,
  id_indicador: null,
  id_cuenca: null,
  id_proyecto: null,
  id_actividad: null,
  id_producto: null,
  id_meta: null,
};

export const initial_state_detalle_inversion: IDetalleCuentas = {
  id_detalle_inversion: null,
  nombre_sector: '',
  nombre_rubro: '',
  nombre_programa: '',
  nombre_subprograma: '',
  nombre_proyecto: '',
  nombre_producto: '',
  nombre_actividad: '',
  nombre_indicador: '',
  nombre_meta: '',
  cuenta: '',
  valor_cuenta: null,
  id_sector: null,
  id_rubro: null,
  id_programa: null,
  id_subprograma: null,
  id_proyecto: null,
  id_producto: null,
  id_actividad: null,
  id_indicador: null,
  id_meta: null,
};

export const initial_state_concepto_poai: IConceptoPOAI = {
  id_concepto: null,
  nombre_indicador: '',
  nombre: '',
  concepto: '',
  cuenta: '',
  valor_total: null,
  id_rubro: null,
  id_indicador: null,
  id_unidad_organizacional: null,
};

export const initial_state_fuente: IFuentes = {
  id_fuente: null,
  nombre_fuente: '',
  vano_1: null,
  vano_2: null,
  vano_3: null,
  vano_4: null,
  concepto: '',
  id_concepto: null,
};

export const initial_state_banco: IBanco = {
  id_banco: null,
  nombre_proyecto: '',
  nombre_actividad: '',
  nombre_indicador: '',
  nombre_meta: '',
  rubro: '',
  banco_valor: null,
  objeto_contrato: '',
  id_proyecto: null,
  id_actividad: null,
  id_indicador: null,
  id_meta: null,
  id_rubro: null,
  id_fuente_financiacion: null,
};

export const initial_state_plan_adquisiciones: IPlanAdquisiciones = {
  id_plan_anual: null,
  nombre_plan: '',
  nombre_intervalo: '',
  nombre_modalidad: '',
  nombre_fuente: '',
  nombre_estado: '',
  nombre_unidad: '',
  nombre_ubicacion: '',
  persona_responsable: '',
  descripcion: '',
  mes_inicio: '',
  mes_oferta: '',
  duracion: null,
  valor_total_estimado: null,
  valor_vigencia_actual: null,
  vigencia_futura: null,
  decreto_paa: false,
  suministro_paa: false,
  codigo_modalidad: '',
  email_persona_responsable: '',
  telefono_persona_responsable: '',
  id_plan: null,
  id_intervalo: null,
  id_modalidad: null,
  id_recurso_paa: null,
  id_estado_vf: null,
  id_unidad_organizacional: null,
  id_ubicaion: null,
  id_persona_responsable: null,
};

export const inicial_state_persona_planes: InfoPersona = {
  id_persona: null,
  tipo_persona: '',
  tipo_documento: '',
  numero_documento: '',
  primer_nombre: '',
  segundo_nombre: '',
  primer_apellido: '',
  segundo_apellido: '',
  nombre_completo: '',
  razon_social: '',
  nombre_comercial: '',
  tiene_usuario: false,
  digito_verificacion: '',
  tipo_usuario: '',
  cod_naturaleza_empresa: '',
};

export const initial_state_paa_codigos: IUnspsc = {
  id_paacodigo: null,
  nombre_paa: '',
  nombre_producto_unsp: '',
  codigo_unsp: '',
  id_plan: null,
  id_codigo: null,
};
export const mode_paa_codigos: IMode = {
  ver: false,
  crear: false,
  editar: false,
};

export const initial_state_segui_pai: ISeguimientoPAI = {
  id_seguimiento_pai: null,
  nombre_programa: '',
  nombre_proyecto: '',
  nombre_producto: '',
  nombre_actividad: '',
  nombre_unidad: '',
  nombre_indicador: '',
  nombre_meta: '',
  razagada: false,
  mes: '',
  porcentaje_avance: null,
  fecha_registro_avance: '',
  entrega_vigencia: '',
  hizo: '',
  cuando: '',
  donde: '',
  resultado: '',
  participacion: '',
  adelanto: '',
  beneficiarios: '',
  compromisos: '',
  contratros: '',
  id_unidad_organizacional: null,
  id_proyecto: null,
  id_producto: null,
  id_actividad: null,
  id_indicador: null,
  id_meta: null,
  fecha_creacion: '',
  id_programa: null,
};

export const initial_state_consulta_plan: IPlan = {
  id_plan: null,
  objetivos: [],
  ejes_estractegicos: [],
  programas: [],
  nombre_plan: '',
  sigla_plan: '',
  tipo_plan: '',
  agno_inicio: null,
  agno_fin: null,
  estado_vigencia: false,
};

export const initial_state_seguimineto_poai: ISeguiminetoPOAI = {
  id_seguimiento: null,
  id: null,
  nombre_plan: '',
  nombre_programa: '',
  nombre_proyecto: '',
  nombre_producto: '',
  nombre_actividad: '',
  nombre_unidad: '',
  nombre_indicador: '',
  nombre_meta: '',
  codigo_modalidad: '',
  concepto: '',
  sector: '',
  nombre_fuente: '',
  cuenta: '',
  objeto_contrato: '',
  ubicacion: '',
  clase_tercero: '',
  porcentaje_pto: null,
  vano_1: null,
  vano_2: null,
  vano_3: null,
  vano_4: null,
  valor_total: null,
  numero_cdp_paa: null,
  numero_rp_paa: null,
  valor_seguimiento_banco_paa: null,
  valor_cdp_paa: null,
  valor_rp_paa: null,
  fecha_termiacion: '',
  duracion: null,
  valor_mesual_paoi: null,
  mes_oferta_paa: '',
  mes_solicita: '',
  valor_pagado: null,
  valor_obligado: null,
  valor_saldo: null,
  porcentaje_ejecuta: null,
  numero_contrato: null,
  numerp_rp: null,
  fecha_rp: '',
  valor_cdp: null,
  numero_cdp: null,
  fecha_cdp: '',
  observaciones: '',
  id_plan: null,
  id_programa: null,
  id_proyecto: null,
  id_producto: null,
  id_actividad: null,
  id_indicador: null,
  id_meta: null,
  id_concepto: null,
  id_fuente_financiacion: null,
  id_unidad_organizacional: null,
  id_detalle_inversion: null,
  id_banco_proyecto: null,
  id_modalidad: null,
  id_ubicacion: null,
  id_clase_tercero: null,
  id_sector: null,
};

export const initial_state: IPlanesIndex = {
  plan: initial_state_planes,
  eje_estrategico: initial_state_eje_estrategico,
  mode: mode_planes,
  obj_plan: initial_state_objetivo_plan,
  programa: initial_state_programa,
  meta_pgar: initial_state_meta_pgar,
  linea_base: initial_state_linea_base,
  actividad_pgar: initial_state_actividad_pgar,
  indicador_pgar: initial_state_indicador_pegar,
  armonizacion_pgar: initial_state_armonizacion_pgar,
  proyecto: initial_state_proyecto,
  producto: initial_state_productos,
  actividad: initial_state_actividades,
  indicador: initial_state_indicadores,
  meta: initial_state_meta,
  rubro: initial_state_rubro,
  subprograma: initial_state_subprogramas,
  fuente_financiacion: initial_state_fuentes_fianciacion,
  detalle_inversion: initial_state_detalle_inversion,
  concepto_poai: initial_state_concepto_poai,
  fuente: initial_state_fuente,
  banco: initial_state_banco,
  plan_adquisiciones: initial_state_plan_adquisiciones,
  personas_planes: inicial_state_persona_planes,
  paa_codigos: initial_state_paa_codigos,
  mode_paa_codigos: mode_paa_codigos,
  seguimiento_pai: initial_state_segui_pai,
  consulta_plan: initial_state_consulta_plan,
  seguimiento_poai: initial_state_seguimineto_poai,
};

export const planes_slice = createSlice({
  name: 'planes',
  initialState: initial_state,
  reducers: {
    reset_state: () => initial_state,

    set_current_planes: (
      state: IPlanesIndex,
      action: PayloadAction<IPlanes>
    ) => {
      state.plan = action.payload;
    },
    set_current_eje_estrategico: (
      state: IPlanesIndex,
      action: PayloadAction<IEjeEstrategico>
    ) => {
      state.eje_estrategico = action.payload;
    },
    set_current_mode_planes: (
      state: IPlanesIndex,
      action: PayloadAction<IMode>
    ) => {
      state.mode = action.payload;
    },
    set_current_objetivo: (
      state: IPlanesIndex,
      action: PayloadAction<IObjetivo>
    ) => {
      state.obj_plan = action.payload;
    },
    set_current_programa: (
      state: IPlanesIndex,
      action: PayloadAction<IProgramas>
    ) => {
      state.programa = action.payload;
    },
    set_current_meta_pgar: (
      state: IPlanesIndex,
      action: PayloadAction<IMetasPgar>
    ) => {
      state.meta_pgar = action.payload;
    },
    set_current_linea_base: (
      state: IPlanesIndex,
      action: PayloadAction<ILineaBasePgar>
    ) => {
      state.linea_base = action.payload;
    },
    set_current_actividad_pgar: (
      state: IPlanesIndex,
      action: PayloadAction<IActividadPgar>
    ) => {
      state.actividad_pgar = action.payload;
    },
    set_current_indicador_pgar : (
      state: IPlanesIndex,
      action: PayloadAction<IIndicadorPgar>
    ) => {
      state.indicador_pgar = action.payload;
    },
    set_current_armonizacion_pgar : (
      state: IPlanesIndex,
      action: PayloadAction<any>
    ) => {
      state.armonizacion_pgar = action.payload;
    },
    set_current_proyecto: (
      state: IPlanesIndex,
      action: PayloadAction<IProyectos>
    ) => {
      state.proyecto = action.payload;
    },
    set_current_producto: (
      state: IPlanesIndex,
      action: PayloadAction<IProductos>
    ) => {
      state.producto = action.payload;
    },
    set_current_actividad: (
      state: IPlanesIndex,
      action: PayloadAction<IActividades>
    ) => {
      state.actividad = action.payload;
    },
    set_current_indicador: (
      state: IPlanesIndex,
      action: PayloadAction<Indicadores>
    ) => {
      state.indicador = action.payload;
    },
    set_current_meta: (
      state: IPlanesIndex,
      action: PayloadAction<IMetaIndicador>
    ) => {
      state.meta = action.payload;
    },
    set_current_rubro: (state: IPlanesIndex, action: PayloadAction<IRubro>) => {
      state.rubro = action.payload;
    },
    set_current_subprograma: (
      state: IPlanesIndex,
      action: PayloadAction<ISubprogramas>
    ) => {
      state.subprograma = action.payload;
    },
    set_current_fuentes_financiacion: (
      state: IPlanesIndex,
      action: PayloadAction<IFuentesFinanciacion>
    ) => {
      state.fuente_financiacion = action.payload;
    },
    set_current_detalle_inversion: (
      state: IPlanesIndex,
      action: PayloadAction<IDetalleCuentas>
    ) => {
      state.detalle_inversion = action.payload;
    },
    set_current_concepto_poai: (
      state: IPlanesIndex,
      action: PayloadAction<IConceptoPOAI>
    ) => {
      state.concepto_poai = action.payload;
    },
    set_current_fuente: (
      state: IPlanesIndex,
      action: PayloadAction<IFuentes>
    ) => {
      state.fuente = action.payload;
    },
    set_current_banco: (state: IPlanesIndex, action: PayloadAction<IBanco>) => {
      state.banco = action.payload;
    },
    set_current_plan_adquisiciones: (
      state: IPlanesIndex,
      action: PayloadAction<IPlanAdquisiciones>
    ) => {
      state.plan_adquisiciones = action.payload;
    },
    set_current_persona_planes: (
      state: IPlanesIndex,
      action: PayloadAction<InfoPersona>
    ) => {
      state.personas_planes = action.payload;
    },
    set_current_paa_codigos: (
      state: IPlanesIndex,
      action: PayloadAction<IUnspsc>
    ) => {
      state.paa_codigos = action.payload;
    },
    set_current_mode_paa_codigos: (
      state: IPlanesIndex,
      action: PayloadAction<IMode>
    ) => {
      state.mode_paa_codigos = action.payload;
    },
    set_current_seguimiento_pai: (
      state: IPlanesIndex,
      action: PayloadAction<ISeguimientoPAI>
    ) => {
      state.seguimiento_pai = action.payload;
    },
    set_current_consulta_plan: (
      state: IPlanesIndex,
      action: PayloadAction<IPlan>
    ) => {
      state.consulta_plan = action.payload;
    },
    set_current_seguimiento_paoi: (
      state: IPlanesIndex,
      action: PayloadAction<ISeguiminetoPOAI>
    ) => {
      state.seguimiento_poai = action.payload;
    },
  },
});

export const {
  reset_state,
  set_current_planes,
  set_current_eje_estrategico,
  set_current_mode_planes,
  set_current_objetivo,
  set_current_programa,
  set_current_meta_pgar,
  set_current_linea_base,
  set_current_actividad_pgar,
  set_current_indicador_pgar,
  set_current_armonizacion_pgar,
  set_current_proyecto,
  set_current_producto,
  set_current_actividad,
  set_current_indicador,
  set_current_meta,
  set_current_rubro,
  set_current_subprograma,
  set_current_fuentes_financiacion,
  set_current_detalle_inversion,
  set_current_concepto_poai,
  set_current_fuente,
  set_current_banco,
  set_current_plan_adquisiciones,
  set_current_persona_planes,
  set_current_paa_codigos,
  set_current_mode_paa_codigos,
  set_current_seguimiento_pai,
  set_current_consulta_plan,
  set_current_seguimiento_paoi,
} = planes_slice.actions;
