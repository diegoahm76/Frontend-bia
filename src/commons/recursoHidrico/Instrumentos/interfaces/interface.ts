export interface ValueProps {
  value: number;
  label: string;
}

export interface IpropsCuenca {
  id_cuenca: number;
  nombre?: string;
  cuenca?: string;
}
export interface IpropsPozos {
  id_pozo: number;
  nombre: string;
  cod_pozo: string;
}
export interface IpropsParametros {
  id_parametro: number;
  nombre: string;
  unidad_de_medida?: string;
}
export interface BusquedaInstrumentos {
  id_instrumento: number;
  id_seccion: number;
  nombre_seccion: string;
  id_subseccion: number;
  nombre_subseccion: string;
  nombre: string;
  id_resolucion: number | null;
  fecha_registro: string;
  fecha_creacion_instrumento: string;
  fecha_fin_vigencia: string;
  cod_tipo_agua: string;
  id_persona_registra: number;
  id_pozo: number | null;
}

export interface IpropsInstrumentos {
  nombre_instrumento?: string;
  nombre_seccion?: string;
  nombre_subseccion?: string;
}
export interface DataAgregarLaboratorio {
  id: string;
  id_parametro: string;
  parametro: string;
  unidad: string;
  metodo: string;
  fecha_analisis: Date | null;
  resultado: string;
}