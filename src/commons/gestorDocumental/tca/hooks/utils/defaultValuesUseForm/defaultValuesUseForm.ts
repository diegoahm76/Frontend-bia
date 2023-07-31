import type {
  formulario_create_update_tca,
  formulario_busqueda_tca,
  formulario_administracion_tca_base
} from '../../types/use_tca.types';

export const default_values_create_update_tca: formulario_create_update_tca = {
  id_trd: null,
  nombre: '',
  version: ''
};

export const default_values_busqueda_tca: formulario_busqueda_tca = {
  nombre: '',
  version: ''
};

export const default_values_administracion_tca: formulario_administracion_tca_base =
  {
    id_cat_serie_und_ccd_trd: '',
    cod_clas_expediente: {
      value: '',
      label: ''
    },
    justificacion_cambio: '',
    ruta_archivo_cambio: '',
  };
