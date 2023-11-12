import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type {
  IMode,
  IEjeEstrategico,
  IPlanes,
  IPlanesIndex,
  IObjetivo,
  IProgramas,
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

export const initial_state: IPlanesIndex = {
  plan: initial_state_planes,
  eje_estrategico: initial_state_eje_estrategico,
  mode: mode_planes,
  obj_plan: initial_state_objetivo_plan,
  programa: initial_state_programa,
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
  },
});

export const {
  reset_state,
  set_current_planes,
  set_current_eje_estrategico,
  set_current_mode_planes,
  set_current_objetivo,
  set_current_programa,
} = planes_slice.actions;
