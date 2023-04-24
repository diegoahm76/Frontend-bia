import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type IdResponsable, type IBodega, type IBodegaGet, } from '../../interfaces/Bodega';

const initial_state_bodega_seleccionada: IBodega = {
    id_bodega: 0,
    nombre: "",
    cod_municipio: "",
    direccion: "",
    es_principal: false,
    id_responsable: 0,
}

const initial_state: IBodegaGet = {
    bodegas: [],
    id_responsable: [],
    bodega_seleccionada: initial_state_bodega_seleccionada,

};


export const bodegas_slice = createSlice({
    name: 'bodega',
    initialState: initial_state,
    reducers: {

        get_bodega: (
            state: IBodegaGet,
            action: PayloadAction<IBodega[]>
        ) => {
            state.bodegas = action.payload;
        },
        set_bodega_seleccionada: (
            state: IBodegaGet,
            action: PayloadAction<IBodega>
        ) => {
            state.bodega_seleccionada = action.payload;
        },

        set_responsable: (
            state: IBodegaGet,
            action: PayloadAction<IdResponsable[]>
        ) => {
            state.id_responsable = action.payload;
        },
    },
});
export const {
    get_bodega,
    set_bodega_seleccionada,
    set_responsable,
} = bodegas_slice.actions;