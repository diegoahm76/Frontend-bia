import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import {
  IArchivoFisico,
  IObjBandejas,
  IObjcajas,
  IObjcarpetas,
  IObjDepositos,
  IObjEstantes,
} from '../../interface/archivoFisico';

const initial_state: IArchivoFisico = {
  depositos: [],
  estantes: [],
  bandejas: [],
  cajas: [],
  carpetas: [],
};

export const archivo_fisico_slice = createSlice({
  name: 'archivo_fisico',
  initialState: initial_state,
  reducers: {
    set_depositos_avanzada: (
      state: IArchivoFisico,
      action: PayloadAction<IObjDepositos[]>
    ) => {
      state.depositos = action.payload;
    },
    set_estantes_avanzada: (
      state: IArchivoFisico,
      action: PayloadAction<IObjEstantes[]>
    ) => {
      state.estantes = action.payload;
    },
    set_bandejas_avanzadas: (
      state: IArchivoFisico,
      action: PayloadAction<IObjBandejas[]>
    ) => {
      state.bandejas = action.payload;
    },
    set_cajas_avanzadas: (
        state: IArchivoFisico,
        action: PayloadAction<IObjcajas[]>
      ) => {
        state.cajas = action.payload;
      },
      set_carpetas_avanzadas: (
        state: IArchivoFisico,
        action: PayloadAction<IObjcarpetas[]>
      ) => {
        state.carpetas= action.payload;
      },
  },
});
export const {
  set_depositos_avanzada,
  set_estantes_avanzada,
  set_bandejas_avanzadas,
  set_cajas_avanzadas,
  set_carpetas_avanzadas,

} = archivo_fisico_slice.actions;
