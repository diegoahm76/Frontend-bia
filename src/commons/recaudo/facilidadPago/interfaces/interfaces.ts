export interface ObligacionesState {
  id: number;
  nombreObligacion: string; // este parametro no esta contemplado en back
  fecha_inicio: string;
  id_expediente: number;
  nroResolucion: string; // este parametro no esta contemplado en back
  monto_inicial: number;
  carteras: {
    valor_intereses: number;
    dias_mora: number;
  }
}

export interface event {
  target: {
    value: string;
    name: string;
  }
}
