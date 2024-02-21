export interface busqueda_vehiculos {
  set_mostrar_busqueda_vehiculos: (value: boolean)=>void;
}

export interface data_asignacion_vehiculos {
  tipoVehiculo: string,
  marca: string;
  placa: string;
  tipoConductor: string; 
  nombres: string;
  numeroDocumento: string; 
  fechaInicio: string;
  fechaFinal: string;
}

export interface data_busqueda_vehiculos {
  tipoVehiculo: string;
  marca: string;
  placa: string;
  capacidadPasajeros: number;
  tienePlaton: string;
}

export interface data_busqueda_conductor {
  tipoConductor: string;
  nombres: string;
  numeroDocumento: number;
}