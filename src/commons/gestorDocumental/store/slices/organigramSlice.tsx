import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import {
  type IObjLevels,
  type IObjOrganigram,
  type IObjUnitys,
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
};

const initial_state: IOrganigram = {
  moldOrganigram: [],
  organigram: [],
  organigramCurrent: initial_state_organigram_current,
  levelsOrganigram: [],
  unityOrganigram: [],
};

const organigrama_slice = createSlice({
  name: 'organigram',
  initialState: initial_state,
  reducers: {
    get_mold_organigrams: (state: any, action: PayloadAction<any[]>) => {
      state.moldOrganigram = action.payload;
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
      state.organigramCurrent = action.payload;
    },
    get_levels: (state: IOrganigram, action: PayloadAction<IObjLevels[]>) => {
      state.levelsOrganigram = action.payload;
    },
    get_unitys: (state: IOrganigram, action: PayloadAction<IObjUnitys[]>) => {
      state.unityOrganigram = action.payload;
    },
  },
});

export const {
  get_mold_organigrams,
  get_organigrams,
  current_organigram,
  get_levels,
  get_unitys,
} = organigrama_slice.actions;
// eslint-disable-next-line no-restricted-syntax
export default organigrama_slice.reducer;
