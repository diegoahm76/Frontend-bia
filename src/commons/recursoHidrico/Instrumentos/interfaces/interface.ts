export interface ValueProps {
  value: number;
  label: string;
}

export interface IpropsCuenca {
  id_cuenca: number;
  nombre: string;
}
export interface IpropsPozos {
  id_pozo: number;
  nombre: string;
  cod_pozo: string;
}
export interface BusquedaInstrumentos {
  id_instrumento:             number;
  id_seccion:                 number;
  nombre_seccion:             string;
  id_subseccion:              number;
  nombre_subseccion:          string;
  nombre:                     string;
  id_resolucion:              number | null;
  fecha_registro:             string;
  fecha_creacion_instrumento: string;
  fecha_fin_vigencia:         string;
  cod_tipo_agua:              string;
  id_persona_registra:        number;
  id_pozo:                    number | null;
}

export interface IpropsInstrumentos {
  nombre_instrumento?: string;
  nombre_seccion?: string;
  nombre_subseccion?: string;
}