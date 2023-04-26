export interface OpcionLiquidacion {
  id: number;
  nombre: string;
  estado: number;
  version: number;
  funcion: string;
  variables: {
    [key: string]: string;
  };
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
  id: number;
  nombre: string;
  tipo: string;
  valor_defecto: string;
  estado: number;
}

export interface Detalle {
  id: number;
  id_variable: Variable;
}

export interface Liquidacion {
  id: number;
  id_opcion_liq: OpcionLiquidacion;
  cod_deudor: Deudor;
  cod_expediente: Expediente;
  fecha_liquidacion: string;
  vencimiento: string;
  periodo_liquidacion: string;
  valor: number;
  estado: string;
  detalle: Detalle[];
}