import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { ICierreExpedientes, IObjCierreExpediente, IObjTRD, IObTipologia } from '../../interfaces/cierreExpedientes';

const initial_state_current_cierre_expediente: IObjCierreExpediente = {
    fecha_actual: (new Date().toString()),

}

export const initial_state: ICierreExpedientes = {
    current_cierre_Expediente: initial_state_current_cierre_expediente,
    trd: [],
    tipologias: [],
}

export const cierre_expedientes_slice = createSlice({
    name: "cierre_expedientes",
    initialState: initial_state,
    reducers: {

        set_current_cierre_expedientes: (
            state: ICierreExpedientes,
            action: PayloadAction<IObjCierreExpediente>
        ) => {
            state.current_cierre_Expediente = action.payload;
        },
        set_trd: (
            state: ICierreExpedientes,
            action: PayloadAction<IObjTRD[]>
        ) => {
            state.trd = action.payload;
        },
        set_tipologias: (
            state: ICierreExpedientes,
            action: PayloadAction<IObTipologia[]>
        ) => {
            state.tipologias = action.payload;
        },
    }
})

export const {
    set_current_cierre_expedientes, set_trd, set_tipologias
} = cierre_expedientes_slice.actions;