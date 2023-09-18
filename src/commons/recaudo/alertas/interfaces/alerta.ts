export interface Alerta {
  configuraciones: IObjConfiguracionAlerta[];
  current_configuracion: IObjConfiguracionAlerta;
  destinatario: IObjDestinatario[];
  current_destinatario: IObjDestinatario;
  perfil_sistema: IList[];
  clase_alerta: IList[];
  tipo_documento: IList[];
  persona: IPersona[];
  fecha_alerta: IFechaProgramada[];
}

export interface IObjConfiguracionAlerta {
  perfil_sistema: any;
  id_unidad_org_lider?: any;
  cod_clase_alerta?: string | null;
  nombre_clase_alerta?: string | null;
  descripcion_clase_alerta?: string | null;
  cod_tipo_clase_alerta?: string | null;
  cod_categoria_clase_alerta?: string | null;
  cant_dias_previas?: null;
  frecuencia_previas?: null;
  cant_dias_post?: null;
  frecuencia_post?: null;
  envios_email?: boolean;
  mensaje_base_dia?: string | null;
  mensaje_base_previo?: null;
  mensaje_base_vencido?: null;
  nivel_prioridad?: string | null;
  activa?: boolean;
  asignar_responsable?: boolean;
  id_modulo_destino?: number | null;
  id_modulo_generador?: number | null;
}

export interface IObjDestinatario {
  id_persona_alertar?: number | null;
  nombre_unidad?: string | null;
  perfil_sistema?: string | null;
  es_responsable_directo?: boolean;
  registro_editable?: boolean;
  cod_clase_alerta?: string | null;
  id_unidad_org_lider?: number | null;
  datos_reordenados?: DatosReordenados;
  id_persona?: number | null;
  tipo_persona?: string | null;
  tipo_persona_desc?: string | null;
  tipo_documento?: string | null;
  numero_documento?: number | null;
  primer_nombre?: string | null;
  segundo_nombre?: string | null;
  primer_apellido?: string | null;
  segundo_apellido?: string | null;
  nombre_completo?: string | null;
  razon_social?: string | null;
  nombre_comercial?: string | null;
  digito_verificacion?: number | null;
  cod_naturaleza_empresa?: number | null;
  tiene_usuario: boolean;
  id_unidad_organizacional?: number | null;
  nombre_unidad_org_actual_admin_series?: string | null;
  codigo_unidad_org_actual_admin_series?: number | null;
  nombre?: string | null;
  codigo?: number | null;
  cod_tipo_unidad?: string | null;
  cod_agrupacion_documental?: string | null;
  unidad_raiz?: boolean;
  item_usado?: boolean;
  activo?: boolean;
  id_organigrama?: number | null;
  id_nivel_organigrama?: number | null;
  id_unidad_org_padre?: number | null;
  id_unidad_org_actual_admin_series?: number | null;
  value?: string | null;
  label?: string | null;
  id_fecha?: number;
  dia_cumplimiento?: number;
  mes_cumplimiento?: number;
  age_cumplimiento?: null;
}

export interface DatosReordenados {
  destinatario?: string | null;
  detalle?: string | null;
  nombre?: string | null;
  principal?: string | null;
}

export interface IList {
  value?: string | null;
  label?: string | null;
}

export interface IPersona {
  id_persona?: number | null;
  tipo_persona?: string | null;
  tipo_persona_desc?: string | null;
  tipo_documento?: string | null;
  numero_documento?: number | null;
  primer_nombre?: string | null;
  segundo_nombre?: string | null;
  primer_apellido?: string | null;
  segundo_apellido?: string | null;
  nombre_completo?: string | null;
  razon_social?: string | null;
  nombre_comercial?: string | null;
  digito_verificacion?: number | null;
  cod_naturaleza_empresa?: number | null;
  tiene_usuario: boolean;
}

export interface IFechaProgramada {
  id_fecha: number;
  dia_cumplimiento: number;
  mes_cumplimiento: number;
  age_cumplimiento: null;
  cod_clase_alerta: string;
}
