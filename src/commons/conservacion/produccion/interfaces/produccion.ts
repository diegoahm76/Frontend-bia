import { type Persona } from '../../../../interfaces/globalModels';

export interface IProduccion {
  nurseries: IObjNursery[];
  current_nursery: IObjNursery;
  vegetal_materials: IObjVegetalMaterial[];
  current_vegetal_material: IObjVegetalMaterial;
  stage_changes: IObjChange[];
  current_stage_change: IObjChange;
  persons: Persona[];
  changing_person: Persona;
}

export interface IObjChange {
  id_cambio_de_etapa: number | null;
  id_bien: number | null;
  id_vivero: number | null;
  agno_lote: number | null;
  nro_lote: number | null;
  cod_etapa_lote_origen: string | null;
  fecha_cambio: string | null;
  cantidad_disponible_al_crear: number | null;
  cantidad_movida: number | null;
  altura_lote_en_cms: number | null;
  observaciones: string | null;
  id_persona_cambia: string | number | null;
  ruta_archivo_soporte: string | null;
  codigo_bien?: string | null;
  nombre_bien?: string | null;
}

export interface IObjVegetalMaterial {
  id_inventario_vivero?: number | null;
  id_bien: number | null;
  codigo_bien: string | null;
  nombre: string;
  agno_lote: number | null;
  nro_lote: number | null;
  cod_etapa_lote: string | null;
  etapa_lote: string | null;
  cantidad_disponible: number | null;
}

export interface IObjNursery {
  id_vivero: number | null;
  nombre: string;
  cod_municipio: string | null;
  direccion: string | null;
  area_mt2: number | null;
  area_propagacion_mt2: number | null;
  tiene_area_produccion: boolean | null;
  tiene_areas_pep_sustrato: boolean | null;
  tiene_area_embolsado: boolean | null;
  cod_tipo_vivero: string | null;
  fecha_inicio_viverista_actual: string | null;
  cod_origen_recursos_vivero: string | null;
  fecha_creacion: string | Date | null;
  en_funcionamiento: boolean | null;
  fecha_ultima_apertura: string | Date | null;
  justificacion_apertura: string | null;
  fecha_cierre_actual: string | Date | null;
  justificacion_cierre: string | null;
  vivero_en_cuarentena: boolean | null;
  fecha_inicio_cuarentena: string | Date | null;
  justificacion_cuarentena: string | null;
  ruta_archivo_creacion: string | null;
  activo: boolean | null;
  item_ya_usado: boolean | null;
  id_viverista_actual: number | null;
  id_persona_crea: number | null;
  id_persona_abre: number | null;
  id_persona_cierra: number | null;
  id_persona_cuarentena: number | null;
}
