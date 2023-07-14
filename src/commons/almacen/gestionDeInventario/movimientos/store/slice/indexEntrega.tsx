
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { IObjEntrega, IEntrega, IObjBienEntrega, TipoEntrada, IObjBienesEntrada } from '../../interfaces/entregas';
import { type Persona } from '../../../../../../interfaces/globalModels';

const initial_state_person: Persona = {
    id_persona: null,
    tipo_persona: '',
    tipo_documento: '',
    numero_documento: '',
    primer_nombre: '',
    segundo_nombre: '',
    primer_apellido: '',
    segundo_apellido: '',
    nombre_completo: '',
    razon_social: '',
    nombre_comercial: '',
    tiene_usuario: true,
};
export const initial_state_current_entrega: IObjEntrega = {
    numero_despacho_consumo: null,
    fecha_despacho: (new Date().toString()),
    id_entrada_almacen_cv: null,
    motivo: "",
    id_bodega_general: null,

}

export const initial_state_bien_entrega: IObjBienEntrega = {
    id_despacho_consumo: null,
    id_bien_despachado: null,
    id_entrada_almacen_bien: null,
    id_bodega: null,
    cantidad_despachada: null,
    numero_posicion_despacho: null,
    observacion: null,
}

export const initial_state: IEntrega = {
    persona_entrega: initial_state_person,
    nro_entrega: null,
    current_entrega: initial_state_current_entrega,
    current_bien_entrega: initial_state_bien_entrega,
    entregas: [],
    bienes_entrega: [],
    tipo_entrada: [],
    bienes_entrada: [],
    entradas: [],


}

export const entrega_slice = createSlice({
    name: 'entrega_otros',
    initialState: initial_state,
    reducers: {
        set_persona_entrega: (
            state: IEntrega,
            action: PayloadAction<Persona>
        ) => {
            state.persona_entrega = action.payload;
        },
        set_nro_entrega: (
            state: IEntrega,
            action: PayloadAction<number | null>
        ) => {
            state.nro_entrega = action.payload;
        },
        set_entregas: (
            state: IEntrega,
            action: PayloadAction<IObjEntrega[]>
        ) => {
            state.entregas = action.payload;
        },
        set_current_entrega: (
            state: IEntrega,
            action: PayloadAction<IObjEntrega>
        ) => {
            state.current_entrega = action.payload;
        },
        set_bienes_entrega: (
            state: IEntrega,
            action: PayloadAction<IObjBienEntrega[]>
        ) => {
            state.bienes_entrega = action.payload;
        },
        set_bienes_entrada: (
            state: IEntrega,
            action: PayloadAction<IObjBienesEntrada[]>
        ) => {
            state.bienes_entrada = action.payload;
        },
        set_current_bien_entrega: (
            state: IEntrega,
            action: PayloadAction<IObjBienEntrega>
        ) => {
            state.current_bien_entrega = action.payload;
        },
        set_tipo_entrada: (
            state: IEntrega,
            action: PayloadAction<TipoEntrada[]>
        ) => {
            state.tipo_entrada = action.payload;
        },





    }
})

export const {
    set_persona_entrega, set_nro_entrega, set_entregas, set_current_entrega, set_bienes_entrega, set_current_bien_entrega, set_tipo_entrada, set_bienes_entrada } = entrega_slice.actions;