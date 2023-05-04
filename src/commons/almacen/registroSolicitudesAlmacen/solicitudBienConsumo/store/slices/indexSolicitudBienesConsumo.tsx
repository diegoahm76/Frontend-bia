
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type UnidadOrganizacional, type InfoSolicitud, type ItemSolicitudConsumible, type SolicitudConsumo, type FuncionarioResponsable, type AprobacionRechazo } from "../../interfaces/solicitudBienConsumo"


const initial_state_infosolicitud = {
    id_solicitud_consumibles: 0,
    es_solicitud_de_conservacion: false,
    id_unidad_para_la_que_solicita: 0,
    id_funcionario_responsable_unidad: 0,
    motivo: "",
    observacion: "",

}

const initial_state_aprobacion_solicitud = {
    estado_aprobacion_responsable: "",
    justificacion_rechazo_responsable: "",
}




const initial_state: SolicitudConsumo = {
    solicitud: initial_state_infosolicitud,
    solicitud_bienes_consumo: [],
    unidad_organizacional: [],
    funcionario_responsable: [],
    aprobacion_solicitud: initial_state_aprobacion_solicitud

}

export const solicitud_consumo_slice = createSlice({
    name: "solic_consumo",
    initialState: initial_state,
    reducers: {
        set_info_solicitud: (
            state: SolicitudConsumo,
            action: PayloadAction<InfoSolicitud>
        ) => {
            state.solicitud = action.payload;
        },

        item_solicitud: (
            state: SolicitudConsumo,
            action: PayloadAction<ItemSolicitudConsumible[]>
        ) => {
            state.solicitud_bienes_consumo = action.payload;
        },
        get_unidad_organizacional: (
            state: SolicitudConsumo,
            action: PayloadAction<UnidadOrganizacional[]>
        ) => {
            state.unidad_organizacional = action.payload;
        },

        get_funcionario_responsable: (
            state: SolicitudConsumo,
            action: PayloadAction<FuncionarioResponsable[]>
        ) => {
            state.funcionario_responsable = action.payload;
        },

        get_aprobacion_solicitud: (
            state: SolicitudConsumo,
            action: PayloadAction<AprobacionRechazo>
        ) => {
            state.aprobacion_solicitud = action.payload;
        },




    }
})

export const { set_info_solicitud, item_solicitud, get_unidad_organizacional, get_funcionario_responsable, get_aprobacion_solicitud } = solicitud_consumo_slice.actions;