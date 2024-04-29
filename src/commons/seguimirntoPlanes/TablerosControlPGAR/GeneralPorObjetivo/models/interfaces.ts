export interface Porcentaje {
  año: number;
  pvance_fisico: number;
  pavance_fisico_acomulado: number;
  pavance_financiero: number;
  pavance_recursos_obligados: number;
}

export interface Eje {
  id_eje_estrategico: number;
  porcentajes: Porcentaje[];
  nombre: string;
  id_tipo_eje: number;
  id_plan: number | null;
  id_objetivo: number;
}

export interface Gauge {
  value: number;
  label: string;
}