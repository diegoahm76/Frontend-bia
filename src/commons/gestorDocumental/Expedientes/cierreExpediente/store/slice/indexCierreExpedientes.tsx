import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { ICierreExpedientes, IObjarchivo, IObjArchivoExpediente, IObjCierreExpediente, IObjExpedientes, IObjInformacionReapertura, IObjTRD, IObTipologia } from '../../interfaces/cierreExpedientes';


const initial_state_current_cierre_expediente: IObjCierreExpediente = {
    fecha_actual: (new Date().toString()),
    id_expediente_doc: null,


}
const initial_state_informacion_reapertura: IObjInformacionReapertura = {
    titulo_expediente: null,
    nombre_persona_cierra: null,
    cierre_expediente: {
        id_cierre_reapertura_exp: null,
        cod_operacion: null,
        fecha_cierre_reapertura: null,
        justificacion_cierre_reapertura: null,
        cod_etapa_archivo_pre_reapertura: null,
        id_expediente_doc: null,
        id_persona_cierra_reabre: null,
    }
}

const initial_state_current_archivo_expediente: IObjArchivoExpediente = {
    id_expediente_documental: null,
    nombre_asignado_documento: null,
    fecha_creacion_doc: (new Date().toString()),
    nro_folios_del_doc: null,
    cod_origen_archivo: null,
    codigo_tipologia_doc_prefijo: "",
    codigo_tipologia_doc_agno: "",
    codigo_tipologia_doc_consecutivo: "",
    cod_categoria_archivo: null,
    tiene_replica_fisica: null,
    asunto: null,
    descripcion: null,
    palabras_clave_documento: null,
    file: null,
    id_tipologia_documental: null,
}

export const initial_state: ICierreExpedientes = {
    current_cierre_Expediente: initial_state_current_cierre_expediente,
    trd: [],
    tipologias: [],
    expedientes: [],
    archivos_por_expedientes: [],
    current_archivo_expediente: initial_state_current_archivo_expediente,
    informacion_reapertura: initial_state_informacion_reapertura,


}

export const cierre_expedientes_slice = createSlice({
    name: "cierre_expedientes",
    initialState: initial_state,
    reducers: {

        set_current_cierre_expedientes: (
            state: ICierreExpedientes,
            action: PayloadAction<IObjCierreExpediente>
        ) => {
            state.current_cierre_Expediente = action.payload;
        },
        set_trd: (
            state: ICierreExpedientes,
            action: PayloadAction<IObjTRD[]>
        ) => {
            state.trd = action.payload;
        },
        set_tipologias: (
            state: ICierreExpedientes,
            action: PayloadAction<IObTipologia[]>
        ) => {
            state.tipologias = action.payload;
        },
        set_expedientes: (
            state: ICierreExpedientes,
            action: PayloadAction<IObjExpedientes[]>
        ) => {
            state.expedientes = action.payload;
        },
        set_current_archivo_expediente: (
            state: ICierreExpedientes,
            action: PayloadAction<IObjArchivoExpediente>
        ) => {
            state.current_archivo_expediente = action.payload;
        },
        set_archivos_por_expediente: (
            state: ICierreExpedientes,
            action: PayloadAction<IObjarchivo[]>
        ) => {
            state.archivos_por_expedientes = action.payload;
        },
        set_informacion_reapertura: (
            state: ICierreExpedientes,
            action: PayloadAction<IObjInformacionReapertura>
        ) => {
            state.informacion_reapertura = action.payload;
        },
    }
})

export const {
    set_current_cierre_expedientes, set_trd, set_tipologias, set_expedientes, set_current_archivo_expediente, set_archivos_por_expediente, set_informacion_reapertura
} = cierre_expedientes_slice.actions;