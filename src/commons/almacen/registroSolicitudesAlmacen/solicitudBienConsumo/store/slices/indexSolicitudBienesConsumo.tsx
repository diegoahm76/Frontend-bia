/* eslint-disable @typescript-eslint/naming-convention */

import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type UnidadOrganizacional, type ISolicitudConsumo, type UnidadesMedida, type IObjSolicitud, type IObjBienConsumo, type IObjFuncionario, type IObjBienesSolicitud, type IObjPersonaSolicita, } from "../../interfaces/solicitudBienConsumo"


const initial_state_current_solicitud: IObjSolicitud = {
    id_solicitud_consumibles: null,
    es_solicitud_de_conservacion: false,
    id_unidad_para_la_que_solicita: null,
    id_funcionario_responsable_unidad: null,
    motivo: "",
    observacion: "",
    fecha_solicitud: (new Date().toString()),
    fecha_anulacion_solicitante: (new Date().toString()),
    solicitud_anulada_solicitante: false,
    justificacion_anulacion_solicitante: "",
    estado_aprobacion_responsable: "",
    fecha_aprobacion_responsable: (new Date().toString()),
    justificacion_rechazo_responsable: ""

}
const initial_state_current_bien: IObjBienConsumo = {
    id_bien: null,
    nombre: "",
    codigo_bien: ""
}

const initial_state_current_funcionario: IObjFuncionario = {
    id_persona: null,
    tipo_documento: "",
    numero_documento: null,
    primer_nombre: "",
    segundo_nombre: "",
    primer_apellido: "",
    segundo_apellido: "",
    nombre_completo: "",
    id_unidad_organizacional_actual: null,
    nombre_unidad_organizacional_actual: "",
    id_unidad_para_la_que_solicita: null
}
const initial_state_aprobacion_solicitud = {
    estado_aprobacion_responsable: "",
    justificacion_rechazo_responsable: "",
    fecha_aprobacion: (new Date().toString()),

}

const initial_state_anulacion_solicitud = {
    solicitud_anulada_solicitante: false,
    justificacion_anulacion_solicitante: "",
    fecha_anulacion: (new Date().toString()),
}
const initial_state_persona_solicita = {
    id_persona: null,
    nombre: "",
    unidad_organizacional: "",
}

const initial_state: ISolicitudConsumo | any = {
    current_solicitud: initial_state_current_solicitud,
    solicitudes: [],
    bienes_solicitud: [],
    bienes: [],
    current_bien: initial_state_current_bien,
    funcionarios: [],
    current_funcionario: initial_state_current_funcionario,
    persona_solicita: initial_state_persona_solicita,
    unidad_organizacional: [],
    aprobacion_solicitud: initial_state_aprobacion_solicitud,
    anulacion_solicitud: initial_state_anulacion_solicitud,
    nro_solicitud: null,
    unidades_medida: [],


}



export const solicitud_consumo_slice = createSlice({
    name: "solic_consumo",
    initialState: initial_state,
    reducers: {
        set_solicitudes: (
            state: ISolicitudConsumo,
            action: PayloadAction<IObjSolicitud[]>
        ) => {
            state.solicitudes = action.payload;
        },

        set_current_solicitud: (
            state: ISolicitudConsumo,
            action: PayloadAction<IObjSolicitud>
        ) => {
            state.current_solicitud = action.payload;
        },

        set_bienes_solicitud: (
            state: ISolicitudConsumo,
            action: PayloadAction<IObjBienesSolicitud[]>
        ) => {
            state.bienes_solicitud = action.payload;
        },

        set_bienes: (
            state: ISolicitudConsumo,
            action: PayloadAction<IObjBienConsumo[]>
        ) => {
            state.bienes = action.payload;
        },

        set_current_bien: (
            state: ISolicitudConsumo,
            action: PayloadAction<IObjBienConsumo>
        ) => {
            state.current_bien = action.payload;
        },

        get_unidad_organizacional: (
            state: ISolicitudConsumo,
            action: PayloadAction<UnidadOrganizacional[]>
        ) => {
            state.unidad_organizacional = action.payload;
        },

        set_funcionarios: (
            state: ISolicitudConsumo,
            action: PayloadAction<IObjFuncionario[]>
        ) => {
            state.funcionarios = action.payload;
        },

        set_current_funcionario: (
            state: ISolicitudConsumo,
            action: PayloadAction<IObjFuncionario>
        ) => {
            state.current_funcionario = action.payload;
        },



        set_numero_solicitud: (
            state: ISolicitudConsumo,
            action: PayloadAction<number>
        ) => {
            state.nro_solicitud = action.payload;
        },

        set_numero_solicitud_vivero: (
            state: ISolicitudConsumo,
            action: PayloadAction<number>
        ) => {
            state.nro_solicitud = action.payload;
        },

        set_unidades_medida: (
            state: ISolicitudConsumo,
            action: PayloadAction<UnidadesMedida[]>
        ) => {

            state.unidades_medida = action.payload;
        },
        set_persona_solicita: (
            state: ISolicitudConsumo,
            action: PayloadAction<IObjPersonaSolicita>
        ) => {
            state.persona_solicita = action.payload;
        },


    }
})

export const { set_unidades_medida, get_unidad_organizacional, set_solicitudes, set_current_solicitud, set_funcionarios, set_current_funcionario, set_numero_solicitud, set_bienes, set_current_bien, set_bienes_solicitud, set_persona_solicita, set_numero_solicitud_vivero } = solicitud_consumo_slice.actions;