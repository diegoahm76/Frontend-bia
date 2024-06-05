/* eslint-disable @typescript-eslint/naming-convention */

import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type UnidadOrganizacional, type ISolicitudConsumo, type UnidadesMedida, type IObjSolicitud, type IObjBienConsumo, type IObjFuncionario, type IObjBienesSolicitud, type IObjPersonaSolicita, type IObjSolicitudVivero, type IObjBienViveroConsumo, type IObjBienesViveroSolicitud, ICoordonadorVivero, } from "../../interfaces/solicitudBienConsumo"


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
    justificacion_anulacion_solicitante: null,
    estado_aprobacion_responsable: null,
    fecha_aprobacion_responsable: null,
    justificacion_rechazo_responsable: null,
    fecha_rechazo_almacen: null,
    justificacion_rechazo_almacen: null,
    rechazada_almacen: false,

}
const initial_state_current_solicitud_vivero: IObjSolicitudVivero = {
    id_solicitud_consumibles: null,
    es_solicitud_de_conservacion: true,
    id_unidad_para_la_que_solicita: null,
    id_funcionario_responsable_unidad: null,
    motivo: "",
    observacion: "",
    fecha_solicitud: (new Date().toString()),
    fecha_anulacion_solicitante: (new Date().toString()),
    solicitud_anulada_solicitante: false,
    justificacion_anulacion_solicitante: null,
    estado_aprobacion_responsable: null,
    fecha_aprobacion_responsable: null,
    justificacion_rechazo_responsable: null,
    fecha_rechazo_almacen: null,
    justificacion_rechazo_almacen: null,

    rechazada_almacen: false,

}




const initial_state_current_bien: IObjBienConsumo = {
    id_bien: null,
    nombre: "",
    codigo_bien: ""
}
const initial_state_current_bien_vivero: IObjBienViveroConsumo = {
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



const initial_state_persona_solicita = {
    id_persona: null,
    nombre: "",
    unidad_organizacional: "",
}


const initial_state: ISolicitudConsumo | any = {
    current_solicitud: initial_state_current_solicitud,
    solicitudes: [],
    current_solicitud_vivero: initial_state_current_solicitud_vivero,
    solicitudes_vivero: [],
    bienes_solicitud: [],
    bienes_solicitud_vivero: [],
    bienes: [],
    bienes_vivero: [],
    current_bien_vivero: initial_state_current_bien_vivero,
    current_bien: initial_state_current_bien,
    funcionarios: [],
    current_funcionario: initial_state_current_funcionario,
    persona_solicita: initial_state_persona_solicita,
    unidad_organizacional: [],
    nro_solicitud: null,
    nro_solicitud_vivero: null,
    unidades_medida: [],
    coordinador_vivero: [],


}



export const solicitud_consumo_slice = createSlice({
    name: "solic_consumo",
    initialState: initial_state,
    reducers: {
        reset_state: () => initial_state,
        set_solicitudes: (
            state: ISolicitudConsumo,
            action: PayloadAction<IObjSolicitud[]>
        ) => {
            state.solicitudes = action.payload;
        },
        set_solicitudes_vivero: (
            state: ISolicitudConsumo,
            action: PayloadAction<IObjSolicitudVivero[]>
        ) => {
            state.solicitudes_vivero = action.payload;
        },


        set_current_solicitud: (
            state: ISolicitudConsumo,
            action: PayloadAction<IObjSolicitud>
        ) => {
            state.current_solicitud = action.payload;
        },

        set_current_solicitud_vivero: (
            state: ISolicitudConsumo,
            action: PayloadAction<IObjSolicitudVivero>
        ) => {
            state.current_solicitud_vivero = action.payload;
        },

        set_bienes_solicitud: (
            state: ISolicitudConsumo,
            action: PayloadAction<IObjBienesSolicitud[]>
        ) => {
            state.bienes_solicitud = action.payload;
        },

        set_bienes_vivero_solicitud: (
            state: ISolicitudConsumo,
            action: PayloadAction<IObjBienesViveroSolicitud[]>
        ) => {
            state.bienes_solicitud_vivero = action.payload;
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
        set_bienes_vivero: (
            state: ISolicitudConsumo,
            action: PayloadAction<IObjBienViveroConsumo[]>
        ) => {
            state.bienes_vivero = action.payload;
        },

        set_current_bien_vivero: (
            state: ISolicitudConsumo,
            action: PayloadAction<IObjBienViveroConsumo>
        ) => {
            state.current_bien_vivero = action.payload;
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
            state.nro_solicitud_vivero = action.payload;
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
        set_coordinador_vivero: (
            state: ISolicitudConsumo,
            action: PayloadAction<ICoordonadorVivero[]>
        ) => {
            state.coordinador_vivero = action.payload;
        },

        //Julian
        clear_current_solicitud: (state) => {
            state.current_solicitud = initial_state_current_solicitud;
        },

        clear_persona_solicita: (state) => {
            state.persona_solicita = initial_state_persona_solicita;
        },

        clear_current_funcionario: (state) => {
            state.current_funcionario = initial_state_current_funcionario;
        },

        clear_bienes: (state) => {
            state.bienes = [];
        },

        clear_bienes_solicitud: (state) => {
            state.bienes_solicitud = [];
        },

    }
})

export const { reset_state, set_coordinador_vivero, set_unidades_medida, get_unidad_organizacional, set_solicitudes, set_current_solicitud, set_funcionarios, set_current_funcionario, set_numero_solicitud, set_bienes, set_current_bien, set_bienes_solicitud, set_persona_solicita, set_numero_solicitud_vivero, set_bienes_vivero, set_current_bien_vivero, set_solicitudes_vivero, set_current_solicitud_vivero, clear_current_solicitud, clear_current_funcionario, clear_persona_solicita, clear_bienes, clear_bienes_solicitud } = solicitud_consumo_slice.actions;