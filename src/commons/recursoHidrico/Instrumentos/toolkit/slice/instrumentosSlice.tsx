/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  instrumentos: {
    nombre: '',
    nombre_seccion: '',
    nombre_subseccion: '',
    cod_tipo_agua: '',
    id_cuencas: [],
    id_pozo: 0,
    /* cod_tipo_agua: '',
    fecha_creacion_instrumento: '',
    fecha_fin_vigencia: '',
    id_cuencas: [],
    id_pozo: '', */
  },
  id_instrumento: 0,
};

export const instrumentos_slice = createSlice({
  name: 'instrumentos_slice',
  initialState,
  reducers: {
    // setNombre: (state, action: PayloadAction<string>) => {
    //     state.nombre = action.payload;
    // }
    setCurrentInstrumento: (state, action: PayloadAction<any>) => {
      state.instrumentos.nombre = action.payload.nombre;
      state.instrumentos.nombre_seccion = action.payload.nombre_seccion;
      state.instrumentos.nombre_subseccion = action.payload.nombre_subseccion;
      state.instrumentos.cod_tipo_agua = action.payload.cod_tipo_agua;
      state.instrumentos.id_cuencas = action.payload.id_cuencas;
      state.instrumentos.id_pozo = action.payload.id_pozo;
      /* state.instrumentos.cod_tipo_agua = action.payload.cod_tipo_agua;
      state.instrumentos.fecha_creacion_instrumento =
        action.payload.fecha_creacion_instrumento;
      state.instrumentos.fecha_fin_vigencia = action.payload.fecha_fin_vigencia;
      state.instrumentos.id_cuencas = action.payload.id_cuencas;
      state.instrumentos.id_pozo = action.payload.id_pozo; */
    },
    set_current_id_instrumento: (state, action: PayloadAction<number>) => {
      state.id_instrumento = action.payload;
    },
  },
});

export const { setCurrentInstrumento, set_current_id_instrumento } =
  instrumentos_slice.actions;
