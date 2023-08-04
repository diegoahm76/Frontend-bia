import { Cartera } from "./cobro";

export interface EtapaProceso {
  id: number;
  etapa: string;
  descripcion: string;
}

export interface TipoAtributo {
  id: number;
  tipo: string;
  notificacion: number;
}

export interface CategoriaAtributo {
  id: number;
  categoria: string;
}

export interface CategoriaAtributo {
  id: number;
  categoria: string;
}

export interface AtributoEtapa {
  id: number;
  descripcion: string;
  obligatorio: number;
  id_tipo: TipoAtributo;
  id_categoria: CategoriaAtributo;
}

export interface ValoresProceso {
  id: number;
  id_atributo: AtributoEtapa;
  valor: string | null;
  documento: string | null;
}

export interface Proceso {
  id: number;
  id_cartera: Cartera;
  id_etapa: EtapaProceso;
  id_categoria: CategoriaAtributo;
  id_funcionario: number;
  inicio: string;
  fin: string | null;
}