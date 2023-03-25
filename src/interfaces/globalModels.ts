import { type SelectChangeEvent } from '@mui/material';

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

export interface IList {
  label: string;
  value: string;
}
export interface Departamentos {
  cod_departamento: string;
  nombre: string;
  pais: string;
}
export interface Municipios {
  cod_municipio: string;
  nombre: string;
  cod_departamento: string;
}

export interface PropsSelect<T> {
  options: IList[];
  label: string;
  name: T;
  value: string;
  loading: boolean;
  disabled?: boolean;
  required?: boolean;
  onChange: (e: SelectChangeEvent<string>) => void;
}
