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

export interface interface_vehiculo_agendado_conductor {
  id_borrar: string
  nombre_vehiculo: string
  vehiculo_placa: string
  marca_vehiculo: string
  tipo_vehiculo: string
  capacidad_pasajeros: number
  color_vehiculo: string
  nro_documento: string
  nombre_conductor: string
  telefono_conductor: string
  tipo_conductor: string
  id_hoja_vida_vehiculo: number
  id_persona_conductor: number
  fecha_inicio_asignacion: string
  fecha_final_asignacion: string
}

export interface interface_vehiculo_seleccionado {
  id_hoja_de_vida: number
  placa: string
  marca: string
  nombre: string
  cod_tipo_vehiculo: string
  tiene_platon: boolean
  capacidad_pasajeros: number
  color: string
  linea: string
  tipo_combustible: string
  es_arrendado: boolean
  ultimo_kilometraje: number
  fecha_ultimo_kilometraje: any
  fecha_adquisicion: string
  fecha_vigencia_garantia: string
  numero_motor: string
  numero_chasis: string
  cilindraje: number
  transmision: string
  dimesion_llantas: number
  capacidad_extintor: number
  tarjeta_operacion: string
  observaciones_adicionales: string
  es_agendable: boolean
  en_circulacion: boolean
  fecha_circulacion: string
  ruta_imagen_foto: string
  id_articulo: number
  id_vehiculo_arrendado: number
  id_proveedor: any
  marca_nombre: string
  vehiculo_placa: string
  tipo_vehiculo: string
}

export interface interface_conductor_seleccionado {
  id_clase_tercero_persona: number
  tipo_documento: string
  email: any
  email_empresarial: any
  telefono_empresa: any
  telefono_celular: string
  fecha_nacimiento: string
  id_persona: number
  id_clase_tercero: number
  nombre_clase_tercero: string
  nombre_persona: string
  nro_documento: string
}


export interface interface_crear_vehiculo_agendado_conductor {
  id_hoja_vida_vehiculo: number;
  id_persona_conductor: number;
  fecha_inicio_asignacion: string;
  fecha_final_asignacion: string;
}

export interface response_asignacion_vehiculo {
  success?: boolean
  detail?: string
  data?: interface_asignacion_vehiculo[]
  errors?: interface_asignacion_vehiculo[]
}

export interface interface_asignacion_vehiculo {
  id_vehiculo_conductor: number
  fecha_inicio_asignacion: string
  fecha_final_asignacion: string
  fecha_registro: string
  id_hoja_vida_vehiculo: number | string[]
  id_persona_conductor: number
  id_persona_que_asigna: number
}
