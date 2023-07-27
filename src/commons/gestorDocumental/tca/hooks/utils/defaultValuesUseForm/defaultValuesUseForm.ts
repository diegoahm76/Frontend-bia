import type {
  formulario_create_update_tca,
  formulario_busqueda_tca
} from '../../types/use_tca.types';

export const default_values_create_update_tca: formulario_create_update_tca = {
  id_trd: '',
  nombre: '',
  version: ''
};

export const default_values_busqueda_tca: formulario_busqueda_tca = {
  nombre: '',
  version: ''
};
