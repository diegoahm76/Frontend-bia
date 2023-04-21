export interface ItemSolicitudConsumible {
  id_item_solicitud_consumible: number | null;
  id_bien: number;
  cantidad: string;
  observaciones: string;
  nro_posicion: string;
}

export interface InfoSolicitud {
  id_solicitud_consumibles: number | null;
  es_solicitud_de_conservacion: boolean;
  id_unidad_para_la_que_solicita: number;
  id_funcionario_responsable_unidad: number;
  motivo: string;
  observacion: string;
}

export interface SolicitudConsumo {
  solicitud: InfoSolicitud;
  solicitud_bienes_consumo: ItemSolicitudConsumible[];
  unidad_organizacional: UnidadOrganizacional[];
}

export interface IList {
  label: string | number;
  value: number | string;
}

export interface UnidadOrganizacional {
  id_unidad_organizacional: number;
  id_organigrama: number;
  id_nivel_organigrama: number;
  nombre: string;
  codigo: string;
  cod_tipo_unidad: string;
  cod_agrupacion_documental: string;
  unidad_raiz: boolean;
  id_unidad_org_padre: null;
}
