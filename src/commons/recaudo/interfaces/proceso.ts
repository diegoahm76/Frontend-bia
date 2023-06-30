export interface EtapaProceso {
  id: number;
  etapa: string;
  descripcion: string;
}

export interface TipoAtributo {
  id: number;
  tipo: string;
}

export interface AtributoEtapa {
  id: number;
  descripcion: string;
  obligatorio: number;
  id_tipo: TipoAtributo;
}

export interface ValoresProceso {
  id: number;
  id_atributo: AtributoEtapa;
  valor: string;
}

export interface Cartera {
  id: number;
  dias_mora: number;
  valor_intereses: string;
  valor_sancion: string;
  inicio: string;
  fin: string;
  codigo_contable: string;
  fecha_facturacion: string;
  numero_factura: string;
  monto_inicial: string;
  id_obligacion: number;
  id_rango: number;
}

export interface Proceso {
  id: number;
  id_cartera: Cartera;
  id_etapa: EtapaProceso;
  id_funcionario: number;
  inicio: string;
  fin: string | null;
}