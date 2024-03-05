export interface item_input_radio {
  item: string;
  tipo_inspeccion: string;
  set_tipo_inspeccion: React.Dispatch<React.SetStateAction<string>>;
}
export interface response_conductor_logueado {
  success: boolean;
  detail: string;
  data: data_conductor_logueado;
}

export interface data_conductor_logueado {
  email: string
  fecha_nacimiento: string
  id_persona_logueada: number
  nombre_completo: string
  numero_documento: string
  telefono_celular: string
  tipo_documento: string
}

export interface response_vehiculo_logueado {
  success: boolean;
  detail: string;
  data: data_vehiculo_logueado[][];
}

export interface data_vehiculo_logueado {
  id_vehiculo_conductor: number;
  id_hoja_vida_vehiculo: number;
  id_persona_conductor: number;
  marca: string;
  contratista: string;
  placa: string;
}

export interface response_busqueda_vehiculos {
  success: boolean
  detail: string
  data: data_busqueda_vehiculos[]
}

export interface data_busqueda_vehiculos {
  id_vehiculo_arrendado: number;
  nombre: string;
  descripcion: string;
  placa: string;
  nombre_marca: string;
  empresa_contratista: string;
  tiene_hoja_de_vida: boolean;
  id_marca: number;
  id_hoja_de_vida: number;
}

export interface get_inspeccion_vehiculo {
  id_hoja_vida_vehiculo: number;
  kilometraje: number;
  dir_llantas_delanteras: boolean;
  dir_llantas_traseras: boolean;
  limpiabrisas_delantero: boolean;
  limpiabrisas_traseros: boolean;
  nivel_aceite: boolean;
  estado_frenos: boolean;
  nivel_refrigerante: boolean;
  apoyo_cabezas_piloto: boolean;
  apoyo_cabezas_copiloto: boolean;
  apoyo_cabezas_traseros: boolean;
  frenos_generales: boolean;
  freno_emergencia: boolean;
  llantas_delanteras: boolean;
  llantas_traseras: boolean;
  llanta_repuesto: boolean;
  espejos_laterales: boolean;
  espejo_retrovisor: boolean;
  cinturon_seguridad_delantero: boolean;
  cinturon_seguridad_trasero: boolean;
  luces_altas: boolean;
  luces_media: boolean;
  luces_bajas: boolean;
  luces_parada: boolean;
  luces_parqueo: boolean;
  luces_reversa: boolean;
  kit_herramientas: boolean;
  botiquin_completo: boolean;
  pito: boolean;
  observaciones?: string;
}

export interface create_inspeccion_vehiculo {
  id_hoja_vida_vehiculo: number;
  kilometraje: number;
  dir_llantas_delanteras: boolean;
  dir_llantas_traseras: boolean;
  limpiabrisas_delantero: boolean;
  limpiabrisas_traseros: boolean;
  nivel_aceite: boolean;
  estado_frenos: boolean;
  nivel_refrigerante: boolean;
  apoyo_cabezas_piloto: boolean;
  apoyo_cabezas_copiloto: boolean;
  apoyo_cabezas_traseros: boolean;
  frenos_generales: boolean;
  freno_emergencia: boolean;
  llantas_delanteras: boolean;
  llantas_traseras: boolean;
  llanta_repuesto: boolean;
  espejos_laterales: boolean;
  espejo_retrovisor: boolean;
  cinturon_seguridad_delantero: boolean;
  cinturon_seguridad_trasero: boolean;
  luces_altas: boolean;
  luces_media: boolean;
  luces_bajas: boolean;
  luces_parada: boolean;
  luces_parqueo: boolean;
  luces_reversa: boolean;
  kit_herramientas: boolean;
  botiquin_completo: boolean;
  pito: boolean;
  observaciones?: string;
}