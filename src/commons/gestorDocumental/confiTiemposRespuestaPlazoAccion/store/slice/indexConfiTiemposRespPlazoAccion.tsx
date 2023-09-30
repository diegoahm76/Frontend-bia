import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { IConfiTiemposPlazoAccion, IObjConfiTiemposPlazoAccion } from '../../interface/ConfiTiemposPlazoAccion';





export const initial_state: IConfiTiemposPlazoAccion = {
    configuraciones_tiempos: [],

};


export const configuracion_tiempo_respuesta_slice = createSlice({
    name: 'confi_tiempo_respuesta',
    initialState: initial_state,
    reducers: {

        set_configuraciones: (
            state: IConfiTiemposPlazoAccion,
            action: PayloadAction<IObjConfiTiemposPlazoAccion[]>
        ) => {
            state.configuraciones_tiempos = action.payload;

        },

    },
});

export const {
    set_configuraciones,
} = configuracion_tiempo_respuesta_slice.actions;
