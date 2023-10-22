import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { IObjSubserieSerie, IObjTrd, IReporteDocumentacion } from '../../interfaces/reporteDocumentacion';


export const initial_state: IReporteDocumentacion = {
    trd: [],
    serie_subserie: [],


}




export const reportes_documentacion_slice = createSlice({
    name: "reportes_documentacion",
    initialState: initial_state,
    reducers: {


        set_trd: (
            state: IReporteDocumentacion,
            action: PayloadAction<IObjTrd[]>
        ) => {
            state.trd = action.payload;
        },
        set_serie_subserie: (
            state: IReporteDocumentacion,
            action: PayloadAction<IObjSubserieSerie[]>
        ) => {
            state.serie_subserie = action.payload;
        },

    }
})

export const {
    set_trd, set_serie_subserie
} = reportes_documentacion_slice.actions;