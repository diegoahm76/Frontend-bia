export interface props_solicitar_viaje{
  set_mostrar_solicitud_viaje:(value: boolean)=>void;
}

export interface data_solicitud_viaje {
  estado: string;
  fechaSolicitud: string;
  numPasajeros: number;
  fechaSalida: string;
  fechaRetorno: string;
  municipioDestino: string;
}

export interface interface_solicitar_viaje {
  motivo_viaje_solicitado: string,  // Motivo del viaje
  cod_municipio: string,  // Código del municipio de destino
  cod_departamento: string,  // Código del departamento de destino
  tiene_expediente_asociado: boolean,  // Indica si tiene un expediente asociado
  id_expediente_asociado: number,  // ID del expediente asociado, si corresponde
  direccion: string,  // Dirección del destino
  nro_pasajeros: number,  // Número de pasajeros
  fecha_partida: string,  // Fecha de partida
  hora_partida: string,  // Hora de partida
  fecha_retorno: string,  // Fecha de retorno
  hora_retorno: string,  // Hora de retorno
  req_compagnia_militar: boolean,  // Indica si se requiere compañía militar
  consideraciones_adicionales: string,  // Consideraciones adicionales
  indicaciones_destino: string  // Indicaciones para llegar al destino
}