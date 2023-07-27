interface baseForm {
  nombre: string;
  version: string;
}

export interface formulario_create_update_tca extends baseForm {
  id_trd: any;
}

export interface formulario_busqueda_tca extends baseForm {}