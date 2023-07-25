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
  nro_expediente: number;
  nro_resolucion: string;
  monto_inicial: string;
  valor_intereses: string;
  dias_mora: number;
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

export interface FacilidadPagoSolicitud {
  id: number;
  id_funcionario: number;
  id_deudor: number;
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
  informe_dbme : File;
  reportado_dbme: boolean;
}

export interface Contribuyente {
  identificacion: string;
  nombre_contribuyente: string;
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

export interface RegistroFacilidadPago {
  id_deudor: number;
  id_tipo_actuacion: number;
  fecha_generacion: string;
  observaciones: string;
  periodicidad: number;
  cuotas: number;
  documento_no_enajenacion: File;
  consignacion_soporte: File;
  documento_soporte: File;
  id_funcionario: number;
  notificaciones: boolean;
  documento_garantia: File;
  id_rol: number;
  documento_deudor: File;
  descripcion: string;
  direccion: string;
  id_tipo_bien: number;
  id_ubicacion: number;
  valor: string;
  documento_soporte_bien: File;
}

export interface Bien {
  cod_deudor : number;
  id_tipo_bien : number;
  descripcion : string;
  direccion : string;
  estado : string;
  documento_soporte : string;
  valor : number;
  id_ubicacion : string;
}
