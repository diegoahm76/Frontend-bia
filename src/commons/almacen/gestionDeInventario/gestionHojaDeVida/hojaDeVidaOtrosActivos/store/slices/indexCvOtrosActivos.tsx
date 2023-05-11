
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { type Icv, type IMarca, type IOthers, type IcvOthers, } from "../../interfaces/CvOtrosActivos";

const initial_state_current_other = {
    id_bien: 0,
    codigo_bien: null,
    nro_elemento_bien: null,
    nombre: "",
    cod_tipo_bien: null,
    cod_tipo_activo: null,
    nivel_jerarquico: null,
    nombre_cientifico: null,
    descripcion: "",
    doc_identificador_nro: "",
    cod_metodo_valoracion: null,
    cod_tipo_depreciacion: null,
    cantidad_vida_util: null,
    valor_residual: null,
    stock_minimo: null,
    stock_maximo: null,
    solicitable_vivero: false,
    tiene_hoja_vida: false,
    maneja_hoja_vida: false,
    visible_solicitudes: false,
    id_marca: null,
    id_unidad_medida: null,
    id_porcentaje_iva: null,
    id_unidad_medida_vida_util: null,
    id_bien_padre: null,

}

const initial_state_current_cv_other = {
    especificaciones_tecnicas: "",
    caracteristicas_fisicas: "",
    observaciones_adicionales: "",
    id_bien: 0,
    id_marca: 0,
    marca: "",
    cod_tipo_bien: "",
    doc_identificador_nro: "",
    estado: "",
}


const initial_state: Icv = {
    others: [],
    current_other: initial_state_current_other,
    current_cv_other: initial_state_current_cv_other,
    marcas: [],

};

export const cv_others_slice = createSlice({
    name: "cvo",
    initialState: initial_state,
    reducers: {
        get_others: (
            state: Icv,
            action: PayloadAction<IOthers[]>
        ) => {
            state.others = action.payload;
        },
        current_others: (
            state: Icv,
            action: PayloadAction<IOthers>
        ) => {
            state.current_other = action.payload;
        },
        get_cv_others: (
            state: Icv,
            action: PayloadAction<IcvOthers>
        ) => {
            state.current_cv_other = action.payload;
        },


        get_marks: (
            state: Icv,
            action: PayloadAction<IMarca[]>
        ) => {
            state.marcas = action.payload;
        },
        // get_cv_maintenance: (
        //     state: Icv, 
        //     action: PayloadAction<IcvMaintenance[]>
        //     ) => {
        //     state.cv_maintenance = action.payload;
        // },

    }
})

export const { current_others, get_cv_others, get_marks, get_others } = cv_others_slice.actions;

