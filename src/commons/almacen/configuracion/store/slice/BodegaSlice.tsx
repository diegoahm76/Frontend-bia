import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type IBodega, type IBodegaGet, } from '../../interfaces/Bodega';

const initial_state_bodega_seleccionada: IBodega = {
    id_bodega: 0,
    nombre: "",
    cod_municipio: "",
    direccion: "",
    es_principal: false,
    // id_persona: 0,
    // tipo_documento: "",
    // primer_nombre: "",
    // segundo_nombre: "",    // primer_apellido: "",
    // segundo_apellido: "",
}




const initial_state: IBodegaGet = {
    bodega: [],
    // id_responsable: [],
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
            state.bodega = action.payload;
        },
        bodega_seleccionada: (
            state: IBodegaGet,
            action: PayloadAction<IBodega>
        ) => {
            state.bodega_seleccionada = action.payload;
        },

        // get_id_responsable: (
        //     state: IBodegaGet,
        //     action: PayloadAction<IdResponsable[]>
        // ) => {
        //     state.id_responsable = action.payload;
        // },
    },
});
export const {
    get_bodega,
    bodega_seleccionada,
    //   get_id_responsable,
} = bodegas_slice.actions;