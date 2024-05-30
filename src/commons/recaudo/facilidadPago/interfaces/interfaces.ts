export interface event {
  target: {
    value: string;
    name: string;
  }
}

export interface check {
  target: {
    checked: boolean;
  }
}

export interface Filtro {
  parametro: string;
  valor: string;
}

export interface Obligacion {
  id: number;
  nombre: string;
  monto_inicial: string;
  InteresMoratorio_c:string;
  valor_capital_intereses_c:string;
  inicio: string;
  dias_mora: number;
  nro_expediente: number;
  nro_resolucion: string;
  valor_intereses: string;
  valor_capital_intereses: number;
}

export interface ObligacionesUsuario {
  id_deudor: number;
  nombre_completo: string;
  numero_identificacion: string;
  email: string;
  obligaciones: Obligacion[];
  tiene_facilidad: boolean;
}

export interface FacilidadPago {
  id_facilidad: number;
  nombre_de_usuario: string;
  identificacion: string;
  numero_radicacion: string;
  fecha_generacion: string;
  nombre_funcionario: string;
  asignar: boolean;
}

export interface Funcionario {
  id_persona: number;
  nombre_funcionario: string;
}

export interface Bien {
  descripcion: string;
  direccion: string;
  documento_soporte: string;
  nombre_tipo_bien: string;
  ubicacion: string;
  valor: number;
}

export interface Deudor {
  id: number;
  identificacion: string;
  nombres: string;
  apellidos: string;
  email: string;
  ubicacion: string;
}

export interface Contacto {
  direccion_notificaciones: string;
  ciudad: string;
  telefono_celular: string;
}

export interface DocumentosDeudor {
  documento: string;
  id: number;
  id_facilidad_pago: number;
  id_requisito_actuacion: number;
}

export interface FacilidadPagoDetalle {
  consignacion_soporte: string;
  cuotas: number;
  documento_no_enajenacion: string;
  documento_soporte: string;
  fecha_generacion: string;
  id: number;
  id_deudor: number;
  id_funcionario: number;
  id_tipo_actuacion: number;
  notificaciones: boolean;
  numero_radicacion: string;
  observaciones: string;
  periodicidad: number;
  tipo_actuacion: string;
  valor_abonado: string;
  fecha_abono: string;
}

export interface FacilidadPagoSolicitud {
  bienes: Bien[];
  datos_deudor_actuacion: Contacto;
  deudor: Deudor;
  documento_garantia: string;
  documentos_deudor_actuacion: DocumentosDeudor[];
  facilidad_pago: FacilidadPagoDetalle;
  obligaciones_seleccionadas: ObligacionesUsuario;
}

export interface RespuestaFacilidadPago {
  id_funcionario: number;
  id_facilidad_pago : number;
  estado : string;
  aprobacion : boolean;
  observacion : string;
  informe_dbme : File;
  reportado_dbme: boolean;
}

export interface Contribuyente {
  identificacion: string;
  nombre_contribuyente: string;
  obligaciones:any;
}

export interface RegistroFacilidadPago {
  id_deudor: string;
  id_tipo_actuacion: string;
  fecha_generacion: string;
  observaciones: string;
  periodicidad: string;
  cuotas: string;
  documento_no_enajenacion: File;
  consignacion_soporte: File;
  documento_soporte: File;
  id_funcionario: string;
  notificaciones: string;
  ids_obligaciones: string;
  valor_abonado: string;
  fecha_abono: string;
  documento_garantia: File;
  id_rol: string;
  documento_deudor1: File;
  documento_deudor2: File;
  documento_deudor3: File;
  identificaciones: string[];
  direcciones: string[];
  id_tipo_bienes: string[];
  id_ubicaciones: string[];
  valores: string[];
  documentos_soporte_bien: File[];
}

export interface FacilidadPagoUsuario {
  id: number;
  estado: string;
  numero_radicacion: string;
  valor_total: number;
}

export interface Cartera {
  obligaciones: Obligacion[];
  total_intereses: number;
  total_valor_capital: number;
  total_valor_capital_con_intereses: number;
}

export interface ProyeccionPago {
  capital: number;
  cuota: number;
  fecha_pago: string;
  interes: number;
  num_cuota: number;
}

export interface TablasAmortizacion {
  data_cartera: Cartera;
  data_cartera_modificada: Cartera;
  distribucion_cuota: {
    capital_cuotas: number;
    interes_cuotas: number;
    total_cuota: number;
  };
  resumen_facilidad : {
    deuda_total: number;
    intreses_mora: number; // está mal escrito
    saldo_total: number;
  };
  resumen_inicial: {
    abono_facilidad: number;
    capital_total: number;
  };
  proyeccion_plan: ProyeccionPago[];
}

export interface ConsultaFacilidadPagoUsuario {
  id_funcionario: number;
  id_facilidad_pago : number;
  id: number;
  estado : string;
  aprobacion : boolean;
  observacion : string;
  informe_dbme : string;
  reportado_dbme: boolean;
}

export interface Resolucion {
  doc_asociado: string;
  fecha_creacion_registro: string;
  id: number;
  id_plan_pago: number;
  observacion: string;
}

export interface CrearResolucion {
  observacion: string;
  doc_asociado: File;
  id_plan_pago: number;
}

export interface CrearPlanPagos {
  id_facilidad_pago: number;
  id_tasa_interes: number;
  tasa_diaria_aplicada: number;
  abono_aplicado: number;
  porcentaje_abono: number;
  fecha_pago_abono: string;
  nro_cuotas: number;
  periodicidad: number;
  saldo_total: number;
  intreses_mora: number; // está mal escrito
}

export interface AmortizacionDatosDeudor {
  cuotas: number;
  fecha_abono: string;
  id: number;
  identificacion: string;
  nombre_deudor: string;
  periodicidad: number;
  porcentaje_abonado: number;
  valor_abonado: string;
}

export interface CuotaPlanPagoValidacion {
  fecha_pago: string;
  fecha_vencimiento: string;
  id: number;
  id_cuota_anterior: number;
  id_plan_pago: number;
  id_tipo_pago: number;
  monto_cuota: string;
  monto_pagado: string;
  nro_cuota: number;
  saldo_pendiente: string;
  valor_capital: string;
  valor_interes: string;
}

export interface PlanPagoValidacion {
  abono_aplicado: string;
  fecha_creacion_registro: string;
  fecha_pago_abono: string;
  id: number;
  id_facilidad_pago: number;
  id_funcionario: number;
  id_tasa_interes: number;
  nro_cuotas: number;
  periodicidad: number;
  porcentaje_abono: string;
  tasa_diaria_aplicada: string;
}




