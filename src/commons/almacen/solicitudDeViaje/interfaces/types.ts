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