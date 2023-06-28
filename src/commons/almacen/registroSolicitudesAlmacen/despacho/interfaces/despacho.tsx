import { type Persona } from '../../../../../interfaces/globalModels';

import { type IObjBienesSolicitud as IObjBienSolicitudAux } from '../../solicitudBienConsumo/interfaces/solicitudBienConsumo';

export interface IDespacho {
  persona_despacha: Persona;
  despachos: IObjDespacho[];
  current_despacho: IObjDespacho;
  bienes: IObjBienConsumo[];
  current_bien: IObjBienConsumo;
  bienes_despacho: IObjBienDespacho[];
  nro_despacho: number | null;
  bien_selected: IObjBienesSolicitud;
  bienes_solicitud_aux: IObjBienSolicitudAux[];
}

export interface IObjBienesSolicitud {
  id_item_solicitud_consumible: number | null;
  codigo_bien: string | null;
  nombre_bien: string | null;
  id_bien: number | null;
  cantidad: number | null;
  observaciones: string | null;
  nro_posicion?: string | null;
  id_unidad_medida?: null | null;
  id_solicitud_consumibles: number | null;
}

export interface IObjDespacho {
  id_despacho_consumo?: number | null;
  numero_despacho_consumo?: number | null;
  numero_solicitud_por_tipo?: number | null;
  fecha_solicitud?: string | null;
  fecha_despacho?: string | null;
  fecha_registro?: string | null;
  motivo?: string | null;
  es_despacho_conservacion?: boolean | null;
  despacho_anulado: boolean | null;
  justificacion_anulacion?: string | null;
  fecha_anulacion?: string | null;
  ruta_archivo_doc_con_recibido: string | null;
  id_solicitud_consumo?: number | null;
  id_persona_despacha?: number | null;
  id_persona_solicita?: number | null;
  id_unidad_para_la_que_solicita?: number | null;
  id_funcionario_responsable_unidad?: number | null;
  id_entrada_almacen_cv?: number | null;
  id_bodega_general?: number | null;
  id_persona_anula?: number | null;
  persona_crea?: string | number;
}
export interface IObjBienDespacho {
  id_item_despacho_consumo: number | null;
  id_bien_despachado: number | null;
  id_bien_solicitado: number | null;
  id_bodega: number | null;
  id_inventario: number | null;
  cantidad_solicitada: number | null;
  id_unidad_medida_solicitada?: number | null;
  cantidad_despachada: number | null;
  observacion: string | null;
  numero_posicion_despacho?: number | null;
  nombre_bien?: string | null;
  codigo_bien?: string | null;
  unidad_medida?: string | null;
}

export interface IObjBienConsumo {
  id_bien?: number | null;
  id_inventario: number | null;
  nombre?: string | null;
  unidad_medida?: string | null;
  cantidad_disponible?: number | null;
  id_bodega?: number | null;
  disponible?: boolean | null;
  codigo_bien?: string | null;
  bodega?: string | null;
}
