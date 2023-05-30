export interface crear_arriendo {
  nombre: string;
  placa: string;
  id_marca: number;
  empresa_contratista: string;
  descripcion: string;
  asignar_hoja_de_vida: boolean;
  es_agendable: boolean;
  fecha_inicio: string;
  fecha_fin: string;
}

export interface obtener_arriendo {
  id_vehiculo_arrendado: number,
  nombre: string,
  descripcion: string,
  placa: string,
  empresa_contratista: string,
  tiene_hoja_de_vida: boolean,
  id_marca: number
}