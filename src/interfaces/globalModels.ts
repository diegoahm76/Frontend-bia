import type { SelectChangeEvent } from '@mui/material';
import type {
  FieldErrors,
  FieldValues,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch
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
  loading: boolean;
  disabled?: boolean;
  value?: string;
  required?: boolean;
  errors: FieldErrors<FieldValues>;
  register: UseFormRegister<any>;
  onChange?: (e: SelectChangeEvent<string>) => void;
}

export interface PropsRegister {
  numero_documento: string;
  tipo_documento: string;
  tipo_persona: string;
  register: UseFormRegister<FieldValues>;
  handleSubmit: UseFormHandleSubmit<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  errors: FieldErrors<FieldValues>;
  isValid: boolean;
  watch: UseFormWatch<FieldValues>;
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
  id_persona: number | null;
  tipo_persona?: string | null;
  tipo_documento?: string | null;
  numero_documento?: string | null;
  primer_nombre?: string | null;
  segundo_nombre?: string | null;
  primer_apellido?: string;
  segundo_apellido?: string | null;
  nombre_completo?: string | null;
  razon_social?: string | null;
  nombre_comercial?: string | null;
  tiene_usuario?: boolean | null;
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

export interface InfoPersona {
  id: number;
  id_persona: number;
  tipo_persona: string;
  tipo_documento: string;
  numero_documento: string;
  primer_nombre: string;
  segundo_nombre: string;
  primer_apellido: string;
  segundo_apellido: string;
  nombre_completo: string;
  razon_social: string;
  nombre_comercial: string;
  tiene_usuario: boolean;
  digito_verificacion: string;
  cod_naturaleza_empresa: string;
}

export type KeysInfoPersona =
  | 'id'
  | 'id_persona'
  | 'tipo_persona'
  | 'tipo_documento'
  | 'numero_documento'
  | 'primer_nombre'
  | 'segundo_nombre'
  | 'primer_apellido'
  | 'segundo_apellido'
  | 'nombre_completo'
  | 'razon_social'
  | 'nombre_comercial'
  | 'tiene_usuario';

export interface BusquedaAvanzada {
  tipo_documento: string;
  numero_documento: string;
  primer_nombre?: string;
  primer_apellido?: string;
  razon_social?: string;
  nombre_comercial?: string;
}
export interface CompleteInfoPersona {
  acepta_notificacion_email: boolean;
  acepta_notificacion_sms: boolean;
  acepta_tratamiento_datos: boolean;
  cod_municipio_expedicion_id: null;
  cod_municipio_laboral_nal: null;
  cod_municipio_notificacion_nal: null;
  cod_naturaleza_empresa: null;
  cod_pais_nacionalidad_empresa: null;
  digito_verificacion: string;
  direccion_laboral: string;
  direccion_notificacion_referencia: null;
  direccion_notificaciones: string;
  direccion_residencia_ref: string;
  direccion_residencia: string;
  email_empresarial: null;
  email: string;
  es_unidad_organizacional_actual: null;
  estado_civil: string;
  fecha_a_finalizar_cargo_actual: null;
  fecha_asignacion_unidad: string;
  fecha_cambio_representante_legal: string;
  fecha_creacion: string;
  fecha_inicio_cargo_actual: string;
  fecha_inicio_cargo_rep_legal: null;
  fecha_nacimiento: string;
  fecha_ultim_actualiz_diferente_crea: string;
  fecha_ultim_actualizacion_autorizaciones: string;
  id_cargo: null;
  id_persona_crea: null;
  id_persona_ultim_actualiz_diferente_crea: null;
  id_persona: number;
  id_unidad_organizacional_actual: null;
  municipio_residencia: string;
  nombre_comercial: string;
  nombre_unidad_organizacional_actual: null;
  numero_documento: string;
  observaciones_vinculacion_cargo_actual: null;
  pais_nacimiento: string;
  pais_residencia: string;
  primer_apellido: string;
  primer_nombre: string;
  razon_social: null;
  representante_legal: null;
  segundo_apellido: null;
  segundo_nombre: null;
  sexo: string;
  telefono_celular_empresa: null;
  telefono_celular: string;
  telefono_empresa_2: null;
  telefono_empresa: null;
  telefono_fijo_residencial: null;
  tiene_usuario: boolean;
  tipo_documento: string;
  tipo_persona: string;
  ubicacion_georeferenciada: string;
}

export interface HistoricoDatosRestringidos {
  id: number,
  historico_cambio_id_persona: number;
  nombre_campo_cambiado: string;
  valor_campo_cambiado: string;
  ruta_archivo_soporte: string | File;
  fecha_cambio: FormData;
  justificacion_cambio: string;
  id_persona: number;
}
