import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { DatosRespuesta, IObjSubserieSerie, IObjTrd, IReporteDocumentacion, Permisos, PermisosGenerales } from '../../interfaces/reporteDocumentacion';


export const initial_state: IReporteDocumentacion = {
    trd: [],
    serie_subserie: [],
    permisos_no_propios: [],
    permisos_generales: null,

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
        set_permisos_no_propios: (
            state: IReporteDocumentacion,
            action: PayloadAction<DatosRespuesta[]>
        ) => {
            state.permisos_no_propios = action.payload;
        },
        set_permisos_generales: (
            state: IReporteDocumentacion,
            action: PayloadAction<PermisosGenerales>
        ) => {
            state.permisos_generales = action.payload;
        },

    }
})

export const {
    set_trd, set_serie_subserie, set_permisos_no_propios, set_permisos_generales
} = reportes_documentacion_slice.actions;