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
  fecha_analisis: string | null;
  resultado: string;
}
export interface Aforo {
  id: string,
  distancia_a_la_orilla: number,
  transecto: number,
  profundidad: number,
  profundidad_promedio: number,
  velocidad_superficial: number,
  velocidad_profunda: number,
  velocidad_promedio: number,
  velocidad_transecto: number,
  caudal: number
}

export interface CuencasId {
  id_cuenca:           number;
  nombre:              string;
  activo:              boolean;
  item_ya_usado:       boolean;
  registro_precargado: boolean;
} 
export interface ArchivosCalidadAgua {
  id_archivo_instrumento:   null | number;
  cod_tipo_de_archivo:      string;
  nombre_archivo:           string;
  ruta_archivo:             string;
  fecha_cargado:            string;
  id_instrumento:           number;
  id_cartera_aforo:         null | number;
  id_prueba_bombeo:         null | number;
  id_resultado_laboratorio: number;
}