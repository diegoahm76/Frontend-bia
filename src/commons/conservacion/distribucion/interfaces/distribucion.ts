import { type Persona } from '../../../../interfaces/globalModels';
import {type IObjBienesSolicitud as IObjBienSolicitudAux} from '../../solicitudMaterial/interfaces/solicitudVivero';

export interface IDistribucion {
  nurseries: IObjNursery[];
  origin_nursery: IObjNursery;
  destination_nursery: IObjNursery;
  transfers_nurseries: IObjTransfer[];
  current_transfer: IObjTransfer;
  goods: IObjGoods[];
  current_good: IObjGoods;
  transfer_goods: IObjTransferGoods[];
  persons: Persona[];
  transfer_person: Persona;
  // despacho
  despachos: IObjDespacho[];
  current_despacho: IObjDespacho;
  bienes: IObjBien[];
  current_bien: IObjBien;
  bienes_despacho: IObjBienDespacho[];
  nro_despacho:number | null;
  bien_selected: IObjBienesSolicitud;
  bienes_solicitud_aux: IObjBienSolicitudAux[];


}
export interface IObjBienesSolicitud {
  id_item_solicitud_viveros?: number | null;
  id_solicitud_viveros?: number | null;
  nro_posicion?: number | null;
  id_bien?: number | null;
  cod_tipo_elemento_vivero?: string | null;
  codigo_bien?: string | null;
  nombre_bien?: string | null;
  cantidad?: number | null;
  observaciones?: string | null;
}

export interface IObjBienDespacho {
  id_item_despacho_viveros?: number | null;
  id_bien?: number | null;
  agno_lote?: number | null;
  nro_lote?: number | null;
  cod_etapa_lote?: string | null;
  cantidad_solicitada?: number | null;
  cantidad_despachada?: number | null;
  observacion_del_despacho?: string | null;
  nro_posicion_en_despacho?: number | null;
  nombre_bien?: string | null;
  codigo_bien?: string | null;
  unidad_medida?: string | null;
  cod_tipo_elemento_vivero?: string | null;
  id_unidad_medida_solicitada?: number | null;
}

export interface IObjBien {
  id_inventario_vivero?: number | null;
  id_bien?: number | null;
  codigo_bien?: string | null;
  nombre?: string | null;
  cantidad_disponible?: number | null;
  disponible?: boolean | null;
  unidad_medida?: string | null;
  cod_etapa_lote?: string | null;
  agno_lote?: number | null;
  nro_lote?: number | null;
  es_produccion_propia_lote?: boolean | null;
  cod_tipo_entrada_alm_lote?: string | null;
  nro_entrada_alm_lote?: number | null;
  
}

export interface IObjDespacho {
  id_despacho_viveros: number | null;
  nro_despachos_viveros: number | null;
  fecha_solicitud_a_viveros: string | null;
  nro_solicitud_a_viveros: number | null;
  fecha_solicitud_retiro_material: string | null;
  fecha_despacho: string | null;
  fecha_registro: string | null;
  motivo: string | null;
  despacho_anulado: boolean | null;
  justificacion_anulacion: string | null;
  fecha_anulacion: string | null;
  ruta_archivo_con_recibido: string | null;
  id_solicitud_a_viveros: number | null;
  id_vivero: number | null;
  id_persona_despacha: number | null;
  id_persona_solicita: number | null;
  id_unidad_para_la_que_solicita: number | null;
  id_funcionario_responsable_unidad: number | null;
  id_persona_anula: number | null;
  persona_anula?: string | null;
  persona_crea?: string | null;
  id_solicitud_viveros ?: string | null;

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

export interface IObjTransfer {
  id_traslado: number | null;
  nro_traslado: number | null;
  fecha_traslado: string | null;
  traslado_anulado: boolean | null;
  id_vivero_destino: number | null;
  id_vivero_origen: number | null;
  justificacion_anulacion: string | null;
  fecha_anulado: string | null;
  id_persona_traslada: string | number | null;
  id_persona_anula: string | number | null;
  observaciones: string | null;
  ruta_archivo_soporte: string | null;
  persona_traslada?: string | null;
  persona_anula?: string | null;
  fecha_desde?: string | null;
  fecha_hasta?: string | null;
  fecha_test?: string | null | Array<Date>;

}


export interface IObjTransferGoods {
  id_item_traslado_viveros: number | null;
  agno_lote_origen: number | null;
  nro_lote_origen: number | null;
  cod_etapa_lote_origen: string | null;
  agno_lote_destino_MV: number | null;
  nro_lote_destino_MV: number | null;
  cod_etapa_lote_destino_MV: string | null;
  cantidad_a_trasladar: number | null;
  altura_lote_destion_en_cms: number | null;
  nro_posicion: number | null;
  id_traslado: number | null;
  id_bien_origen: number | null;

  codigo_bien: string | null;
  nombre_bien: string | null;
  es_semilla_vivero: boolean | null;
}



export interface IObjGoods {
  id_inventario_vivero: number | null;
  id_bien: number | null;
  agno_lote: number | null;
  nro_lote: number | null;
  cod_etapa_lote: string | null;
  cantidad_entrante: number | null;
  cantidad_bajas: number | null;
  cantidad_traslados_lote_produccion_distribucion: number | null;
  cantidad_consumos_internos: number | null;
  cantidad_salidas: number | null;
  cantidad_lote_cuarentena: number | null;
  utlima_altura_lote: number | null;
  codigo_bien: string | null;
  nombre: string | null;
  es_semilla_vivero: boolean | null;
  cod_tipo_elemento_vivero: string | null;
  saldo_disponible: number | null;
  unidad_medida?: string | null;
}

