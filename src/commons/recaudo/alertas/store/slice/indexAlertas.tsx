import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Alerta, IFechaProgramada, IList, IObjConfiguracionAlerta, IObjDestinatario, IPersona, } from '../../interfaces/alerta';


export const initial_state_configuracion: IObjConfiguracionAlerta = {
    cod_clase_alerta: null,
    nombre_clase_alerta: null,
    descripcion_clase_alerta: null,
    cod_tipo_clase_alerta: null,
    cod_categoria_clase_alerta: null,
    cant_dias_previas: null,
    frecuencia_previas: null,
    cant_dias_post: null,
    frecuencia_post: null,
    envios_email: false,
    mensaje_base_dia: null,
    mensaje_base_previo: null,
    mensaje_base_vencido: null,
    nivel_prioridad: null,
    activa: false,
    asignar_responsable: false,
    id_modulo_destino: null,
    id_modulo_generador: null,
    perfil_sistema: null,
    id_unidad_org_lider: null
}
export const initial_state_destinatario: IObjDestinatario = {
    id_persona_alertar: null,
    nombre_completo: null,
    nombre_unidad: null,
    numero_documento: null,
    perfil_sistema: null,
    es_responsable_directo: false,
    registro_editable: false,
    cod_clase_alerta: null,
    id_persona: null,
    id_unidad_org_lider: null,
    tiene_usuario: false
}

export const initial_state: Alerta = {
    configuraciones: [],
    current_configuracion: initial_state_configuracion,
    destinatario: [],
    perfil_sistema: [],
    tipo_documento: [],
    persona: [],
    current_destinatario: initial_state_destinatario,
    fecha_alerta: [],
    clase_alerta: []

}

export const alerta_slice = createSlice({
    name: 'alerta',
    initialState: initial_state,
    reducers: {
        reset_state: () => initial_state,

        set_alerta: (
            state: Alerta,
            action: PayloadAction<IObjConfiguracionAlerta[]>
        ) => {
            state.configuraciones = action.payload;
        },

        set_current_alerta: (
            state: Alerta,
            action: PayloadAction<IObjConfiguracionAlerta>
        ) => {
            state.current_configuracion = action.payload;
        },
        set_destinatario: (
            state: Alerta,
            action: PayloadAction<IObjDestinatario[]>
        ) => {
            state.destinatario = action.payload;
        },
        set_current_destinatario: (
            state: Alerta,
            action: PayloadAction<IObjDestinatario>
        ) => {
            state.current_destinatario = action.payload;
        },
        set_perfil_sistema: (
            state: Alerta,
            action: PayloadAction<IList[]>
        ) => {
            state.perfil_sistema = action.payload;
        },
        set_clase_alerta: (
            state: Alerta,
            action: PayloadAction<IList[]>
        ) => {
            state.clase_alerta = action.payload;
        },
        set_tipo_documento: (
            state: Alerta,
            action: PayloadAction<IList[]>
        ) => {
            state.tipo_documento = action.payload;
        },
        set_persona: (
            state: Alerta,
            action: PayloadAction<IPersona[]>
        ) => {
            state.persona = action.payload;
        },
        set_fecha_programada: (
            state: Alerta,
            action: PayloadAction<IFechaProgramada[]>
        ) => {
            state.fecha_alerta = action.payload;
        },





    },
});

export const {
    set_alerta,
    set_current_alerta,
    set_destinatario,
    set_perfil_sistema,
    set_clase_alerta,
    set_tipo_documento,
    set_persona,
    set_current_destinatario,
    set_fecha_programada,
} = alerta_slice.actions;