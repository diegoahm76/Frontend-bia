export interface ResponseThunks<T = any | null> {
  ok: boolean;
  data?: T;
  error_message?: string;
}

export interface ResponseServer<T> {
  success: boolean;
  detail: string;
  data: T;
}

export interface Paises {
  nombre: string;
  cod_pais: string;
}

export interface TipoDocumento {
  cod_tipo_documento: string;
  nombre: string;
}

export interface TipoPersona {
  cod_tipo_persona: string;
  tipo_persona: string;
}

export interface IGeneric {
  label: string;
  value: string;
}
export interface IList {
  label: string;
  value: string;
}
