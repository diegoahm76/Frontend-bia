interface baseForm {
  nombre: string;
  version: string;
}

export interface formulario_create_update_tca extends baseForm {
  id_trd: string;
}

export interface formulario_busqueda_tca extends baseForm {}