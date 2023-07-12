
import { type Persona } from '../../../../interfaces/globalModels';
export interface INursery {
  nurseries: IObjNursery[];
  current_nursery: IObjNursery;
  items_despacho: IObjItem[];
  current_bien: IObjItem;
  current_despacho: IDespacho;
  items_distribuidos: IObjDistribucion[];
  viveristas: IObjViveristaActual[];
  current_viverista: IObjViveristaActual;
  historicos_viveristas: IObjHistoricoViveristas[];
  current_historico_viverista: IObjHistoricoViveristas;
  nuevos_viveristas: IObjBuscarNuevoViverista[];
  current_nuevo_viverista: IObjBuscarNuevoViverista;
  // bajas
  genera_bajas: IObjGenerarBaja[];
  current_genera_baja: IObjGenerarBaja;
  insumos: IObjBien[];
  insumos_aux: IObjBien[];
  current_insumo: IObjBien;
  bienes_bajas: IObjBienBaja[];
  current_bien_baja: IObjBienBaja;
  persona: Persona;
}

export interface IList {
  value: string | number;
  label: string | number;
}

export interface IObjDistribucion {
  id_item_despacho_entrante?: number | null;
  id_vivero?: number | null;
  cantidad_asignada?: number | null;
  cod_etapa_lote_al_ingresar?: string | null;
  id_distribucion_item_despacho_entrante?: number | null;
  id_bien?: number | null;
  vivero_nombre?: string | null;
  unidad_medida?: string | null;
  codigo_bien?: string | null;
  nombre_bien?: string | null;
 
}

export interface IObjItem {
  id_item_despacho_entrante?: number | null;
  id_despacho_entrante?: number | null;
  id_bien?: number | null;
  id_entrada_alm_del_bien?: number | null;
  fecha_ingreso?: string | null;
  cantidad_entrante?: number | null;
  cantidad_distribuida?: number | null;
  observacion?: string | null;
  codigo_bien?: string | null;
  nombre_bien?: string | null;
  tipo_documento?: string | null;
  numero_documento?: string | number | null;
  unidad_medida?: string | null;
  cantidad_restante?: number | null;
  cod_tipo_elemento_vivero?: string | null;
  es_semilla_vivero?: boolean | null;
  
}

export interface IDespacho {
  id_despacho_entrante?: number | string | null;
  numero_despacho_consumo?: number | null;
  fecha_ingreso?: string | null;
  distribucion_confirmada?: boolean | null;
  fecha_confirmacion_distribucion?: string | null;
  observacion_distribucion?: string | null;
  id_despacho_consumo_alm?: number | null;
  id_persona_distribuye?: number | null;
  persona_distribuye?: string | null;
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
  persona?: string | null;
  id_persona_cierra: number | null;
  id_persona_cuarentena: number | null;
}

export interface IObjViveristaActual {
  id_vivero: number | null;
  id_viverista_actual: number | null;
  nombre: string | null;
  tipo_documento: string | null;
  numero_documento: number | null;
  fecha_inicio_viverista_actual: string | Date | null;
  observaciones: string | null;
}

export interface IObjHistoricoViveristas {
  id_histo_responsable_vivero: number | null;
  nombre_viverista: string | null;
  nombre_persona_cambia: string | null;
  tipo_documento: string | null;
  numero_documento: number | null;
  consec_asignacion: number | null;
  fecha_inicio_periodo: string | Date | null;
  fecha_fin_periodo: string | Date | null;
  observaciones: string | null;
  id_persona: number | null;
  id_persona_cambia: number | null;
  id_vivero: number | null;
}
export interface IObjBuscarNuevoViverista {
  id_persona?: number | null;
  numero_documento?: string | null;
  tipo_persona: string | null;
  primer_nombre: string | null;
  segundo_nombre: string | null;
  primer_apellido: string | null;
  segundo_apellido: string | null;
  nombre_completo: string | null;
  razon_social: string | null;
  nombre_comercial: string | null;
  digito_verificacion: number | null;
  cod_naturaleza_empresa: number | null;
  tiene_usuario: boolean | null;
  tipo_documento: string | null;
  observacion_cambio: string | null;
}

export interface IObjGenerarBaja {
  id_baja?: number | null;
  tipo_baja?: string | null;
  nro_baja_por_tipo?: number | null;
  fecha_baja?: string | null;
  baja_anulado?: boolean | null;
  justificacion_anulacion?: null;
  fecha_anulacion?: string | null;
  id_persona_anula?: number | null;
  nombre_persona_anula?: string | null;
  id_vivero?: number | null;
  nombre_vivero?: string | null;
  nombre_persona_baja?: string | null;
  motivo?: string | null;
  ruta_archivo_soporte?: string | null;
  id_persona_baja?: number | null;

}
export interface IObjBienBaja {
  id_item_baja_viveros: number | null;
  id_baja: number | null;
  id_bien: number | null;
  cantidad_baja: number | null;
  observaciones: string | null;
  nro_posicion?: number | null;
  agno_lote?: number | null;
  nro_lote?: number | null;
  cod_etapa_lote?: string | null;
  consec_cuaren_por_lote_etapa?: number | null;
  nombre_bien?: string | null;
  nombre?: string | null;
  codigo_bien?: string | null;
  cod_tipo_elemento_vivero?: string | null;
  tipo_bien?: string | null;

}
export interface IObjBien {
  id_bien: number | null;
  codigo_bien: string | null;
  nombre: string | null;
  cod_tipo_elemento_vivero?: string | null;
  saldo_disponible: number | null;
  unidad_medida: string | null;
  tipo_bien?: string | null;

}
