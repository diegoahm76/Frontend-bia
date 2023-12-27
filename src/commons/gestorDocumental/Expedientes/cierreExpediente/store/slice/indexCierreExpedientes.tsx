import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { ICierreExpedientes, IObjarchivo, IObjArchivoExpediente, IObjCierreExpediente, IObjExpedientes, IObjInformacionReapertura,  IObjSerieSubserie,  IObjTrd,  IObTipologia } from '../../interfaces/cierreExpedientes';


const initial_state_current_cierre_expediente: IObjCierreExpediente = {
    fecha_actual: (new Date().toString()),
    id_expediente_doc: null,
    titulo_expediente: null,


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

export const initial_state_current_archivo_expediente: IObjArchivoExpediente = {
    id_expediente_documental: null,
    nombre_asignado_documento: null,
    fecha_creacion_doc: (new Date().toString()),
    nro_folios_del_doc: null,
    cod_origen_archivo: null,
    codigo_tipologia_doc_prefijo: "",
    codigo_tipologia_doc_agno: "",
    codigo_tipologia_doc_consecutivo: "",
    cod_categoria_archivo: null,
    tiene_replica_fisica: false,
    asunto: null,
    descripcion: null,
    palabras_clave_documento: null,
    file: null,
    id_tipologia_documental: null,
    id_documento_de_archivo_exped: null,
    nombre_tipologia: null,
    identificacion_doc_en_expediente: null,
    nombre_original_del_archivo: null,
    fecha_incorporacion_doc_a_Exp: null,
    es_version_original: false,
    orden_en_expediente: null,
    es_un_archivo_anexo: false,
    tipologia_no_creada_trd: null,
    anexo_corresp_a_lista_chequeo: false,
    cantidad_anexos: null,
    sub_sistema_incorporacion: null,
    cod_tipo_radicado: null,
    codigo_radicado_prefijo: null,
    codigo_radicado_agno: null,
    codigo_radicado_consecutivo: null,
    es_radicado_inicial_de_solicitud: false,
    documento_requiere_rta: false,
    id_persona_titular: null,
    id_doc_de_arch_del_cual_es_anexo: null,
    id_archivo_sistema: null,
    id_doc_arch_respondido: null,
    id_doc_arch_rad_ini_exp_simple: null,
    id_und_org_oficina_creadora: null,
    id_persona_que_crea: null,
    id_und_org_oficina_respon_actual: null,
}

export const initial_state: ICierreExpedientes = {
    current_cierre_Expediente: initial_state_current_cierre_expediente,
    trd: [],
    tipologias: [],
    expedientes: [],
    archivos_por_expedientes: [],
    current_archivo_expediente: initial_state_current_archivo_expediente,
    informacion_reapertura: initial_state_informacion_reapertura,
    serie_subserie:[],


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
            action: PayloadAction<IObjTrd[]>
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
        set_serie_subserie: (
            state: ICierreExpedientes,
            action: PayloadAction<IObjSerieSubserie[]>
        ) => {
            state.serie_subserie = action.payload;
        },
    }
})

export const {
    set_current_cierre_expedientes, set_trd, set_tipologias,set_serie_subserie, set_expedientes, set_current_archivo_expediente, set_archivos_por_expediente, set_informacion_reapertura
} = cierre_expedientes_slice.actions;