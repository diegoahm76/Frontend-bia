import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { IConfiguracionMetadatos, IList, IMetadatos, IObjValoresMetadatos } from '../../interfaces/Metadatos';



export const initial_state_metadato: IMetadatos = {
    nombre_metadato: null,
    nombre_a_mostrar: null,
    descripcion: null,
    cod_tipo_dato_alojar: null,
    longitud_dato_alojar: null,
    valor_minimo: null,
    valor_maximo: null,
    orden_aparicion: null,
    esObligatorio: true,
    aplica_para_documento: true,
    activo: true,
    aplica_para_expediente: false,
    item_ya_usado: false,
};





export const initial_state: IConfiguracionMetadatos = {
    metadatos: [],
    valores_metadatos: []


};

export const metadatos_slice = createSlice({
    name: 'metadatos',
    initialState: initial_state,
    reducers: {
        reset_state: () => initial_state,

        set_metadatos: (
            state: IConfiguracionMetadatos,
            action: PayloadAction<IMetadatos[]>
        ) => {
            state.metadatos = action.payload;
        },
        set_valores_metadatos: (
            state: IConfiguracionMetadatos,
            action: PayloadAction<IObjValoresMetadatos[]>
        ) => {
            state.valores_metadatos = action.payload;
        },


    },
});

export const {
    set_metadatos,
    set_valores_metadatos



} = metadatos_slice.actions;
