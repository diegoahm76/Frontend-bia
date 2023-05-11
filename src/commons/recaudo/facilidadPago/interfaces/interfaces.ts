export interface event {
  target: {
    value: string;
    name: string;
  }
}

export interface Obligacion {
  id: number;
  nombreObligacion: string; // este parametro no esta contemplado en back
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
