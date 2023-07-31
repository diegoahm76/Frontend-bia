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

  info_laboratorio: {
    id_resultado_laboratorio: 0,
    descripcion: '',
    lugar_muestra: '',
    cod_clase_muestra: '',
    fecha_registro: '',
    fecha_toma_muestra: '',
    fecha_resultados_lab: '',
    fecha_envio_lab: '',
    latitud: '',
    longitud: '',
    id_instrumento: 0,
    id_cuenca: 0,
    id_pozo: 0,
  },

  id_resultado_laboratorio: 0,

  info_cartera: {
    id_cartera_aforos: 0,
    fecha_registro: '',
    ubicacion_aforo: '',
    descripcion: '',
    latitud: '',
    longitud: '',
    fecha_aforo: '',
    cod_tipo_aforo: '',
    numero_serie: '',
    numero_helice: '',
    id_instrumento: 0,
    id_cuenca: 0,
  },

  mode: {
    ver: false,
    crear: false,
    editar: false,
  },
  mode_carteras: {
    ver: false,
    crear: false,
    editar: false,
  },
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
    set_current_info_laboratorio: (state, action: PayloadAction<any>) => {
      state.info_laboratorio.id_resultado_laboratorio =
        action.payload.id_resultado_laboratorio;
      state.info_laboratorio.descripcion = action.payload.descripcion;
      state.info_laboratorio.lugar_muestra = action.payload.lugar_muestra;
      state.info_laboratorio.cod_clase_muestra =
        action.payload.cod_clase_muestra;
      state.info_laboratorio.fecha_registro = action.payload.fecha_registro;
      state.info_laboratorio.fecha_toma_muestra =
        action.payload.fecha_toma_muestra;
      state.info_laboratorio.fecha_resultados_lab =
        action.payload.fecha_resultados_lab;
      state.info_laboratorio.fecha_envio_lab = action.payload.fecha_envio_lab;
      state.info_laboratorio.latitud = action.payload.latitud;
      state.info_laboratorio.longitud = action.payload.longitud;
      state.info_laboratorio.id_instrumento = action.payload.id_instrumento;
      state.info_laboratorio.id_cuenca = action.payload.id_cuenca;
      state.info_laboratorio.id_pozo = action.payload.id_pozo;
    },
    set_currente_id_resultado_laboratorio: (
      state,
      action: PayloadAction<number>
    ) => {
      state.id_resultado_laboratorio = action.payload;
    },
    set_current_mode: (state, action: PayloadAction<any>) => {
      state.mode.ver = action.payload.ver;
      state.mode.crear = action.payload.crear;
      state.mode.editar = action.payload.editar;
    },
    set_current_mode_cartera: (state, action: PayloadAction<any>) => {
      state.mode_carteras.ver = action.payload.ver;
      state.mode_carteras.crear = action.payload.crear;
      state.mode_carteras.editar = action.payload.editar;
    },
    set_current_info_cartera: (state, action: PayloadAction<any>) => {
      state.info_cartera.id_cartera_aforos = action.payload.id_cartera_aforos;
      state.info_cartera.fecha_registro = action.payload.fecha_registro;
      state.info_cartera.ubicacion_aforo = action.payload.ubicacion_aforo;
      state.info_cartera.descripcion = action.payload.descripcion;
      state.info_cartera.latitud = action.payload.latitud;
      state.info_cartera.longitud = action.payload.longitud;
      state.info_cartera.fecha_aforo = action.payload.fecha_aforo;
      state.info_cartera.cod_tipo_aforo = action.payload.cod_tipo_aforo;
      state.info_cartera.numero_serie = action.payload.numero_serie;
      state.info_cartera.numero_helice = action.payload.numero_helice;
      state.info_cartera.id_instrumento = action.payload.id_instrumento;
      state.info_cartera.id_cuenca = action.payload.id_cuenca;
    },
  },
});
// {...state, mode: {...state.mode, ver: true}}

export const {
  setCurrentInstrumento,
  set_current_id_instrumento,
  set_current_info_laboratorio,
  set_current_mode,
  set_currente_id_resultado_laboratorio,
  set_current_mode_cartera,
  set_current_info_cartera,
} = instrumentos_slice.actions;
