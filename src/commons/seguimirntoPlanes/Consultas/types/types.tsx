export interface IPlan {
  id_plan: number | null;
  objetivos: Objetivo[];
  ejes_estractegicos: EjesEstractegico[];
  programas: Programa[];
  nombre_plan: string;
  sigla_plan: string;
  tipo_plan: string;
  agno_inicio: number | null;
  agno_fin: number | null;
  estado_vigencia: boolean;
}

export interface EjesEstractegico {
  id_eje_estrategico: number | null;
  nombre_plan: string;
  nombre_tipo_eje: string;
  nombre: string;
  id_plan: number | null;
  id_tipo_eje: number | null;
}

export interface Objetivo {
  id_objetivo: number | null;
  nombre_plan: string;
  nombre_objetivo: string;
  id_plan: number | null;
}

export interface Programa {
  id_programa: number | null;
  nombre_plan: string;
  proyectos: Proyecto[];
  nombre_programa: string;
  porcentaje_1: number | null;
  porcentaje_2: number | null;
  porcentaje_3: number | null;
  porcentaje_4: number | null;
  id_plan: number | null;
}

export interface Proyecto {
  id_proyecto: number | null;
  nombre_programa: string;
  productos: Producto[];
  numero_proyecto: number | null | null;
  nombre_proyecto: string;
  pondera_1: number | null;
  pondera_2: number | null;
  pondera_3: number | null;
  pondera_4: number | null;
  id_programa: number | null;
}

export interface Producto {
  id_producto: number | null;
  nombre_proyecto: string;
  actividades: Actividade[];
  numero_producto: number | null | null;
  nombre_producto: string;
  id_proyecto: number | null;
}

export interface Actividade {
  id_actividad: number | null;
  nombre_producto: string;
  nombre_plan: string;
  indicadores: Indicadore[];
  numero_actividad: null;
  nombre_actividad: string;
  id_producto: number | null;
  id_plan: number | null;
}

export interface Indicadore {
  id_indicador: number | null;
  nombre_medicion: string;
  nombre_tipo: string;
  nombre_producto: string;
  nombre_actividad: string;
  nombre_plan: string;
  nombre_proyecto: string;
  metas: Meta[];
  nombre_indicador: string;
  linea_base: string;
  medida: string;
  tipo_indicador: string;
  id_medicion: number | null;
  id_tipo: number | null;
  id_producto: number | null;
  id_actividad: number | null;
  id_plan: number | null;
  id_proyecto: number | null;
}

export interface Meta {
  id_meta: number | null;
  nombre_indicador: string;
  nombre_meta: string;
  unidad_meta: string;
  porcentaje_meta: number | null;
  valor_meta: string;
  cumplio: boolean;
  fecha_creacion_meta: string;
  agno_1: number | null;
  agno_2: number | null;
  agno_3: number | null;
  agno_4: number | null;
  valor_ejecutado_compromiso: number | null;
  valor_ejecutado_obligado: number | null;
  avance_fisico: number | null;
  id_indicador: number;
}
