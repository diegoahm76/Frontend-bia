export interface busqueda_vehiculos {
  set_mostrar_busqueda_vehiculos: (value: boolean)=>void;
}

export interface data_asignacion_vehiculos {
  id_asignacion: number;
  tipo_vehiculo: string;
  marca: string;
  placa: string;
  tipo_conductor: string; 
  nombre_conductor: string;
  nro_documento_conductor: string; 
  fecha_inicio_asignacion: string;
  fecha_final_asignacion: string;
}

export interface data_row_asignacion_vehiculos {
  id_asignacion: number;
  tipo_vehiculo: string;
  marca: string;
  placa: string;
  tipo_conductor: string;
  nombre_conductor: string;
  nro_documento_conductor: string;
  fecha_inicio_asignacion: string;
  fecha_final_asignacion: string;
}

export interface data_busqueda_conductor {
  id_clase_tercero: number
  id_clase_tercero_persona: number
  id_persona: number
  nombre_clase_tercero: string
  nombre_persona: string
  nro_documento: string;
}

export interface data_busqueda_vehiculos {
  id_hoja_de_vida: number;
  cod_tipo_vehiculo?: string;
  tiene_platon: boolean;
  capacidad_pasajeros: number;
  color?: string;
  linea?: string;
  tipo_combustible?: string;
  es_arrendado?: boolean;
  ultimo_kilometraje?: number;
  fecha_ultimo_kilometraje?: any;
  fecha_adquisicion?: string;
  fecha_vigencia_garantia?: string;
  numero_motor?: string;
  numero_chasis?: string;
  cilindraje?: number;
  transmision?: string;
  dimesion_llantas?: number;
  capacidad_extintor?: number;
  tarjeta_operacion?: string;
  observaciones_adicionales?: string;
  es_agendable?: boolean;
  en_circulacion?: boolean;
  fecha_circulacion?: string;
  ruta_imagen_foto?: string;
  id_articulo?: number;
  id_vehiculo_arrendado?: number;
  id_proveedor?: any;
  marca_nombre: string;
  vehiculo_placa: string;
  tipo_vehiculo: string;
}

export interface data_busqueda_conductores {
  id_clase_tercero_persona?: number
  id_persona?: number
  id_clase_tercero?: number
  nombre_clase_tercero?: string
  nombre_persona: string
  nro_documento: string
}

export interface interface_vehiculo_agendado_conductor {
  id_borrar: string;
  vehiculo_placa: string;
  nro_documento: string;
  id_hoja_vida_vehiculo: number;
  id_persona_conductor: number;
  fecha_inicio_asignacion: string;
  fecha_final_asignacion: string;
}

export interface interface_crear_vehiculo_agendado_conductor {
  id_hoja_vida_vehiculo: number;
  id_persona_conductor: number;
  fecha_inicio_asignacion: string;
  fecha_final_asignacion: string;
}