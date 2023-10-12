export interface CarteraDetallada {
  codigo_contable: number;
  concepto_deuda: string;
  nombre_deudor: string;
  identificacion: string;
  expediente: number;
  resolucion: string;
  numero_factura: string;
  valor_sancion: string;
  id: number;
}
export interface ReporteGeneralDetallado {
  links: {
    siguiente: string | null;
    anterior: string | null;
  };
  count: number;
  results: {
    success: boolean;
    detail: string;
    data: CarteraDetallada[];
    total_general: number;
  };
}

export interface CarteraEdad {
  identificacion: string;
  expediente: number;
  resolucion: string;
  id_rango: number;
  valor_sancion: string;
  nombre_deudor: string;
}

export interface CarteraFecha {
  codigo_contable: number;
  concepto_deuda: string;
  valor_sancion: string;
}

export interface FacilidadGeneral {
  total_general: number;
  total_sanciones_coactivo: number;
  total_sanciones_persuasivo: number;
}

export interface FacilidadDetallada {
  tipo_cobro: string;
  identificacion: string;
  nombre_deudor: string;
  concepto_deuda: string;
  codigo_expediente: string;
  numero_resolucion: string;
  numero_factura: string;
  valor_sancion: string;
}
