export interface Alerta {
  configuraciones: IObjConfiguracionAlerta[];
  current_configuracion: IObjConfiguracionAlerta;
  destinatario: IObjDestinatario[];
  perfil_sistema: IList[];
  tipo_documento: IList[];
  persona: IPersona[];
}

export interface IObjConfiguracionAlerta {
  cod_clase_alerta?: string | null;
  nombre_clase_alerta?: string | null;
  descripcion_clase_alerta?: string | null;
  cod_tipo_clase_alerta?: string | null;
  cod_categoria_clase_alerta?: string | null;
  cant_dias_previas?: null;
  frecuencia_previas?: null;
  cant_dias_post?: null;
  frecuencia_post?: null;
  envios_email?: boolean | null;
  mensaje_base_dia?: string | null;
  mensaje_base_previo?: null;
  mensaje_base_vencido?: null;
  nivel_prioridad?: string | null;
  activa?: boolean | null;
  asignar_responsable?: boolean;
  id_modulo_destino?: number | null;
  id_modulo_generador?: number | null;
}

export interface IObjDestinatario {
  id_persona_alertar?: number | null;
  nombre_completo?: string | null;
  nombre_unidad?: string | null;
  numero_documento?: null;
  perfil_sistema?: string | null;
  es_responsable_directo?: boolean;
  registro_editable?: boolean;
  cod_clase_alerta?: string | null;
  id_persona?: number | null;
  id_unidad_org_lider?: number | null;
  datos_reordenados: DatosReordenados;
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
