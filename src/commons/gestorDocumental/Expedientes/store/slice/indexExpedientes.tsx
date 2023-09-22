import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { ExpedienteDocumental, IExpediente } from '../../types/types';


export const cierre_expediente_busqueda: ExpedienteDocumental = {
  codigo_exp_und_serie_subserie: '',
  id_expediente_documental: null,
  titulo_expediente: '',
  id_und_seccion_propietaria_serie: null,
  nombre_unidad_org: '',
  id_serie_origen: null,
  nombre_serie_origen: '',
  id_subserie_origen: null,
  nombre_subserie_origen: '',
  id_trd_origen: null,
  nombre_trd_origen: '',
  fecha_apertura_expediente: '',
};

export const initial_state: IExpediente = {
  cierre_expediente: cierre_expediente_busqueda,
};

export const expedientes_slice = createSlice({
  name: 'expedientes',
  initialState: initial_state,
  reducers: {
    reset_state: () => initial_state,

    set_cierre_expediente: (
      state: IExpediente,
      action: PayloadAction<ExpedienteDocumental>
    ) => {
      state.cierre_expediente = action.payload;
    },
  },
});

export const {
  set_cierre_expediente,
} = expedientes_slice.actions;
