import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type IBodega, type IBodegaGet, } from '../../interfaces/Bodega';
import { type Persona } from "../../../../../interfaces/globalModels";


const initial_state_bodega_seleccionada: IBodega = {
    id_bodega: null,
    nombre: "",
    cod_municipio: "",
    direccion: "",
    es_principal: false,
    id_responsable: null,
    nombre_completo_responsable: "",
    activo: true,
    item_ya_usado: false,
}

const initial_state_person: Persona = {
    id_persona: null,
    tipo_persona: "",
    tipo_documento: "",
    numero_documento: "",
    primer_nombre: "",
    segundo_nombre: "",
    primer_apellido: "",
    segundo_apellido: "",
    nombre_completo: "",
    razon_social: "",
    nombre_comercial: "",
    tiene_usuario: true,
}

const initial_state: IBodegaGet = {
    bodegas: [],
    id_responsable_bodega: initial_state_person,
    bodega_seleccionada: initial_state_bodega_seleccionada,

};


export const bodegas_slice = createSlice({
    name: 'bodegas',
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
            action: PayloadAction<Persona>
        ) => {
            state.id_responsable_bodega = action.payload;
        },
    },
});
export const {
    get_bodega,
    set_bodega_seleccionada,
    set_responsable,
} = bodegas_slice.actions;