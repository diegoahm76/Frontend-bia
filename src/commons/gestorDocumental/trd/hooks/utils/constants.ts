// import { type SearchedTRD } from '../types/typesHookTrd';

export const initial_state_searched_trd = {
  nombre: '',
  version: ''
};

//! I'll review this option because in the edit case I have to add a single state called (active) yes or no
export const initial_state_create_trd = {
  id_ccd: 0,
  nombre: '',
  version: ''
};

export const initial_state_format_documental_type = {
  'cod-tipo-medio': {
    label: '',
    value: 0,
    'cod-tipo-medio': ''
  },
  nombre: '',
  activo: true,
};

/* export const data_searched_trd_trd: SearchedTRD = {
  id_trd: 0,
  usado: false,
  version: '',
  nombre: '',
  fecha_terminado: '',
  fecha_puesta_produccion: null,
  fecha_retiro_produccion: null,
  actual: false,
  id_ccd: 0
}; */
