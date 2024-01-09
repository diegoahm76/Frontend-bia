export interface Obligacion {
  id: number;
  nombre: string;
  cod_factura: string;
  fecha_inicio: string;
  monto_inicial: string;
  naturaleza: string;
  id_documento_cobro: number;
  id_expediente: number;
}

export interface Rango {
  id: number;
  descripcion: string;
  inicial: number;
  final: number;
  color: "success" | "warning" | "error";
}

export interface Deudor {
  id: number;
  identificacion: string;
  nombres: string;
  apellidos: string;
  telefono: string;
  email: string;
  ubicacion_id: number;
  naturaleza_juridica_id: number;
}

export interface ProcesoCartera {
  id: number;
  id_funcionario: number;
  inicio: string | null;
  fin: string | null;
  id_cartera: number;
  id_etapa: number;
  id_categoria: number;
}

export interface TipoRenta {
  id_tipo_renta: number;
  nombre_tipo_renta: string;
  valor_tipo_renta: string;
}

export interface Cartera {
  id: number;
  nombre: string;
  dias_mora: number;
  valor_intereses: string;
  valor_sancion: string;
  inicio: string | null;
  fin: string | null;
  id_rango: Rango;
  codigo_contable: number;
  fecha_facturacion: string | null;
  fecha_notificacion: string | null;
  fecha_ejecutoriado: string | null;
  numero_factura: string;
  monto_inicial: string;
  tipo_cobro: string;
  id_deudor: Deudor;
  proceso_cartera: ProcesoCartera[];
  id_tipo_renta: TipoRenta;
}