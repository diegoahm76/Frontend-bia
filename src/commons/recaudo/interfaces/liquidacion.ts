export interface OpcionLiquidacion {
  id: number;
  nombre: string;
  estado: number;
  version: number;
  funcion: string;
  tipo_cobro:any;
  tipo_renta:any;
  variables: {
    [key: string]: string;
  };
  bloques: string;
}

export interface Deudor {
  id: number;
  identificacion: string;
  nombres: string;
  apellidos: string;
}

export type EstadoExpediente = 'activo' | 'guardado' | 'liquidado' | null;

export interface Expediente {
  id: number;
  cod_expediente: string;
  numero_resolucion: string;
  cod_auto: string;
  cod_recurso: string;
  estado: EstadoExpediente;
  id_deudor: number;
}

export interface Variable {
  nombre: string;
  tipo: string;
  valor: string;
}

export interface DetallesLiquidacion {
  id: number;
  id_opcion_liq: OpcionLiquidacion;
  variables: Record<string, string>;
  valor: number;
  estado: number;
  concepto: string;
  id_liquidacion: number;
}

export interface Liquidacion {
  id: number;
  id_deudor: Deudor;
  id_expediente: Expediente;
  fecha_liquidacion: string;
  vencimiento: string;
  ciclo_liquidacion: string;
  periodo_liquidacion: string;
  valor: number;
  estado: string;
  detalles: DetallesLiquidacion[];
}

export interface FormDetalleLiquidacion {
  variables: Record<string, string>;
  id_opcion_liq: string;
  valor: number;
  estado: number;
  concepto: string;
}

export interface FormLiquidacion {
  id_deudor: string;
  id_expediente: string;
  ciclo_liquidacion: string;
  periodo_liquidacion: string;
  valor?: number;
  estado?: string;
}

export interface RowDetalles {
  id: number;
  nombre_opcion: string;
  concepto: string;
  formula_aplicada: string;
  variables: Record<string, string>;
  valor_liquidado: string;
  id_opcion_liquidacion: string;
}