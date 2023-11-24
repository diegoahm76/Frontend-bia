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
} from '../../types/types';

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
  nombre: '',
  id_plan: null,
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
  porcentaje_1: null,
  porcentaje_2: null,
  porcentaje_3: null,
  porcentaje_4: null,
  nombre_programa: '',
  id_plan: null,
};

export const initial_state_proyecto: IProyectos = {
  id_proyecto: null,
  numero_proyecto: null,
  nombre_programa: '',
  pondera_1: null,
  pondera_2: null,
  pondera_3: null,
  pondera_4: null,
  nombre_proyecto: '',
  id_programa: null,
};

export const initial_state_productos: IProductos = {
  id_producto: null,
  nombre_proyecto: '',
  nombre_producto: '',
  id_proyecto: null,
  numero_producto: null,
};

export const initial_state_actividades: IActividades = {
  id_actividad: null,
  nombre_producto: '',
  nombre_actividad: '',
  id_producto: null,
  numero_actividad: null,
  id_plan: null,
  nombre_plan: '',
};

export const initial_state_indicadores: Indicadores = {
  id_indicador: null,
  nombre_medicion: '',
  nombre_tipo: '',
  nombre_producto: '',
  nombre_actividad: '',
  nombre_plan: '',
  nombre_indicador: '',
  linea_base: '',
  medida: '',
  id_medicion: null,
  id_tipo: null,
  id_producto: null,
  id_actividad: null,
  id_plan: null,
};

export const initial_state_meta: IMetaIndicador = {
  id_meta: null,
  nombre_indicador: '',
  nombre_meta: '',
  unidad_meta: '',
  porcentaje_meta: null,
  valor_meta: '',
  id_indicador: null,
};

export const initial_state_rubro: IRubro = {
  id_rubro: null,
  cuenta: '',
  cod_pre: '',
  valcuenta: '',
};

export const initial_state_subprogramas: ISubprogramas = {
  id_subprograma: null,
  nombre_programa: '',
  nombre_subprograma: '',
  id_programa: null,
};

export const initial_state_fuentes_fianciacion: IFuentesFinanciacion = {
  id_fuente: null,
  nombre_fuente: '',
  nombre_indicador: '',
  nombre_cuenca: '',
  vano_1: null,
  vano_2: null,
  vano_3: null,
  vano_4: null,
  valor_total: null,
  id_indicador: null,
  id_cuenca: null,
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
  cuenta: '',
  valor_cuenta: null,
  id_sector: null,
  id_rubro: null,
  id_programa: null,
  id_subprograma: null,
  id_proyecto: null,
  id_producto: null,
  id_actividad: null,
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

export const initial_state: IPlanesIndex = {
  plan: initial_state_planes,
  eje_estrategico: initial_state_eje_estrategico,
  mode: mode_planes,
  obj_plan: initial_state_objetivo_plan,
  programa: initial_state_programa,
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
  },
});

export const {
  reset_state,
  set_current_planes,
  set_current_eje_estrategico,
  set_current_mode_planes,
  set_current_objetivo,
  set_current_programa,
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
} = planes_slice.actions;
