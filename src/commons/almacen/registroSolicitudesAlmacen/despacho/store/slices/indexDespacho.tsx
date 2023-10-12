import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import {
  type IObjDespacho,
  type IObjBienDespacho,
  type IObjBienesSolicitud,
  type IDespacho,
  type IObjBienConsumo,
} from '../../interfaces/despacho';
import { type Persona } from '../../../../../../interfaces/globalModels';
import { type IObjBienesSolicitud as IObjBienSolicitudAux } from '../../../solicitudBienConsumo/interfaces/solicitudBienConsumo';
import dayjs from 'dayjs';

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

export const initial_state_current_despacho: IObjDespacho = {
  id_despacho_consumo: null,
  numero_despacho_consumo: null,
  numero_solicitud_por_tipo: null,
  fecha_solicitud: null,
  fecha_despacho: dayjs().format('YYYY-MM-DD'),
  fecha_registro: null,
  motivo: null,
  es_despacho_conservacion: null,
  despacho_anulado: false,
  justificacion_anulacion: null,
  fecha_anulacion: null,
  ruta_archivo_doc_con_recibido: null,
  id_solicitud_consumo: null,
  id_persona_despacha: null,
  id_persona_solicita: null,
  id_unidad_para_la_que_solicita: null,
  id_funcionario_responsable_unidad: null,
  id_persona_anula: null,
};

export const initial_state_current_bien: IObjBienConsumo = {
  id_bien: null,
  codigo_bien: '',
  nombre: '',
  unidad_medida: null,
  id_inventario: null,
};

export const initial_state_bien_selected: IObjBienesSolicitud = {
  id_item_solicitud_consumible: null,
  id_solicitud_consumibles: null,
  nro_posicion: null,
  id_bien: null,
  codigo_bien: null,
  nombre_bien: null,
  cantidad: null,
  observaciones: null,
};

const initial_state: IDespacho = {
  persona_despacha: initial_state_person,
  despachos: [],
  current_despacho: initial_state_current_despacho,
  bienes: [],
  current_bien: initial_state_current_bien,
  bienes_despacho: [],
  nro_despacho: null,
  bien_selected: initial_state_bien_selected,
  bienes_solicitud_aux: [],
};

export const despacho_slice = createSlice({
  name: 'despacho',
  initialState: initial_state,
  reducers: {
    reset_state: () => initial_state,
    set_persona_despacha: (
      state: IDespacho,
      action: PayloadAction<Persona>
    ) => {
      state.persona_despacha = action.payload;
    },

    set_bienes: (
      state: IDespacho,
      action: PayloadAction<IObjBienConsumo[]>
    ) => {
      state.bienes = action.payload;
    },

    set_current_bien: (
      state: IDespacho,
      action: PayloadAction<IObjBienConsumo>
    ) => {
      state.current_bien = action.payload;
    },

    set_bienes_despacho: (
      state: IDespacho,
      action: PayloadAction<IObjBienDespacho[]>
    ) => {
      state.bienes_despacho = action.payload;
    },
    set_despachos: (
      state: IDespacho,
      action: PayloadAction<IObjDespacho[]>
    ) => {
      state.despachos = action.payload;
    },

    set_current_despacho: (
      state: IDespacho,
      action: PayloadAction<IObjDespacho>
    ) => {
      state.current_despacho = action.payload;
    },
    set_nro_despacho: (
      state: IDespacho,
      action: PayloadAction<number | null>
    ) => {
      state.nro_despacho = action.payload;
    },

    set_bien_selected: (
      state: IDespacho,
      action: PayloadAction<IObjBienesSolicitud>
    ) => {
      state.bien_selected = action.payload;
    },

    set_bienes_solicitud_aux: (
      state: IDespacho,
      action: PayloadAction<IObjBienSolicitudAux[]>
    ) => {
      state.bienes_solicitud_aux = action.payload;
    },
  },
});
export const {
  reset_state,
  set_bienes,
  set_current_bien,
  set_bienes_despacho,
  set_despachos,
  set_current_despacho,
  set_nro_despacho,
  set_bien_selected,
  set_bienes_solicitud_aux,
  set_persona_despacha,
} = despacho_slice.actions;
