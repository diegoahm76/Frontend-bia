import type { SelectChangeEvent } from '@mui/material';
// import type { FieldErrors, FieldValues } from 'react-hook-form';

export interface ResponseThunks<T = any | null> {
  ok: boolean;
  data?: T;
  error_message?: string;
  is_blocked?: boolean;
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
  // errors: FieldErrors<FieldValues>;
  onChange: (e: SelectChangeEvent<string>) => void;
}

export interface Direccion {
  via_principal: string;
  numero_o_nombre_via: string;
  letras_via_principal: string;
  prefijo_bis: string;
  letra_prefijo: string;
  cuadrante: string;
  via_secundaria: string;
  numero_o_nombre_via_secundaria: string;
  letras_via_secundaria: string;
  sufijo_bis: string;
  letra_sufijo: string;
  cuadrante_secundaria: string;
  barrio: string;
  nombre: string;
  complemento: string;
  ubicacion: string;
  direccion_estandarizada: string;
}

export type keys_direccion =
  | 'via_principal'
  | 'numero_o_nombre_via'
  | 'letras_via_principal'
  | 'prefijo_bis'
  | 'letra_prefijo'
  | 'cuadrante'
  | 'via_secundaria'
  | 'numero_o_nombre_via_secundaria'
  | 'letras_via_secundaria'
  | 'sufijo_bis'
  | 'letra_sufijo'
  | 'cuadrante_secundaria'
  | 'barrio'
  | 'nombre'
  | 'complemento'
  | 'direccion_estandarizada'
  | 'ubicacion';
