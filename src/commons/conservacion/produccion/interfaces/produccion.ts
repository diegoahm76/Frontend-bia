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
  // preparación mezcla
  mezclas: IObjMezcla [];
  current_mezcla:IObjMezcla;
  bienes : IObjBienes [];
  current_bien : IObjBienes;
  preparaciones : IObjPreparacionMezcla [];
  current_preparacion : IObjPreparacionMezcla;
  preparacion_bienes : IObjPreparacionBienes [];
  // Mortalidad
  mortalidades: IObjMortalidad[];
  current_mortalidad: IObjMortalidad;
  siembras_material_vegetal: IObjSiembraMV[];
  current_siembra_material_vegetal: IObjSiembraMV;
  items_mortalidad: IObjItemMortalidad[];
  nro_mortalidad: number | null;
  persona_anula: Persona;

}

export interface IObjItemMortalidad {
  id_item_baja_viveros: number | null;
  codigo_bien: string | null;
  nombre_bien: string | null;
  unidad_medida?: string | null;
  desc_etapa_lote?: string | null;
  agno_lote: number | null;
  nro_lote: number | null;
  cod_etapa_lote: string | null;
  consec_cuaren_por_lote_etapa: string | null;
  cantidad_baja: number | null;
  observaciones: string | null;
  nro_posicion?: number | null;
  id_baja: number | null;
  id_bien: number | null;
}

export interface IObjSiembraMV {
  id_inventario_vivero: number | null;
  id_bien: number | null;
  codigo_bien: string | null;
  nombre_bien: string | null;
  agno_lote: number | null;
  nro_lote: number | null;
  cod_etapa_lote: string | null;
  desc_etapa_lote: string | null;
  saldo_disponible?: number | null;
  unidad_medida: string | null;
  registros_cuarentena: string | null;
  saldo_disponible_registro?: number | null;
}

export interface IObjMortalidad {
  id_baja: number | null;
  tipo_baja?: string | null;
  nro_baja_por_tipo?: number | null;
	fecha_baja: string | Date | null;
	fecha_registro?: string | Date | null;
	motivo: string | null;
  baja_anulado?: boolean | null;
  justificacion_anulacion?: string | null;
  fecha_anulacion?: string | null;
  ruta_archivo_soporte: string | null;
  id_vivero: number | null;
  nombre_vivero?: string | null;
  id_persona_baja?: number | null;
  persona_baja?: string | null;
  id_persona_anula?: number | null;
  persona_anula?: string | null;
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
  codigo?: string | null;
  nombre?: string | null;
  desc_etapa_lote_destino?: string | null;
  desc_etapa_lote_origen?: string | null;
  id_persona_anula?:  number | null;
  persona_anula?: string | null;
  fecha_anula?: string | null;
  justificacion_anulacion?: string | null;
  cambio_anulado?: boolean | null;

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

export interface IObjMezcla {
  nombre: string | null;
  item_activo: boolean | null;
  item_ya_usado: boolean | null;
  id_unidad_medida: number | null;
  id_mezcla: number | null;
  unidad_medida?: string | null;
   }
export interface IObjPreparacionMezcla{
  id_preparacion_mezcla: number | null;
  consec_vivero_mezclas : number | null;
  fecha_preparacion: string| Date | null;
  fecha_registro: string| Date | null;
  preparacion_anulada: boolean | null;
  justificacion_anulacion: string | null;
  fecha_anulacion: string | Date | null;
  id_persona_prepara: number|null;
  id_persona_anula: number| null;
  id_mezcla: number | null;
  id_item_preparacion_mezcla: number | null;
  cantidad_usada: number | null;
  nro_posicion: number | null;
  id_vivero?: number | null;
  cantidad_creada: number | null;
  observaciones: string | null;
  nombre_mezcla?: string | null;
  nombre_persona_prepara?: string | null;
  unidad_medida?: string | null;
}

export interface IObjBienes{
  id_bien: number|null;
  unidad_disponible: string | null;
  cantidad_disponible_bien: number | null;
  codigo_bien : string | null;
  nombre_bien: string | null;
  tipo_bien?: string | null;
}

export interface IObjPreparacionBienes {
  id_item_preparacion_mezcla: number | null;
  cantidad_usada: number | null;
  observaciones: string | null;
  nro_posicion?: number | null;
  codigo_bien?: string | null;
  nombre_bien?: string | null;
  id_bien_usado?: number | null;
}