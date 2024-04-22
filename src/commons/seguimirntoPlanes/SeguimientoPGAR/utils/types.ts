
export interface IBusquedaMetas {
  id_meta_eje: number;
  nombre_eje_estrategico: string;
  nombre_objetivo:        null;
  nombre_plan:            string;
  tipo_eje_estrategico:   string;
  nombre_plan_objetivo:   null;
  numero_meta_eje:        string;
  nombre_meta_eje:        string;
  cumplio:                boolean;
  fecha_creacion:         string;
  id_eje_estrategico:     number;
  id_objetivo:            null;
  id_plan:                number;
}

export interface IBusquedaLineas {
  id_linea_base:          number;
  nombre_eje_estrategico: string;
  nombre_objetivo:        string;
  nombre_plan:            null;
  nombre_meta:            string;
  tipo_eje_estrategico:   string;
  nombre_linea_base:      string;
  cumplio:                boolean;
  fecha_creacion:         string;
  id_meta_eje:            number;
  id_eje_estrategico:     number;
  id_objetivo:            number;
  id_plan:                null;
}

export interface IBusquedaActividades {
  id_linea_base:          number;
  nombre_eje_estrategico: string;
  nombre_objetivo:        string;
  nombre_plan:            null;
  nombre_meta:            string;
  tipo_eje_estrategico:   string;
  nombre_linea_base:      string;
  cumplio:                boolean;
  fecha_creacion:         string;
  id_meta_eje:            number;
  id_eje_estrategico:     number;
  id_objetivo:            number;
  id_plan:                null;
}