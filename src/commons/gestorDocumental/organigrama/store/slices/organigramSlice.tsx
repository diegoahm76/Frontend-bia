import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import {
  type IObjLevels,
  type IObjOrganigram,
  // type IObjUnitys,
  type IOrganigram,
} from '../../interfaces/organigrama';

const initial_state_organigram_current = {
  id_organigrama: null,
  nombre: '',
  fecha_terminado: null,
  descripcion: '',
  fecha_puesta_produccion: null,
  fecha_retiro_produccion: null,
  justificacion_nueva_version: null,
  version: '',
  actual: false,
  ruta_resolucion: null,
  id_persona_cargo: null,
  tipo_documento: null,
  numero_documento: null,
  nombre_completo: null,
  usado: false,
};

const initial_state: IOrganigram | any = {
  mold_organigram: [],
  organigram: [],
  organigram_current: initial_state_organigram_current,
  levels_organigram: [],
  unity_organigram: [],
  specialEdit: false,
};

export const organigrama_slice = createSlice({
  name: 'organigram',
  initialState: initial_state,
  reducers: {
    get_mold_organigrams: (state: any, action: PayloadAction<any[]>) => {
      state.mold_organigram = action.payload;
    },
    get_organigrams: (
      state: IOrganigram,
      action: PayloadAction<IObjOrganigram[]>
    ) => {
      state.organigram = action.payload;
    },
    current_organigram: (
      state: IOrganigram,
      action: PayloadAction<IObjOrganigram>
    ) => {
      state.organigram_current = action.payload;
    },
    clean_current_organigram: (state: IOrganigram) => {
      state.organigram_current = initial_state_organigram_current;
    },
    get_levels: (state: IOrganigram, action: PayloadAction<IObjLevels[]>) => {
      state.levels_organigram = action.payload;
    },
    get_unitys: (state: IOrganigram, action: PayloadAction<any>) => {
      state.unity_organigram = action.payload;
    },
    set_special_edit: (state: any, action: PayloadAction<boolean>) => {
      state.specialEdit = action.payload || false;
    }
  },
});

export const {
  get_mold_organigrams,
  get_organigrams,
  current_organigram,
  clean_current_organigram,
  get_levels,
  get_unitys,
  set_special_edit,
} = organigrama_slice.actions;
