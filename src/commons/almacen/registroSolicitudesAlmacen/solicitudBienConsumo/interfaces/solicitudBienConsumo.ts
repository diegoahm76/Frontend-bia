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
  id_unidad_para_la_que_solicita: number | null;
  id_funcionario_responsable_unidad: number | null;
  motivo: string;
  observacion: string;
  id_persona_solicita?: number | null;
  persona_solicita?: string | null;
  fecha_solicitud?: string | null;
}

export interface SolicitudConsumo {
  solicitud: InfoSolicitud;
  solicitud_bienes_consumo: ItemSolicitudConsumible[];
  unidad_organizacional: UnidadOrganizacional[];
  funcionario_responsable: FuncionarioResponsable[];
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

export interface FuncionarioResponsable {
  id_persona: number;
  tipo_persona: string;
  tipo_documento: string;
  numero_documento: number;
  primer_nombre: string;
  segundo_nombre: string;
  primer_apellido: string;
  segundo_apellido: string;
  nombre_completo: string;
  razon_social: null;
  nombre_comercial: string;
  tiene_usuario: true;
  id_unidad_organizacional_actual: number;
  nombre_unidad_organizacional_actual: string;
}
