
/* eslint-disable @typescript-eslint/naming-convention */

import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type IObjBienConsumo, type IObjFuncionario, type ISolicitudConsumo, type IObjSolicitudVivero, type IObjBienesSolicitud, type UnidadOrganizacional, type IObjPersonaSolicita, type IObjNursery } from '../../interfaces/solicitudVivero';


const fecha = (new Date())
fecha.setDate(fecha.getDate() + 1)
const initial_state_current_solicitud: IObjSolicitudVivero = {
    nro_solicitud: null,
    fecha_solicitud: (new Date().toString()),
    id_vivero_solicitud: null,
    nro_info_tecnico: null,
    motivo: "",
    observaciones: "",
    id_unidad_para_la_que_solicita: null,
    id_funcionario_responsable_und_destino: null,
    id_unidad_org_del_responsable: null,
    con_municipio_destino: null,
    nombre_predio_destino: "",
    direccion_destino: "",
    fecha_retiro_material: fecha.toString(),
    ruta_archivo_info_tecnico: null,
    id_persona_solicita: null,
    id_unidad_org_del_solicitante: null

}
const initial_state_current_nursery: IObjNursery = {
    id_vivero: null,
    nombre: '',
    cod_municipio: '',
    direccion: '',
    area_mt2: null,
    area_propagacion_mt2: null,
    tiene_area_produccion: false,
    tiene_areas_pep_sustrato: false,
    tiene_area_embolsado: false,
    cod_tipo_vivero: null,
    fecha_inicio_viverista_actual: null,
    cod_origen_recursos_vivero: null,
    fecha_creacion: null,
    en_funcionamiento: true,
    fecha_ultima_apertura: null,
    justificacion_apertura: '',
    fecha_cierre_actual: null,
    justificacion_cierre: null,
    vivero_en_cuarentena: false,
    fecha_inicio_cuarentena: null,
    justificacion_cuarentena: null,
    ruta_archivo_creacion: null,
    activo: true,
    item_ya_usado: true,
    id_viverista_actual: null,
    id_persona_crea: null,
    id_persona_abre: null,
    id_persona_cierra: null,
    id_persona_cuarentena: null,
};
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

const initial_state_persona_solicita = {
    id_persona: null,
    id_unidad_organizacional_actual: null,
    nombre: "",
    unidad_organizacional: "",
}

const initial_state: ISolicitudConsumo = {
    bienes: [],
    current_solicitud: initial_state_current_solicitud,
    solicitudes: [],
    bienes_solicitud: [],
    current_bien: initial_state_current_bien,
    current_funcionario: initial_state_current_funcionario,
    persona_solicita: initial_state_persona_solicita,
    unidad_organizacional: [],
    nro_solicitud: null,
    nurseries: [],
    current_nursery: initial_state_current_nursery,
    funcionarios: [],
}

export const solicitud_vivero_slice = createSlice({
    name: "solicitud_vivero",
    initialState: initial_state,
    reducers: {
        set_solicitudes: (
            state: ISolicitudConsumo,
            action: PayloadAction<IObjSolicitudVivero[]>
        ) => {
            state.solicitudes = action.payload;
        },
        set_nurseries: (state: ISolicitudConsumo, action: PayloadAction<IObjNursery[]>) => {
            state.nurseries = action.payload;
        },
        set_current_nursery: (state: ISolicitudConsumo, action: PayloadAction<IObjNursery>) => {
            state.current_nursery = action.payload;
        },


        set_current_solicitud: (
            state: ISolicitudConsumo,
            action: PayloadAction<IObjSolicitudVivero>
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
        set_persona_solicita: (
            state: ISolicitudConsumo,
            action: PayloadAction<IObjPersonaSolicita>
        ) => {
            state.persona_solicita = action.payload;
        },




    }

})

export const { set_solicitudes, set_current_solicitud, set_bienes_solicitud, set_bienes, set_current_bien, get_unidad_organizacional, set_funcionarios, set_numero_solicitud, set_persona_solicita, set_current_funcionario, set_nurseries, set_current_nursery } = solicitud_vivero_slice.actions;