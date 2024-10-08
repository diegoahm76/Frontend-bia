
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { Icv, IMarca, IOthers, IcvOthers, IObjMantenimiento, } from "../../interfaces/CvOtrosActivos";

const initial_state_current_other = {
    id_bien: null,
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
    id_bien: null,
    id_marca: null,
    marca: "",
    cod_tipo_bien: "",
    doc_identificador_nro: "",
    estado: "",
    nombre: "",
    codigo_bien: "",
    id_articulo: null,
    id_hoja_de_vida: null

}


const initial_state: Icv = {
    others: [],
    current_other: initial_state_current_other,
    current_cv_other: initial_state_current_cv_other,
    marcas: [],
    cv_other: [],
    maintenance_other: []

};

export const cv_others_slice = createSlice({
    name: "cvo",
    initialState: initial_state,
    reducers: {
        set_maintenance_other: (
            state: Icv,
            action: PayloadAction<IObjMantenimiento[]>
        ) => {
            state.maintenance_other = action.payload;
        },
        set_others: (
            state: Icv,
            action: PayloadAction<IOthers[]>
        ) => {
            state.others = action.payload;
        },
        set_current_others: (
            state: Icv,
            action: PayloadAction<IOthers>
        ) => {
            state.current_other = action.payload;
        },
        set_cv_others: (
            state: Icv,
            action: PayloadAction<IcvOthers[]>
        ) => {
            state.cv_other = action.payload;
        },
        set_current_cv_others: (
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

export const { set_maintenance_other, set_current_cv_others, set_cv_others, get_marks, set_others, set_current_others } = cv_others_slice.actions;

