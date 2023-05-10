export interface OpcionLiquidacion {
  id: number;
  nombre: string;
  estado: number;
  version: number;
  funcion: string;
  variables: {
    [key: string]: string;
  };
  bloques: string;
}

export interface Deudor {
  codigo: number;
  identificacion: string;
  nombres: string;
  apellidos: string;
}

export interface Expediente {
  id: number;
  codigo_expediente: number;
  cod_deudor: number;
}

export interface Variable {
  nombre: string;
  tipo: string;
  valor: string;
}

export interface Detalle {
  id: number;
  id_opcion_liq: OpcionLiquidacion;
  variables: string;
  valor: number;
  estado: number;
  concepto: string;
  id_liquidacion: number;
}

export interface Liquidacion {
  id: number;
  cod_deudor: Deudor;
  cod_expediente: Expediente;
  fecha_liquidacion: string;
  vencimiento: string;
  periodo_liquidacion: string;
  valor: number;
  estado: string;
  detalles: Detalle[];
}

export interface FormDetalleLiquidacion {
  variables: Record<string, string>;
  id_opcion_liq: string;
  valor: number;
  estado: number;
  concepto: string;
}

export interface FormLiquidacion {
  cod_deudor: string;
  cod_expediente: string;
  fecha_liquidacion: string;
  vencimiento: string;
  periodo_liquidacion: string;
  estado: string;
}