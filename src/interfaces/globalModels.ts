import type { SelectChangeEvent } from '@mui/material';
import type {
  FieldErrors,
  FieldValues,
  UseFormRegister
} from 'react-hook-form';

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

export interface PropsSelect {
  options: IList[];
  label: string;
  name: string;
  value: string;
  loading: boolean;
  disabled?: boolean;
  required?: boolean;
  errors: FieldErrors<FieldValues>;
  register: UseFormRegister<any>;
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
  ubicacion: string;
  direccion_estandarizada: string;
}

export interface Persona {
  id_persona?: number|string;
  tipo_persona?: string|null;
  tipo_documento?: string|null;
  numero_documento?: string|null;
  primer_nombre?: string|null;
  segundo_nombre?: string|null;
  primer_apellido?: string;
  segundo_apellido?: string|null;
  nombre_completo?: string|null;
  razon_social?: string|null;
  nombre_comercial?: string|null;
  tiene_usuario?: boolean|null;
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
  | 'direccion_estandarizada'
  | 'ubicacion';
