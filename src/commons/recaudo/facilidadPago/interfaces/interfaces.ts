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
  nombre: string;
  fecha_inicio: string;
  id_expediente: number;
  nroResolucion: string; // este parametro no esta contemplado en back
  monto_inicial: string;
  valor_intereses: string;
  dias_mora: number;
}

export interface ObligacionesUsuario {
  nombre_completo: string;
  numero_identificacion: string;
  email: string;
  obligaciones: Obligacion[];
}

export interface FacilidadPago {
  id_facilidad: number;
  nombre_de_usuario: string;
  identificacion: string;
  obligacion: string; // este parametro no esta contemplado en back nro radicación fp
  fecha_generacion: string;
}

export interface Funcionario {
  id_persona: number;
  nombre_funcionario: string;
}

export interface FacilidadPagoSolicitud {
  id: number;
  id_funcionario: number;
  id_deudor_actuacion: number;
  fecha_generacion: string;
  tipo_actuacion: string;
  periodicidad: number;
  cuotas: number;
  consignacion_soporte: string;
  documento_soporte: string;
  documento_no_enajenacion: string;
  documento_garantia: string;
  observaciones: string;
  notificaciones: boolean;
}

export interface RespuestaFacilidadPago {
  id_funcionario: number;
  id_facilidades_pago : number;
  estado : string;
  aprobacion : boolean;
  observacion : string;
  consulta_dbme : string;
}

export interface Deudor {
  codigo: number;
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

export interface RegistroFacilidadPago {
  id_deudor_actuacion: number; // de dónde lo saco
  id_tipo_actuacion: number;
  id_funcionario: number; // no tiene sentido
  fecha_generacion: string;
  observaciones: string;
  periodicidad: number;
  cuotas: number;
  id_tasas_interes: number; // para que es y de dónde lo saco
  documento_soporte: string;
  consignacion_soporte: string;
  documento_garantia: string;
  documento_no_enajenacion: string;
  notificaciones: boolean;
}
