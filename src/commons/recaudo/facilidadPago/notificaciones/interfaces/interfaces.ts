export interface RecepcionFisica {
  doc_asocioando: string;
  numero_guia: string;
  fecha_prestacion: string;
  funcionario_entrega: string;
  observaciones: string;
  id_notificacion: number;
  id_despacho_notificacion: number;
}

export interface NotificacionFisica {
  fecha_despacho: string;
  empresa_entrega: string;
  funcionario_entrega: string;
  observaciones: string;
  id_notificacion: number;
  id_funcionario: number;
}

export interface NotificacionEmailEdicto {
  id_destinatario: number;
  id_expediente: number;
  doc_asociado: string;
  id_medio_notificacion: number;
  id_modulo_generador: number;
  observaciones: string;
  email: string;
  email_alterno: string;
}
