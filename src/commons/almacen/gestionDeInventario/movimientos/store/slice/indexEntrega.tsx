
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type {
    IObjEntrega,
    IEntrega,
    IObjBienEntrega,
    TipoEntrada,
    IObjBienesEntrada,
    IObjEntrada,
    IObjBien,
} from '../../interfaces/entregas';
import { type Persona } from '../../../../../../interfaces/globalModels';

const initial_state_person: Persona = {
    id_persona: null,
    tipo_persona: '',
    tipo_documento: '',
    numero_documento: '',
    primer_nombre: '',
    segundo_nombre: '',
    primer_apellido: '',
    segundo_apellido: '',
    nombre_completo: '',
    razon_social: '',
    nombre_comercial: '',
    tiene_usuario: true,
};
export const initial_state_current_entrega: IObjEntrega = {
    numero_despacho_consumo: null,
    fecha_despacho: new Date().toString(),
    id_entrada_almacen_cv: null,
    motivo: '',
    id_bodega_general: null,
    id_despacho_consumo: null
};

export const initial_state_bien_entrega: IObjBienEntrega = {
    id_despacho_consumo: null,
    id_bien_despachado: null,
    id_entrada_almacen_bien: null,
    id_bodega: null,
    cantidad_despachada: null,
    numero_posicion_despacho: null,
    observacion: null,
    id_bien: null,
};

export const initial_state_entrada: IObjEntrada = {
    id_entrada_almacen: null,
    tipo_entrada: null,
    numero_entrada_almacen: null,
    fecha_entrada: new Date().toString(),
    fecha_real_registro: new Date().toString(),
    motivo: '',
    observacion: '',
    valor_total_entrada: null,
    fecha_ultima_actualizacion_diferente_creador: new Date().toString(),
    entrada_anulada: false,
    ruta_archivo_doc_con_recibido: null,
    justificacion_anulacion: '',
    fecha_anulacion: new Date().toString(),
    id_proveedor: null,
    id_tipo_entrada: null,
    id_bodega: null,
    id_creador: null,
    id_persona_ult_act_dif_creador: null,
    id_persona_anula: null,
};

export const initial_state_bien_selected: IObjBienesEntrada = {
    id_entrada_almacen: null,
    id_bien: null,
    cantidad_entrante: null,
    codigo_bien: null,
    nombre_bien: null,
};
export const initial_state_current_bien: IObjBien = {
    bodega: null,
    cantidad_disponible: null,
    codigo_bien: null,
    disponible: null,
    id_bien: null,
    id_bodega: null,
    id_inventario: null,
    nombre: null,
    origen: null,
    tipo_documento: null,
    unidad_medida: null,
};

export const initial_state: IEntrega = {
    persona_entrega: initial_state_person,
    nro_entrega: null,
    current_entrega: initial_state_current_entrega,
    current_bien_entrega: initial_state_bien_entrega,
    entregas: [],
    bienes_entrega: [],
    tipo_entrada: [],
    bienes_entrada: [],
    current_entrada: initial_state_entrada,
    entradas: [],
    bien_selected: initial_state_bien_selected,
    bienes_entrada_aux: [],
    bienes: [],
    current_bien: initial_state_current_bien,
};

export const entrega_slice = createSlice({
    name: 'entrega_otros',
    initialState: initial_state,
    reducers: {
        reset_state: () => initial_state,
        set_persona_entrega: (state: IEntrega, action: PayloadAction<Persona>) => {
            state.persona_entrega = action.payload;
        },
        set_nro_entrega: (
            state: IEntrega,
            action: PayloadAction<number | null>
        ) => {
            state.nro_entrega = action.payload;
        },
        set_entregas: (state: IEntrega, action: PayloadAction<IObjEntrega[]>) => {
            state.entregas = action.payload;
        },
        set_current_entrega: (
            state: IEntrega,
            action: PayloadAction<IObjEntrega>
        ) => {
            state.current_entrega = action.payload;
        },
        set_bienes_entrega: (
            state: IEntrega,
            action: PayloadAction<IObjBienEntrega[]>
        ) => {
            state.bienes_entrega = action.payload;
        },
        set_bienes_entrada: (
            state: IEntrega,
            action: PayloadAction<IObjBienesEntrada[]>
        ) => {
            state.bienes_entrada = action.payload;
        },
        set_current_bien_entrega: (
            state: IEntrega,
            action: PayloadAction<IObjBienEntrega>
        ) => {
            state.current_bien_entrega = action.payload;
        },
        set_tipo_entrada: (
            state: IEntrega,
            action: PayloadAction<TipoEntrada[]>
        ) => {
            state.tipo_entrada = action.payload;
        },
        set_entradas: (state: IEntrega, action: PayloadAction<IObjEntrada[]>) => {
            state.entradas = action.payload;
        },
        set_current_entrada: (
            state: IEntrega,
            action: PayloadAction<IObjEntrada>
        ) => {
            state.current_entrada = action.payload;
        },
        set_bien_selected: (
            state: IEntrega,
            action: PayloadAction<IObjBienesEntrada>
        ) => {
            state.bien_selected = action.payload;
        },
        set_bienes_entrada_aux: (
            state: IEntrega,
            action: PayloadAction<IObjBienesEntrada[]>
        ) => {
            state.bienes_entrada_aux = action.payload;
        },

        set_bienes: (state: IEntrega, action: PayloadAction<IObjBien[]>) => {
            state.bienes = action.payload;
        },
        set_current_bien: (state: IEntrega, action: PayloadAction<IObjBien>) => {
            state.current_bien = action.payload;
        },
    },
});

export const {
    set_persona_entrega,
    set_nro_entrega,
    set_entregas,
    set_current_entrega,
    set_bienes_entrega,
    set_current_bien_entrega,
    set_tipo_entrada,
    set_bienes_entrada,
    set_current_entrada,
    reset_state,
    set_entradas,
    set_bienes_entrada_aux,
    set_bien_selected,
    set_bienes,
    set_current_bien,
} = entrega_slice.actions;
