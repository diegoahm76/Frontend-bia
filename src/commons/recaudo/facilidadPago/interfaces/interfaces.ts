export interface event {
  target: {
    value: string;
    name: string;
  }
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
  nombre_de_usuario: string;
  identificacion: string;
  obligacion: string;
  fecha_generacion: string;
}

export interface FacilidadPagoSolicitud {
  id: number;
  fecha_generacion: string;
  periodicidad: number;
  cuotas: number;
  consignacion_soporte: string;
  documento_soporte: string;
  observaciones: string;
  notificaciones: boolean;
}
