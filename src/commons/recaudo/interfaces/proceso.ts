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